import React, { useState } from 'react'
import { evaluate } from 'mathjs'
import { useTheme } from '../context/ThemeContext'
import Sidebar from './Sidebar'

const CalculatorBuilder = () => {

  const [expression, setExpression] = useState('0')
  const [droppedComponents, setDroppedComponents] = useState([])
  const [isDraggingOver, setIsDraggingOver] = useState(false)
  const [history, setHistory] = useState([])
  const [redoHistory, setRedoHistory] = useState([])

  const { theme } = useTheme()

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDraggingOver(false)
    const label = e.dataTransfer.getData('text/plain')

    setHistory(prev => [...prev, { droppedComponents, expression }])
    setRedoHistory([])
    setDroppedComponents(prev => [...prev, label])
  }

  const handleButtonClick = (value) => {
    setHistory(prev => [...prev, { droppedComponents, expression }])
    setRedoHistory([])

    if (value === 'AC') {
      setExpression('0')
    } else if (value === '=') {
      try {
        const result = evaluate(expression === '0' ? '0' : expression);
        setExpression(result.toString())
      } catch {
        setExpression('Error')
      }
    } else {
      setExpression(prev => prev === '0' ? value : prev + value)
    }
  }

  const handleHistory = (type) => {
    if (type === 'undo' && history.length > 0) {
      const lastState = history[history.length - 1]
      setRedoHistory(prev => [...prev, { droppedComponents, expression }])
      setDroppedComponents(lastState.droppedComponents)
      setExpression(lastState.expression)
      setHistory(prev => prev.slice(0, -1))
    }
    else if (type === 'redo' && redoHistory.length > 0) {
      const nextState = redoHistory[redoHistory.length - 1]
      setHistory(prev => [...prev, { droppedComponents, expression }])
      setDroppedComponents(nextState.droppedComponents)
      setExpression(nextState.expression)
      setRedoHistory(prev => prev.slice(0, -1))
    }
  }

  return (
    <div className={`flex flex-col lg:flex-row w-full min-h-screen transition-colors ${theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}>
      <Sidebar />
      <div className="flex-1 flex flex-col items-center justify-center p-4 lg:p-8">
        <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Calculator Builder</h1>

        <div className={`w-full max-w-lg rounded-xl shadow-lg p-4 sm:p-6 lg:p-8 transition-colors ${theme === "dark" ? "bg-gray-600" : "bg-white border border-gray-200"
          }`}>
          <div className="bg-gray-50 p-3 sm:p-5 text-right text-2xl sm:text-3xl font-mono rounded-lg mb-4 sm:mb-5 border border-gray-200 text-gray-900">
            {expression}
          </div>

          <div
            onDragOver={(e) => { e.preventDefault(); setIsDraggingOver(true); }}
            onDragLeave={() => setIsDraggingOver(false)}
            onDrop={handleDrop}
            className={`grid grid-cols-4 gap-2 sm:gap-3 p-4 sm:p-6 rounded-lg transition-all ${isDraggingOver
                ? 'bg-blue-50 border-2 border-blue-300 border-dashed'
                : 'border-2 border-gray-200 border-dashed'
              }`}
          >
            {droppedComponents.length > 0 ? (
              droppedComponents.map((component, index) => (
                <div key={index} className="relative group">
                  <button
                    onClick={() => handleButtonClick(component)}
                    className="w-full p-2 sm:p-4 bg-gray-200 rounded-lg hover:bg-gray-300 transition-all text-base sm:text-lg text-gray-900 cursor-pointer"
                  >
                    {component}
                  </button>
                  <button
                    onClick={() => {
                      setHistory(prev => [...prev, { droppedComponents, expression }])
                      setRedoHistory([])
                      setDroppedComponents(prev => prev.filter((_, i) => i !== index))
                    }}
                    className="absolute -top-2 -right-2 bg-red-400 text-white text-xs p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-red-500"
                  >
                    ❌
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-4 text-center py-6 sm:py-8 text-gray-500 text-sm sm:text-base">
                Drag & Drop Your Buttons here!
              </div>
            )}
          </div>

          <div className="flex justify-between mt-4">
            <button
              onClick={() => handleHistory('undo')}
              disabled={history.length === 0}
              className="px-4 sm:px-5 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Undo
            </button>
            <button
              onClick={() => handleHistory('redo')}
              disabled={redoHistory.length === 0}
              className="px-4 sm:px-5 py-2 text-white bg-green-500 hover:bg-green-600 rounded text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Redo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalculatorBuilder