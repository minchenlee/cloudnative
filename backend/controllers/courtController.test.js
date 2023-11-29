import courtController from './courtController';
import {defaultCourtModel as courtModel } from '../models/courtModel';
import { Prisma} from '@prisma/client';
import { mockDeep, mockReset } from 'jest-mock-extended';


// Mock the courtModel
jest.mock('../models/courtModel');

// In JavaScript, we can't specify types like in TypeScript, so just call mockDeep() without <Prisma.PrismaClient>
const prismaMock = mockDeep();

beforeEach(() => {
  mockReset(prismaMock);
});

describe('courtController.createCourt', () => {
  it('should create a court successfully', async () => {
    // Arrange
    const req = { body: { status: 'OPEN', stadiumId: 1 } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    courtModel.createCourt.mockResolvedValue({ id: 1, status: 'OPEN', stadiumId: 1 });

    // Act
    await courtController.createCourt(req, res);
    
    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      msg: "Court created successfully.",
      data: expect.objectContaining({
        court: expect.objectContaining({ id: 1, status: 'OPEN', stadiumId: 1 })
      })
    }));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return status 400 for invalid status', async () => {
    // Arrange
    const req = { body: { status: 'INVALID_STATUS', stadiumId: 1 } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    // Act
    await courtController.createCourt(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ msg: "Invalid status." });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return status 500 on server error', async () => {
    // Arrange
    const req = { body: { status: 'OPEN', stadiumId: 1 } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const errorMessage = 'Server error occurred.';
    courtModel.createCourt.mockRejectedValue(new Error(errorMessage));

    // Act
    await courtController.createCourt(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ msg: errorMessage });
  });

});

describe('courtController.getAllCourts', () => {
    it('should return status 200 and all courts successfully', async () => {
      // Arrange
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const mockCourts = [{ id: 1, status: 'OPEN', stadiumId: 1 },{ id: 2, status: 'OPEN', stadiumId: 1 }];
      courtModel.getAllCourts.mockResolvedValue(mockCourts);
  
      // Act
      await courtController.getAllCourts(req, res);
  
      // Assert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        msg: "All courts retrieved successfully.",
        data: { courts: mockCourts }
      });
    });
    afterEach(() => {
        jest.resetAllMocks();
    });
      it('should return status 500 on server error', async () => {
        // Arrange
        const req = {};
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
        };
        const errorMessage = 'Server error occurred.';
        courtModel.getAllCourts.mockRejectedValue(new Error(errorMessage));
    
        // Act
        await courtController.getAllCourts(req, res);
    
        // Assert
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ msg: errorMessage });
      });
  });
  
  describe('courtController.getCourtById', () => {
    it('should return status 200 and the requested court', async () => {
      // Arrange
      const req = { params: { id: '1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const mockCourt = { id: 1, status: 'OPEN', stadiumId: 1 };
      courtModel.getCourtById.mockResolvedValue(mockCourt);
  
      // Act
      await courtController.getCourtById(req, res);
  
      // Assert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        msg: "Court retrieved successfully.",
        data: { court: mockCourt }
      });
    });
    afterEach(() => {
        jest.resetAllMocks();
    });
    it('should return status 404 when court is not found', async () => {
        // Arrange
        const req = { params: { id: '999' } }; // Assuming 999 is an ID that does not exist
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
        };
        courtModel.getCourtById.mockResolvedValue(null);
    
        // Act
        await courtController.getCourtById(req, res);
    
        // Assert
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ msg: "Court not found." });
      });
    afterEach(() => {
        jest.resetAllMocks();
    });
    it('should return status 500 on server error', async () => {
        // Arrange
        const req = { params: { id: '1' } };
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn()
        };
        const errorMessage = 'Server error occurred.';
        courtModel.getCourtById.mockRejectedValue(new Error(errorMessage));
    
        // Act
        await courtController.getCourtById(req, res);
    
        // Assert
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ msg: errorMessage });
      });
    // ... other tests ...
  });

  describe('courtController.updateCourtById', () => {
    // Test for 200 OK
    it('should return status 200 for a successful update', async () => {
      const req = { params: { id: '1' }, body: { status: 'OPEN' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const mockCourt = { id: 1, status: 'OPEN' };
      courtModel.updateCourtById.mockResolvedValue(mockCourt);
  
      await courtController.updateCourtById(req, res);
  
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        msg: "Court updated successfully.",
        data: { court: mockCourt }
      });
    });
  
    // Test for 400 Bad Request
    it('should return status 400 for invalid status', async () => {
      const req = { params: { id: '1' }, body: { status: 'INVALID' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  
      await courtController.updateCourtById(req, res);
  
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ msg: "Invalid status." });
    });
  
    // Test for 404 Not Found
    it('should return status 404 when court is not found', async () => {
      const req = { params: { id: '999' }, body: { status: 'OPEN' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const prismaError = new Prisma.PrismaClientKnownRequestError('Court not found'  , 'prisma-client');
      prismaError.code = 'P2025';
      courtModel.updateCourtById.mockRejectedValue(prismaError);
  
      await courtController.updateCourtById(req, res);
  
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ msg: "Court not found." });
    });
  
    // Test for 500 Internal Server Error
    it('should return status 500 on server error', async () => {
      const req = { params: { id: '1' }, body: { status: 'OPEN' } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      courtModel.updateCourtById.mockRejectedValue(new Error('Server error'));
  
      await courtController.updateCourtById(req, res);
  
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ msg: "Server error occurred." });
    });
  });


  
  