import { useTheme } from '../context/ThemeContext'

const DarkModeToggle = () => {

    const { theme, toggleTheme } = useTheme()

    return (
        <button
            onClick={toggleTheme}
            className="fixed top-2 right-2 sm:top-4 sm:right-4 lg:top-6 lg:right-6 z-50 p-2 sm:p-3 rounded-full shadow-md bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-all duration-200"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
            {theme === "dark" ? "🌞" : "🌙"}
        </button>
    )
}

export default DarkModeToggle