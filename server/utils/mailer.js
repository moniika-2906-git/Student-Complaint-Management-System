const nodemailer = require('nodemailer');
require('dotenv').config({ path: '../.env' }); 
//console.log("EMAIL_USER =", process.env.EMAIL_USER);
//console.log("EMAIL_PASS =", process.env.EMAIL_PASS); 
// console.log("EMAIL_USER =", process.env.EMAIL_USER);
// console.log("EMAIL_PASS =", process.env.EMAIL_PASS);
// console.log("EMAIL_TO =", process.env.EMAIL_TO);

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});
function sendResolutionEmail(to, subject, text) {
  console.log("Sending email to:", to);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text
  };

  return transporter.sendMail(mailOptions);
}

// function sendResolutionEmail(to, subject, text) {
//   const mailOptions = {
//     from: process.env.EMAIL_USER, // admin email from .env
//     to, // resolved user's email
//     subject,
//     text
//   };
//   return transporter.sendMail(mailOptions);
// }

module.exports = { sendResolutionEmail }; 