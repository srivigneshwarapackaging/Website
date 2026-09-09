"use client";
import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({ isDark: false, toggleTheme: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('theme-pref');
    const hour = new Date().getHours();
    const isNight = hour < 6 || hour >= 18;

    if (saved) {
      setIsDark(saved === 'dark');
    } else {
      setIsDark(isNight);
    }
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme-pref', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme-pref', 'light');
    }
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme: () => setIsDark(!isDark) }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);