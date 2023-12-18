import emailService from './emailService'; // 確保使用正確的路徑
import nodemailer from 'nodemailer';
const {sendEmail} = emailService

jest.mock('nodemailer');

describe('emailService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should send an email successfully', async () => {
    const mockSendMail = jest.fn().mockResolvedValue({ messageId: '123' });
    nodemailer.createTransport.mockReturnValue({ sendMail: mockSendMail });

    const to = 'example@ntu.edu.tw';
    const subject = 'Test Subject';
    const text = 'Hello world';

    const result = await sendEmail(to, subject, text);

    expect(mockSendMail).toHaveBeenCalledWith({
      from: '"stadium reminder" <cloudNativeStadium@gmail.com>',
      to: to,
      subject: subject,
      text: text,
    });
    expect(result).toHaveProperty('messageId', '123');
  });

  // ... 其他測試 ...
});
