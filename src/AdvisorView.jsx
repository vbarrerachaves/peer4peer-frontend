import { useEffect, useState } from "react";
import { API_URL } from "./config";
import { Navigate } from "react-router-dom";

/* ---------------- LOGOUT ---------------- */
function handleLogout() {
  localStorage.removeItem("advisorLoggedIn");
  localStorage.removeItem("advisorName");
  window.location.href = "/advisor/login";
}

export default function AdvisorView({ notify }) {
  const isLoggedIn = localStorage.getItem("advisorLoggedIn") === "true";

  if (!isLoggedIn) {
    return <Navigate to="/advisor/login" replace />;
  }

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [replyText, setReplyText] = useState({});

  /* ---------------- FETCH REQUESTS ---------------- */
  async function fetchRequests() {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/requests`);
      const data = await res.json();
      setRequests(data);
    } catch {
      notify("Failed to load requests", "error");
    } finally {
      setLoading(false);
    }
  }

  /* ---------------- UPDATE STATUS ---------------- */
  async function updateStatus(id, status) {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status } : r))
    );

    try {
      await fetch(`${API_URL}/api/requests/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      notify("Status updated");
    } catch {
      notify("Status update failed", "error");
      fetchRequests();
    }
  }

  /* ---------------- SEND REPLY ---------------- */
  async function sendReply(id) {
    const message = replyText[id];

    if (!message || !message.trim()) {
      notify("Reply cannot be empty", "error");
      return;
    }

    try {
      await fetch(`${API_URL}/api/requests/${id}/reply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      notify("Reply sent");
      setReplyText((prev) => ({ ...prev, [id]: "" }));
      fetchRequests();
    } catch {
      notify("Failed to send reply", "error");
    }
  }

  /* ---------------- DELETE REQUEST ---------------- */
  async function deleteRequest(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this request? This action cannot be undone."
    );

    if (!confirmed) return;

    try {
      const res = await fetch(`${API_URL}/api/requests/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error();

      notify("Request deleted");
      fetchRequests();
    } catch {
      notify("Failed to delete request", "error");
    }
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  /* ---------------- UI ---------------- */
  return (
    <div className="max-w-5xl mx-auto px-6 py-10 text-white">
      <h2 className="text-4xl font-bold text-center mb-6 text-blue-300">
        Advisor Dashboard
      </h2>

      <div className="flex justify-end mb-6">
        <button
          onClick={handleLogout}
          className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 transition"
        >
          Log Out
        </button>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className="p-4 bg-white/10 backdrop-blur rounded-md border border-white/20"
            >
              <p className="font-bold text-blue-300">{req.studentEmail}</p>
              <p className="italic text-sm text-gray-300">{req.category}</p>
              <p className="mt-2">{req.description}</p>

              {req.advisorResponse && (
                <div className="mt-3 p-3 bg-green-900/40 rounded-md border-l-4 border-green-400">
                  <p className="font-semibold">Advisor response:</p>
                  <p>{req.advisorResponse}</p>
                </div>
              )}

              <textarea
                className="w-full mt-3 p-2 rounded-md bg-black/40 text-white"
                placeholder="Write advisor response..."
                value={replyText[req.id] || ""}
                onChange={(e) =>
                  setReplyText({ ...replyText, [req.id]: e.target.value })
                }
              />

              <div className="flex flex-wrap items-center gap-4 mt-3">
                <button
                  onClick={() => sendReply(req.id)}
                  className="px-4 py-1 bg-blue-600 rounded hover:bg-blue-700"
                >
                  Send Reply
                </button>

                <select
                  value={req.status || "New"}
                  onChange={(e) => updateStatus(req.id, e.target.value)}
                  className="p-1 rounded bg-black/40"
                >
                  <option>New</option>
                  <option>In Progress</option>
                  <option>Resolved</option>
                </select>

                <button
                  onClick={() => deleteRequest(req.id)}
                  className="px-3 py-1 bg-red-600 rounded hover:bg-red-700 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
