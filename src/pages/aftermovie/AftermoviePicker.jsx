import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AftermoviePicker.css';
import Navbar from '../../components/Navbar.jsx';
const AftermoviePicker = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);

  const aftermovieOptions = [
    {
      id: 'reel',
      name: 'REEL',
      description: 'Dynamic vertical videos with trending effects',
      icon: '🎬',
      color: 'from-purple-500 to-pink-500',
      features: [
        'Vertical format (9:16)',
        'Trending transitions',
        'Music synchronization',
        'Social media ready',
        'Auto-generated effects',
        'Quick turnaround'
      ],
      demoVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      duration: '15-60 seconds',
      bestFor: 'Social media sharing, Instagram, TikTok'
    },
    {
      id: 'slideshow',
      name: 'SLIDESHOW',
      description: 'Elegant photo presentations with cinematic effects',
      icon: '📸',
      color: 'from-blue-500 to-indigo-500',
      features: [
        'Horizontal format (16:9)',
        'Cinematic transitions',
        'Custom music overlay',
        'Professional quality',
        'Customizable templates',
        'High resolution output'
      ],
      demoVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      duration: '2-5 minutes',
      bestFor: 'Wedding receptions, corporate events, presentations'
    }
  ];

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    navigate(`/aftermovie/customize/${option.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <Navbar />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4  sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12 py-12 mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 mt-5">
            Choose Your Aftermovie Style
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the perfect format for your event memories. Each style offers unique effects 
            and is optimized for different platforms and use cases.
          </p>
        </div>

        {/* Aftermovie Options */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {aftermovieOptions.map((option, index) => (
            <div
              key={option.id}
              className="group cursor-pointer transform transition-all duration-500 hover:scale-105"
              onClick={() => handleOptionSelect(option)}
            >
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-transparent group-hover:border-purple-300 transition-all duration-500">
                {/* Header with Gradient */}
                <div className={`h-48 bg-gradient-to-r ${option.color} flex items-center justify-center relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <span className="text-8xl z-10 group-hover:scale-110 transition-transform duration-500">
                    {option.icon}
                  </span>
                  <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full px-3 py-1">
                    <span className="text-sm font-semibold text-gray-800">DEMO</span>
                  </div>
                </div>

                {/* Demo Video Section */}
                <div className="p-6">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                      {option.name}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {option.description}
                    </p>
                  </div>

                  {/* Demo Video */}
                  <div className="mb-6">
                    <div className="relative rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                      <video
                        className="w-full h-48 object-cover"
                        controls
                        preload="metadata"
                        poster={`https://via.placeholder.com/400x200/${option.color.split(' ')[1].replace('to-', '').replace('-500', '')}/ffffff?text=${option.name}+Demo`}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      >
                        <source src={option.demoVideo} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <div 
                        className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-white"
                        style={{ display: 'none' }}
                      >
                        <div className="text-center">
                          <div className="text-4xl mb-2">{option.icon}</div>
                          <div className="text-lg font-semibold">{option.name} Demo</div>
                          <div className="text-sm opacity-75">Click to create your own</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {option.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center text-sm text-gray-600">
                          <svg className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Duration:</span>
                      <span className="text-sm text-gray-600">{option.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Best for:</span>
                      <span className="text-sm text-gray-600">{option.bestFor}</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    Create {option.name}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Why Choose Our Aftermovie Creator?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2M9 12l2 2 4-4" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Professional Quality</h4>
              <p className="text-gray-600">High-resolution output with cinematic effects and professional transitions.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Fast Processing</h4>
              <p className="text-gray-600">Quick turnaround times with automated processing and smart optimization.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Easy to Use</h4>
              <p className="text-gray-600">Simple upload process with intelligent auto-editing and customization options.</p>
            </div>
          </div>
        </div>

        {/* Process Section */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-3xl p-8 border border-purple-200">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            How It Works
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                1
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Upload Photos</h4>
              <p className="text-sm text-gray-600">Upload your event photos and videos</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                2
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Choose Style</h4>
              <p className="text-sm text-gray-600">Select reel or slideshow format</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                3
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Customize</h4>
              <p className="text-sm text-gray-600">Add music, effects, and personal touches</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold text-lg">
                4
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Download</h4>
              <p className="text-sm text-gray-600">Get your professional aftermovie</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AftermoviePicker;
