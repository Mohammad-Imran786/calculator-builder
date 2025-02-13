import React from 'react'
import { useTheme } from '../context/ThemeContext'


const DraggableButton = ({ label, onDragStart }) => {

  const { theme } = useTheme();

  return(
  <button
    draggable
    onDragStart={(e) => onDragStart(e, label)}
    className={`p-3 font-semibold text-lg rounded cursor-grab transition-colors
      ${theme === "dark" ? "bg-blue-800 text-white hover:bg-blue-900" : "bg-blue-100 text-blue-600 hover:bg-blue-600 hover:text-white"}`}
  >
    {label}
  </button>
  )
};

export default DraggableButton