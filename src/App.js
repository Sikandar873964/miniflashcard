import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";


function App() {

  

  function handleSubmit(e) {
    console.log("handleSubmit");
    e.preventDefault();
  }
  
  return (
    <>
      <ToastContainer />
      <form
        className="flex flex-col items-center p-4 "
        style={{ backgroundColor: "#FAD402" }}
        onSubmit={handleSubmit}
      >
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            
          }}
          className="py-2 px-4 bg-blue-700 text-white rounded hover:bg-blue-600"
        >
          Manage Flashcards
        </button>

      
        </form>
</>
  );
}

export default App;
