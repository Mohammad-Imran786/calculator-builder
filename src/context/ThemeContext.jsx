import { createContext, useContext, useEffect, useState } from "react";

// Create a Theme Context
const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Get theme from localStorage or system preference
  const getInitialTheme = () => {
    if (localStorage.getItem("theme")) {
      return localStorage.getItem("theme");
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  };

  const [theme, setTheme] = useState(getInitialTheme());

  useEffect(() => {
    // Apply theme when component mounts
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom Hook to use ThemeContext
export const useTheme = () => {
  return useContext(ThemeContext);
};
