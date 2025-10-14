-- VitalApp Database Setup Script
-- Run this script to manually set up the database tables
-- Note: The backend will automatically create these tables on first run

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id SERIAL PRIMARY KEY,
  patient_name VARCHAR(100) NOT NULL,
  doctor_name VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  reason TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create medical results table
CREATE TABLE IF NOT EXISTS results (
  id SERIAL PRIMARY KEY,
  patient_name VARCHAR(100) NOT NULL,
  test_type VARCHAR(100) NOT NULL,
  result_date DATE NOT NULL,
  result_value TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  type VARCHAR(50) DEFAULT 'info',
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data into appointments
INSERT INTO appointments (patient_name, doctor_name, date, time, reason)
VALUES 
  ('Juan Pérez', 'Dra. María García', '2024-01-15', '10:00', 'Consulta general'),
  ('Ana López', 'Dr. Carlos Ruiz', '2024-01-16', '14:30', 'Control de presión'),
  ('Pedro Martínez', 'Dra. Laura Sánchez', '2024-01-17', '09:00', 'Examen de sangre');

-- Insert sample data into results
INSERT INTO results (patient_name, test_type, result_date, result_value, notes)
VALUES 
  ('Juan Pérez', 'Análisis de Sangre', '2024-01-10', 'Normal', 'Todos los valores dentro del rango'),
  ('Ana López', 'Presión Arterial', '2024-01-08', '120/80 mmHg', 'Presión normal'),
  ('Pedro Martínez', 'Colesterol', '2024-01-05', '190 mg/dL', 'Ligeramente elevado');

-- Insert sample data into notifications
INSERT INTO notifications (title, message, type)
VALUES 
  ('Recordatorio de Cita', 'Tiene una cita mañana a las 10:00 AM', 'reminder'),
  ('Resultados Disponibles', 'Sus resultados de análisis de sangre están listos', 'info'),
  ('Confirmar Cita', 'Por favor confirme su cita del 17 de enero', 'alert');

-- Display success message
SELECT 'Database tables created successfully!' AS status;
