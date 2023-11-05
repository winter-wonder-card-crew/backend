const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ...

// Configure Nodemailer for sending emails
const transporter = nodemailer.createTransport({
  service: 'Gmail', // e.g., 'Gmail', 'Outlook', etc.
  auth: {
    user: 'jongseungim5348@gmail.com', // Your email address
    pass: 'ljs2559@#', // Your email password
  },
});

// POST endpoint for password reset
app.post('/reset-password', async (req, res) => {
  const { email } = req.body;

  // Find the user by email (you may use your database query here)
  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Generate a new password
  const newPassword = generateNewPassword();

  // Send the new password to the user's email
  try {
    await sendEmail(user.email, newPassword);
    console.log('새로운 비밀번호 발급 완료')
  } catch (error) {
    return res.status(500).json({ message: 'Failed to send email' });
  }

  // Hash the new password and update the user's password (you may use your database update here)
  // ...

  return res.status(200).json({ message: 'Password reset successful' });
});

// ...

function sendEmail(to, newPassword) {
  return new Promise((resolve, reject) => {
    const mailOptions = {
      from: 'jongseungim5348@gmail.com',
      to: to,
      subject: 'Password Reset',
      text: `Your new password is: ${newPassword}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log(`Email sent: ${info.response}`);
        resolve();
      }
    });
  });
}
