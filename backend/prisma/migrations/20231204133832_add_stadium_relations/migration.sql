-- AddForeignKey
ALTER TABLE "BookingRecord" ADD CONSTRAINT "BookingRecord_stadiumId_fkey" FOREIGN KEY ("stadiumId") REFERENCES "Stadium"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
