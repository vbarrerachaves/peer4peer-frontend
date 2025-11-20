import { useState } from "react";
import { API_URL } from "./config";

export default function NewRequestForm({ onCreated, notify }) {
  const [studentEmail, setEmail] = useState("");
  const [category, setCategory] = useState("general advising");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`${API_URL}/api/requests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ studentEmail, category, description }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      notify("Request created successfully!");
      onCreated(data);
      setEmail("");
      setCategory("general advising");
      setDescription("");
    } else {
      alert("Error: " + data.error);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-2xl mx-auto"
    >
      <h2 className="text-2xl text-center font-semibold mb-6 text-gray-800 dark:text-white">
        Create New Request
      </h2>

      <div className="mb-4">
        <input
          placeholder="Student Email"
          value={studentEmail}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="general advising">General Advising</option>
          <option value="class registration">Class Registration</option>
          <option value="financial aid">Financial Aid</option>
        </select>
      </div>

      <div className="mb-4">
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
        />
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
