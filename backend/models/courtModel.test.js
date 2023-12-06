import { courtModel } from './courtModel';
import { PrismaClient } from '@prisma/client';

const mockPrisma = new PrismaClient(); // 已被模拟
const testCourtModel = courtModel(mockPrisma);


jest.mock('@prisma/client', () => {
    const mCourt = {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    };
  
    return {
      PrismaClient: jest.fn().mockImplementation(() => {
        return { court: mCourt };
      }),
    };
  });

describe('createCourt', () => {
    it('should create a new court and return it', async () => {
        const mockCourt = { id: 1, status: 'OPEN', stadiumId: 5 };

        // 設置模擬方法的返回值
        mockPrisma.court.create.mockResolvedValue(mockCourt);
        const result = await testCourtModel.createCourt("OPEN", 5);
        expect(result).toEqual({ id: 1, status: 'OPEN', stadiumId: 5 });
      });
      
  afterEach(() => {
    jest.resetAllMocks();
  });
});
describe('getAllCourts', () => {
    it('should return all courts', async () => {
        const mockCourts = [
            { id: 1, status: 'OPEN', stadiumId: 5 },
            { id: 2, status: 'CLOSED', stadiumId: 4 }
        ];

        mockPrisma.court.findMany.mockResolvedValue(mockCourts);

        const result = await testCourtModel.getAllCourts();
        expect(result).toEqual(mockCourts);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });
});

describe('getCourtById', () => {
    it('should return a court by its ID', async () => {
        const mockCourt = { id: 1, status: 'OPEN', stadiumId: 5 };
        
        mockPrisma.court.findUnique.mockResolvedValue(mockCourt);

        const result = await testCourtModel.getCourtById(1);
        expect(result).toEqual(mockCourt);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });
});
describe('updateCourtById', () => {
    it('should update a court by its ID', async () => {
        const updatedCourt = { id: 1, status: 'CLOSED', stadiumId: 5 };

        mockPrisma.court.update.mockResolvedValue(updatedCourt);

        const result = await testCourtModel.updateCourtById(1, 'CLOSED');
        expect(result).toEqual(updatedCourt);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });
});
describe('deleteCourtById', () => {
    it('should delete a court by its ID', async () => {
        const deletedCourt = { id: 1, status: 'OPEN', stadiumId: 5 };

        mockPrisma.court.delete.mockResolvedValue(deletedCourt);

        const result = await testCourtModel.deleteCourtById(1);
        expect(result).toEqual(deletedCourt);
    });

    afterEach(() => {
      jest.resetAllMocks();
    });
});

