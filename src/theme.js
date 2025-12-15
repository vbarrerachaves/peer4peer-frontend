export function initTheme() {
  if (typeof window === "undefined") return;

  const saved = localStorage.getItem("theme");

  if (saved === "light") {
    document.documentElement.classList.remove("dark");
  } else {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
}

export function toggleTheme() {
  if (typeof window === "undefined") return;

  const html = document.documentElement;
  const isDark = html.classList.contains("dark");

  if (isDark) {
    html.classList.remove("dark");
    localStorage.setItem("theme", "light");
  } else {
    html.classList.add("dark");
    localStorage.setItem("theme", "dark");
  }
}

export function getTheme() {
  if (typeof window === "undefined") return "dark";
  return document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";
}
