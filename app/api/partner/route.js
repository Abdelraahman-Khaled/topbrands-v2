import nodemailer from 'nodemailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function POST(request) {
  try {
    const missing = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS'].filter((k) => !process.env[k]);
    if (missing.length) {
      console.error('Partner mail error: missing env vars:', missing.join(', '));
      return Response.json({ ok: false, error: `Server not configured (missing: ${missing.join(', ')})` }, { status: 500 });
    }

    const { companyName, contactPerson, email, phone, brandName, productCategory, message } = await request.json();

    await transporter.sendMail({
      from: `"Top Brands Website" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      replyTo: email,
      subject: `Partner Request: ${companyName} — ${brandName}`,
      html: `
        <h2>New Partnership Request</h2>
        <table cellpadding="8" style="border-collapse:collapse;width:100%">
          <tr><td><strong>Company Name</strong></td><td>${companyName}</td></tr>
          <tr><td><strong>Contact Person</strong></td><td>${contactPerson}</td></tr>
          <tr><td><strong>Email</strong></td><td>${email}</td></tr>
          <tr><td><strong>Phone</strong></td><td>${phone}</td></tr>
          <tr><td><strong>Brand Name</strong></td><td>${brandName}</td></tr>
          <tr><td><strong>Product Category</strong></td><td>${productCategory}</td></tr>
          <tr><td><strong>Message</strong></td><td>${message || '—'}</td></tr>
        </table>
      `,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error('Partner mail error:', err);
    return Response.json({ ok: false, error: err?.message || 'Unknown error', code: err?.code }, { status: 500 });
  }
}
