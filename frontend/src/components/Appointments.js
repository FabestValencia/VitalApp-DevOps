// Appointments Component - Manage medical appointments
import React, { useState, useEffect } from 'react';
import { getAppointments, createAppointment, deleteAppointment } from '../api';

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  
  // Lista de doctores disponibles
  const DOCTORS = [
    'Dra. María García',
    'Dr. Carlos Ruiz',
    'Dra. Laura Sánchez',
    'Dr. Juan Fernández',
    'Dra. Ana Torres'
  ];

  // Form state
  const [formData, setFormData] = useState({
    patient_name: '',
    doctor_name: DOCTORS[0],
    date: '',
    time: '',
    reason: ''
  });

  // Load appointments on component mount
  useEffect(() => {
    loadAppointments();
  }, []);

  /**
   * Fetch all appointments from API
   */
  const loadAppointments = async () => {
    try {
      setLoading(true);
      const response = await getAppointments();
      setAppointments(response.data || []);
      setError(null);
    } catch (err) {
      setError('Error al cargar las citas. Verifica que el servidor esté ejecutándose.');
      console.error('Error loading appointments:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle form input changes
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Handle form submission to create new appointment
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAppointment(formData);
      // Reset form and reload appointments
      setFormData({
        patient_name: '',
        doctor_name: '',
        date: '',
        time: '',
        reason: ''
      });
      setShowForm(false);
      loadAppointments();
    } catch (err) {
      alert('Error al crear la cita. Por favor, intenta de nuevo.');
      console.error('Error creating appointment:', err);
    }
  };

  /**
   * Handle appointment deletion
   */
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta cita?')) {
      try {
        await deleteAppointment(id);
        loadAppointments();
      } catch (err) {
        alert('Error al eliminar la cita. Por favor, intenta de nuevo.');
        console.error('Error deleting appointment:', err);
      }
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Cargando citas...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Citas Médicas</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
        >
          {showForm ? 'Cancelar' : '+ Nueva Cita'}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Create Appointment Form */}
      {showForm && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Nueva Cita</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del Paciente *
                </label>
                <input
                  type="text"
                  name="patient_name"
                  value={formData.patient_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Juan Pérez"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre del Doctor *
                </label>
                <select
                  name="doctor_name"
                  value={formData.doctor_name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {DOCTORS.map((doctor) => (
                    <option key={doctor} value={doctor}>{doctor}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hora *
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Motivo de la Consulta
              </label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Descripción del motivo de la consulta"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
              >
                Guardar Cita
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Appointments List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {appointments.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            No hay citas programadas. Crea una nueva cita para comenzar.
          </div>
        ) : (
          appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white shadow-md rounded-lg p-5 hover:shadow-lg transition duration-200"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">
                    {appointment.patient_name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    👨‍⚕️ {appointment.doctor_name}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(appointment.id)}
                  className="text-red-500 hover:text-red-700 font-semibold"
                  title="Eliminar cita"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <span className="font-medium">📅 Fecha:</span>{' '}
                  {formatDate(appointment.date)}
                </p>
                <p>
                  <span className="font-medium">🕐 Hora:</span>{' '}
                  {appointment.time}
                </p>
                {appointment.reason && (
                  <p>
                    <span className="font-medium">📋 Motivo:</span>{' '}
                    {appointment.reason}
                  </p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Appointments;
