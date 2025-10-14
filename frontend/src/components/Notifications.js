// Notifications Component - Display and manage notifications
import React, { useState, useEffect } from 'react';
import { getNotifications, markNotificationAsRead, deleteNotification } from '../api';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load notifications on component mount
  useEffect(() => {
    loadNotifications();
  }, []);

  /**
   * Fetch all notifications from API
   */
  const loadNotifications = async () => {
    try {
      setLoading(true);
      const response = await getNotifications();
      setNotifications(response.data || []);
      setError(null);
    } catch (err) {
      setError('Error al cargar las notificaciones. Verifica que el servidor esté ejecutándose.');
      console.error('Error loading notifications:', err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle marking notification as read
   */
  const handleMarkAsRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      loadNotifications();
    } catch (err) {
      alert('Error al marcar la notificación como leída.');
      console.error('Error marking notification as read:', err);
    }
  };

  /**
   * Handle notification deletion
   */
  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta notificación?')) {
      try {
        await deleteNotification(id);
        loadNotifications();
      } catch (err) {
        alert('Error al eliminar la notificación.');
        console.error('Error deleting notification:', err);
      }
    }
  };

  /**
   * Get icon based on notification type
   */
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'reminder':
        return '⏰';
      case 'alert':
        return '⚠️';
      case 'info':
      default:
        return 'ℹ️';
    }
  };

  /**
   * Get color classes based on notification type
   */
  const getNotificationColor = (type) => {
    switch (type) {
      case 'reminder':
        return 'bg-yellow-50 border-yellow-200';
      case 'alert':
        return 'bg-red-50 border-red-200';
      case 'info':
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Cargando notificaciones...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Notificaciones</h2>
        <button
          onClick={loadNotifications}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition duration-200"
        >
          🔄 Actualizar
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No hay notificaciones nuevas.
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`${getNotificationColor(notification.type)} border rounded-lg p-4 hover:shadow-md transition duration-200 ${
                notification.read ? 'opacity-60' : ''
              }`}
            >
              <div className="flex items-start">
                <div className="text-2xl mr-3 flex-shrink-0">
                  {getNotificationIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {notification.title}
                    </h3>
                    {!notification.read && (
                      <span className="inline-block bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded-full ml-2">
                        Nueva
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 mb-2">{notification.message}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500">
                      {formatDate(notification.created_at)}
                    </p>
                    <div className="space-x-2">
                      {!notification.read && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Marcar como leída
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(notification.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
