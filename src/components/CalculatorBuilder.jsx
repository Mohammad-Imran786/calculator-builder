import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';

const CalculatorBuilder = () => {

  const [expression, setExpression] = useState('0');
  const [droppedComponents, setDroppedComponents] = useState([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false);
  const [history, setHistory] = useState([]); 
  const [redoHistory, setRedoHistory] = useState([]);

  const { theme } = useTheme();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const label = e.dataTransfer.getData('text/plain');
    
    setHistory([...history, { droppedComponents, expression }]);
    setRedoHistory([])
    
    setDroppedComponents([...droppedComponents, label]);
  };

  const handleButtonClick = (value) => {
    if (value === 'AC') {
      setExpression('0');
    } else if (value === '=') {
      try {
        const result = eval(expression === '0' ? '0' : expression);
        setExpression(result.toString());
      } catch {
        setExpression('Error');
      }
    } else {
      setExpression((prev) => (prev === '0' ? value : prev + value));
    }

    setHistory([...history, { droppedComponents, expression }]);
    setRedoHistory([]);
  };

  const handleRemoveComponent = (index) => {
    setHistory([...history, { droppedComponents, expression }]);
    setRedoHistory([]);

    setDroppedComponents(droppedComponents.filter((_, i) => i !== index));
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const lastState = history[history.length - 1];

    setRedoHistory([...redoHistory, { droppedComponents, expression }]);
    setDroppedComponents(lastState.droppedComponents);
    setExpression(lastState.expression);
    setHistory(history.slice(0, -1));
  };

  const handleRedo = () => {
    if (redoHistory.length === 0) return;
    const nextState = redoHistory[redoHistory.length - 1];

    setHistory([...history, { droppedComponents, expression }]);
    setDroppedComponents(nextState.droppedComponents);
    setExpression(nextState.expression);
    setRedoHistory(redoHistory.slice(0, -1));
  };

  return (
    <div className={`flex flex-col md:flex-row w-full min-h-screen transition-colors ${theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-gray-50 text-gray-800"}`}>
      {/* Main Calculator Area */}
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-2xl font-bold mb-5">
          Calculator Builder
        </h1>

        {/* Calculator Display and Drop Area */}
        <div className={`rounded-xl shadow-lg p-6 md:p-8 w-full max-w-lg transition-colors ${theme === "dark" ? "bg-gray-600" : "bg-white border border-1 border-gray-200"}`}>
          {/* Display */}
          <div className="bg-gray-50 p-5 text-right text-3xl font-mono rounded-lg mb-5 border border-gray-200 text-gray-900 transition-colors">
            {expression}
          </div>

          {/* Droppable Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`grid grid-cols-4 sm:grid-cols-4 gap-3 p-6 rounded-lg transition-all ${
              isDraggingOver
                ? 'bg-blue-50 border-2 border-blue-300 border-dashed'
                : 'border-2 border-gray-200 border-dashed'
            }`}
          >
            {droppedComponents.length > 0 ? (
              droppedComponents.map((component, index) => (
                <div key={index} className="relative group">
                  <button
                    onClick={() => handleButtonClick(component)}
                    className="p-4 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-pointer transition-all text-lg w-full text-gray-900"
                  >
                    {component}
                  </button>
                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveComponent(index)}
                    className="absolute -top-2 -right-2 bg-red-400 text-white text-xs p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:bg-red-500"
                  >
                    ❌
                  </button>
                </div>
              ))
            ) : (
              <div className="col-span-4 text-center py-8 text-gray-500">
                Drag & Drop Your Buttons here!
              </div>
            )}
          </div>

          {/* Undo/Redo Buttons */}
          <div className="flex justify-between mt-4">
            <button
              onClick={handleUndo}
              disabled={history.length === 0}
              className="px-5 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Undo
            </button>
            <button
              onClick={handleRedo}
              disabled={redoHistory.length === 0}
              className="px-5 py-2 text-white bg-green-500 hover:bg-green-600 rounded text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Redo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorBuilder;