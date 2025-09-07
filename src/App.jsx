// src/App.jsx
import { useState } from 'react';
import TripForm from './components/TripForm';
import ItineraryDisplay from './components/ItineraryDisplay';
import EmptyState from './components/EmptyState.';
import mockData from './mockItinerary.json';

export default function App() {
  const [itinerary, setItinerary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePlanTrip = async (formData) => {
    setIsLoading(true);
    setItinerary(null);
    setError(null);
    console.log("Form Data Submitted:", formData);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setItinerary(mockData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <header className="bg-white shadow-sm sticky top-0 z-20">
        <div className="container mx-auto px-6 py-4 flex items-center gap-3">
          <span className="text-2xl">✈️</span>
          <h1 className="text-2xl font-extrabold text-gray-800">
            AI Travel Weaver
          </h1>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <TripForm onPlanTrip={handlePlanTrip} isLoading={isLoading} />
          </div>

          <div className="lg:col-span-8">
            {isLoading && (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
              </div>
            )}
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">{error}</div>}
            {itinerary && <ItineraryDisplay data={itinerary} />}
            {!isLoading && !itinerary && !error && (
              <EmptyState />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}