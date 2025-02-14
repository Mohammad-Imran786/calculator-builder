import React, { memo } from 'react'
import { useTheme } from '../context/ThemeContext'

const DraggableButton = memo(({ label, onDragStart }) => {
  
  const { theme } = useTheme()

  return (
    <button
      draggable
      onDragStart={(e) => onDragStart(e, label)}
      className={`w-full p-2 sm:p-3 text-base sm:text-lg font-semibold rounded cursor-grab transition-colors ${
        theme === "dark" 
          ? "bg-blue-800 text-white hover:bg-blue-900" 
          : "bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white"
      }`}
    >
      {label}
    </button>
  )
})

export default DraggableButton