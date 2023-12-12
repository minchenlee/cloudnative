import nodemailer from 'nodemailer';

function createTransporter() {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'henry326326@gmail.com',
      pass: 'wrri xjnx lasz sqsj'
    }
  });
}

const emailService = {
  async sendEmail(to, subject, text) {
    const transporter = createTransporter();
    try {
      let info = await transporter.sendMail({
        from: '"stadium reminder" <cloudNativeStadium@gmail.com>',
        to: to,
        subject: subject,
        text: text,
      });

      console.log('Email sent: %s', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
};

export default{ emailService, createTransporter };
