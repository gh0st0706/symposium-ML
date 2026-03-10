import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";

const initialState = {
  fullName: "",
  collegeName: "CSI College of Engineering",
  department: "Cybersecurity & AI & ML Departments",
  email: "",
  phoneNumber: "",
  eventSelected: "Hackathon",
  paymentStatus: "Pending"
};

function Register() {
  const [formData, setFormData] = useState(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("idle");

  const onChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatusMessage("");

    setIsSubmitting(true);

    const payload = {
      fullName: formData.fullName.trim(),
      collegeName: formData.collegeName.trim(),
      department: formData.department.trim(),
      email: formData.email.trim(),
      phone: formData.phoneNumber.trim(),
      eventSelected: formData.eventSelected,
      paymentStatus: formData.paymentStatus,
      submittedAt: new Date().toISOString()
    };

    try {
      const apiResponse = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const result = await apiResponse.json().catch(() => ({}));

      if (!apiResponse.ok || result.success === false) {
        throw new Error(result.message || "Registration could not be saved to Google Sheets.");
      }

      setStatusType("success");
      setStatusMessage("Registration submitted. Your data has been saved to Google Sheets.");
      setFormData(initialState);
    } catch (error) {
      setStatusType("error");
      setStatusMessage(error.message || "Submission failed. Please try again in a few moments.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-wrap min-h-[92vh] pt-32 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="mx-auto w-full max-w-3xl rounded-3xl border border-white/15 bg-slate-950/70 p-8 backdrop-blur-xl md:p-10"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">TechLynx Registration</p>
        <h1 className="mt-3 font-display text-3xl font-bold text-white md:text-4xl">Secure Your Spot</h1>
        <p className="mt-3 text-slate-300">Register for TechLynx 2026 by the Cybersecurity &amp; AI &amp; ML departments, CSI College of Engineering.</p>

        <form onSubmit={onSubmit} className="mt-8 grid gap-4 md:grid-cols-2">
          <label className="text-sm text-slate-200 md:col-span-2">
            Full Name
            <input className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none ring-cyan-300/40 focus:ring" name="fullName" value={formData.fullName} onChange={onChange} required />
          </label>
          <label className="text-sm text-slate-200">
            College Name
            <input className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none ring-cyan-300/40 focus:ring" name="collegeName" value={formData.collegeName} onChange={onChange} required />
          </label>
          <label className="text-sm text-slate-200">
            Department
            <input className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none ring-cyan-300/40 focus:ring" name="department" value={formData.department} onChange={onChange} required />
          </label>
          <label className="text-sm text-slate-200">
            Email
            <input type="email" className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none ring-cyan-300/40 focus:ring" name="email" value={formData.email} onChange={onChange} required />
          </label>
          <label className="text-sm text-slate-200">
            Phone Number
            <input className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none ring-cyan-300/40 focus:ring" name="phoneNumber" value={formData.phoneNumber} onChange={onChange} required pattern="[0-9]{10}" title="Enter a 10-digit phone number" />
          </label>
          <label className="text-sm text-slate-200">
            Event Selected
            <select className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none ring-cyan-300/40 focus:ring" name="eventSelected" value={formData.eventSelected} onChange={onChange}>
              <option className="bg-slate-900">Hackathon</option>
              <option className="bg-slate-900">Paper Presentation</option>
              <option className="bg-slate-900">AI Workshop</option>
              <option className="bg-slate-900">Technical Quiz</option>
              <option className="bg-slate-900">Design Sprint</option>
              <option className="bg-slate-900">Brand Battle</option>
              <option className="bg-slate-900">Cine Quiz</option>
              <option className="bg-slate-900">Treasure Hunt</option>
            </select>
          </label>
          <label className="text-sm text-slate-200">
            Payment Status
            <select className="mt-2 w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-white outline-none ring-cyan-300/40 focus:ring" name="paymentStatus" value={formData.paymentStatus} onChange={onChange}>
              <option className="bg-slate-900">Pending</option>
              <option className="bg-slate-900">Paid</option>
            </select>
          </label>

          {statusMessage ? (
            <p className={`md:col-span-2 text-sm ${statusType === "error" ? "text-rose-300" : "text-emerald-300"}`}>
              {statusMessage}
            </p>
          ) : null}

          <div className="mt-4 flex flex-wrap gap-4 md:col-span-2">
            <button type="submit" disabled={isSubmitting} className="gradient-btn disabled:cursor-not-allowed disabled:opacity-70">
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
            <Link to="/" className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-slate-200 hover:border-cyan-300/60 hover:text-cyan-200">
              Back Home
            </Link>
          </div>
        </form>
      </motion.div>
    </section>
  );
}

export default Register;
