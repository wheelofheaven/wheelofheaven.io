// Add preload class to prevent transitions during page load
document.documentElement.classList.add("preload");

const globalDark =
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;
const localMode = localStorage.getItem("theme");

if (globalDark && localMode === null) {
  localStorage.setItem("theme", "dark");
  document.documentElement.setAttribute("data-dark-mode", "");
}

if (globalDark && localMode === "dark") {
  document.documentElement.setAttribute("data-dark-mode", "");
}

if (localMode === "dark") {
  document.documentElement.setAttribute("data-dark-mode", "");
}

// Remove preload class after a short delay to enable smooth transitions
window.addEventListener("load", () => {
  setTimeout(() => {
    document.documentElement.classList.remove("preload");
  }, 100);
});
