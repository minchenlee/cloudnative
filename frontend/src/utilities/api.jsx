import axios from 'axios';

// Set up your base URL for the API
// const API_BASE_URL = 'http://cnad-alb-419290695.ap-northeast-1.elb.amazonaws.com/api/v1';
const API_BASE_URL = 'https://stadium4u.online/api/v1/';
// const API_BASE_URL = 'http://localhost:3000/api/v1';
// const API_BASE_URL = 'http://localhost:5000/api/v1';

// Function to handle GET requests
export const fetchData = async (endpoint) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    // Handle error
    console.error('Error fetching data:', error);
    return error.response
  }
}


// Function to handle POST requests with specific content type
export const postData = async (endpoint, data, contentType = 'application/json') => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data, {
      headers: {
        'Content-Type': contentType
      }
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error('Error posting data:', error);
    return error.response
  }
};

// Function to handle PUT requests with specific content type
export const putData = async (endpoint, data, contentType = 'application/json') => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${endpoint}`, data, {
      headers: {
        'Content-Type': contentType
      }
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error('Error putting data:', error);
    return error.response
  }
};

// Function to handle Delete requests with specific content type
export const deleteData = async (endpoint, contentType = 'application/json') => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${endpoint}`, {
      headers: {
        'Content-Type': contentType
      }
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error('Error deleting data:', error);
    return error.response
  }
};


//Authenticated requests
export const fetchAuthData = async (endpoint, token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error('Error fetching data:', error);
    return error.response
  }
}

export const postAuthData = async (endpoint, data, token, contentType = 'application/json') => {
  try {
    const response = await axios.post(`${API_BASE_URL}/${endpoint}`, data, {
      headers: {
        'Content-Type': contentType,
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error('Error posting data:', error);
    return error.response
  }
};

export const putAuthData = async (endpoint, data, token, contentType = 'application/json') => {
  // console.log(data);
  try {
    const response = await axios.put(`${API_BASE_URL}/${endpoint}`, data, {
      headers: {
        'Content-Type': contentType,
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error('Error putting data:', error);
    return error.response
  }
};

// deleteAuthData should not have data
export const deleteAuthData = async (endpoint, token) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${endpoint}`, {
      data: {},
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    // Handle error
    console.error('Error deleting data:', error);
    return error.response
  }
};

