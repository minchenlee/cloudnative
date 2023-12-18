import bookingReminderScheduler from './bookingReminderScheduler.js';

const { findAndSendBookingReminders, task } = bookingReminderScheduler;
import { PrismaClient } from '@prisma/client';
import emailService from '../services/emailService'; // 确保路径正确

jest.mock('@prisma/client');
jest.mock('../services/emailService');

describe('findAndSendBookingReminders', () => {
  it('should find bookings and send email reminders', async () => {
    // 模拟 bookingRecord.findMany 的返回值
    const mockFindMany = jest.fn().mockResolvedValue([
      {
        date: new Date(),
        stadiumAt: { name: 'Stadium A' },
        activitiesRecords: [
          { attend: { email: 'attendee1@example.com' } },
          { attend: { email: 'attendee2@example.com' } }
        ]
      }
      // 更多 bookingRecords 可以被添加
    ]);
    PrismaClient.prototype.bookingRecord = { findMany: mockFindMany };

    // 模拟 emailService.sendEmail
    emailService.sendEmail = jest.fn().mockResolvedValue({});

    await findAndSendBookingReminders();

    expect(mockFindMany).toHaveBeenCalled();
    expect(emailService.sendEmail).toHaveBeenCalledTimes(2); // 根据模拟的记录调整
    expect(emailService.sendEmail).toHaveBeenCalledWith(
      'attendee1@example.com',
      'Booking Reminder',
      expect.any(String)
    );
    expect(emailService.sendEmail).toHaveBeenCalledWith(
      'attendee2@example.com',
      'Booking Reminder',
      expect.any(String)
    );
  });

  afterAll(() => {
    // 停止定时任务
    task.stop();
  });
});
