// Database initialization script - Creates tables if they don't exist
const pool = require('./db');

/**
 * Initialize database tables for VitalApp
 * Creates appointments, results, and notifications tables
 */
const initializeDatabase = async () => {
  try {
    // Create appointments table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS appointments (
        id SERIAL PRIMARY KEY,
        patient_name VARCHAR(100) NOT NULL,
        doctor_name VARCHAR(100) NOT NULL,
        date DATE NOT NULL,
        time TIME NOT NULL,
        reason TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Appointments table ready');

    // Create medical results table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS results (
        id SERIAL PRIMARY KEY,
        patient_name VARCHAR(100) NOT NULL,
        test_type VARCHAR(100) NOT NULL,
        result_date DATE NOT NULL,
        result_value TEXT NOT NULL,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Results table ready');

    // Create notifications table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS notifications (
        id SERIAL PRIMARY KEY,
        title VARCHAR(200) NOT NULL,
        message TEXT NOT NULL,
        type VARCHAR(50) DEFAULT 'info',
        read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Notifications table ready');

    // Insert sample data for demonstration
    await insertSampleData();

    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing database:', error.message);
    throw error;
  }
};

/**
 * Insert sample data for demonstration purposes
 */
const insertSampleData = async () => {
  try {
    // Check if data already exists
    const appointmentCount = await pool.query('SELECT COUNT(*) FROM appointments');
    
    if (appointmentCount.rows[0].count === '0') {
      // Insert sample appointments
      await pool.query(`
        INSERT INTO appointments (patient_name, doctor_name, date, time, reason)
        VALUES 
          ('Juan Pérez', 'Dra. María García', '2024-01-15', '10:00', 'Consulta general'),
          ('Ana López', 'Dr. Carlos Ruiz', '2024-01-16', '14:30', 'Control de presión'),
          ('Pedro Martínez', 'Dra. Laura Sánchez', '2024-01-17', '09:00', 'Examen de sangre')
      `);

      // Insert sample results
      await pool.query(`
        INSERT INTO results (patient_name, test_type, result_date, result_value, notes)
        VALUES 
          ('Juan Pérez', 'Análisis de Sangre', '2024-01-10', 'Normal', 'Todos los valores dentro del rango'),
          ('Ana López', 'Presión Arterial', '2024-01-08', '120/80 mmHg', 'Presión normal'),
          ('Pedro Martínez', 'Colesterol', '2024-01-05', '190 mg/dL', 'Ligeramente elevado')
      `);

      // Insert sample notifications
      await pool.query(`
        INSERT INTO notifications (title, message, type)
        VALUES 
          ('Recordatorio de Cita', 'Tiene una cita mañana a las 10:00 AM', 'reminder'),
          ('Resultados Disponibles', 'Sus resultados de análisis de sangre están listos', 'info'),
          ('Confirmar Cita', 'Por favor confirme su cita del 17 de enero', 'alert')
      `);

      console.log('✅ Sample data inserted');
    }
  } catch (error) {
    console.error('❌ Error inserting sample data:', error.message);
  }
};

module.exports = { initializeDatabase };
