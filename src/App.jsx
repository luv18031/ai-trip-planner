import { useState } from 'react';
import TripForm from './components/TripForm';
import ItineraryDisplay from './components/ItineraryDisplay';
import mockData from './mockItinerary.json'; // We'll use this for now

export default function App() {
  const [itinerary, setItinerary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePlanTrip = async (formData) => {
    setIsLoading(true);
    setItinerary(null);
    setError(null);
    console.log("Form Data Submitted:", formData);

    // --- MOCK API CALL ---
    // In the future, we will replace this with a real fetch() call 
    // to our Firebase Cloud Function.
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      // To simulate an error, you can uncomment the line below
      // throw new Error("Failed to connect to the AI planner.");
      setItinerary(mockData);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
    // --- END MOCK API CALL ---
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl font-bold text-gray-800 tracking-wider">
            AI Travel Weaver ✈️
          </h1>
          <p className="text-gray-600 mt-1">Your personalized journey, crafted in seconds.</p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-1">
            <TripForm onPlanTrip={handlePlanTrip} isLoading={isLoading} />
          </div>

          {/* Right Column: Itinerary */}
          <div className="lg:col-span-2">
            {isLoading && (
              <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            )}
            {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">{error}</div>}
            {itinerary && <ItineraryDisplay data={itinerary} />}
            {!isLoading && !itinerary && !error && (
              <div className="bg-white p-8 rounded-lg shadow-lg text-center h-96 flex flex-col justify-center">
                <h2 className="text-2xl font-semibold text-gray-700">Ready for an adventure?</h2>
                <p className="text-gray-500 mt-2">Fill out the details on the left to generate your personalized itinerary.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}