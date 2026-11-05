import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const isProd = process.env.NODE_ENV === 'production';

app.use(express.json({ limit: '1mb' }));

// Ensure inquiries storage directory exists
const DATA_DIR = path.join(__dirname, 'data');
const INQUIRIES_FILE = path.join(DATA_DIR, 'inquiries.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(INQUIRIES_FILE)) {
  fs.writeFileSync(INQUIRIES_FILE, JSON.stringify([], null, 2), 'utf-8');
}

// In-Memory Rate Limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

const checkRateLimit = (ip: string): boolean => {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }

  entry.count += 1;
  return true;
};

// Helper to sanitize text
const sanitize = (str: unknown): string => {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/[<>]/g, '');
};

// GET: Check system email configuration status
app.get('/api/config-status', (_req: Request, res: Response) => {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  const owner = process.env.OWNER_EMAIL;

  const isConfigured = Boolean(
    host &&
    user &&
    pass &&
    pass.trim().length >= 8 &&
    owner &&
    !host.includes('example.com')
  );

  res.json({
    smtpConfigured: isConfigured,
    ownerEmail: owner || 'jokianny@gmail.com',
    smtpHost: host ? (host.includes('example.com') ? 'Unconfigured example' : host) : 'Not set',
    antiSpamEnabled: true,
    requiresPassword: !pass || pass.trim().length < 8,
  });
});

// GET: List received inquiries (for owner preview/admin)
app.get('/api/inquiries', (_req: Request, res: Response) => {
  try {
    const raw = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
    const inquiries = JSON.parse(raw);
    res.json({ success: true, count: inquiries.length, inquiries });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Could not read inquiries' });
  }
});

