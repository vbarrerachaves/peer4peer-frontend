import { useState } from "react";
import { API_URL } from "./config";

export default function NewRequestForm({ onCreated, notify }) {
  const [studentEmail, setEmail] = useState("");
  const [category, setCategory] = useState("general advising");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // Validation state
  const [errors, setErrors] = useState({});

  function validateForm() {
    const newErrors = {};

    // Email validation
    if (!studentEmail) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(studentEmail)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Description validation
    if (!description.trim()) {
      newErrors.description = "Description is required.";
    } else if (description.length < 10) {
      newErrors.description = "Description must be at least 10 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateForm()) {
      notify("Please fix the errors before submitting.", "error");
      return;
    }
if (!studentEmail.endsWith(".edu")) {
  notify("Please use a valid .edu email address", "error");
  return;
}

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/requests`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentEmail, category, description }),
      });

      const data = await res.json();
      setLoading(false);

      if (!res.ok) {
        throw new Error(data.error || "Failed to create request.");
      }

      notify("Request created successfully!");
      onCreated(data);

      // Reset form
      setEmail("");
      setCategory("general advising");
      setDescription("");
      setErrors({});
    } catch (err) {
      setLoading(false);
      notify(err.message || "Something went wrong.", "error");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-2xl mx-auto"
      noValidate
    >
      <h2 className="text-2xl text-center font-semibold mb-6 text-gray-800 dark:text-white">
        Create New Request
      </h2>

     {/* Email */}
<div className="mb-4">
  <label htmlFor="email" className="sr-only">
    Student email address
  </label>

  <input
    id="email"
    type="email"
    placeholder="Student Email"
    value={studentEmail}
    onChange={(e) => setEmail(e.target.value)}
    aria-invalid={!!errors.email}
    aria-describedby={errors.email ? "email-error" : undefined}
    className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
  />

  {errors.email && (
    <p
      id="email-error"
      className="text-sm text-red-500 mt-1"
    >
      {errors.email}
    </p>
  )}
</div>


      {/* Category */}
      <div className="mb-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          aria-label="Advising category"
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="general advising">General Advising</option>
          <option value="class registration">Class Registration</option>
          <option value="financial aid">Financial Aid</option>
        </select>
      </div>

      {/* Description */}
      <div className="mb-4">
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          aria-label="Request description"
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
        />
        {errors.description && (
          <p className="text-sm text-red-500 mt-1">{errors.description}</p>
        )}
      </div>

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 disabled:bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Saving..." : "Submit Request"}
        </button>
      </div>
    </form>
  );
}
