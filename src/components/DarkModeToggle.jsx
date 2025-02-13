import { useTheme } from "../context/ThemeContext";

const DarkModeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="fixed top-4 right-4 sm:top-10 sm:right-20 z-50">
      <button
        onClick={toggleTheme}
        className="p-3 sm:p-4 rounded-full shadow-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 cursor-pointer transition-all duration-200"
      >
        {theme === "dark" ? "🌞" : "🌙"}
      </button>
    </div>
  );
};

export default DarkModeToggle;
