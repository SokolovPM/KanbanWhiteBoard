module.exports = function(email, link) {
  const nodemailer = require('nodemailer');
  const user = '';
  const pass = '';
  const service = 'gmail';

  const transporter = nodemailer.createTransport({
    service,
    auth: {
      user,
      pass
    }
  });

  const mailOptions = {
    from: user,
    to: email,
    subject: 'Link to video',
    text: `Here is your invitation - ${link}.`
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
