import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="fixed z-50 cursor-pointer bottom-5 right-5 p-3 rounded-full bg-zinc-800 text-white dark:bg-gray-200 dark:text-zinc-900 shadow-md hover:shadow-lg transition-all duration-300"
    >
      {theme === "dark" ? "🌞" : "🌙"}
    </button>
  );
}
