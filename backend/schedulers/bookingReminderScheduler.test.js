const { findAndSendBookingReminders, task } = require('./bookingReminderScheduler');
const { PrismaClient } = require('@prisma/client');
const emailService = require('../services/emailService');

jest.mock('@prisma/client', () => {
  const mPrisma = { bookingRecord: { findMany: jest.fn() } };
  return { PrismaClient: jest.fn(() => mPrisma) };
});

jest.mock('../services/emailService', () => ({
  sendEmail: jest.fn(),
}));

describe('bookingReminderScheduler', () => {

  it('should find booking records and send reminders', async () => {
    const mockRecords = [{
      id: 1,
      date: new Date(),
      stadiumAt: { name: 'Stadium A' },
      activitiesRecords: [{ attend: { email: 'test@example.com' } }],
    }];
    const prisma = new PrismaClient();
    prisma.bookingRecord.findMany.mockResolvedValue(mockRecords);

    await findAndSendBookingReminders();

    expect(prisma.bookingRecord.findMany).toHaveBeenCalled();
    expect(emailService.sendEmail).toHaveBeenCalledWith(
      'test@example.com',
      'Booking Reminder',
      expect.stringContaining('This is a reminder for your upcoming booking at Stadium A on')
    );
  });
  beforeEach(() => {
    // 清除所有模拟函数的调用记录
    jest.clearAllMocks();
  });

  it('should send reminders to five users', async () => {
    const mockRecords = [{
      id: 1,
      date: new Date(),
      stadiumAt: { name: 'Stadium A' },
      activitiesRecords: [
        { attend: { email: 'user1@example.com' } },
        { attend: { email: 'user2@example.com' } },
        { attend: { email: 'user3@example.com' } },
        { attend: { email: 'user4@example.com' } },
        { attend: { email: 'user5@example.com' } },
      ],
    }];
    const prisma = new PrismaClient();
    prisma.bookingRecord.findMany.mockResolvedValue(mockRecords);

    await findAndSendBookingReminders();

    expect(prisma.bookingRecord.findMany).toHaveBeenCalled();
    expect(emailService.sendEmail).toHaveBeenCalledTimes(5);
    expect(emailService.sendEmail).toHaveBeenCalledWith(
      expect.any(String),
      'Booking Reminder',
      expect.stringContaining('This is a reminder for your upcoming booking at Stadium A on')
    );
  });
  afterAll(() => {
    // 停止定时任务
    task.stop();
  });
});
