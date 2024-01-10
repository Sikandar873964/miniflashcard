import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import AddFlashcardModal from "./AddFlashcardModal";



function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userFlashcards, setUserFlashcards] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);






  const categoryEl = useRef();



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

<div className="form-group mb-6">
          <label
            htmlFor="category"
            className="block text-white text-lg font-bold"
            style={{ color: "#0E2B6F", fontSize: 20 }}
          >
            Category
          </label>
          <select
            id="category"
            ref={categoryEl}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              if (
                e.target.value === "user-generated" &&
                userFlashcards.length === 0
              ) {
                toast.info("No flashcards found. Please add a flashcard.");
              }
            }}
            defaultValue=""
            className="mt-1 block w-full p-2 border rounded-md shadow-sm bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
            <option value="user-generated">My Flashcards</option>
          </select>
        </div>

      
        </form>
</>
  );
}

export default App;
