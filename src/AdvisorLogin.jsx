import { useState } from "react";
import { useNavigate } from "react-router-dom";
import peer4peerLogo from "./assets/peer4peer-logo.png";

export default function AdvisorLogin() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    // 🔐 Demo credentials
    if (name.trim() === "") {
      alert("Please enter advisor name");
      return;
    }

    if (password === "advisor123") {
      localStorage.setItem("advisorLoggedIn", "true");
      localStorage.setItem("advisorName", name);

      //  CLAVE: navegar explícitamente
      navigate("/advisor", { replace: true });
    } else {
      alert("Incorrect credentials. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-black/60 backdrop-blur-md p-8 rounded-xl shadow-xl w-full max-w-sm text-center">

        {/* LOGO */}
        <img
          src={peer4peerLogo}
          alt="Peer4Peer"
          className="mx-auto h-16 mb-4 drop-shadow"
        />

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-blue-300 mb-1">
          Advisor Log In
        </h1>
        <p className="text-sm text-gray-300 mb-6">
          Peer4Peer • Advisor Portal
        </p>

        {/* FORM */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Advisor name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded-md bg-white text-black"
          />

          <input
            type="password"
            placeholder="Advisor password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded-md bg-white text-black"
          />

          <button
            type="submit"
            className="w-full py-2 rounded-md bg-blue-600 hover:bg-blue-700 transition font-semibold text-white"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
}