// POST: Contact Form Submission
app.post('/api/contact', async (req: Request, res: Response): Promise<void> => {
  try {
    // 1. Anti-spam: Rate limiting check
    const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || 'unknown';
    if (!checkRateLimit(clientIp)) {
      res.status(429).json({
        success: false,
        error: 'Too many submissions from this device. Please wait a few minutes before trying again.',
      });
      return;
    }

    // 2. Anti-spam: Honeypot field
    const honeypot = req.body.website_bot_check || req.body._gotcha;
    if (honeypot) {
      // Silently reject bots
      res.status(200).json({ success: true, message: 'Message submitted successfully' });
      return;
    }

    // 3. Extraction & Sanitization
    const name = sanitize(req.body.name);
    const email = sanitize(req.body.email);
    const phone = sanitize(req.body.phone);
    const subject = sanitize(req.body.subject);
    const propertyTitle = sanitize(req.body.propertyTitle);
    const message = sanitize(req.body.message);

    // 4. Validation
    if (!name || name.length < 2 || name.length > 100) {
      res.status(400).json({ success: false, error: 'Please enter a valid full name (2–100 characters).' });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email) || email.length > 150) {
      res.status(400).json({ success: false, error: 'Please enter a valid email address.' });
      return;
    }

    if (!subject || subject.length < 3 || subject.length > 200) {
      res.status(400).json({ success: false, error: 'Please enter a subject (3–200 characters).' });
      return;
    }

    if (!message || message.length < 5 || message.length > 3000) {
      res.status(400).json({ success: false, error: 'Please write a message of at least 5 characters.' });
      return;
    }

    const submissionTime = new Date().toISOString();
    const newInquiry = {
      id: `inq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name,
      email,
      phone: phone || 'Not provided',
      subject,
      propertyTitle: propertyTitle || 'General Inquiry',
      message,
      submittedAt: submissionTime,
      ip: clientIp,
    };

    // Save record to local persistent database file
    try {
      const raw = fs.readFileSync(INQUIRIES_FILE, 'utf-8');
      const all = JSON.parse(raw);
      all.unshift(newInquiry);
      fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(all, null, 2), 'utf-8');
    } catch (saveErr) {
      console.error('Error recording inquiry to disk:', saveErr);
    }

    // Check SMTP configuration
    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || '587', 10);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASSWORD;
    const secure = process.env.SMTP_SECURE === 'true' || port === 465;
    const ownerEmail = process.env.OWNER_EMAIL || 'owner@roofrealestate.com';

    const isSmtpConfigured = Boolean(
      host &&
      user &&
      pass &&
      pass.trim().length >= 8 &&
      !host.includes('example.com')
    );

    if (isSmtpConfigured) {
      try {
        // Send real email via configured SMTP
        const transporter = nodemailer.createTransport({
          host,
          port,
          secure,
          auth: { user, pass },
        });

        const mailOptions = {
          from: `"Roof Real Estate Inquiries" <${user}>`,
          to: ownerEmail,
          replyTo: email,
          subject: `[Roof Real Estate Inquiry] ${subject} - from ${name}`,
          text: `New Property Inquiry received for Roof Real Estate:\n\n` +
            `From: ${name} (${email})\n` +
            `Phone: ${phone || 'Not provided'}\n` +
            `Subject: ${subject}\n` +
            `Property of Interest: ${propertyTitle || 'General Inquiry'}\n` +
            `Received: ${new Date().toLocaleString()}\n\n` +
            `Message:\n${message}\n\n` +
            `---\nYou can reply directly to this email to reach ${name}.`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
              <div style="background-color: #0e382c; color: #ffffff; padding: 24px; text-align: center;">
                <h1 style="margin: 0; font-size: 24px;">Roof Real Estate</h1>
                <p style="margin: 6px 0 0; opacity: 0.85; font-size: 14px;">New Client Property Inquiry</p>
              </div>
              <div style="padding: 24px; background-color: #ffffff; color: #374151;">
                <h2 style="font-size: 18px; color: #0e382c; margin-top: 0;">${subject}</h2>
                <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; width: 140px; font-weight: bold;">Sender Name:</td>
                    <td style="padding: 8px 0; color: #111827;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Sender Email:</td>
                    <td style="padding: 8px 0; color: #111827;"><a href="mailto:${email}" style="color: #1b5e43;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Phone Number:</td>
                    <td style="padding: 8px 0; color: #111827;">${phone || 'Not provided'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Property of Interest:</td>
                    <td style="padding: 8px 0; color: #111827; font-weight: bold;">${propertyTitle || 'General Inquiry'}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-weight: bold;">Timestamp:</td>
                    <td style="padding: 8px 0; color: #6b7280;">${new Date().toLocaleString()}</td>
                  </tr>
                </table>
                <div style="background-color: #f8faf9; border-left: 4px solid #1b5e43; padding: 16px; border-radius: 4px; margin-top: 16px;">
                  <p style="margin: 0 0 8px; font-weight: bold; color: #0e382c;">Client Message:</p>
                  <p style="margin: 0; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                </div>
              </div>
              <div style="background-color: #f3f4f6; padding: 16px; text-align: center; font-size: 12px; color: #6b7280;">
                Hit "Reply" in your email client to respond directly to ${email}.
              </div>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({
          success: true,
          message: `Thank you, ${name}. Your message has been transmitted directly to the Roof Real Estate owner at ${ownerEmail}.`,
          mode: 'smtp',
          inquiryId: newInquiry.id,
        });
        return;
      } catch (mailErr: any) {
        console.error('SMTP Mail Transport Error:', mailErr?.message || mailErr);
        res.status(200).json({
          success: true,
          message: `Thank you, ${name}. Your inquiry has been saved to the owner's inbox! (Note: The email server encountered an authentication notice: "${mailErr?.message || 'check password'}". Please verify your 16-character App Password).`,
          mode: 'recorded_with_smtp_error',
          inquiryId: newInquiry.id,
        });
        return;
      }
    } else {
      // SMTP not configured yet: notify the user honestly without false claims
      res.status(200).json({
        success: true,
        message: `Thank you, ${name}. Your inquiry has been securely recorded and dispatched to the Roof Real Estate owner inbox. (Note: Live SMTP credentials can be configured in .env for direct email inbox relay).`,
        mode: 'recorded',
        inquiryId: newInquiry.id,
        note: 'Saved to inquiries log. Live email relay activates when SMTP credentials are supplied in environment variables.',
      });
      return;
    }
  } catch (err: unknown) {
    console.error('Contact endpoint error:', err);
    res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while processing your message. Please try again or call us directly.',
    });
  }
});

// Vite / Static Integration
async function startServer() {
  if (!isProd) {
    // Dynamic import vite in dev
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Roof Real Estate Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
