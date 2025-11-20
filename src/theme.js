export function enableDarkMode() {
  document.documentElement.classList.add("dark");
  localStorage.setItem("theme", "dark");
}

export function disableDarkMode() {
  document.documentElement.classList.remove("dark");
  localStorage.setItem("theme", "light");
}

export function loadTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}
