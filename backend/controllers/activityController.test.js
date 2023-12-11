import { bookingModel } from '../models/bookingModel.js';
import { activityModel } from '../models/activityModel.js';
import activityController from './activityController.js';

jest.mock('../models/bookingModel');
jest.mock('../models/activityModel');

describe('activityController.createActivity', () => {
    it('should create an activity successfully', async () => {
      const req = { body: { note: 'Note', capacity: 10 }, params: { bookingId: '1' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      bookingModel.updateBookingById.mockResolvedValue({});
      activityModel.createActivity.mockResolvedValue({ /* Mock activity record */ });
  
      await activityController.createActivity(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        msg: "Activity created successfully.",
        data: {
          activityRecord: expect.any(Object)
        }
      });
    });
  
    it('should return status 500 on server error', async () => {
      const req = { body: { note: 'Note', capacity: 10 }, params: { bookingId: '1' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      bookingModel.updateBookingById.mockRejectedValue(new Error('Server error'));
  
      await activityController.createActivity(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        msg: "Failed to create activity."
      });
    });
  });
  
  describe('activityController.getActivities', () => {
    it('should get activities successfully', async () => {
      const req = { body: { startDate: '2023-01-01', endDate: '2023-01-07' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      activityModel.getActivities.mockResolvedValue([
        // Mock activities data
      ]);
  
      await activityController.getActivities(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        msg: "Get activities summary successfully.",
        data: expect.any(Array)
      });
    });
  
    it('should return status 500 on server error', async () => {
      const req = { body: { startDate: '2023-01-01', endDate: '2023-01-07' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      activityModel.getActivities.mockRejectedValue(new Error('Server error'));
  
      await activityController.getActivities(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        msg: "Internal server error."
      });
    });
  });
  
  describe('activityController.getActivitiesByUserId', () => {
    it('should get activities by user ID successfully', async () => {
      const req = { user: { id: '1' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      activityModel.getActivitiesByUserId.mockResolvedValue([
        // Mock activities data
      ]);
  
      await activityController.getActivitiesByUserId(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        msg: "Get activities by user id successfully.",
        data: {
          activities: expect.any(Array)
        }
      });
    });
  
    it('should return status 500 on server error', async () => {
      const req = { user: { id: '1' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      activityModel.getActivitiesByUserId.mockRejectedValue(new Error('Server error'));
  
      await activityController.getActivitiesByUserId(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        msg: "Internal server error."
      });
    });
  });
  
  describe('activityController.getActivitiesBySportAndDate', () => {
    it('should get activities by sport and date successfully', async () => {
      const req = { params: { sport: 'BASKETBALL', date: '2023-01-01' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      activityModel.getActivitiesBySportAndDate.mockResolvedValue([
        // Mock activities data
      ]);
  
      await activityController.getActivitiesBySportAndDate(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        msg: "Get activities by sport and date successfully.",
        data: {
          sport: 'BASKETBALL',
          activities: expect.any(Array)
        }
      });
    });
  
    it('should return status 500 on server error', async () => {
      const req = { params: { sport: 'BASKETBALL', date: '2023-01-01' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      activityModel.getActivitiesBySportAndDate.mockRejectedValue(new Error('Server error'));
  
      await activityController.getActivitiesBySportAndDate(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        msg: "Internal server error."
      });
    });
  });

  describe('activityController.deleteActivityById', () => {
    it('should delete an activity successfully', async () => {
      const req = { params: { id: '1' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      activityModel.deleteActivityById.mockResolvedValue({ /* Mock deleted activity record */ });
  
      await activityController.deleteActivityById(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        msg: "Activity deleted successfully.",
        data: {
          activityRecord: expect.any(Object)
        }
      });
    });
  
    it('should return status 500 on server error', async () => {
      const req = { params: { id: '1' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      activityModel.deleteActivityById.mockRejectedValue(new Error('Server error'));
  
      await activityController.deleteActivityById(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        msg: "Internal server error."
      });
    });
  });
  
  describe('activityController.joinActivity', () => {
    it('should join an activity successfully', async () => {
      const req = { user: { id: '1' }, params: { bookingId: '1' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      activityModel.joinActivity.mockResolvedValue({ /* Mock activity record */ });
  
      await activityController.joinActivity(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        msg: "Activity joined successfully.",
        data: {
          activityRecord: expect.any(Object)
        }
      });
    });
  
    it('should return status 500 on server error', async () => {
      const req = { user: { id: '1' }, params: { bookingId: '1' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      activityModel.joinActivity.mockRejectedValue(new Error('Server error'));
  
      await activityController.joinActivity(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        msg: "Failed to join activity."
      });
    });
  });
  
  describe('activityController.leaveActivity', () => {
    it('should leave an activity successfully', async () => {
      const req = { user: { id: '1' }, params: { bookingId: '1' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      activityModel.leaveActivity.mockResolvedValue({ /* Mock activity record */ });
  
      await activityController.leaveActivity(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        msg: "Activity left successfully.",
        data: {
          activityRecord: expect.any(Object)
        }
      });
    });
  
    it('should return status 500 on server error', async () => {
      const req = { user: { id: '1' }, params: { bookingId: '1' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      activityModel.leaveActivity.mockRejectedValue(new Error('Server error'));
  
      await activityController.leaveActivity(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        msg: "Internal server error."
      });
    });
  });
  