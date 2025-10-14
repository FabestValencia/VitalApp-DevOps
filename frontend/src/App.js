// Main App Component - VitalApp
import React, { useState } from 'react';
import Appointments from './components/Appointments';
import Results from './components/Results';
import Notifications from './components/Notifications';
import './index.css';

function App() {
  // State to track active tab
  const [activeTab, setActiveTab] = useState('appointments');

  /**
   * Render the active component based on selected tab
   */
  const renderContent = () => {
    switch (activeTab) {
      case 'appointments':
        return <Appointments />;
      case 'results':
        return <Results />;
      case 'notifications':
        return <Notifications />;
      default:
        return <Appointments />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="text-3xl mr-3">⚕️</div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                VitalApp
              </h1>
            </div>
            <p className="hidden md:block text-sm text-gray-600">
              Sistema de Gestión de Citas Médicas
            </p>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('appointments')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition duration-200 ${
                activeTab === 'appointments'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              📅 Citas Médicas
            </button>
            <button
              onClick={() => setActiveTab('results')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition duration-200 ${
                activeTab === 'results'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              📊 Resultados
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition duration-200 ${
                activeTab === 'notifications'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              🔔 Notificaciones
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderContent()}
      </main>

    </div>
  );
}

export default App;
