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

export async function POST(request) {
  try {
    const { name, email, phone, company, subject, message } = await request.json();

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
