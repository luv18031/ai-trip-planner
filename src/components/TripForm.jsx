// src/components/TripForm.jsx
import { useState } from 'react';
import { MapPin, Calendar, Users, Briefcase, Bot, Sun, Zap, Coffee } from 'lucide-react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';

const interestOptions = ["Heritage", "Foodie", "Adventure", "Nature", "Nightlife", "Shopping", "Arts & Culture", "Relaxing"];

export default function TripForm({ onPlanTrip, isLoading }) {
  const [destination, setDestination] = useState('Hyderabad, Telangana');
  const [dates, setDates] = useState({ from: new Date(), to: new Date(new Date().setDate(new Date().getDate() + 2)) });
  const [travelers, setTravelers] = useState('Couple');
  const [budget, setBudget] = useState('Moderate');
  const [interests, setInterests] = useState(new Set(["Heritage", "Foodie"]));
  const [pace, setPace] = useState('Balanced');

  const [showCalendar, setShowCalendar] = useState(false);

  const toggleInterest = (interest) => {
    setInterests(prev => {
      const newInterests = new Set(prev);
      if (newInterests.has(interest)) {
        newInterests.delete(interest);
      } else {
        newInterests.add(interest);
      }
      return newInterests;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      destination,
      dates: {
        from: format(dates.from, 'PPP'),
        to: format(dates.to, 'PPP'),
      },
      travelers,
      budget,
      interests: Array.from(interests),
      pace,
    };
    onPlanTrip(formData);
  };
  
  const formattedDate = dates?.from ? (dates.to ? `${format(dates.from, 'LLL dd, y')} - ${format(dates.to, 'LLL dd, y')}` : format(dates.from, 'LLL dd, y')) : 'Select your dates';

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg sticky top-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary/10 p-2 rounded-lg">
          <Bot className="w-6 h-6 text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Your Trip Details</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Destination */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2"><MapPin size={16}/> Destination</label>
          <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50" required/>
        </div>

        {/* Dates */}
        <div className="relative">
          <label className="block text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2"><Calendar size={16}/> Trip Dates</label>
          <input type="text" readOnly value={formattedDate} onClick={() => setShowCalendar(!showCalendar)} className="w-full px-4 py-2 border border-gray-300 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50"/>
          {showCalendar && <div className="absolute z-10 top-full mt-2 bg-white shadow-lg rounded-lg border"><DayPicker mode="range" selected={dates} onSelect={setDates} onDayClick={() => { if(dates.to) setShowCalendar(false)}}/></div>}
        </div>

        {/* Travelers & Budget */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2"><Users size={16}/> Travelers</label>
            <select value={travelers} onChange={(e) => setTravelers(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50">
              <option>Solo</option><option>Couple</option><option>Family</option><option>Group</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2 flex items-center gap-2"><Briefcase size={16}/> Budget</label>
            <select value={budget} onChange={(e) => setBudget(e.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50">
              <option>Budget-friendly</option><option>Moderate</option><option>Luxury</option>
            </select>
          </div>
        </div>

        {/* Interests */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">Interests</label>
          <div className="flex flex-wrap gap-2">
            {interestOptions.map(interest => (
              <button type="button" key={interest} onClick={() => toggleInterest(interest)} className={`px-3 py-1 text-sm rounded-full transition-colors ${interests.has(interest) ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                {interest}
              </button>
            ))}
          </div>
        </div>

        {/* Pace */}
        <div>
           <label className="block text-sm font-semibold text-gray-600 mb-2">Trip Pace</label>
           <div className="grid grid-cols-3 gap-2 rounded-lg bg-gray-200 p-1">
              {['Relaxed', 'Balanced', 'Packed'].map(p => (
                <button type="button" key={p} onClick={() => setPace(p)} className={`px-3 py-1 text-sm rounded-md transition-colors font-semibold ${pace === p ? 'bg-white shadow text-primary' : 'text-gray-600'}`}>
                  {p === 'Relaxed' && <Sun size={14} className="inline mr-1"/>}
                  {p === 'Balanced' && <Coffee size={14} className="inline mr-1"/>}
                  {p === 'Packed' && <Zap size={14} className="inline mr-1"/>}
                  {p}
                </button>
              ))}
           </div>
        </div>

        <button type="submit" disabled={isLoading} className="w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-primary-hover transition duration-300 disabled:bg-gray-400 flex items-center justify-center gap-2">
          {isLoading ? 'Crafting Your Journey...' : 'Generate Itinerary'}
        </button>
      </form>
    </div>
  );
}