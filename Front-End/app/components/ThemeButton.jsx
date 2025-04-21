"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const themes = [
  "light",
  "dark",
  "winter",
  "garden",
  "luxury",
  "night",
  "synthwave",
  "caramellatte",
];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = Cookies.get("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateBackground(savedTheme);
  }, []);

  // Update the background when the theme changes
  const updateBackground = (currentTheme) => {
    document.body.style.background =
      currentTheme === "light"
        ? "linear-gradient(135deg, #E0E0E0 0%, #E0E0E0 100%)"
        : ""; // Adjust for other themes if needed
  };

  // Change theme function to update theme state, document attribute, and cookies
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    Cookies.set("theme", newTheme, { expires: 365 });
    updateBackground(newTheme);
  };

  return (
    <div className="bg-base-200 p-2 rounded-lg shadow-lg">
      <select
        className="select select-bordered"
        value={theme}
        onChange={(e) => changeTheme(e.target.value)} // Pass the new theme here
      >
        {themes.map((themeOption) => (
          <option key={themeOption} value={themeOption}>
            {themeOption.charAt(0).toUpperCase() + themeOption.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}