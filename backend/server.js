// VitalApp Backend Server
// Node.js + Express server with PostgreSQL database
const express = require('express');
const cors = require('cors');
const pool = require('./db');
const { initializeDatabase } = require('./initDB');
const fs = require('fs');
const https = require('https');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: '*' })); // Permitir CORS desde cualquier origen
app.use(express.json()); // Parse JSON request bodies

// Initialize database on server start
initializeDatabase().catch(console.error);

// ============================================
// APPOINTMENTS ENDPOINTS
// ============================================

/**
 * GET /appointments - Get all appointments
 * Returns a list of all medical appointments
 */
app.get('/appointments', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM appointments ORDER BY date, time'
    );
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching appointments',
      error: error.message
    });
  }
});

/**
 * POST /appointments - Create a new appointment
 * Body: { patient_name, doctor_name, date, time, reason }
 */
app.post('/appointments', async (req, res) => {
  try {
    const { patient_name, doctor_name, date, time, reason } = req.body;
    
    // Validate required fields
    if (!patient_name || !doctor_name || !date || !time) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    const result = await pool.query(
      'INSERT INTO appointments (patient_name, doctor_name, date, time, reason) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [patient_name, doctor_name, date, time, reason]
    );

    res.status(201).json({
      success: true,
      message: 'Appointment created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating appointment',
      error: error.message
    });
  }
});

/**
 * DELETE /appointments/:id - Delete an appointment by ID
 */
app.delete('/appointments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM appointments WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    res.json({
      success: true,
      message: 'Appointment deleted successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting appointment',
      error: error.message
    });
  }
});

// ============================================
// RESULTS ENDPOINTS
// ============================================

/**
 * GET /results - Get all medical results
 * Returns a list of all medical test results
 */
app.get('/results', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM results ORDER BY result_date DESC'
    );
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching results',
      error: error.message
    });
  }
});

/**
 * POST /results - Create a new medical result
 * Body: { patient_name, test_type, result_date, result_value, notes }
 */
app.post('/results', async (req, res) => {
  try {
    const { patient_name, test_type, result_date, result_value, notes } = req.body;
    
    // Validate required fields
    if (!patient_name || !test_type || !result_date || !result_value) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    const result = await pool.query(
      'INSERT INTO results (patient_name, test_type, result_date, result_value, notes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [patient_name, test_type, result_date, result_value, notes]
    );

    res.status(201).json({
      success: true,
      message: 'Result created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating result:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating result',
      error: error.message
    });
  }
});

// ============================================
// NOTIFICATIONS ENDPOINTS
// ============================================

/**
 * GET /notifications - Get all notifications
 * Returns a list of all notifications
 */
app.get('/notifications', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM notifications ORDER BY created_at DESC'
    );
    res.json({
      success: true,
      data: result.rows
    });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching notifications',
      error: error.message
    });
  }
});

/**
 * POST /notifications - Create a new notification
 * Body: { title, message, type }
 */
app.post('/notifications', async (req, res) => {
  try {
    const { title, message, type } = req.body;
    
    // Validate required fields
    if (!title || !message) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    const result = await pool.query(
      'INSERT INTO notifications (title, message, type) VALUES ($1, $2, $3) RETURNING *',
      [title, message, type || 'info']
    );

    res.status(201).json({
      success: true,
      message: 'Notification created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating notification:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating notification',
      error: error.message
    });
  }
});

/**
 * PATCH /notifications/:id - Mark notification as read
 */
app.patch('/notifications/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'UPDATE notifications SET read = TRUE WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    res.json({
      success: true,
      message: 'Notification marked as read',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating notification:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating notification',
      error: error.message
    });
  }
});

/**
 * DELETE /notifications/:id - Delete a notification by ID
 */
app.delete('/notifications/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM notifications WHERE id = $1 RETURNING *',
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Notification not found'
      });
    }

    res.json({
      success: true,
      message: 'Notification deleted successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error deleting notification:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting notification',
      error: error.message
    });
  }
});

// ============================================
// HEALTH CHECK ENDPOINT
// ============================================

/**
 * GET / - Health check endpoint
 */
app.get('/', (req, res) => {
  res.json({
    message: 'VitalApp API is running',
    version: '1.0.0',
    endpoints: {
      appointments: '/appointments',
      results: '/results',
      notifications: '/notifications'
    }
  });
});

// Start server (HTTPS si hay certificados, si no HTTP)
const sslKeyPath = path.join(__dirname, 'ssl', 'server.key');
const sslCertPath = path.join(__dirname, 'ssl', 'server.crt');

if (fs.existsSync(sslKeyPath) && fs.existsSync(sslCertPath)) {
  const options = {
    key: fs.readFileSync(sslKeyPath),
    cert: fs.readFileSync(sslCertPath)
  };
  https.createServer(options, app).listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 VitalApp Backend Server running with HTTPS on port ${PORT}`);
    console.log(`📊 Endpoints available:`);
    console.log(`   - GET/POST/DELETE /appointments`);
    console.log(`   - GET/POST /results`);
    console.log(`   - GET/POST/PATCH/DELETE /notifications`);
  });
} else {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 VitalApp Backend Server running on http://0.0.0.0:${PORT}`);
    console.log(`📊 Endpoints available:`);
    console.log(`   - GET/POST/DELETE /appointments`);
    console.log(`   - GET/POST /results`);
    console.log(`   - GET/POST/PATCH/DELETE /notifications`);
    console.log('⚠️  Certificados SSL no encontrados, corriendo en HTTP');
  });
}

module.exports = app;
