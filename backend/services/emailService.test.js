import {emailService} from './emailService.js'; // 确保路径正确
import nodemailer from 'nodemailer';

jest.mock('nodemailer');

describe('emailService', () => {
  it('should send an email', async () => {
    const sendMailMock = jest.fn().mockResolvedValue({ messageId: 'test-message-id' });
    nodemailer.createTransport.mockReturnValue({ sendMail: sendMailMock });

    const to = 'test@example.com';
    const subject = 'Test Subject';
    const text = 'Test email body';

    const result = await emailService.sendEmail(to, subject, text);

    expect(sendMailMock).toHaveBeenCalled();
    expect(sendMailMock).toHaveBeenCalledWith({
      from: '"stadium reminder" <cloudNativeStadium@gmail.com>',
      to: to,
      subject: subject,
      text: text,
    });
    expect(result).toHaveProperty('messageId', 'test-message-id');
  });
});

