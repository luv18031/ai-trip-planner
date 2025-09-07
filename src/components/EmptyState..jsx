import TravelSvg from '../assets/undraw_travel.svg?react'; // Import SVG as a React component

export default function EmptyState() {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg text-center h-full flex flex-col justify-center items-center">
      <TravelSvg className="w-64 h-64" />
      <h2 className="text-2xl font-bold text-gray-700 mt-8">Let's Plan Your Next Adventure!</h2>
      <p className="text-gray-500 mt-2 max-w-sm">Fill in your travel preferences, and our AI will craft a unique itinerary just for you.</p>
    </div>
  );
}