import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import axios from "axios";
import create from "./assets/11554177.jpg";
import { AuthContext } from "./context/AuthContext";

const REACT_APP_API_BASE_URL = "http://localhost:5001";

export default function Dashboard() {
  const { auth, logout } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState(null);
  const [forms, setForms] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const slides = [
    {
      title: "Home",
      description: "Overview and quick shortcuts to navigate your account.",
      moreInfo: "Check your overall stats, recent updates, and manage your account."
    },
    {
      title: "My Forms",
      description: "Manage and view all your existing forms in one place.",
      moreInfo: "Organize, edit, or remove any form that you've created."
    },
    {
      title: "Create",
      description: "Build new forms or get started with a template.",
      moreInfo: "Customize form elements, design before publishing, and share easily."
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentSlide]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(
          `${REACT_APP_API_BASE_URL}/api/auth/profile`,
          {
            headers: { Authorization: `Bearer ${auth.token}` },
          }
        );
        console.log("Fetched user profile:", res.data);
        setUserProfile(res.data);
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      }
    };

    const fetchForms = async () => {
      try {
        const res = await axios.get(
          `${REACT_APP_API_BASE_URL}/api/form/myforms`,
          {
            headers: { Authorization: `Bearer ${auth.token}` },
          }
        );
        console.log(res.data);
        setForms(res.data);
      } catch (err) {
        console.error("Error fetching forms", err);
      }
    };

    if (auth && auth.token) {
      fetchUserProfile();
      fetchForms();
    }
  }, [auth]);

  const handleLogout = () => {
    logout(); // Clear auth context and localStorage
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="min-h-screen bg-[#FFF8F8] flex flex-col items-center p-8">
      <div className="w-full max-w-4xl text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Welcome back, {userProfile && userProfile.username ? userProfile.username : "Loading..."}!
        </h1>
        <button
          onClick={() => navigate('/FormBuilder')}
          className="px-4 py-2 bg-[#FE6059] text-white font-medium rounded-md hover:bg-red-600"
        >
          + Create Form
        </button>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-[#FE6059] text-white font-medium rounded-md hover:bg-red-600 ml-4"
        >
          Logout
        </button>
        <img
          src={create}
          alt="Dashboard Illustration"
          className="mt-6 w-full max-w-md mx-auto rounded-lg shadow-md"
        />
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Recent Forms</h1>
      <div className="w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forms.map((form) => (
            <div
              key={form._id}
              className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {form.title}
              </h3>
              <p className="text-gray-600 mb-4">{form.description}</p>
              {form._id && (
                <a
                  href={`${window.location.origin}/form/${form._id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-blue-600 font-semibold px-3 py-1 border-b-2 border-blue-600 rounded hover:bg-blue-50 transition-colors"
                >
                  Link to the form
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12 w-full max-w-4xl px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Site Navigation Guide
        </h2>
        <div className="relative group">
          {/* Slider Container */}
          <div className="overflow-hidden rounded-xl shadow-sm">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="w-full flex-shrink-0 p-8 bg-white border border-gray-200"
                >
                  <div className="max-w-md mx-auto space-y-4">
                    <h3 className="text-2xl font-bold text-gray-800 text-center text-[#FE6059]">
                      {slide.title}
                    </h3>
                    <p className="text-lg text-gray-600 text-center leading-relaxed">
                      {slide.description}
                    </p>
                    <p className="text-base mt-2 text-gray-500 text-center">
                      {slide.moreInfo}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 p-3 rounded-full shadow-md transition-all duration-300 border border-gray-200"
          >
            <FiChevronLeft className="w-6 h-6 text-[#FE6059]" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-50 p-3 rounded-full shadow-md transition-all duration-300 border border-gray-200"
          >
            <FiChevronRight className="w-6 h-6 text-[#FE6059]" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-[#FE6059] w-6' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}