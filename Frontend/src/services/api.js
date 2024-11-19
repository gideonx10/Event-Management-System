import axios from 'axios';

// Base URL for the backend API
const API = axios.create({
  baseURL: 'http://localhost:1252',
});

export const fetchEvents = async () => {
  try {
    const response = await API.get('/events');
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};
