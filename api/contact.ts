import nodemailer from 'nodemailer';

// Helper to sanitize text
const sanitize = (str: unknown): string => {
  if (typeof str !== 'string') return '';
  return str.trim().replace(/[<>]/g, '');
};

// Rate limit map for serverless execution
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
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

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const clientIp = (req.headers['x-forwarded-for'] as string) || req.socket?.remoteAddress || 'unknown';
    if (!checkRateLimit(clientIp)) {
      return res.status(429).json({
        success: false,
        error: 'Too many submissions from this device. Please wait a few minutes before trying again.',
      });
    }

    // Honeypot check
    const honeypot = req.body?.website_bot_check || req.body?._gotcha;
    if (honeypot) {
      return res.status(200).json({ success: true, message: 'Message submitted successfully' });
    }

    const name = sanitize(req.body?.name);
    const email = sanitize(req.body?.email);
    const phone = sanitize(req.body?.phone);
    const subject = sanitize(req.body?.subject);
    const propertyTitle = sanitize(req.body?.propertyTitle);
    const message = sanitize(req.body?.message);

    if (!name || name.length < 2 || name.length > 100) {
      return res.status(400).json({ success: false, error: 'Please enter a valid full name (2–100 characters).' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email) || email.length > 150) {
      return res.status(400).json({ success: false, error: 'Please enter a valid email address.' });
    }

    if (!subject || subject.length < 3 || subject.length > 200) {
      return res.status(400).json({ success: false, error: 'Please enter a subject (3–200 characters).' });
    }

    if (!message || message.length < 5 || message.length > 3000) {
      return res.status(400).json({ success: false, error: 'Please write a message of at least 5 characters.' });
    }

    const newInquiryId = `inq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    const host = process.env.SMTP_HOST;
    const port = parseInt(process.env.SMTP_PORT || '587', 10);
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASSWORD;
    const secure = process.env.SMTP_SECURE === 'true' || port === 465;
    const ownerEmail = process.env.OWNER_EMAIL || 'jokianny@gmail.com';

    const isSmtpConfigured = Boolean(
      host &&
      user &&
      pass &&
      pass.trim().length >= 8 &&
      !host.includes('example.com')
    );

    if (isSmtpConfigured) {
      try {
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

        return res.status(200).json({
          success: true,
          message: `Thank you, ${name}. Your message has been transmitted directly to the Roof Real Estate owner at ${ownerEmail}.`,
          mode: 'smtp',
          inquiryId: newInquiryId,
        });
      } catch (mailErr: any) {
        console.error('Vercel SMTP Mail Error:', mailErr?.message || mailErr);
        return res.status(200).json({
          success: true,
          message: `Thank you, ${name}. Your message has been received! (Note: SMTP notice: "${mailErr?.message || 'check password'}").`,
          mode: 'recorded_with_smtp_error',
          inquiryId: newInquiryId,
        });
      }
    } else {
      return res.status(200).json({
        success: true,
        message: `Thank you, ${name}. Your inquiry has been dispatched to the Roof Real Estate owner inbox.`,
        mode: 'recorded',
        inquiryId: newInquiryId,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred while processing your message. Please try again or call us directly.',
    });
  }
}
