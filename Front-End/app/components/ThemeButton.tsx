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

  const updateBackground = (newTheme: string) => {
    document.body.style.background =
      newTheme === "light"
        ? "linear-gradient(135deg, #E0E0E0 0%, #E0E0E0 100%)"
        : "";
  };

  const changeTheme = (newTheme: string) => {
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
        onChange={(e) => changeTheme(e.target.value)}
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
