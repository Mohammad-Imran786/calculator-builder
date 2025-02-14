import DraggableButton from './DraggableButton'
import { useTheme } from '../context/ThemeContext'

const buttons = ['7', '8', '9', '+', '4', '5', '6', '-', '1', '2', '3', '*', '0', '=', 'AC', '/']

const Sidebar = () => {

    const { theme } = useTheme()

    const handleDragStart = (e, label) => {
        e.dataTransfer.setData('text/plain', label)
    }

    return (
        <aside className={`w-full lg:w-1/4 p-3 sm:p-4 shadow-md border-r transition-colors ${theme === "dark"
                ? "border-gray-700 bg-gray-900 text-white"
                : "border-gray-200 bg-gray-100 text-black"
            }`}>
            <h2 className="mt-3 sm:mt-5 text-lg sm:text-xl text-center font-semibold mb-3">
                Buttons
            </h2>

            <div className="grid grid-cols-4 gap-2 p-2 sm:p-4 bg-gray-50 rounded-lg border border-gray-200">
                {buttons.map((btn) => (
                    <DraggableButton key={btn} label={btn} onDragStart={handleDragStart} />
                ))}
            </div>

            <p className="mt-6 sm:mt-10 lg:mt-20 text-sm sm:text-base font-thin text-center px-2">
                The buttons above can be used to build your own calculator.
                So, what are you waiting for? Just drag and drop your buttons inside
                the droppable box of the calculator builder and enjoy it!
            </p>
        </aside>
    )
}

export default Sidebar