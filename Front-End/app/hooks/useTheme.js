"use client";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function useTheme() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = Cookies.get("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const updateTheme = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    Cookies.set("theme", newTheme, { expires: 365 });
  };

  const toggleTheme = () => {
    updateTheme(theme === "light" ? "night" : "light");
  };

  return { theme, setTheme: updateTheme, toggleTheme };
}
