import bookingController from "./bookingController";
import { bookingModel } from "../models/bookingModel.js";
import { stadiumModel } from "../models/stadiumModel.js";

jest.mock('../models/bookingModel');
jest.mock('../models/stadiumModel');

describe('bookingController.getBookingsByUserId', () => {
    it('should get bookings by user ID successfully', async () => {
      const req = { user: { id: '1' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      bookingModel.getBookingsByUserId.mockResolvedValue([
        // Mock bookings data
      ]);
  
      await bookingController.getBookingsByUserId(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        msg: "Get bookings by user id successfully.",
        data: {
          bookings: expect.any(Array)
        }
      });
    });
  
    it('should return status 500 on server error', async () => {
      const req = { user: { id: '1' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      bookingModel.getBookingsByUserId.mockRejectedValue(new Error('Server error'));
  
      await bookingController.getBookingsByUserId(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        msg: "Internal server error."
      });
    });
  });
  
  describe('bookingController.getBookingBySportAndDates', () => {
    it('should get bookings by sport and dates successfully', async () => {
      const req = { params: { sport: 'BASKETBALL' }, body: { startDate: '2023-01-01', endDate: '2023-01-07' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      stadiumModel.getStadiumsBySport.mockResolvedValue([
        // Mock stadiums data
      ]);
      bookingModel.getBookingBySportAndDates.mockResolvedValue([
        // Mock bookings data
      ]);
  
      await bookingController.getBookingBySportAndDates(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        msg: "Get bookings by sport and dates successfully.",
        data: expect.any(Object)
      });
    });
  
    it('should return status 500 on server error', async () => {
      const req = { params: { sport: 'BASKETBALL' }, body: { startDate: '2023-01-01', endDate: '2023-01-07' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      stadiumModel.getStadiumsBySport.mockRejectedValue(new Error('Server error'));
  
      await bookingController.getBookingBySportAndDates(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        msg: "Internal server error."
      });
    });
  });
  
  describe('bookingController.getBookingByStadiumAndDate', () => {
    it('should get bookings by stadium and date successfully', async () => {
      const req = { params: { stadiumId: '1', date: '2023-01-01' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      bookingModel.getBookingByStadiumAndDate.mockResolvedValue([
        // Mock bookings data
      ]);
  
      await bookingController.getBookingByStadiumAndDate(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        msg: "Get bookings by stadium and date successfully.",
        data: expect.any(Object)
      });
    });
  
    it('should return status 500 on server error', async () => {
      const req = { params: { stadiumId: '1', date: '2023-01-01' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      bookingModel.getBookingByStadiumAndDate.mockRejectedValue(new Error('Server error'));
  
      await bookingController.getBookingByStadiumAndDate(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        msg: "Internal server error."
      });
    });
  });
  
  describe('bookingController.createBooking', () => {
    it('should create a booking successfully', async () => {
      const req = { body: { courtId: '1', bookingDate: '2023-01-01', bookingStartHour: 10, bookingEndHour: 12 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      bookingModel.createBooking.mockResolvedValue({ /* Mock booking creation response */ });
  
      await bookingController.createBooking(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        msg: "Booking created successfully."
      });
    });
  
    it('should return status 500 on server error', async () => {
      const req = { body: { courtId: '1', bookingDate: '2023-01-01', bookingStartHour: 10, bookingEndHour: 12 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      bookingModel.createBooking.mockRejectedValue(new Error('Server error'));
  
      await bookingController.createBooking(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        msg: "Internal server error."
      });
    });
  });
  
  describe('bookingController.deleteBookingById', () => {
    it('should delete a booking successfully', async () => {
      const req = { params: { id: '1' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      bookingModel.deleteBookingById.mockResolvedValue({ /* Mock booking deletion response */ });
  
      await bookingController.deleteBookingById(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        msg: "Booking deleted successfully.",
        data: {
          booking: expect.any(Object)
        }
      });
    });
  
    it('should return status 500 on server error', async () => {
      const req = { params: { id: '1' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      bookingModel.deleteBookingById.mockRejectedValue(new Error('Server error'));
  
      await bookingController.deleteBookingById(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        msg: "Internal server error."
      });
    });
  });
  