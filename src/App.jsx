import { useEffect, useState } from "react";
import { API_URL } from "./config";
import Navbar from "./Navbar";
import NewRequestForm from "./NewRequestForm";
import Toast from "./Toast";
import { enableDarkMode, disableDarkMode } from "./theme";

function App() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({ show: false, message: "" });

  function notify(msg) {
    setToast({ show: true, message: msg });
    setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 2500);
  }

  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // ⭐ Dark mode state sincronizado con <html>
  const [dark, setDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  function toggleTheme() {
    if (dark) {
      disableDarkMode();
      setDark(false);
    } else {
      enableDarkMode();
      setDark(true);
    }
  }

  const fetchRequests = async () => {
    setLoading(true);
    const res = await fetch(`${API_URL}/api/requests`);
    const data = await res.json();
    setRequests(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const normalizedQuery = query.toLowerCase();
  const filteredRequests = requests.filter((r) => {
    const matchesQuery =
      !normalizedQuery ||
      r.studentEmail.toLowerCase().includes(normalizedQuery) ||
      r.category.toLowerCase().includes(normalizedQuery) ||
      r.description.toLowerCase().includes(normalizedQuery);

    const matchesCategory =
      categoryFilter === "all" ||
      r.category.toLowerCase() === categoryFilter.toLowerCase();

    return matchesQuery && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 dark:text-white">

      {/* TOP BAR */}
      <div className="w-full flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow">
        <div className="text-2xl font-bold text-blue-600 dark:text-blue-300">
          Peer4Peer
        </div>

        {/* 🌙 / ☀️ BOTÓN DARK MODE BONITO */}
        <button
          onClick={toggleTheme}
          className="px-4 py-2 rounded-lg shadow border border-gray-300 
                     bg-white text-gray-800 hover:bg-gray-100
                     dark:bg-gray-700 dark:text-white dark:border-gray-600 
                     dark:hover:bg-gray-600 transition flex items-center gap-2 font-semibold"
        >
          {dark ? (
            <>
              ☀️ <span>Light Mode</span>
            </>
          ) : (
            <>
              🌙 <span>Dark Mode</span>
            </>
          )}
        </button>
      </div>

      {/* Toast */}
      <Toast message={toast.message} show={toast.show} />

      <div className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-5xl font-extrabold text-blue-600 dark:text-blue-300 mb-10 text-center">
          Peer4Peer – Advising Requests
        </h1>

        <NewRequestForm onCreated={fetchRequests} notify={notify} />

        {/* Search + filtro */}
        <div className="mt-8 flex flex-col md:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Search by email, category, or description..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
          />

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full md:w-56 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="general advising">General Advising</option>
            <option value="class registration">Class Registration</option>
            <option value="financial aid">Financial Aid</option>
          </select>
        </div>

        {/* Lista de requests */}
        {loading ? (
          <p className="text-center mt-6">Loading...</p>
        ) : (
          <div className="space-y-4 mt-8">
            {filteredRequests.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400">
                {requests.length === 0
                  ? "No requests yet."
                  : "No requests match your search."}
              </p>
            ) : (
              filteredRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-4 bg-white dark:bg-gray-800 shadow rounded-md border border-gray-200 dark:border-gray-700"
                >
                  <p className="font-bold text-blue-700 dark:text-blue-300">
                    {req.studentEmail}
                  </p>
                  <p className="text-sm italic text-gray-600 dark:text-gray-400">
                    {req.category}
                  </p>
                  <p className="mt-2">{req.description}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
