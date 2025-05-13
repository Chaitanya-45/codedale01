import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./context/AuthContext";
import { 
  FaHeading, FaUser, FaEnvelope, FaHome, FaPhone, FaCalendarAlt, FaTextHeight,
  FaAlignLeft, FaList, FaDotCircle, FaCheckSquare, FaHashtag, FaImage, FaFileUpload,
  FaClock, FaPaperPlane, FaTimes 
} from "react-icons/fa";

const REACT_APP_API_BASE_URL = "https://dotform-backend.onrender.com";

export default function FormBuilder() {
  const [formTitle, setFormTitle] = useState("");
  const [formFields, setFormFields] = useState([]);
  const [shareableLink, setShareableLink] = useState("");
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const addField = (type) => {
    setFormFields([...formFields, { 
      type, 
      id: Date.now(), 
      label: type, 
      options: ["Option 1", "Option 2"] 
    }]);
  };

  const updateLabel = (id, newLabel) => {
    setFormFields(
      formFields.map(field => field.id === id ? { ...field, label: newLabel } : field)
    );
  };

  const updateOption = (fieldId, optionIndex, newOption) => {
    setFormFields(
      formFields.map(field => {
        if (field.id === fieldId) {
          const newOptions = [...field.options];
          newOptions[optionIndex] = newOption;
          return { ...field, options: newOptions };
        }
        return field;
      })
    );
  };

  const addOption = (fieldId) => {
    setFormFields(
      formFields.map(field => {
        if (field.id === fieldId) {
          return { ...field, options: [...field.options, `Option ${field.options.length + 1}`] };
        }
        return field;
      })
    );
  };

  const deleteField = (id) => {
    setFormFields(formFields.filter(field => field.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const preparedFields = formFields.map(field => ({
      label: field.label,
      name: field.label.replace(/\s+/g, "").toLowerCase(),
      type: field.type,
      options: field.options
    }));
    const formData = { title: formTitle, fields: preparedFields };
    try {
      const res = await axios.post(
        `${REACT_APP_API_BASE_URL}/api/form`,
        formData,
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );
      const link = `${window.location.origin}/form/${res.data._id}`;
      setShareableLink(link);
    } catch (error) {
      console.error("Error creating form", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F8] flex">
      <div className="w-1/4 p-4 bg-white shadow-md">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Components</h2>
        {[
          { type: "Fullname", icon: <FaUser /> },
          { type: "Email", icon: <FaEnvelope /> },
          { type: "Address", icon: <FaHome /> },
          { type: "Phone", icon: <FaPhone /> },
          { type: "Date picker", icon: <FaCalendarAlt /> },
          { type: "Short text", icon: <FaTextHeight /> },
          { type: "Long text", icon: <FaAlignLeft /> },
          { type: "Drop down", icon: <FaList /> },
          { type: "Single choice", icon: <FaDotCircle /> },
          { type: "Multiple choice", icon: <FaCheckSquare /> },
          { type: "Number", icon: <FaHashtag /> },
          { type: "Image", icon: <FaImage /> },
          { type: "File upload", icon: <FaFileUpload /> },
          { type: "Time", icon: <FaClock /> },
        ].map((field) => (
          <button
            key={field.type}
            onClick={() => addField(field.type)}
            className="w-full mb-2 px-4 py-2 bg-[#FE6059] text-white font-medium rounded-md hover:bg-red-600 flex items-center"
          >
            {field.icon} <span className="ml-2">{field.type}</span>
          </button>
        ))}
      </div>
      <div className="w-3/4 p-4">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Form Preview</h2>
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Form Title"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          {formFields.map((field) => (
            <div key={field.id} className="mb-4 relative">
              <button
                type="button"
                onClick={() => deleteField(field.id)}
                className="absolute top-0 right-0 mt-2 mr-2 text-red-500 hover:text-red-700"
              >
                <FaTimes />
              </button>
              <input
                type="text"
                value={field.label}
                onChange={(e) => updateLabel(field.id, e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2 font-bold text-lg"
              />
              {field.type === "Fullname" && (
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  disabled
                />
              )}
              {field.type === "Email" && (
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  disabled
                />
              )}
              {field.type === "Address" && (
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  disabled
                />
              )}
              {field.type === "Phone" && (
                <input
                  type="tel"
                  placeholder="Phone"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  disabled
                />
              )}
              {field.type === "Date picker" && (
                <input
                  type="date"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  disabled
                />
              )}
              {field.type === "Short text" && (
                <input
                  type="text"
                  placeholder="Short Text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  disabled
                />
              )}
              {field.type === "Long text" && (
                <textarea
                  placeholder="Long Text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  disabled
                />
              )}
              {field.type === "Drop down" && (
                <select className="w-full px-4 py-2 border border-gray-300 rounded-md">
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>
              )}
              {field.type === "Single choice" && (
                <div>
                  {field.options.map((option, index) => (
                    <div key={index} className="flex items-center mb-1">
                      <input
                        type="radio"
                        name={`single-choice-${field.id}`}
                        className="mr-2"
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => updateOption(field.id, index, e.target.value)}
                        className="border border-gray-300 rounded-md px-2 py-1"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addOption(field.id)}
                    className="mt-2 px-4 py-2 bg-[#FE6059] text-white font-medium rounded-md hover:bg-red-600"
                  >
                    Add Option
                  </button>
                </div>
              )}
              {field.type === "Multiple choice" && (
                <div>
                  {field.options.map((option, index) => (
                    <div key={index} className="flex items-center mb-1">
                      <input
                        type="checkbox"
                        className="mr-2"
                      />
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => updateOption(field.id, index, e.target.value)}
                        className="border border-gray-300 rounded-md px-2 py-1"
                      />
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addOption(field.id)}
                    className="mt-2 px-4 py-2 bg-[#FE6059] text-white font-medium rounded-md hover:bg-red-600"
                  >
                    Add Option
                  </button>
                </div>
              )}
              {field.type === "Number" && (
                <input
                  type="number"
                  placeholder="Number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  disabled
                />
              )}
              {field.type === "Image" && (
                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  disabled
                />
              )}
              {field.type === "File upload" && (
                <input
                  type="file"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  disabled
                />
              )}
              {field.type === "Time" && (
                <input
                  type="time"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  disabled
                />
              )}
            </div>
          ))}
          <div>
            <button type="submit" className="w-full px-4 py-2 bg-[#FE6059] text-white font-medium rounded-md hover:bg-red-600">
              Submit
            </button>
          </div>
        </form>
        {shareableLink && (
          <div className="mt-4 p-4 bg-green-100 rounded">
            <p className="text-green-800 font-semibold">Shareable Link:</p>
            <a href={shareableLink} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
              {shareableLink}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
