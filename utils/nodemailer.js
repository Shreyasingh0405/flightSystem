import nodemailer from "nodemailer";
import CONFIG from "../config/config.js";
const transporter = nodemailer.createTransport({
  host: CONFIG.SMTP_HOST,
  port: CONFIG.SMTP_PORT,
  secure: false,
  auth: {
    user: CONFIG.SMTP_USER,
    pass: CONFIG.SMTP_PASS,
  },
});

const sendEmail = (mailOptions) => {
  return transporter.sendMail(mailOptions);
};

export default sendEmail;
