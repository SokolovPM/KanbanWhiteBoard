const nodemailer = require('nodemailer');
const user = '';
const pass = '';
const service = '';
const linkToServer = ''

module.exports = {
  registration: function (email, name) {
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
      subject: 'Registration',
      text: `Hi, ${name}!\n\nYou were registered in KanbanWhiteBoard! - ${linkToServer}.`
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  },
  invitation: function (email, projectName) {
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
      subject: 'Invitation to the project',
      text: `Here is your invitation to join the KanbanWhiteBoard to the project \"${projectName}\" - ${linkToServer}.`
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }
}
