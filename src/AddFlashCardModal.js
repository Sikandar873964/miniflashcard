import React, { useState } from "react";

function AddFlashcardModal({ isOpen, onClose, onAddFlashcard }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(Array(5).fill(""));
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);
  const [answerType, setAnswerType] = useState("text");
  

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
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

        
      </div>
    </div>
  );
}

export default AddFlashcardModal;
