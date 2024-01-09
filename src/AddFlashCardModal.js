import React, { useState } from "react";

function AddFlashcardModal({ isOpen, onClose, onAddFlashcard }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(Array(5).fill(""));
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);
  const [answerType, setAnswerType] = useState("text");
  const [userFlashcards, setUserFlashcards] = useState(
    JSON.parse(localStorage.getItem("userFlashcards") || "[]")
  );
  const [selectedFlashcardIds, setSelectedFlashcardIds] = useState([]);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const toggleFlashcardSelection = (id) => {
    setSelectedFlashcardIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((selectedId) => selectedId !== id)
        : [...prevIds, id]
    );
  };

  const handleSubmit = () => {
    if (!question.trim()) {
      alert("Please enter the question.");
      return;
    }

    let validOptions;
    if (answerType === "options") {
      validOptions = options.filter((option) => option.trim() !== "");
      if (validOptions.length < 2) {
        alert("Please provide at least two options.");
        return;
      }
    } else {
      validOptions = [options[0].trim()];
      if (!validOptions[0]) {
        alert("Please enter the answer.");
        return;
      }
    }

    const correctAnswer = options[correctAnswerIndex];
    onAddFlashcard(question, validOptions, correctAnswer);
    onClose();
    window.location.reload();
  };



  return (
    <div
      className={`fixed inset-0 flex items-center justify-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="bg-white p-8 rounded-lg shadow-xl">
        <h2 className="text-xl mb-4">Add Flashcard</h2>
        <div className="mb-4">
          <input
            type="radio"
            id="textAnswer"
            name="answerType"
            value="text"
            checked={answerType === "text"}
            onChange={() => setAnswerType("text")}
          />
          <label htmlFor="textAnswer" className="ml-2">
            Text Answer
          </label>
          <input
            type="radio"
            id="optionAnswer"
            name="answerType"
            value="options"
            checked={answerType === "options"}
            onChange={() => setAnswerType("options")}
            className="ml-4"
          />
          <label htmlFor="optionAnswer" className="ml-2">
            Option Answer
          </label>
        </div>

        <input
          type="text"
          placeholder="Enter the question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="mb-4 p-2 border rounded-md w-full"
        />

        {answerType === "options" ? (
          options.map((option, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="mb-2 p-2 border rounded-md w-full"
            />
          ))
        ) : (
          <input
            type="text"
            placeholder="Enter the answer"
            value={options[0]}
            onChange={(e) => handleOptionChange(0, e.target.value)}
            className="mb-4 p-2 border rounded-md w-full"
          />
        )}
        {answerType === "options" && (
          <>
            <h2 className="text-xl mb-4">Select Answer From Options</h2>
            <select
              value={correctAnswerIndex}
              onChange={(e) => setCorrectAnswerIndex(e.target.value)}
              className="mb-4 p-2 border rounded-md w-full"
            >
              {options.map((option, index) => {
                if (option.trim() !== "") {
                  return (
                    <option key={index} value={index}>
                      {`Option ${index + 1}`}
                    </option>
                  );
                }
                return null;
              })}
            </select>
          </>
        )}

<div className="flex justify-between">
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mr-2"
          >
            Add
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cancel
          </button>
        </div>

        <div className="mt-4">
          <h3 className="text-lg mb-2">Your Flashcards</h3>
          {userFlashcards.map((flashcard) => (
            <div key={flashcard.id} className="mb-2 flex items-center">
              <input
                type="checkbox"
                checked={selectedFlashcardIds.includes(flashcard.id)}
                onChange={() => toggleFlashcardSelection(flashcard.id)}
                className="mr-2"
              />
              <span className="mb-2 p-2 flex-grow border border-black rounded-md">
                {flashcard.question}
              </span>
            </div>
          ))}
          </div>

        
      </div>
    </div>
  );
}

export default AddFlashcardModal;
