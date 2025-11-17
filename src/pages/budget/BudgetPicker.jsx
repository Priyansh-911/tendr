import React from 'react';
import { useNavigate } from 'react-router-dom';
import BasicSpeedDial from '../../components/BasicSpeedDial';

const eventTypes = [
  {
    id: 'birthday',
    name: 'Birthday Party',
    description: 'Plan the perfect birthday celebration',
    icon: '🎂',
    color: 'from-pink-500 to-rose-500'
  },
  {
    id: 'anniversary',
    name: 'Anniversary',
    description: 'Celebrate your special milestone',
    icon: '💕',
    color: 'from-red-500 to-pink-500'
  },
  {
    id: 'wedding',
    name: 'Wedding',
    description: 'Plan your dream wedding',
    icon: '💒',
    color: 'from-purple-500 to-indigo-500'
  },
  {
    id: 'corporate',
    name: 'Corporate Event',
    description: 'Professional business events',
    icon: '🏢',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'party',
    name: 'Party',
    description: 'Fun and casual celebrations',
    icon: '🎉',
    color: 'from-yellow-500 to-orange-500'
  },
  {
    id: 'custom',
    name: 'Custom Budget',
    description: 'Create a completely custom budget allocation from scratch',
    icon: '⚙️',
    color: 'from-gray-500 to-gray-600',
    isCustom: true
  }
];

export default function BudgetPicker() {
  const navigate = useNavigate();

  const handleEventSelect = (eventType) => {
    if (eventType === 'custom') {
      navigate('/budget-allocator', { state: { isCustom: true } });
    } else {
      navigate('/budget-allocator', { state: { eventType } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <BasicSpeedDial />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 py-10">
        {/* Heading */}
        <div className="text-center mb-6">
          <h1
            className="bg-gradient-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent 
                       text-3xl sm:text-4xl lg:text-5xl font-bold mb-3"
          >
            Choose Budget Type
          </h1>

          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Plan your event budget with our smart allocation tool.
          </p>
        </div>

        {/* Event Cards */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 
                      gap-6 sm:gap-8 mt-10 mb-12 px-2 sm:px-4 md:px-8 lg:px-12"
        >
          {eventTypes.map((event) => (
            <div
              key={event.id}
              onClick={() => handleEventSelect(event.id)}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 
                       cursor-pointer transform hover:-translate-y-2 group"
            >
              <div
                className={`h-28 sm:h-32 bg-gradient-to-br ${event.color} 
                          rounded-t-xl flex items-center justify-center`}
              >
                <span
                  className="text-5xl sm:text-6xl group-hover:scale-110 
                               transition-transform duration-300"
                >
                  {event.icon}
                </span>
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-1">
                  {event.name}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base mb-3">
                  {event.description}
                </p>

                <div className="flex items-center text-orange-500 font-semibold group-hover:text-orange-600">
                  Start Planning
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* How It Works Section */}
        <div className="mt-12 sm:mt-16 text-center px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6">
            How It Works
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center px-4">
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-100 rounded-full 
                            flex items-center justify-center mx-auto mb-4"
              >
                <span className="text-xl sm:text-2xl font-bold text-orange-500">
                  1
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                Choose Event Type
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Select from our pre-configured event types or create a custom
                budget.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center px-4">
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-100 rounded-full 
                            flex items-center justify-center mx-auto mb-4"
              >
                <span className="text-xl sm:text-2xl font-bold text-orange-500">
                  2
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                Set Your Budget
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Enter your total budget and adjust category percentages as
                needed.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center px-4">
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-100 rounded-full 
                            flex items-center justify-center mx-auto mb-4"
              >
                <span className="text-xl sm:text-2xl font-bold text-orange-500">
                  3
                </span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">
                Export & Plan
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                Export your budget breakdown and use it for your event planning.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}
