import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function verifyRecaptcha(token) {
  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      secret: process.env.RECAPTCHA_SECRET_KEY,
      response: token,
    }),
  });
  const data = await res.json();
  return data.success === true;
}

export async function POST(request) {
  try {
    const { name, email, phone, company, subject, message, recaptchaToken } = await request.json();

    if (!recaptchaToken || !(await verifyRecaptcha(recaptchaToken))) {
      return Response.json({ ok: false, error: 'reCAPTCHA verification failed' }, { status: 400 });
    }

    await transporter.sendMail({
      from: `"Top Brands Website" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: `Contact Form: ${subject} — from ${name}`,
      html: `
        <h2>New Contact Message</h2>
        <table cellpadding="8" style="border-collapse:collapse;width:100%">
          <tr><td><strong>Name</strong></td><td>${name}</td></tr>
          <tr><td><strong>Email</strong></td><td>${email}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${phone || '—'}</td></tr>
          <tr><td><strong>Company</strong></td><td>${company || '—'}</td></tr>
          <tr><td><strong>Subject</strong></td><td>${subject}</td></tr>
          <tr><td><strong>Message</strong></td><td>${message}</td></tr>
        </table>
      `,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error('Contact mail error:', err);
    return Response.json({ ok: false }, { status: 500 });
  }
}
