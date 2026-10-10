"use client";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const stored = localStorage.getItem("ciphertool-theme");
    const value = stored ? stored === "dark" : true;
    setDark(value);
    document.documentElement.dataset.theme = value ? "dark" : "light";
  }, []);
  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.dataset.theme = next ? "dark" : "light";
    localStorage.setItem("ciphertool-theme", next ? "dark" : "light");
  }
  return <button className="theme-toggle" onClick={toggle} aria-label="切換深淺主題">{dark ? "☼ 淺色" : "◐ 深色"}</button>;
}
