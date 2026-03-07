import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialForm = {
  fullName: "",
  collegeName: "CSI College of Engineering",
  department: "CSE - Artificial Intelligence and Machine Learning",
  email: "",
  phone: "",
  eventSelected: "Paper Presentation",
  paymentStatus: "Pending",
};

const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

function RegistrationForm() {
  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    if (!GOOGLE_SCRIPT_URL) {
      setError("Missing API URL. Set VITE_GOOGLE_SCRIPT_URL in .env.");
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify(formData),
      });

      if (response.type === "opaque") {
        navigate("/success");
        return;
      }

      const text = await response.text();
      let payload = {};
      try {
        payload = JSON.parse(text);
      } catch (_) {
        payload = { success: response.ok };
      }

      if (!response.ok || payload.success === false) {
        throw new Error(payload.message || "Submission failed");
      }

      navigate("/success");
    } catch (submitError) {
      setError(submitError.message || "Unable to submit form.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="card form-grid" onSubmit={handleSubmit}>
      <label>
        Full Name
        <input
          required
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
        />
      </label>

      <label>
        College Name
        <input
          required
          name="collegeName"
          value={formData.collegeName}
          onChange={handleChange}
        />
      </label>

      <label>
        Department
        <input
          required
          name="department"
          value={formData.department}
          onChange={handleChange}
        />
      </label>

      <label>
        Email
        <input
          required
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="name@email.com"
        />
      </label>

      <label>
        Phone Number
        <input
          required
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          pattern="[0-9]{10}"
          title="Enter a 10-digit phone number"
          placeholder="9876543210"
        />
      </label>

      <label>
        Event Selected
        <select name="eventSelected" value={formData.eventSelected} onChange={handleChange}>
          <option>Paper Presentation</option>
          <option>Project Expo</option>
          <option>AI Quiz</option>
          <option>Hackathon</option>
        </select>
      </label>

      <label>
        Payment Status
        <select name="paymentStatus" value={formData.paymentStatus} onChange={handleChange}>
          <option>Pending</option>
          <option>Paid</option>
        </select>
      </label>

      {error ? <p className="error-text">{error}</p> : null}

      <button className="btn btn-primary" type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit Registration"}
      </button>
    </form>
  );
}

export default RegistrationForm;
