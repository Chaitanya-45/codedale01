import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const REACT_APP_API_BASE_URL = "https://dotform-backend.onrender.com";

export default function FormFill() {
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [responses, setResponses] = useState({});
  const [submitMsg, setSubmitMsg] = useState("");

  useEffect(() => {
    async function fetchForm() {
      try {
        const res = await axios.get(
          `${REACT_APP_API_BASE_URL}/api/form/${formId}`
        );
        setForm(res.data);
      } catch (err) {
        console.error("Error fetching form", err);
      }
    }
    fetchForm();
  }, [formId]);

  const handleChange = (fieldName, value) => {
    setResponses((prev) => ({ ...prev, [fieldName]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${REACT_APP_API_BASE_URL}/api/form/${formId}/response`,
        { responses }
      );
      setSubmitMsg("Response submitted successfully!");
    } catch (err) {
      console.error("Error submitting response", err);
      setSubmitMsg("Error submitting form. Please try again.");
    }
  };

  if (!form) return <div>Loading form...</div>;

  return (
    <div className="min-h-screen p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">{form.title}</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
        {form.fields.map((field) => {
          const fieldName = field.name;
          switch (field.type) {
            case "Fullname":
              return (
                <div key={fieldName} className="mb-4">
                  <label className="block font-semibold">{field.label}</label>
                  <input
                    type="text"
                    className="border p-2 w-full"
                    onChange={(e) =>
                      handleChange(fieldName, e.target.value)
                    }
                    required
                  />
                </div>
              );
            case "Email":
              return (
                <div key={fieldName} className="mb-4">
                  <label className="block font-semibold">{field.label}</label>
                  <input
                    type="email"
                    className="border p-2 w-full"
                    onChange={(e) =>
                      handleChange(fieldName, e.target.value)
                    }
                    required
                  />
                </div>
              );
            case "Address":
              return (
                <div key={fieldName} className="mb-4">
                  <label className="block font-semibold">{field.label}</label>
                  <input
                    type="text"
                    className="border p-2 w-full"
                    onChange={(e) =>
                      handleChange(fieldName, e.target.value)
                    }
                    required
                  />
                </div>
              );
            case "Phone":
              return (
                <div key={fieldName} className="mb-4">
                  <label className="block font-semibold">{field.label}</label>
                  <input
                    type="tel"
                    className="border p-2 w-full"
                    onChange={(e) =>
                      handleChange(fieldName, e.target.value)
                    }
                    required
                  />
                </div>
              );
            case "Date picker":
              return (
                <div key={fieldName} className="mb-4">
                  <label className="block font-semibold">{field.label}</label>
                  <input
                    type="date"
                    className="border p-2 w-full"
                    onChange={(e) =>
                      handleChange(fieldName, e.target.value)
                    }
                    required
                  />
                </div>
              );
            case "Short text":
              return (
                <div key={fieldName} className="mb-4">
                  <label className="block font-semibold">{field.label}</label>
                  <input
                    type="text"
                    className="border p-2 w-full"
                    onChange={(e) =>
                      handleChange(fieldName, e.target.value)
                    }
                    required
                  />
                </div>
              );
            case "Long text":
              return (
                <div key={fieldName} className="mb-4">
                  <label className="block font-semibold">{field.label}</label>
                  <textarea
                    className="border p-2 w-full"
                    onChange={(e) =>
                      handleChange(fieldName, e.target.value)
                    }
                    required
                  ></textarea>
                </div>
              );
            case "Drop down":
              return (
                <div key={fieldName} className="mb-4">
                  <label className="block font-semibold">{field.label}</label>
                  <select
                    className="border p-2 w-full"
                    onChange={(e) => handleChange(fieldName, e.target.value)}
                    required
                  >
                    <option value="">Select an option</option>
                    {field.options.map((option, idx) => (
                      <option key={idx} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              );
            case "Single choice":
              return (
                <div key={fieldName} className="mb-4">
                  <p className="font-semibold">{field.label}</p>
                  {field.options.map((option, idx) => (
                    <div key={idx}>
                      <input
                        type="radio"
                        name={fieldName}
                        value={option}
                        onChange={(e) =>
                          handleChange(fieldName, e.target.value)
                        }
                        required
                      />
                      <span className="ml-2">{option}</span>
                    </div>
                  ))}
                </div>
              );
            case "Multiple choice":
              return (
                <div key={fieldName} className="mb-4">
                  <p className="font-semibold">{field.label}</p>
                  {field.options.map((option, idx) => (
                    <div key={idx}>
                      <input
                        type="checkbox"
                        value={option}
                        onChange={(e) => {
                          const prev =
                            responses[fieldName] instanceof Array
                              ? responses[fieldName]
                              : [];
                          if (e.target.checked) {
                            handleChange(fieldName, [...prev, option]);
                          } else {
                            handleChange(
                              fieldName,
                              prev.filter((o) => o !== option)
                            );
                          }
                        }}
                      />
                      <span className="ml-2">{option}</span>
                    </div>
                  ))}
                </div>
              );
            case "Number":
              return (
                <div key={fieldName} className="mb-4">
                  <label className="block font-semibold">{field.label}</label>
                  <input
                    type="number"
                    className="border p-2 w-full"
                    onChange={(e) =>
                      handleChange(fieldName, e.target.value)
                    }
                    required
                  />
                </div>
              );
            case "Image":
              return (
                <div key={fieldName} className="mb-4">
                  <label className="block font-semibold">{field.label}</label>
                  <input
                    type="file"
                    accept="image/*"
                    className="border p-2 w-full"
                    onChange={(e) =>
                      handleChange(fieldName, e.target.files[0])
                    }
                    required
                  />
                </div>
              );
            case "File upload":
              return (
                <div key={fieldName} className="mb-4">
                  <label className="block font-semibold">{field.label}</label>
                  <input
                    type="file"
                    className="border p-2 w-full"
                    onChange={(e) =>
                      handleChange(fieldName, e.target.files[0])
                    }
                    required
                  />
                </div>
              );
            case "Time":
              return (
                <div key={fieldName} className="mb-4">
                  <label className="block font-semibold">{field.label}</label>
                  <input
                    type="time"
                    className="border p-2 w-full"
                    onChange={(e) =>
                      handleChange(fieldName, e.target.value)
                    }
                    required
                  />
                </div>
              );
            case "Heading":
              return (
                <div key={fieldName} className="mb-4">
                  <h2 className="text-xl font-bold">{field.label}</h2>
                </div>
              );
            default:
              return null;
          }
        })}
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Submit Response
        </button>
      </form>
      {submitMsg && (
        <div className="mt-4 p-4 bg-green-100 rounded">
          <p>{submitMsg}</p>
        </div>
      )}
    </div>
  );
}