const nodemailer = require('nodemailer');
const config = require('./config')

module.exports = {
  registration: function (email, name) {
    const transporter = nodemailer.createTransport({
      service: config.service,
      auth: {
        user: config.user,
        pass: config.pass
      }
    });

    const mailOptions = {
      from: config.user,
      to: email,
      subject: 'Registration',
      text: `Hi, ${name}!\n\nYou were registered in KanbanWhiteBoard! - ${config.linkToServer}.`
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
      service: config.service,
      auth: {
        user: config.user,
        pass: config.pass
      }
    });

    const mailOptions = {
      from: config.user,
      to: email,
      subject: 'Invitation to the project',
      text: `Here is your invitation to join the KanbanWhiteBoard to the project \"${projectName}\" - ${config.linkToServer}.`
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
