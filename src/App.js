import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import AddFlashcardModal from "./AddFlashcardModal";



function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userFlashcards, setUserFlashcards] = useState([]);


  const handleAddFlashcard = (question, options, correctAnswer) => {
    const newFlashcard = {
      id: `${Date.now()}`,
      question,
      answer: correctAnswer,
      options: options,
      userGenerated: true,
    };
    setUserFlashcards((prevFlashcards) => [...prevFlashcards, newFlashcard]);
  };

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

        <AddFlashcardModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddFlashcard={handleAddFlashcard}
        />

      
        </form>
</>
  );
}

export default App;
