import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import create from "./assets/11554177.jpg";
import { AuthContext } from "./context/AuthContext";
import { Dialog } from "@headlessui/react";

const REACT_APP_API_BASE_URL = "https://dotform-backend.onrender.com";

export default function Dashboard() {
  const { auth, logout } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState(null);
  const [forms, setForms] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [formToDelete, setFormToDelete] = useState(null);

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
    logout();
    navigate('/login');
  };

  const handleDeleteForm = async () => {
  try {
    console.log(`Attempting to delete form: ${formToDelete}`);
    
    const response = await axios.delete(`${REACT_APP_API_BASE_URL}/api/form/${formToDelete}`, {
      headers: { Authorization: `Bearer ${auth.token}` },
    });
    
    console.log("Delete response:", response.data);
    setForms(forms.filter(form => form._id !== formToDelete));
    
    setIsDeleteDialogOpen(false);
    setFormToDelete(null);
  } catch (error) {
    console.error("Failed to delete form", error.response?.data || error.message);
    alert(`Error deleting form: ${error.response?.data?.msg || error.message}`);
  }
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
    onClick={() => navigate('/response', { state: { selectedFormId: form._id } })}
    className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow relative cursor-pointer"
  >
    <button
      onClick={(e) => {
        e.stopPropagation(); // Prevent card click when clicking delete button
        setFormToDelete(form._id);
        setIsDeleteDialogOpen(true);
      }}
      className="absolute top-2 right-2 text-red-500 hover:text-red-700"
      aria-label="Delete form"
    >
      <FaTrash />
    </button>
    <h3 className="text-xl font-semibold mb-2 text-gray-800">
      {form.title}
    </h3>
    <p className="text-gray-600 mb-4">{form.description}</p>
    <a
      onClick={(e) => e.stopPropagation()} // Prevent card click when clicking link
      href={`${window.location.origin}/?formId=${form._id}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block mt-2 text-blue-600 font-semibold px-3 py-1 border-b-2 border-blue-600 rounded hover:bg-blue-50 transition-colors"
    >
      Link to the form
    </a>
  </div>
))}
        </div>
      </div>
            <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6">
            <Dialog.Title className="text-lg font-medium text-gray-900">
              Delete Form
            </Dialog.Title>
            <Dialog.Description className="mt-2 text-sm text-gray-500">
              Are you sure you want to delete this form? This action cannot be undone.
            </Dialog.Description>

            <div className="mt-4 flex space-x-4 justify-end">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                onClick={handleDeleteForm}
              >
                Delete
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
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
