import cron from 'node-cron';
import { PrismaClient } from '@prisma/client';
import emailService from '../services/emailService.js'; // 确保路径正确
import dotenv from 'dotenv';
dotenv.config();


const prisma = new PrismaClient();

function addHours(date, hours) {
  date.setTime(date.getTime() + hours * 60 * 60 * 1000);

  return date;
}

async function findAndSendBookingReminders() {
  const now = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(now.getDate() + 1);

  const bookingRecords = await prisma.bookingRecord.findMany({
    where: {
      date: {
        gte: now, // 現在
        lt: tomorrow,    // 24 小時後
      },
    },
    include: {
      maker: true,
      activitiesRecords: {
        include: {
          attend: true,
        }
      }
    }
  });
  // 為每個記錄發送郵件
  for (const record of bookingRecords) {
    const attendees = record.activitiesRecords.map(ar => ar.attend);
    for (const attendee of attendees) {
      await emailService.sendEmail(
        attendee.email,
        'Booking Reminder',
        `This is a reminder for your upcoming booking on ${addHours(record.date , record.startHour-8)}.`
      );
    }
  }
}

// 定義定時任務
const task = cron.schedule(process.env.EMAIL_SEND_TIME, () => {
  findAndSendBookingReminders();
  console.log('Executed the booking reminder task');
});

export default {
    findAndSendBookingReminders,
    task
 };