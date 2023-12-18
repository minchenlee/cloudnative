import stadiumController from './stadiumController';
import { stadiumModel } from '../models/stadiumModel';

jest.mock('../models/stadiumModel');

describe('stadiumController.createStadium', () => {
  it('should create a new stadium successfully', async () => {
    const req = {
      body: {
        name: 'Stadium A',
        sport: 'BASKETBALL',
        isIndoor: true,
        time: {
          openTime: '08:00',
          closeTime: '22:00'
        },
        location: {
          address: '123 Main St',
          longitude: 123.456,
          latitude: 78.910
        },
        description: 'A great place for basketball',
        img_url: 'http://example.com/image.jpg',
        contactInfo: {
          tel: '123-456-7890'
        },
        createdById: 1
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  
    stadiumModel.createStadium.mockResolvedValue({
      id: 1,
      ...req.body
    });
  
    await stadiumController.createStadium(req, res);
  
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      msg: 'Stadium created successfully.',
      data: {
        stadium: expect.any(Object)
      }
    });
  });
  
  // 測試無效的運動種類
  it('should fail to create a stadium due to invalid sport type', async () => {
    const req = {
      body: {
        // ...同上，但將sport設為無效值
        sport: 'INVALID_SPORT'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  
    await stadiumController.createStadium(req, res);
  
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      msg: 'Sport not found.'
    });
  });
});

describe('stadiumController.getAllStadiums', () => {
  it('should retrieve all stadiums successfully', async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  
    stadiumModel.getAllStadiums.mockResolvedValue([
      { id: 1, name: 'Stadium A' }, // ...其他場館數據
    ]);
  
    await stadiumController.getAllStadiums(req, res);
  
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      msg: 'Get all stadiums successfully.',
      data: {
        stadiums: expect.any(Array)
      }
    });
  });
});
  
  describe('stadiumController.getStadiumById', () => {
    it('should return a stadium by ID successfully', async () => {
      // Arrange
      const req = { params: { id: '1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      stadiumModel.getStadiumById.mockResolvedValue({
        // Mock response data
      });
  
      // Act
      await stadiumController.getStadiumById(req, res);
  
      // Assert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        msg: "Get stadium by id successfully.",
        data: {
          "stadium": {
            // Expected data
          }
        }
      });
    });
  });
  
  describe('stadiumController.updateStadiumById', () => {
    it('should update a stadium by ID successfully', async () => {
      // Arrange
      const req = {
        params: { id: '1' },
        body: {
          name: 'Stadium A',
          sport: 'BASKETBALL',
          isIndoor: true,
          time: {
            openTime: '08:00',
            closeTime: '22:00'
          },
          location: {
            address: '123 Main St',
            longitude: 123.456,
            latitude: 78.910
          },
          description: 'A great place for basketball',
          img_url: 'http://example.com/image.jpg',
          contactInfo: {
            tel: '123-456-7890'
          },
          createdById: 1
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      stadiumModel.updateStadiumById.mockResolvedValue({
        // Mock response data
      });
  
      // Act
      await stadiumController.updateStadiumById(req, res);
  
      // Assert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        msg: "Update stadium by id successfully.",
        data: {
          "stadium": {
            // Expected data
          }
        }
      });
    });
  
    // 測試無效的運動種類
it('should return status 400 for invalid sport', async () => {
    // Arrange
    const req = {
      params: { id: '1' },
      body: {
        sport: 'INVALID_SPORT',
        status: 'OPEN',
        // ...其他數據
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  
    // Act
    await stadiumController.updateStadiumById(req, res);
  
    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ msg: "Sport not found." });
  });
  
  
  
  });
  
  describe('stadiumController.deleteStadiumById', () => {
    it('should delete a stadium by ID successfully', async () => {
      // Arrange
      const req = { params: { id: '1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      stadiumModel.deleteStadiumById.mockResolvedValue({
        // Mock response data
      });
  
      // Act
      await stadiumController.deleteStadiumById(req, res);
  
      // Assert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        msg: "Delete stadium by id successfully.",
        data: {
          "stadium": {
            // Expected data
          }
        }
      });
    });
  });
  