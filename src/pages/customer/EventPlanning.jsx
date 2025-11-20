import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { io } from "socket.io-client";

import {
  ChevronRight,
  ChevronLeft,
  Users,
  IndianRupee,
  MapPin,
  Calendar,
  Music,
  Camera,
  Utensils,
  X,
  Plus,
} from "lucide-react";

import EastIcon from "@mui/icons-material/East";

import { useSelector, useDispatch } from "react-redux";

import {
  setFormData,
  goToNextStep,
  goToPreviousStep,
  showVendorScreenAction,
  backToFormAction,
  addSelectedVendor,
  removeSelectedVendor,
  setBookingType,
} from "../../redux/eventPlanningSlice.js";

import { setFilters } from "../../redux/listingFiltersSlice";

import MakeAGroup_Nav from "../../components/MakeAGroup_Nav.jsx";
import EventFormSummary from "../../components/EventFormSummary.jsx";

const EventPlanning = () => {
  const socketRef = useRef(null);
  const openChatWithSocket = () => {
    // Agar socket already connected nahi hai to connect karo
    if (!socketRef.current) {
      socketRef.current = io("https://tendr-backend-75ag.onrender.com", {
        query: {
          userId: localStorage.getItem("userId") || "guest",
          role: "user",
          chatType: "EVENT",
        }
      });

      // Socket connect hone ke baad event emit karna
      socketRef.current.on("connect", () => {
        console.log("Socket connected:", socketRef.current.id);

        socketRef.current.emit("open_conversation", {
          requestId: formData.eventName || `req_${Date.now()}`,
          chatType: "EVENT",
          extraRequirements,
          extraRequirementsText,
        });
      });

      // Backend se response suno
      socketRef.current.on("conversation_opened", (conversation) => {
        navigate("/chat", {
          state: {
            chatId: conversation._id,
            chatType: "EVENT",
            extraRequirements,
            extraRequirementsText,
          },
          replace: true,
        });
      });

      // Cleanup on unmount - optional if connection persists
      // useEffect me return kar sakte ho agar chahiye
    } else {
      // Agar socket already connected hai to directly event emit kar do
      socketRef.current.emit("open_conversation", {
        requestId: formData.eventName || `req_${Date.now()}`,
        chatType: "EVENT",
        extraRequirements,
        extraRequirementsText,
      });
    }
  };






  // Navigation handlers for checklist and timeline
  const handleGoToChecklist = () => {
    navigate('/prebuilt-checklist');
  };
  const handleGoToTimeline = () => {
    navigate('/prebuilt-timeline');
  };
  const navigate = useNavigate();
  const location = useLocation();
  const [activeModal, setActiveModal] = useState(null);
  const [extraRequirements, setExtraRequirements] = useState(false);
  const [showExtraReq, setShowExtraReq] = useState();
  const [extraRequirementsText, setExtraRequirementsText] = useState("");

  const dispatch = useDispatch();
  const {
    currentStep,
    formData,
    showVendorScreen,
    bookingType,
    selectedVendors,
  } = useSelector((state) => state.eventPlanning);

  // pick bookingType from URL (?bookingType=you-do-it | let-us-do-it)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const t = params.get("bookingType");
    if (t === "you-do-it" || t === "let-us-do-it") {
      dispatch(setBookingType(t));
    } else {
      dispatch(setBookingType("you-do-it"));
    }
  }, [location.search, dispatch]);

  const questions = [
    {
      id: "eventName",
      title: "What's the name of your event?",
      subtitle: "Give your event a memorable name",
      type: "text",
      placeholder: "e.g., Sarah's Birthday Celebration",
      icon: <Calendar className="w-8 h-8" />,
    },
    {
      id: "eventType",
      title: "What type of event are you planning?",
      subtitle: "This helps us suggest the right vendors",
      type: "select",
      options: [
        "Get-together",
        "Birthday",
        "Office Party",
        "Concert",
        "Anniversary",
        "Pre Wedding",
        "Rituals",
        "Festival",
        "Others",
      ],
      icon: <Calendar className="w-8 h-8" />,
    },
    {
      id: "guests",
      title: "How many guests will attend?",
      subtitle: "An approximate number is fine",
      type: "number",
      placeholder: "e.g., 50",
      icon: <Users className="w-8 h-8" />,
    },
    {
      id: "budget",
      title: "What's your total budget?",
      subtitle: "This helps vendors provide appropriate options",
      type: "select",
      options: [
        "Under ₹1,000",
        "₹1,000 - ₹5,000",
        "₹5,000 - ₹10,000",
        "₹10,000 - ₹25,000",
        "₹25,000 - ₹50,000",
        "Over ₹50,000",
      ],
      icon: <IndianRupee className="w-8 h-8" />,
    },
    {
      id: "location",
      title: "Where will your event take place?",
      subtitle: "City or venue name",
      type: "select",
      options: ["Delhi", "Noida", "Greater Noida", "Gurugram", "Ghaziabad"],
      icon: <MapPin className="w-8 h-8" />,
    },
    {
      id: "date",
      title: "When is your event?",
      subtitle: "Select your preferred date",
      type: "date",
      icon: <Calendar className="w-8 h-8" />,
    },
    {
      id: "additionalInfo",
      title: "Any additional details?",
      subtitle: "Tell us about your vision, theme, or special requirements",
      type: "textarea",
      placeholder: "e.g., Outdoor garden theme, live music preferred...",
      icon: <Calendar className="w-8 h-8" />,
    },
  ];

  const vendors = [
    {
      id: "Caterer",
      title: "Caterers",
      icon: <Utensils className="w-8 h-8" />,
      description: "Food and beverage services",
    },
    {
      id: "Photographer",
      title: "Photographers",
      icon: <Camera className="w-8 h-8" />,
      description: "Capture your special moments",
    },
    {
      id: "DJ",
      title: "DJs",
      icon: <Music className="w-8 h-8" />,
      description: "Music and entertainment",
    },
    {
      id: "Decorator",
      title: "Decorators",
      icon: <Music className="w-8 h-8" />,
      description: "Beautiful, theme-driven decorations",
    },
  ];

  const handleInputChange = (field, value) => {
    dispatch(setFormData({ field, value }));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && formData[currentQuestion.id]) {
      nextStep();
    }
  };

  const handleSelectKeyPress = (e, option) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleInputChange(currentQuestion.id, option);
      // Auto-advance to next step after selection
      setTimeout(() => {
        nextStep();
      }, 100);
    }
  };

  /**
   * On Next:
   * - If not last question → advance step.
   * - On last question → always open vendor screen.
   *   Then we branch UI by bookingType:
   *   - you-do-it  → grid (existing)
   *   - let-us-do-it → checklist screen (new)
   */
  const nextStep = () => {
    if (currentStep < questions.length - 1) {
      dispatch(goToNextStep());
      return;
    }
    // last question → show vendor screen (do not navigate yet)
    dispatch(showVendorScreenAction());
  };

  const prevStep = () => {
    dispatch(goToPreviousStep());
  };

  // Modal open/close for vendor type (grid flow)
  const openModal = (vendorType) => setActiveModal(vendorType);
  const closeModal = () => setActiveModal(null);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;



  /** =======================
   *  END STEP (Both Flows)
   *  ======================= */

  if (showVendorScreen) {

    // ---- FLOW A: YOU DO IT → keep your current grid screen exactly as-is
    if (bookingType === "you-do-it") {
      return (
        <div className="min-h-screen bg-[#fff0ea] w-full">
          {/* Header */}
          <div className="navbar bg-white shadow-sm">
            <MakeAGroup_Nav />
          </div>

          {/* Main Body */}
          <div className="w-full px-4 sm:px-10 lg:px-16 xl:px-20 pt-10 pb-6 flex flex-col items-center">
            {/* Title */}
            <div className="text-center mb-8 px-2">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3">
                Select Your Vendors
              </h2>
              <p className="text-base sm:text-lg lg:text-xl text-gray-600">
                Click on each category to browse and add vendors to your event
              </p>
            </div>

            {/* ========= Extra Requirements Section (unchanged logic) ========= */}
            {/* Your original extra-code is untouched and fits responsively */}

            {/* Vendors Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 mb-12 w-full max-w-7xl">
              {vendors.map((vendor) => (
                <div
                  key={vendor.id}
                  onClick={() => {
                    dispatch(
                      setFilters({
                        serviceType: vendor.id,
                        eventType: formData?.eventType || "",
                        locationType: formData?.location || "",
                        date: formData?.date || "",
                        guestCount: Number(formData?.guests) || 0,
                      })
                    );
                    navigate("/listings");
                  }}
                  className="bg-white rounded-3xl p-6 sm:p-8 text-center cursor-pointer transform transition-all duration-300 
                       hover:scale-105 hover:shadow-xl border-2 border-transparent hover:border-[#ffb89e] shadow-lg"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#ea7e53] rounded-2xl flex items-center justify-center mx-auto mb-6 text-white">
                    {vendor.icon}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
                    {vendor.title}
                  </h3>
                  <p className="text-gray-600 mb-6 text-sm sm:text-base">
                    {vendor.description}
                  </p>

                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#FFD3C3] rounded-full flex items-center justify-center mx-auto">
                    <Plus className="w-5 h-5 sm:w-6 sm:h-6 text-[#ea7e53]" />
                  </div>
                </div>
              ))}
            </div>

            {/* Button – Toggle Extra Requirements */}
            <div className="text-center">
              <p className="text-base sm:text-lg text-gray-600 mb-4">
                Require more than one service?
              </p>

              <div className="flex justify-center mb-2">
                <button
                  type="button"
                  onClick={() => setShowExtraReq((prev) => !prev)}
                  className="group cursor-pointer bg-white hover:bg-[#ea7e53] hover:text-white rounded-2xl px-4 py-2 
                       flex items-center justify-center text-[#ea7e53] font-bold w-[220px] sm:w-[260px] h-[45px] 
                       transform transition-transform duration-300 
                       hover:scale-105 hover:-translate-y-1 active:scale-95 shadow-lg"
                >
                  {showExtraReq
                    ? "Hide Extra Requirements"
                    : "Add Extra Requirements"}
                </button>
              </div>

              {showExtraReq && (
                <div className="mt-4 w-full max-w-lg px-2">
                  <textarea
                    value={extraRequirements}
                    onChange={(e) => setExtraRequirements(e.target.value)}
                    rows={3}
                    placeholder="Describe your extra requirements (e.g., tables, chairs, mats, cooler)…"
                    className="w-full p-4 text-base bg-white border-2 border-[#ffd7c7] rounded-2xl 
                         text-gray-800 placeholder-gray-400 focus:outline-none 
                         focus:ring-2 focus:ring-[#ff885d] transition-all duration-200"
                  />
                </div>
              )}
            </div>

            {/* Review Booking Button */}
            <div className="text-center mt-8">
              <button
                onClick={() => {
                  const bookingDetails = {
                    ...formData,
                    vendors: selectedVendors,
                    customerId: localStorage.getItem("userId"),
                    amount: 250,
                    addons: [],
                    extraRequirements,
                  };

                  navigate("/booking/review", {
                    state: { booking: bookingDetails },
                  });
                }}
                className="px-6 py-3 bg-amber-500 text-white rounded-lg font-semibold 
                     hover:bg-amber-600 shadow-md transition-all"
              >
                Review Booking
              </button>
            </div>

            {/* Back to Form */}
            <div className="text-center mt-4">
              <div className="inline-block group transition duration-300 rounded-lg">
                <div className="transition duration-200 group-hover:bg-white group-hover:shadow-md px-4 py-2 rounded-3xl">
                  <button
                    onClick={() => dispatch(backToFormAction())}
                    className="text-gray-500 group-hover:text-gray-700 transition-colors duration-200"
                  >
                    ← Back to form
                  </button>
                </div>
              </div>
            </div>

            {/* Event form summary section */}
            <EventFormSummary />
          </div>

          {/* Modal (unchanged logic, responsive styling added) */}
          {activeModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                    Find {vendors.find((v) => v.id === activeModal)?.title}
                  </h2>
                  <button
                    onClick={() => setActiveModal(null)}
                    className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Options */}
                <div className="space-y-4">
                  {[
                    { title: "Premium", price: "$500" },
                    { title: "Elite", price: "$800" },
                    { title: "Budget-Friendly Options", price: "$200" },
                  ].map((opt, i) => (
                    <div
                      key={i}
                      className="p-4 border-2 border-orange-200 rounded-xl hover:bg-orange-50 cursor-pointer transition"
                    >
                      <h3 className="font-semibold text-gray-800">
                        {opt.title}{" "}
                        {vendors
                          .find((v) => v.id === activeModal)
                          ?.title.slice(0, -1)}{" "}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {i === 0
                          ? "Professional service with excellent reviews"
                          : i === 1
                          ? "Luxury service for special occasions"
                          : "Quality service at affordable prices"}
                      </p>
                      <div className="text-orange-600 font-semibold mt-2">
                        Starting from {opt.price}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <button
                  onClick={() => {
                    dispatch(addSelectedVendor(activeModal));
                    setActiveModal(null);
                  }}
                  className="w-full mt-6 bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-xl 
                       hover:from-orange-600 hover:to-pink-600 transition-all shadow-lg font-semibold"
                >
                  Add Selected Vendors
                </button>
              </div>
            </div>
          )}
        </div>
      );
    }

    // ---- FLOW B: LET US DO IT → checklist end screen (new)
    return (
      <div className="min-h-screen bg-[#fff0ea]">
        {/* Header */}
        <div className="navbar bg-white shadow-sm">
          <MakeAGroup_Nav />
        </div>

        {/* Main Container */}
        <div className="w-full px-4 sm:px-10 lg:px-20 pt-10 pb-12 flex flex-col items-center">
          {/* Heading */}
          <div className="text-left w-full max-w-4xl mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
              Choose your vendors
            </h2>
            <p className="text-gray-600 text-sm sm:text-base">
              You can select multiple. We'll open a chat with these details as a
              header.
            </p>
          </div>

          {/* Vendor Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 w-full max-w-4xl">
            {vendors.map((v) => {
              const checked = selectedVendors.includes(v.id);

              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() =>
                    checked
                      ? dispatch(removeSelectedVendor(v.id))
                      : dispatch(addSelectedVendor(v.id))
                  }
                  className={`flex items-center justify-between rounded-2xl p-5 text-left border-2 transition-all
                ${
                  checked
                    ? "bg-[#ffe3d7] border-[#f4a07d]"
                    : "bg-white border-[#ffd7c7] hover:bg-[#fff5f0]"
                }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#ff8d61] text-white flex items-center justify-center">
                      {v.icon}
                    </div>
                    <div>
                      <div className="font-semibold text-lg text-gray-800">
                        {v.title}
                      </div>
                      <div className="text-sm text-gray-600">
                        {v.description}
                      </div>
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    readOnly
                    checked={checked}
                    className="w-5 h-5 accent-[#ff8d61] cursor-pointer"
                  />
                </button>
              );
            })}
          </div>

          {/* Extra Requirements */}
          <div className="w-full max-w-4xl mt-8">
            <label className="flex items-center gap-3 bg-white rounded-2xl py-4 px-5 border-2 border-[#ffd7c7] cursor-pointer">
              <input
                type="checkbox"
                className="w-5 h-5 accent-[#ff8d61]"
                checked={extraRequirements}
                onChange={(e) => setExtraRequirements(e.target.checked)}
              />
              <span className="text-gray-700 text-sm sm:text-base">
                I have extra requirements (Table, Chair, Cooler, Mats…)
              </span>
            </label>

            {extraRequirements && (
              <textarea
                className="w-full mt-4 p-4 border-2 border-[#ffd7c7] rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#ff8d61]"
                rows={4}
                placeholder="Please specify your extra requirements..."
                value={extraRequirementsText}
                onChange={(e) => setExtraRequirementsText(e.target.value)}
              />
            )}
          </div>

          {/* CTA Buttons */}
          <div className="w-full max-w-4xl mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Back */}
            <button
              onClick={() => dispatch(backToFormAction())}
              className="text-gray-600 hover:text-gray-800 transition text-sm sm:text-base"
            >
              ← Back
            </button>

            {/* Chat CTA */}
            <button
              type="button"
              onClick={openChatWithSocket}
              className="group cursor-pointer bg-white hover:bg-[#ea7e53] hover:text-white rounded-2xl pl-4 pr-2 
          flex items-center justify-between text-[#ea7e53] font-bold w-full sm:w-[260px] h-[48px]
          transform transition-transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1 active:scale-95 shadow-lg"
            >
              <span className="pb-[2px] text-base sm:text-lg">
                Booking → Open Chat
              </span>
              <span
                className="group-hover:bg-white arrowButton w-[30px] h-[30px] bg-[#ea7e53] rounded-xl 
            flex items-center justify-center transition duration-300"
              >
                <EastIcon
                  className="text-white group-hover:text-[#ea7e53] transition duration-300"
                  fontSize="medium"
                />
              </span>
            </button>
          </div>

          {/* Summary + Review + Payment */}
          <div className="w-full max-w-4xl mt-8">
            <EventFormSummary />

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <button
                onClick={() => {
                  const bookingDetails = {
                    ...formData,
                    vendors: selectedVendors,
                    customerId: localStorage.getItem("userId"),
                    amount: 250,
                    addons: [],
                    extraRequirements: extraRequirementsText,
                  };
                  navigate("/booking/review", {
                    state: { booking: bookingDetails },
                  });
                }}
                className="px-6 py-3 bg-amber-500 text-white rounded-lg font-semibold hover:bg-amber-600 text-center"
              >
                Review Booking
              </button>

              <button
                onClick={() => {
                  const bookingDetails = {
                    ...formData,
                    vendors: selectedVendors,
                    customerId: localStorage.getItem("userId"),
                    amount: 250,
                    addons: [],
                    extraRequirements: extraRequirementsText,
                  };
                  navigate("/booking/payment", {
                    state: { booking: bookingDetails },
                  });
                }}
                className="px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 text-center"
              >
                Proceed to Payment
              </button>
            </div>
          </div>
        </div>
      </div>
    );


  }



  /** =======================
   *  QUESTION-BY-QUESTION FORM
   *  ======================= */

  return (
    <div className="min-h-screen bg-[#ffeae2] flex items-center justify-center p-4 sm:p-6 md:p-10">
      <div className="w-full max-w-xl sm:max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-gray-600 text-xs sm:text-sm mb-2">
            <span>
              Question {currentStep + 1} of {questions.length}
            </span>
            <span>{Math.round(progress)}% complete</span>
          </div>

          <div className="w-full bg-[#ffddd0] rounded-full h-3 shadow-inner">
            <div
              className="bg-[#f77648] rounded-full h-3 transition-all duration-500 ease-out shadow-2xl"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 mb-8 border border-white/50 shadow-xl">
          {/* Upper Part */}
          <div className="flex items-center mb-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#ff7a49] rounded-2xl flex items-center justify-center mr-4 text-white shadow-lg text-2xl">
              {currentQuestion.icon}
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">
                {currentQuestion.title}
              </h1>
              <p className="text-gray-600 text-sm sm:text-base">
                {currentQuestion.subtitle}
              </p>
            </div>
          </div>

          {/* Input Types */}
          <div className="mb-8">
            {currentQuestion.type === "text" && (
              <input
                type="text"
                value={formData[currentQuestion.id] || ""}
                onChange={(e) =>
                  handleInputChange(currentQuestion.id, e.target.value)
                }
                onKeyPress={handleKeyPress}
                placeholder={currentQuestion.placeholder}
                className="w-full p-4 text-lg sm:text-xl bg-white border-2 border-[#ff885d] rounded-2xl text-gray-800 placeholder-gray-400 
              focus:outline-none focus:ring-2 focus:ring-[#ff885d] focus:border-transparent transition-all duration-200"
                autoFocus
              />
            )}

            {currentQuestion.type === "number" && (
              <input
                type="number"
                value={formData[currentQuestion.id] || ""}
                onChange={(e) =>
                  handleInputChange(currentQuestion.id, e.target.value)
                }
                onKeyPress={handleKeyPress}
                placeholder={currentQuestion.placeholder}
                className="w-full p-4 text-lg sm:text-xl bg-white border-2 border-[#ff885d] rounded-2xl 
              text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#ff885d] transition-all duration-200"
                autoFocus
              />
            )}

            {currentQuestion.type === "date" && (
              <input
                type="date"
                value={formData[currentQuestion.id] || ""}
                onChange={(e) =>
                  handleInputChange(currentQuestion.id, e.target.value)
                }
                onKeyPress={handleKeyPress}
                className="w-full p-4 text-lg sm:text-xl bg-white border-2 border-[#ff885d] 
              rounded-2xl text-gray-800 focus:ring-2 focus:ring-[#ff885d] transition-all duration-200"
              />
            )}

            {currentQuestion.type === "textarea" && (
              <textarea
                value={formData[currentQuestion.id] || ""}
                onChange={(e) =>
                  handleInputChange(currentQuestion.id, e.target.value)
                }
                onKeyPress={handleKeyPress}
                placeholder={currentQuestion.placeholder}
                rows={4}
                className="w-full p-4 text-lg sm:text-xl bg-white border-2 border-[#ff885d] rounded-2xl 
              text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-[#ff885d] transition-all duration-200 resize-none"
                autoFocus
              />
            )}

            {currentQuestion.type === "select" && (
              <div className="space-y-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    type="button"
                    key={index}
                    tabIndex={0}
                    onClick={() => {
                      handleInputChange(currentQuestion.id, option);
                      setTimeout(() => nextStep(), 100);
                    }}
                    onKeyPress={(e) => handleSelectKeyPress(e, option)}
                    className={`w-full text-lg sm:text-xl p-4 text-left rounded-2xl transition-all duration-200 
                    border-2 focus:outline-none focus:ring-2 focus:ring-[#ff885d] focus:ring-offset-2
                    ${
                      formData[currentQuestion.id] === option
                        ? "bg-[#ffcdb9] border-[#ff885d] text-gray-800 shadow-md"
                        : "bg-white border-[#ffc1ab] text-gray-700 hover:bg-[#fff1eb] hover:border-[#fa9e7d]"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center w-full max-w-xl sm:max-w-2xl">
          {/* PREVIOUS */}
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center text-base sm:text-lg px-4 sm:px-6 py-3 rounded-2xl transition-all duration-300 
            ${
              currentStep === 0
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-600 hover:bg-white hover:text-black hover:scale-105 hover:-translate-y-1"
            }`}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </button>

          {/* NEXT */}
          <button
            onClick={nextStep}
            disabled={!formData[currentQuestion.id]}
            className={`flex items-center text-base sm:text-lg px-6 sm:px-8 py-3 rounded-2xl transition-all duration-300 
            ${
              formData[currentQuestion.id]
                ? "bg-[#ff7a49] text-white transform hover:scale-105 hover:-translate-y-1 shadow-lg"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {currentStep === questions.length - 1
              ? bookingType === "let-us-do-it"
                ? "Choose Vendors"
                : "Find Vendors"
              : "Next"}
            <ChevronRight className="w-5 h-5 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );


};

export default EventPlanning;