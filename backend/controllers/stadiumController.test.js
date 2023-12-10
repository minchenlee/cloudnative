import stadiumController from './stadiumController';
import { stadiumModel } from '../models/stadiumModel';

jest.mock('../models/stadiumModel');

describe('stadiumController.createStadium', () => {
  it('should create a stadium successfully', async () => {
    // Arrange
    const req = {
      body: {
        name: 'Stadium Name',
        sport: 'BASKETBALL',
        status: 'OPEN',
        longitude: 100,
        latitude: 0,
        description: 'A great stadium',
        img_url: 'http://example.com/image.jpg',
        address: '123 Main St',
        tel: '123-456-7890',
        createdById: 1
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    stadiumModel.createStadium.mockResolvedValue({
      // Mock response data
    });

    // Act
    await stadiumController.createStadium(req, res);
    
    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      msg: "Stadium created successfully.",
      data: {
        "stadium": {}
      }
    });
  });
  // 測試無效的運動種類
it('should return status 400 for invalid sport', async () => {
    // Arrange
    const req = {
      body: {
        name: 'Stadium Name',
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
    await stadiumController.createStadium(req, res);
  
    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ msg: "Sport not found." });
  });
  
  // 測試無效的狀態
  it('should return status 400 for invalid status', async () => {
    // Arrange
    const req = {
      body: {
        name: 'Stadium Name',
        sport: 'BASKETBALL',
        status: 'INVALID_STATUS',
        // ...其他數據
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  
    // Act
    await stadiumController.createStadium(req, res);
  
    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ msg: "Status not found." });
  });
  
  // 測試伺服器錯誤
  it('should return status 500 on server error', async () => {
    // Arrange
    const req = {
      body: {
        name: 'Stadium Name',
        sport: 'BASKETBALL',
        status: 'OPEN',
        // ...其他數據
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    stadiumModel.createStadium.mockRejectedValue(new Error('Server error'));
  
    // Act
    await stadiumController.createStadium(req, res);
  
    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ msg: "Server error occurred." });
  });
  // Additional tests for invalid sport, invalid status, and server error...
});

describe('stadiumController.getAllStadiums', () => {
    it('should return all stadiums successfully', async () => {
      // Arrange
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      stadiumModel.getAllStadiums.mockResolvedValue([
        // Mock response data
      ]);
  
      // Act
      await stadiumController.getAllStadiums(req, res);
  
      // Assert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        msg: "Get all stadiums successfully.",
        data: {
          "stadiums": [
            // Expected data
          ]
        }
      });
    });
  
    it('should return status 500 on server error', async () => {
      // Arrange
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      stadiumModel.getAllStadiums.mockRejectedValue(new Error('Server error'));
  
      // Act
      await stadiumController.getAllStadiums(req, res);
  
      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ msg: "Server error occurred." });
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
  
    it('should return status 500 on server error', async () => {
      // Arrange
      const req = { params: { id: '1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      stadiumModel.getStadiumById.mockRejectedValue(new Error('Server error'));
  
      // Act
      await stadiumController.getStadiumById(req, res);
  
      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ msg: "Server error occurred." });
    });
  });
  
  describe('stadiumController.updateStadiumById', () => {
    it('should update a stadium by ID successfully', async () => {
      // Arrange
      const req = {
        params: { id: '1' },
        body: {
          // Updated data
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
  
  // 測試無效的狀態
  it('should return status 400 for invalid status', async () => {
    // Arrange
    const req = {
      params: { id: '1' },
      body: {
        sport: 'BASKETBALL',
        status: 'INVALID_STATUS',
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
    expect(res.json).toHaveBeenCalledWith({ msg: "Status not found." });
  });
  
  // 測試場館不存在
  it('should return status 404 when stadium not found', async () => {
    // Arrange
    const req = {
      params: { id: '999' }, // 假設這個ID不存在
      body: {
        sport: 'BASKETBALL',
        status: 'OPEN',
        // ...其他數據
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    stadiumModel.updateStadiumById.mockResolvedValue(null);
  
    // Act
    await stadiumController.updateStadiumById(req, res);
  
    // Assert
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ msg: "Stadium not found." });
  });
  
  // 測試伺服器錯誤
  it('should return status 500 on server error', async () => {
    // Arrange
    const req = {
      params: { id: '1' },
      body: {
        sport: 'BASKETBALL',
        status: 'OPEN',
        // ...其他數據
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    stadiumModel.updateStadiumById.mockRejectedValue(new Error('Server error'));
  
    // Act
    await stadiumController.updateStadiumById(req, res);
  
    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ msg: "Server error occurred." });
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
  
    it('should return status 500 on server error', async () => {
      // Arrange
      const req = { params: { id: '1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      stadiumModel.deleteStadiumById.mockRejectedValue(new Error('Server error'));
  
      // Act
      await stadiumController.deleteStadiumById(req, res);
  
      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ msg: "Server error occurred." });
    });
  });
  