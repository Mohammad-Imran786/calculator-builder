import React from "react";
import { DndContext } from "@dnd-kit/core";
import "./App.css";
import CalculatorBuilder from "./components/CalculatorBuilder";
import Sidebar from "./components/Sidebar";
import DarkModeToggle from "./components/DarkModeToggle"; // Import Toggle

const App = () => {
  return (
    <>
      <DndContext>
        <div className="flex h-screen">
          <DarkModeToggle />
          <Sidebar />
          <div className="flex-1 flex justify-center items-center">
            <CalculatorBuilder />
          </div>
        </div>
      </DndContext>
    </>
  );
};

export default App;
