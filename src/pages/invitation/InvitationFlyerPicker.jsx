import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './InvitationFlyerPicker.css';
import Navbar from '../../components/Navbar.jsx';

const InvitationFlyerPicker = () => {
  const navigate = useNavigate();
  const [selectedEventType, setSelectedEventType] = useState(null);

  const eventTypes = [
    {
      id: 'dinner-eve',
      name: 'DINNER EVE',
      description: 'Elegant dinner party invitations',
      icon: '🍽️',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'family-gathering',
      name: 'FAMILY GATHERING',
      description: 'Warm family reunion invitations',
      icon: '👨‍👩‍👧‍👦',
      color: 'from-green-500 to-blue-500'
    },
    {
      id: 'lunch-celebrations',
      name: 'LUNCH CELEBRATIONS',
      description: 'Joyful lunch party invitations',
      icon: '🥗',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'marriage-ceremony',
      name: 'MARRIAGE CEREMONY',
      description: 'Beautiful wedding invitations',
      icon: '💒',
      color: 'from-pink-500 to-red-500'
    },
    {
      id: 'magical-ring-ceremony',
      name: 'MAGICAL RING CEREMONY',
      description: 'Romantic engagement invitations',
      icon: '💍',
      color: 'from-indigo-500 to-purple-500'
    },
    {
      id: 'birthday-party',
      name: 'BIRTHDAY PARTY',
      description: 'Fun and festive birthday celebrations',
      icon: '🎂',
      color: 'from-pink-500 to-purple-500'
    },
    {
      id: 'marriage-anniversary',
      name: 'MARRIAGE ANNIVERSARY',
      description: 'Celebrating years of love and togetherness',
      icon: '💕',
      color: 'from-red-500 to-pink-500'
    }
  ];

  const handleEventTypeSelect = (eventType) => {
    setSelectedEventType(eventType);
    navigate(`/invitation/templates/${eventType.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Header */}
            <Navbar />


      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 py-12 mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 mt-5">
            Choose Your Event Type
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the type of event you're planning to see our curated collection of 
            beautiful invitation templates designed specifically for your occasion.
          </p>
        </div>

        {/* Event Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {eventTypes.map((eventType) => (
            <div
              key={eventType.id}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              onClick={() => handleEventTypeSelect(eventType)}
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-transparent group-hover:border-amber-300">
                {/* Gradient Header */}
                <div className={`h-32 bg-gradient-to-r ${eventType.color} flex items-center justify-center`}>
                  <span className="text-6xl">{eventType.icon}</span>
                </div>
                
                {/* Content */}
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors">
                    {eventType.name}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {eventType.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-amber-600 bg-amber-100 px-3 py-1 rounded-full">
                      {eventType.id === 'birthday-party' ? '9 Templates' : 
                       eventType.id === 'marriage-anniversary' ? '8 Templates' : '8+ Templates'}
                    </span>
                    <div className="flex items-center text-amber-600 font-semibold group-hover:text-amber-700">
                      Choose Templates
                      <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Why Choose Our Invitation Templates?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Professional Design</h4>
              <p className="text-gray-600">Beautiful, professionally designed templates that make your invitations stand out.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Fully Customizable</h4>
              <p className="text-gray-600">Personalize every detail including host information, guest list, and event details.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Easy Sharing</h4>
              <p className="text-gray-600">Generate and share your invitations digitally or download for printing.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationFlyerPicker;
