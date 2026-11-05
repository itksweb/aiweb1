export default function handler(req: any, res: any) {
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

  return res.status(200).json({
    smtpConfigured: isConfigured,
    ownerEmail: owner || 'jokianny@gmail.com',
    smtpHost: host ? (host.includes('example.com') ? 'Unconfigured example' : host) : 'Not set',
    antiSpamEnabled: true,
    requiresPassword: !pass || pass.trim().length < 8,
  });
}
