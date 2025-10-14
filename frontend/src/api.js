// API Service - Handles all HTTP requests to the backend
import axios from 'axios';

// Base URL for API requests - change this in production
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ============================================
// APPOINTMENTS API
// ============================================

/**
 * Get all appointments
 */
export const getAppointments = async () => {
  try {
    const response = await api.get('/appointments');
    return response.data;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    throw error;
  }
};

/**
 * Create a new appointment
 * @param {Object} appointmentData - Appointment details
 */
export const createAppointment = async (appointmentData) => {
  try {
    const response = await api.post('/appointments', appointmentData);
    return response.data;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
};

/**
 * Delete an appointment
 * @param {number} id - Appointment ID
 */
export const deleteAppointment = async (id) => {
  try {
    const response = await api.delete(`/appointments/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting appointment:', error);
    throw error;
  }
};

// ============================================
// RESULTS API
// ============================================

/**
 * Get all medical results
 */
export const getResults = async () => {
  try {
    const response = await api.get('/results');
    return response.data;
  } catch (error) {
    console.error('Error fetching results:', error);
    throw error;
  }
};

/**
 * Create a new medical result
 * @param {Object} resultData - Result details
 */
export const createResult = async (resultData) => {
  try {
    const response = await api.post('/results', resultData);
    return response.data;
  } catch (error) {
    console.error('Error creating result:', error);
    throw error;
  }
};

// ============================================
// NOTIFICATIONS API
// ============================================

/**
 * Get all notifications
 */
export const getNotifications = async () => {
  try {
    const response = await api.get('/notifications');
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

/**
 * Create a new notification
 * @param {Object} notificationData - Notification details
 */
export const createNotification = async (notificationData) => {
  try {
    const response = await api.post('/notifications', notificationData);
    return response.data;
  } catch (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
};

/**
 * Mark notification as read
 * @param {number} id - Notification ID
 */
export const markNotificationAsRead = async (id) => {
  try {
    const response = await api.patch(`/notifications/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error marking notification as read:', error);
    throw error;
  }
};

/**
 * Delete a notification
 * @param {number} id - Notification ID
 */
export const deleteNotification = async (id) => {
  try {
    const response = await api.delete(`/notifications/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting notification:', error);
    throw error;
  }
};

export default api;
