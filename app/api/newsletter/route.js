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
      console.error('Newsletter mail error: missing env vars:', missing.join(', '));
      return Response.json({ ok: false, error: `Server not configured (missing: ${missing.join(', ')})` }, { status: 500 });
    }

    const { email } = await request.json();

    await transporter.sendMail({
      from: `"Top Brands Website" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: `Newsletter Subscription: ${email}`,
      html: `<p>New newsletter subscription from: <strong>${email}</strong></p>`,
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error('Newsletter mail error:', err);
    return Response.json({ ok: false, error: err?.message || 'Unknown error', code: err?.code }, { status: 500 });
  }
}
