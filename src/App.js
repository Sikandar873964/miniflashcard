import './App.css';
import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import AddFlashcardModal from "./AddFlashCardModal";
import FlashcardList from './FlashCardList';
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";




// whenever our website loads this is the first function that is called

function App() {

  // variable that store state
  const [flashcards, setFlashcards] = useState([]);
  const [timer, setTimer] = useState(30);
  const [score, setScore] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userFlashcards, setUserFlashcards] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [userDefinedTime, setUserDefinedTime] = useState(20);
  const [isQuizStarted, setIsQuizStarted] = useState(false);
  const [totalQuestions, setTotalQuestions] = useState(0);

//life cycle functions or inbuilt functions in react
  useEffect(() => {
    const storedFlashcards = JSON.parse(
      localStorage.getItem("userFlashcards") || "[]"
    );
    setUserFlashcards(storedFlashcards);
  }, []);

  useEffect(() => {
    localStorage.setItem("userFlashcards", JSON.stringify(userFlashcards));
  }, [userFlashcards]);

  const categoryEl = useRef();
  const amountEl = useRef();


  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php").then((res) => {
      setCategories(res.data.trivia_categories);
    });
  }, []);


//custom function 

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

  // string decoding function 

  function decodeString(str) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = str;
    return textArea.value;
  }

  // submit button  handle function

  function handleSubmit(e) {
    console.log("handleSubmit");
    e.preventDefault();

    if (selectedCategory === "user-generated") {
      setFlashcards(userFlashcards);
      setTotalQuestions(userFlashcards.length);
      setCurrentCardIndex(0);
      setTimer(userDefinedTime);
      setScore(0);
      return;
    }
//API call to get the external data form opentdb
    axios
      .get("https://opentdb.com/api.php", {
        params: {
          amount: amountEl.current.value,
          category: categoryEl.current.value,
        },
      })
      .then((res) => {
        setFlashcards(
          res.data.results.map((questionItem, index) => {
            const answer = decodeString(questionItem.correct_answer);
            const options = [
              ...questionItem.incorrect_answers.map((a) => decodeString(a)),
              answer,
            ];
            return {
              id: `${index}-${Date.now()}`,
              question: decodeString(questionItem.question),
              answer: answer,
              options: options.sort(() => Math.random() - 0.5),
            };
          })
        );

        setCurrentCardIndex(0);
        setTimer(userDefinedTime);
        setTotalQuestions(res.data.results.length);
        setScore(0);
      }).catch((error) => {
        if (error.response && error.response.status === 429) {
          alert("Some Error Occurred. Please try again later.");
          window.location.reload();
        } else {
          alert("An error occurred. Please try again.");
        }
      });
  }

  function resetQuiz() {
    console.log("resetQuiz");
    setFlashcards([]);

    setTimer(userDefinedTime);
    setCurrentCardIndex(0);
    setTotalQuestions(0);
    setScore(0);
  }
  
  return (
    <>
      <ToastContainer />
      <form
        className="flex flex-col items-center p-4 "
        style={{ backgroundColor: "#FAD402" }}
        onSubmit={handleSubmit}
      >
        {/* button to add the flash cards manually */}
         <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            setIsModalOpen(true);
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

{/* categories selection section  */}
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
            {/* addedd sorting through Quicksort */}
            {categories.sort(function (a,b){
              if(a.name.toLowerCase()<b.name.toLowerCase()) return -1;
              if(a.name.toLowerCase()>b.name.toLowerCase()) return 1;
              return 0
            }).map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
            <option value="user-generated">My Flashcards</option>
          </select>
        </div>

        {selectedCategory !== "user-generated" && (
          <div className="form-group mb-6">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-gray-700"
              style={{ color: "#0E2B6F", fontSize: 20 }}
            >
              Number of Questions
            </label>
            <select
              id="amount"
              ref={amountEl}
              className="mt-1 block w-full p-2 border rounded-md shadow-sm bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              {[...Array(9)].map((_, index) => (
                <option key={index} value={(index + 2) * 5}>
                  {(index + 2) * 5}
                </option>
              ))}
            </select>
          </div>
        )}
{/* time limit section */}
<div className="form-group mb-6">
          <label
            htmlFor="timer"
            className="block text-sm font-medium text-gray-700"
            style={{ color: "#0E2B6F", fontSize: 20 }}
          >
            Time Limit (in seconds)
          </label>
          <input
            type="number"
            id="timer"
            value={userDefinedTime}
            onChange={(e) => setUserDefinedTime(parseInt(e.target.value, 10))}
            min={10}
            className="mt-1 p-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="form-group">
          {/* {{setting categories here }} */}
          <button
            className="mt-4 py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => {
              if (!selectedCategory) {
                toast.info(
                  "Please select a category before starting the FlashCard."
                );
                return;
              }
              if (
                selectedCategory === "user-generated" &&
                userFlashcards.length === 0
              ) {
                toast.info("No flashcards found. Please add a flashcard.");
                return;
              }
              setIsQuizStarted(true);
              resetQuiz();
            }}
          >
            Use FlashCards
          </button>
        </div>      
        </form>
        {/* List all the flash cards */}
        {isQuizStarted && (
        <div
          className="flex justify-center items-center bg-beige "
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#0E2B6F",
          }}
        >
          <div className="bg-white p-8 rounded-lg shadow-xl mt-8">
            <FlashcardList
              flashcards={flashcards}
              timer={timer}
              setTimer={setTimer}
              currentCardIndex={currentCardIndex}
              setCurrentCardIndex={setCurrentCardIndex}
              totalQuestions={totalQuestions}
              setTotalQuestions={setTotalQuestions}
              score={score}
              setScore={setScore}
              resetQuiz={resetQuiz}
              initialTimer={userDefinedTime}
              isQuizStarted={isQuizStarted}
            />
          </div>
        </div>
      )}
</>
  );
}

export default App;
