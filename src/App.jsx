import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import brooklynBg from "./assets/brooklyn-01.jpg";
import peer4peerLogo from "./assets/peer4peer-logo.png";
import sfcLogo from "./assets/sfc-logo.png";


import { API_URL } from "./config";
import NewRequestForm from "./NewRequestForm";
import AdvisorView from "./AdvisorView";
import About from "./About";
import Toast from "./Toast";
import AdvisorLogin from "./AdvisorLogin";


function App() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  function notify(message, type = "success") {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type });
    }, 2500);
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

  const filteredRequests = requests.filter((r) => {
    const q = query.toLowerCase();
    const matchesQuery =
      !q ||
      r.studentEmail.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q);

    const matchesCategory =
      categoryFilter === "all" ||
      r.category.toLowerCase() === categoryFilter.toLowerCase();

    return matchesQuery && matchesCategory;
  });

  return (
    <BrowserRouter>
      {/* BACKGROUND */}
      <div
        className="min-h-screen bg-cover bg-center"
        style={{ backgroundImage: `url(${brooklynBg})` }}
      >
        <div className="min-h-screen bg-black/60 text-white">

          {/* NAVBAR */}
<div className="w-full flex items-center px-6 py-4 bg-black/60 backdrop-blur shadow">

  {/* LEFT: SFC + Peer4Peer */}
  <div className="flex items-center gap-3">
    <img
      src={sfcLogo}
      alt="St. Francis College"
      className="h-8 opacity-80"
    />
    <img
      src={peer4peerLogo}
      alt="Peer4Peer"
      className="h-10 drop-shadow"
    />
  </div>

  {/* CENTER: NAV */}
  <div className="flex-1 flex justify-center gap-6 text-sm font-semibold">
    <Link to="/" className="hover:underline">Student</Link>
    <Link to="/advisor" className="hover:underline">Advisor</Link>
    <Link to="/about" className="hover:underline">About</Link>
  </div>

  {/* RIGHT: RESERVED (future toggle/settings) */}
  <div className="w-[120px]" />
</div>



          <Toast message={toast.message} show={toast.show} type={toast.type} />

    <Routes>
  {/* ABOUT */}
  <Route path="/about" element={<About />} />

  {/* ADVISOR LOGIN */}
  <Route path="/advisor/login" element={<AdvisorLogin />} />

  {/* ADVISOR DASHBOARD */}
  <Route path="/advisor" element={<AdvisorView notify={notify} />} />

  {/* STUDENT VIEW (HOME) */}
  <Route
    path="/"
    element={
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* TITLE */}
        <div className="text-center mb-12">
          <img
            src={peer4peerLogo}
            alt="Peer4Peer"
            className="mx-auto h-20 md:h-24 drop-shadow-[0_6px_20px_rgba(0,0,0,0.6)]"
          />
          <h1 className="text-5xl font-extrabold text-blue-300">
            Advising Requests
          </h1>
        </div>

        {/* BEFORE YOU SUBMIT */}
        <div className="mb-10 p-6 bg-white/10 backdrop-blur rounded-md border-l-4 border-blue-400">
          <h2 className="text-xl font-bold mb-2 text-blue-300">
            Before you submit
          </h2>
          <ul className="list-disc pl-5 space-y-1 text-sm text-gray-200">
            <li>Use this form for academic advising questions</li>
            <li>Be clear and specific in your description</li>
            <li>Advisors respond within a reasonable timeframe</li>
            <li>You can track status and responses below</li>
          </ul>
        </div>

        <NewRequestForm onCreated={fetchRequests} notify={notify} />

        {/* SEARCH */}
        <div className="mt-8 flex gap-4">
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 p-2 rounded-md bg-white text-black"
          />

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="p-2 rounded-md bg-white text-black"
          >
            <option value="all">All Categories</option>
            <option value="general advising">General Advising</option>
            <option value="class registration">Class Registration</option>
            <option value="financial aid">Financial Aid</option>
          </select>
        </div>

        {/* REQUESTS */}
        <div className="space-y-4 mt-8">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            filteredRequests.map((req) => (
              <div
                key={req.id}
                className="p-4 bg-white/10 backdrop-blur rounded-md border border-white/20"
              >
                <p className="font-bold text-blue-300">
                  {req.studentEmail}
                </p>
                <p className="italic text-sm text-gray-300">
                  {req.category}
                </p>
                <p className="mt-2">{req.description}</p>

                {/* STATUS */}
                <span
                  className={`inline-block mt-3 px-3 py-1 text-xs font-semibold rounded-full
                    ${
                      req.status === "New"
                        ? "bg-yellow-400 text-yellow-900"
                        : req.status === "In Progress"
                        ? "bg-blue-500 text-white"
                        : "bg-green-500 text-white"
                    }
                  `}
                >
                  Status: {req.status || "New"}
                </span>

                {/* RESPONSE */}
                {req.advisorResponse && (
                  <div className="mt-3 p-3 bg-green-900/40 rounded-md border-l-4 border-green-400">
                    <p className="text-sm font-semibold">
                      Advisor response:
                    </p>
                    <p className="text-sm">{req.advisorResponse}</p>
                  </div>

                )}
              </div>
            ))
          )}
        </div>
      </div>
    }
  />
  
</Routes>

 {/* FOOTER  */}
        <footer className="w-full py-4 flex justify-center items-center gap-3 bg-black/40 backdrop-blur text-gray-300 text-sm">
          <img
            src={sfcLogo}
            alt="St. Francis College"
            className="h-8 opacity-70"
          />
          St. Francis College
          <span className="opacity-50">•</span>

  <img
    src={peer4peerLogo}
    alt="Peer4Peer"
    className="h-7 opacity-80"
  />
        </footer>

        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
