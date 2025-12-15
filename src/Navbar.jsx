import peer4peerLogo from "./assets/peer4peer-logo.png";
import { useEffect, useState } from "react";
import { enableDarkMode, disableDarkMode } from "./theme";

export default function Navbar() {
  const [dark, setDark] = useState(false);

  // 🔥 Cuando carga la app, leer si ya existe modo dark
  useEffect(() => {
    const html = document.documentElement;
    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
      html.classList.add("dark");
      setDark(true);
    } else {
      html.classList.remove("dark");
      setDark(false);
    }
  }, []);

  // 🔥 Toggle del tema
  const toggleDark = () => {
    const html = document.documentElement;

    if (html.classList.contains("dark")) {
      disableDarkMode();
      setDark(false);  // sincronizar
    } else {
      enableDarkMode();
      setDark(true);   // sincronizar
    }
  };

  return (
    <div className="w-full flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 shadow">
      <div className="flex items-center gap-3">
  <img
    src={peer4peerLogo}
    alt="Peer4Peer"
    className="h-8 md:h-9 w-auto drop-shadow"
  />
</div>


      <button
        onClick={toggleDark}
        className="
          flex items-center gap-2 px-4 py-2 rounded-lg border
          bg-white dark:bg-gray-900
          text-gray-800 dark:text-gray-200
          hover:bg-gray-100 dark:hover:bg-gray-700
          transition shadow font-semibold
        "
      >
        {dark ? "🌙 Dark Mode" : "🌞 Light Mode"}
      </button>
    </div>
  );
}
