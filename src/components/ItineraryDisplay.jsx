// src/components/ItineraryDisplay.jsx
import { Utensils, Landmark, Camera, ShoppingBag, Beer, Sun, Theater, Mountain } from 'lucide-react';

const categoryIcons = {
  "Food": <Utensils className="w-5 h-5 text-white" />,
  "Sightseeing": <Camera className="w-5 h-5 text-white" />,
  "Heritage": <Landmark className="w-5 h-5 text-white" />,
  "Shopping": <ShoppingBag className="w-5 h-5 text-white" />,
  "Nightlife": <Beer className="w-5 h-5 text-white" />,
  "Relaxing": <Sun className="w-5 h-5 text-white" />,
  "Entertainment": <Theater className="w-5 h-5 text-white" />,
  "Nature": <Mountain className="w-5 h-5 text-white" />,
  "Default": <div className="w-5 h-5 text-white"></div>
};

const categoryColors = {
  "Food": "bg-red-500",
  "Sightseeing": "bg-blue-500",
  "Heritage": "bg-yellow-600",
  "Shopping": "bg-pink-500",
  "Nightlife": "bg-purple-600",
  "Relaxing": "bg-green-500",
  "Entertainment": "bg-indigo-500",
  "Nature": "bg-teal-500",
  "Default": "bg-gray-500"
};

export default function ItineraryDisplay({ data }) {
  if (!data) return null;

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg animate-fade-in">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">{data.tripTitle}</h2>
      <p className="text-lg text-secondary font-semibold mb-8 border-b pb-4">
        Total Estimated Cost: ₹{data.totalEstimatedCost.toLocaleString('en-IN')}
      </p>

      <div className="space-y-12">
        {data.dailyPlan.map((day) => (
          <div key={day.dayNumber}>
            <h3 className="text-2xl font-semibold text-primary mb-6">
              Day {day.dayNumber}: <span className="font-normal text-gray-600">{day.themeOfDay}</span>
            </h3>
            {/* Timeline starts here */}
            <div className="relative border-l-2 border-gray-200 pl-8 space-y-8">
              {day.activities.map((activity, index) => (
                <div key={index} className="relative">
                  {/* Timeline Dot and Icon */}
                  <div className={`absolute -left-[42px] top-1 w-10 h-10 rounded-full flex items-center justify-center ${categoryColors[activity.category] || categoryColors['Default']}`}>
                    {categoryIcons[activity.category] || categoryIcons['Default']}
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="font-bold text-gray-800 text-lg">{activity.name}</p>
                    <p className="text-sm text-gray-500 font-medium my-1">{activity.time}</p>
                    <p className="text-gray-600 mt-2">{activity.description}</p>
                    <p className="text-sm font-semibold text-gray-800 mt-2">Est. Cost: ₹{activity.estimatedCost}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-10 text-center">
        <button className="bg-secondary text-white font-bold py-3 px-8 rounded-lg hover:bg-green-600 transition duration-300 shadow-lg hover:shadow-xl">
          Finalize & Book This Trip
        </button>
      </div>
    </div>
  );
}