import React from 'react'
import { DndContext } from '@dnd-kit/core'
import CalculatorBuilder from './components/CalculatorBuilder'
import DarkModeToggle from './components/DarkModeToggle'
import './App.css'

const App = () => {
  return (
    <>
      <DndContext>
        <div className="flex h-screen">
          <DarkModeToggle />
          <div className="flex-1 flex justify-center items-center">
            <CalculatorBuilder />
          </div>
        </div>
      </DndContext>
    </>
  )
}

export default App
