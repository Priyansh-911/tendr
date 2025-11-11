import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './InvitationPreview.css';
import Navbar from '../../components/Navbar.jsx';

const InvitationPreview = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData, selectedTemplate } = location.state || {};
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState(null);

  useEffect(() => {
    if (!formData || !selectedTemplate) {
      navigate('/invitation');
    }
  }, [formData, selectedTemplate, navigate]);

  const handleDownload = () => {
    setIsGenerating(true);
    
    // Simulate PDF generation
    setTimeout(() => {
      // In a real application, this would generate an actual PDF
      const link = document.createElement('a');
      link.href = '#';
      link.download = `${formData.eventTitle}_invitation.pdf`;
      link.click();
      
      setIsGenerating(false);
      setDownloadUrl('#');
    }, 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${formData.eventTitle} - Invitation`,
        text: `You're invited to ${formData.eventTitle}!`,
        url: window.location.href
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Invitation link copied to clipboard!');
    }
  };

  const handleEdit = () => {
    navigate(-1); // Go back to customizer
  };

  if (!formData || !selectedTemplate) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">No Data Found</h1>
          <button
            onClick={() => navigate('/invitation')}
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
          >
            Back to Invitation Builder
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      {/* Header */}
            <Navbar />


      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Invitation Preview */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Invitation Preview</h2>
              
              {/* Mock Invitation Card */}
              <div className="invitation-card bg-gradient-to-br from-amber-100 to-orange-100 p-8 rounded-xl border-2 border-amber-200">
                <div className="text-center space-y-6">
                  {/* Event Title */}
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {formData.eventTitle}
                    </h1>
                    {formData.eventDescription && (
                      <p className="text-lg text-gray-700 italic">
                        {formData.eventDescription}
                      </p>
                    )}
                  </div>

                  {/* Host Information */}
                  <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4">
                    <p className="text-lg text-gray-800">
                      <span className="font-semibold">Hosted by:</span> {formData.hostName}
                    </p>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-lg font-semibold text-gray-800">
                        {new Date(formData.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </span>
                    </div>

                    <div className="flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-lg font-semibold text-gray-800">
                        {formData.time}
                      </span>
                    </div>

                    <div className="flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-lg font-semibold text-gray-800 text-center">
                        {formData.address}
                      </span>
                    </div>
                  </div>

                  {/* Additional Information */}
                  {(formData.dressCode || formData.additionalInfo) && (
                    <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4 space-y-2">
                      {formData.dressCode && (
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">Dress Code:</span> {formData.dressCode}
                        </p>
                      )}
                      {formData.additionalInfo && (
                        <p className="text-sm text-gray-700">
                          <span className="font-semibold">Note:</span> {formData.additionalInfo}
                        </p>
                      )}
                    </div>
                  )}

                  {/* RSVP Information */}
                  <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4">
                    <p className="text-sm text-gray-700 mb-2">
                      <span className="font-semibold">RSVP:</span> {formData.rsvpDate ? `By ${new Date(formData.rsvpDate).toLocaleDateString()}` : 'Please confirm your attendance'}
                    </p>
                    <div className="flex items-center justify-center space-x-4 text-sm">
                      {formData.rsvpPhone && (
                        <span className="text-gray-700">
                          📞 {formData.rsvpPhone}
                        </span>
                      )}
                      {formData.rsvpEmail && (
                        <span className="text-gray-700">
                          ✉️ {formData.rsvpEmail}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Invitation Sending Information */}
                  {formData.invitationSendDate && (
                    <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4">
                      <p className="text-sm text-gray-700 text-center">
                        <span className="font-semibold">📅 Invitations will be sent on:</span> {new Date(formData.invitationSendDate).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                    </div>
                  )}

                  {/* Contact Information */}
                  <div className="bg-white/70 backdrop-blur-sm rounded-lg p-4">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Contact:</span> {formData.phoneNumber}
                      {formData.alternativePhone && ` | ${formData.alternativePhone}`}
                    </p>
                    <p className="text-sm text-gray-700">
                      ✉️ {formData.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Panel */}
          <div className="space-y-6">
            {/* Guest List Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Guest List Summary</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Guests:</span>
                  <span className="font-semibold text-gray-900">{formData.guests.length}</span>
                </div>
                <div className="max-h-48 overflow-y-auto space-y-2">
                  {formData.guests.map((guest, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                      <span className="font-medium text-gray-900">{guest.name}</span>
                      <div className="flex space-x-2 text-sm text-gray-500">
                        {guest.phone && <span>📞</span>}
                        {guest.email && <span>✉️</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Actions</h3>
              
              <div className="space-y-4">
                <button
                  onClick={handleDownload}
                  disabled={isGenerating}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isGenerating ? (
                    <>
                      <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Generating PDF...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Download PDF</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleShare}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  <span>Share Invitation</span>
                </button>

                <button
                  onClick={handleEdit}
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 px-6 rounded-lg font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <span>Edit Details</span>
                </button>

                <button
                  onClick={() => navigate('/invitation')}
                  className="w-full bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span>Create Another</span>
                </button>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-6 border border-amber-200">
              <h4 className="text-lg font-bold text-gray-900 mb-3">💡 Pro Tips</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Download the PDF for high-quality printing</li>
                <li>• Share the digital version for quick RSVPs</li>
                <li>• Save your design to create similar invitations</li>
                <li>• Consider sending reminders 1 week before the event</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitationPreview;
