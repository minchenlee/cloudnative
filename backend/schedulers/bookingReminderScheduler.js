const cron = require('node-cron');
const { PrismaClient } = require('@prisma/client');
const emailService = require('../services/emailService');

const prisma = new PrismaClient();

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
        `This is a reminder for your upcoming booking at ${record.stadiumAt.name} on ${record.date}.`
      );
    }
  }
}

// 定義定時任務
const task = cron.schedule('0 0 * * *', () => {
  findAndSendBookingReminders();
  console.log('Executed the booking reminder task');
});

module.exports = {
   findAndSendBookingReminders,
   task
}
