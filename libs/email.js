const nodemailer = require('nodemailer');
const config = require('config');


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.get('email.auth.username'), 
    pass: config.get('email.auth.password')
  }
});


module.exports = async function sendEmail({ to, subject, html }) {
  return await transporter.sendMail({
    from: config.get('email.sender'),
    to, 
    subject,
    html
  });
}