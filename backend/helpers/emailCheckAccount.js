import nodemailer from "nodemailer";

const emailCheckAccount = async (data) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    secure: true, // use SSL
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { email, name, token } = data;

  const info = await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Check your account in Mon-Co",
    text: "Check your account in Mon-Co",
    html: `<p>Hello! ${name}, check your account in Mon-Co.</p>
    <p> Your account is almost ready, you just have to check it at the following link: </p>
    <a href="${process.env.FRONTEND_URL_TOKEN}/confirm-account/${token}">Check account<a></p>

    <p> If you did not create this account you can ignore this message </p>
    
    `,
  });
};
export default emailCheckAccount;
