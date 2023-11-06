import axios from 'axios';
import { API_BASE_URL } from '../constants/apiConstants';

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Read
export async function fetchData(path) {
  try {
    const response = await instance.get(path);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

// Create
export async function createData(path, data) {
  try {
    const response = await instance.post(path, data);
    return response.data;
  } catch (error) {
    console.error('Error creating data:', error);
    throw error;
  }
}

// Update
export async function updateData(path, data) {
  try {
    const response = await instance.put(path, data);
    return response.data;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
}

// Delete
export async function deleteData(path) {
  try {
    await instance.delete(path);
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
}
