// Results Component - View medical test results
import React, { useState, useEffect } from 'react';
import { getResults } from '../api';

const Results = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load results on component mount
  useEffect(() => {
    loadResults();
  }, []);

  /**
   * Fetch all medical results from API
   */
  const loadResults = async () => {
    try {
      setLoading(true);
      const response = await getResults();
      setResults(response.data || []);
      setError(null);
    } catch (err) {
      setError('Error al cargar los resultados. Verifica que el servidor esté ejecutándose.');
      console.error('Error loading results:', err);
    } finally {
      setLoading(false);
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
        <div className="text-xl text-gray-600">Cargando resultados...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Resultados Médicos</h2>
        <button
          onClick={loadResults}
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

      {/* Results List */}
      <div className="space-y-4">
        {results.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No hay resultados médicos disponibles.
          </div>
        ) : (
          results.map((result) => (
            <div
              key={result.id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition duration-200"
            >
              <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {result.test_type}
                  </h3>
                  <p className="text-sm text-gray-600">
                    👤 Paciente: <span className="font-medium">{result.patient_name}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    📅 Fecha: <span className="font-medium">{formatDate(result.result_date)}</span>
                  </p>
                </div>
                <div className="mt-3 md:mt-0">
                  <span className="inline-block bg-green-100 text-green-800 text-sm font-semibold px-4 py-1 rounded-full">
                    Disponible
                  </span>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-4">
                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-1">Resultado:</p>
                  <p className="text-lg font-semibold text-gray-800">{result.result_value}</p>
                </div>
                
                {result.notes && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Observaciones:</p>
                    <p className="text-sm text-gray-700">{result.notes}</p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Results;
