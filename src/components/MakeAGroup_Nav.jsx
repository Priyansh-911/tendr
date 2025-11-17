import React, { useState, useEffect } from 'react'

import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

import logo from "../assets/logos/tendr-logo-secondary.png";
import DashboardIcon from '@mui/icons-material/Dashboard'; // Icon for Dashboard
import LogoutIcon from '@mui/icons-material/Logout'; // Icon for Logout


const MakeAGroup_Nav = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, token } = useSelector((state) => state.auth); // Get user and token from Redux
    const isAuthenticated = !!user && !!token; // Check if authenticated
    // const [index, setIndex] = useState(0);
    // const [isVisible, setIsVisible] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

    // Get the first letter of the user's name for the badge
    const userInitial = isAuthenticated && user.name ? user.name.charAt(0).toUpperCase() : '';

    // Handle clicking outside the modal to close it
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest(".user-badge") && !e.target.closest(".user-modal")) {
                setIsModalOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        dispatch(logout()).then(() => {
            navigate('/'); // Redirect to home page after logout
            setIsModalOpen(false); // Close modal
        });
    };

    const handleDashboard = () => {
        navigate('/dashboard'); // Navigate to dashboard
        setIsModalOpen(false); // Close modal
    };



    return (
      <>
        <div className="top w-full flex items-center justify-between px-3 py-3 sticky top-0 z-50">
          {/* Logo */}
          <div className="logo cursor-pointer" onClick={() => navigate("/")}>
            <img
              src={logo}
              alt="tendr logo"
              className="h-8 sm:h-14 md:h-16 transition duration-300 ease-in-out transform hover:-translate-y-1"
            />
          </div>

          {/* Authenticated User */}
          {isAuthenticated ? (
            <div className="relative flex items-center">
              {/* Badge */}
              <div
                onClick={() => setIsModalOpen(!isModalOpen)}
                className="w-10 h-10 bg-[#CCAB4A] text-white rounded-full flex items-center justify-center text-xl font-bold shadow-md cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95"
              >
                {userInitial}
              </div>

              {/* Modal */}
              {isModalOpen && (
                <div className="absolute top-12 right-0 w-44 sm:w-48 bg-[#F7F4EF] rounded-xl shadow-lg py-2 z-50">
                  {/* Dashboard */}
                  <div
                    onClick={handleDashboard}
                    className="flex items-center gap-2 px-4 py-2 text-[#D48060] font-semibold hover:bg-[#FFD3C3] cursor-pointer transition-colors"
                  >
                    <DashboardIcon fontSize="small" />
                    <span>Dashboard</span>
                  </div>

                  {/* Logout */}
                  <div
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-[#D48060] font-semibold hover:bg-[#FFD3C3] cursor-pointer transition-colors"
                  >
                    <LogoutIcon fontSize="small" />
                    <span>Logout</span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Not Logged In */
            <div className="btns flex items-center justify-end gap-2 w-auto">
              {/* Signup */}
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="bg-[#ea7e53] text-white rounded-xl px-4 py-2 font-bold w-24 sm:w-28 h-8 flex items-center justify-center transition duration-300 transform hover:scale-105 hover:-translate-y-1 active:scale-95"
              >
                Sign Up
              </button>

              {/* Signin */}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="bg-[#ea7e53] text-white rounded-xl px-4 py-2 font-bold w-24 sm:w-28 h-8 flex items-center justify-center transition duration-300 transform hover:scale-105 hover:-translate-y-1 active:scale-95"
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </>
    );
}

export default MakeAGroup_Nav
