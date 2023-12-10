import userController from './userController';
import { userModel } from '../models/userModel';

jest.mock('../models/userModel');

describe('userController.createUser', () => {
    it('should create a user successfully', async () => {
      // Arrange
      const req = {
        body: {
          email: 'test@example.com',
          password: 'password123',
          username: 'testuser',
          role: 'user',
          tel: '1234567890'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      userModel.getUserByEmail.mockResolvedValue(null);
      userModel.createUser.mockResolvedValue({ /* Mock user data */ });
  
      // Act
      await userController.createUser(req, res);
      
      // Assert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "User created successfully",
        data: {
          user: expect.any(Object),
          token: expect.any(String)
        }
      });
    });
  
    it('should return status 400 for missing required fields', async () => {
        const req = { body: { email: 'test@example.com', password: '' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await userController.createUser(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Please fill in required fields" });
      });
    
      it('should return status 400 for invalid email format', async () => {
        const req = { body: { email: 'invalidEmail', password: 'password123', role: 'user' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await userController.createUser(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Invalid email format" });
      });
    
      it('should return status 400 for invalid phone number format', async () => {
        const req = { body: { email: 'test@example.com', password: 'password123', role: 'user', tel: 'invalidTel' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await userController.createUser(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Invalid phone number format" });
      });
    
      it('should return status 409 for existing user', async () => {
        userModel.getUserByEmail.mockResolvedValue({ /* Mock existing user data */ });
        const req = { body: { email: 'existing@example.com', password: 'password123', role: 'user', tel: '1234567890' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await userController.createUser(req, res);
        expect(res.status).toHaveBeenCalledWith(409);
        expect(res.json).toHaveBeenCalledWith({ message: "User already exists" });
      });
    
      it('should return status 500 on server error', async () => {
        userModel.getUserByEmail.mockRejectedValue(new Error('Server error'));
        const req = { body: { email: 'test@example.com', password: 'password123', role: 'user', tel: '1234567890' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await userController.createUser(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: Error('Server error') });
      });
  });
  
  describe('userController.getUserById', () => {
    it('should return a user by ID successfully', async () => {
      // Arrange
      const req = { params: { id: '1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      userModel.getUserById.mockResolvedValue({
        // Mock user data
      });
  
      // Act
      await userController.getUserById(req, res);
  
      // Assert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "User retrieved successfully",
        data: {
          user: expect.any(Object)
        }
      });
    });
  
    it('should return status 404 when user is not found', async () => {
      // Arrange
      const req = { params: { id: '2' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      userModel.getUserById.mockResolvedValue(null);
  
      // Act
      await userController.getUserById(req, res);
  
      // Assert
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: "User not found" });
    });
  
    it('should return status 500 on server error', async () => {
      // Arrange
      const req = { params: { id: '1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      userModel.getUserById.mockRejectedValue(new Error('Server error'));
  
      // Act
      await userController.getUserById(req, res);
  
      // Assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: Error('Server error') });
    });
  });
  
  describe('userController.updateUser', () => {
    it('should update a user successfully', async () => {
      // Arrange
      const req = {
        params: { id: '1' },
        body: {
          username: 'updatedUser',
          password: 'newPassword',
          tel: '1234567890',
          role: 'user'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      userModel.updateUser.mockResolvedValue({
        // Mock updated user data
      });
  
      // Act
      await userController.updateUser(req, res);
  
      // Assert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "User updated successfully",
        data: {
          user: expect.any(Object)
        }
      });
    });
  
    it('should return status 400 for invalid phone number format', async () => {
        const req = {
          params: { id: '1' },
          body: {
            username: 'updatedUser',
            password: 'newPassword',
            tel: 'invalidTel',
            role: 'user'
          }
        };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await userController.updateUser(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Invalid phone number format" });
      });
    
      it('should return status 500 on server error', async () => {
        userModel.updateUser.mockRejectedValue(new Error('Server error'));
        const req = {
          params: { id: '1' },
          body: {
            username: 'updatedUser',
            password: 'newPassword',
            tel: '1234567890',
            role: 'user'
          }
        };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await userController.updateUser(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: Error('Server error') });
      });
  });
  
  describe('userController.deleteUser', () => {
    it('should delete a user successfully', async () => {
      // Arrange
      const req = { params: { id: '1' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      userModel.deleteUser.mockResolvedValue({
        // Mock deleted user data
      });
  
      // Act
      await userController.deleteUser(req, res);
  
      // Assert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "User deleted successfully",
        data: {
          user: expect.any(Object)
        }
      });
    });
  
    it('should return status 500 on server error', async () => {
        userModel.deleteUser.mockRejectedValue(new Error('Server error'));
        const req = { params: { id: '1' } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await userController.deleteUser(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: Error('Server error') });
      });
  });
  
  describe('userController.userLogin', () => {
    it('should log in a user successfully', async () => {
      // Arrange
      const req = {
        body: {
          email: 'test@example.com',
          password: 'password123'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      userModel.userLogin.mockResolvedValue({
        // Mock user data
      });
  
      // Act
      await userController.userLogin(req, res);
  
      // Assert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "User logged in successfully",
        data: {
          user: expect.any(Object),
          token: expect.any(String)
        }
      });
    });
  
    it('should return status 400 for invalid credentials', async () => {
      // Arrange
      const req = {
        body: {
          email: 'wrong@example.com',
          password: 'wrongPassword'
        }
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      userModel.userLogin.mockResolvedValue(null);
  
      // Act
      await userController.userLogin(req, res);
  
      // Assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Invalid credentials" });
    });
  
    it('should return status 500 on server error', async () => {
        userModel.userLogin.mockRejectedValue(new Error('Server error'));
        const req = {
          body: {
            email: 'test@example.com',
            password: 'password123'
          }
        };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        await userController.userLogin(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ message: Error('Server error') });
      });
  });
  