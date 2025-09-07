export default function ItineraryDisplay({ data }) {
  if (!data) return null;

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">{data.tripTitle}</h2>
      <p className="text-lg text-green-600 font-semibold mb-6">
        Total Estimated Cost: ₹{data.totalEstimatedCost.toLocaleString('en-IN')}
      </p>

      <div className="space-y-8">
        {data.dailyPlan.map((day) => (
          <div key={day.dayNumber}>
            <h3 className="text-2xl font-semibold text-blue-700 border-b-2 border-blue-200 pb-2 mb-4">
              Day {day.dayNumber}: <span className="font-normal text-gray-600">{day.themeOfDay}</span>
            </h3>
            <div className="space-y-4">
              {day.activities.map((activity, index) => (
                <div key={index} className="pl-4 border-l-4 border-gray-200">
                  <p className="font-bold text-gray-800">{activity.time}: {activity.name}</p>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">{activity.category}</p>
                  <p className="text-gray-600 mt-1">{activity.description}</p>
                  <p className="text-sm font-semibold text-gray-700 mt-1">Est. Cost: ₹{activity.estimatedCost}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button className="bg-green-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-green-700 transition duration-300">
          Confirm & Book Now
        </button>
      </div>
    </div>
  );
}