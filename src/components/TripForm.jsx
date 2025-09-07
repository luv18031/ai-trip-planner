import { useState } from 'react';

export default function TripForm({ onPlanTrip, isLoading }) {
  const [formData, setFormData] = useState({
    destination: 'Hyderabad, Telangana',
    budget: '20000',
    interests: 'Heritage, Foodie',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onPlanTrip(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg sticky top-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Plan Your Dream Trip</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="destination" className="block text-gray-700 font-semibold mb-2">Destination</label>
          <input
            type="text"
            id="destination"
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="budget" className="block text-gray-700 font-semibold mb-2">Budget (per person in ₹)</label>
          <input
            type="number"
            id="budget"
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="interests" className="block text-gray-700 font-semibold mb-2">Interests</label>
          <input
            type="text"
            id="interests"
            name="interests"
            placeholder="e.g., Heritage, Foodie, Adventure"
            value={formData.interests}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-gray-400"
        >
          {isLoading ? 'Crafting Your Itinerary...' : 'Plan My Trip'}
        </button>
      </form>
    </div>
  );
}