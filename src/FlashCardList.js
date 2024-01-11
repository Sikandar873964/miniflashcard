/* eslint-disable */
import React, { useState, useEffect, useCallback } from "react";
import Flashcard from "./Flashcard";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { AiOutlineForward } from "react-icons/ai";
import "./flaschcardlist.css";
import { FaHourglassHalf, FaStar } from "react-icons/fa";
import Confetti from 'react-confetti'



export default function FlashcardList({flashcards,
    currentCardIndex,
    setCurrentCardIndex,
    totalQuestions,
    setTotalQuestions,
    score,
    setScore,
    resetQuiz,
    userFlashcards,
    initialTimer = 30,
    isQuizStarted,}) {

        // state hooks or variables to store state

    const [quizCompleted, setQuizCompleted] = useState(false);

  const [category, setCategory] = useState("default");
  const [customTimer, setCustomTimer] = useState(initialTimer);

  const [startAnim,setAnim]=useState(false)
    

//   setting question on page load
  useEffect(() => {
    setTotalQuestions(flashcards.length);
  }, [flashcards, setTotalQuestions]);

  const nextCard = useCallback(() => {
    if (currentCardIndex < totalQuestions - 1) {
      setCurrentCardIndex((prevIndex) => prevIndex + 1);
      setCustomTimer(initialTimer);
    } else {
      setQuizCompleted(true);
    }
  }, [
    currentCardIndex,
    totalQuestions,
    setCurrentCardIndex,
    setCustomTimer,
    initialTimer,
  ]);

  useEffect(() => {
    let interval;

    if (isQuizStarted && customTimer > 0) {
      interval = setInterval(() => {
        setCustomTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (customTimer <= 0) {
      nextCard();
    }

    return () => clearInterval(interval);
  }, [customTimer, isQuizStarted, nextCard]);
  useEffect(() => {
    setCustomTimer(initialTimer);
  }, [initialTimer]);

  const handleOptionSelect = (selectedOption) => {
    const correctAnswer = flashcards[currentCardIndex].answer;
    if (selectedOption === correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

//   function to finish or take another quiz

  const finishQuiz = () => {
    setQuizCompleted(true);
  };

  const takeAnotherQuiz = () => {
    resetQuiz();
    setQuizCompleted(false);
  };
  const { width, height } =[ 100,100]

  return (
    <div className="card-grid">
        <Confetti
        run={false}
        numberOfPieces={20}
      width={width}
      height={height}
    />
        {/* conditionally showing user generated categories */}
      {category === "user-generated" ? (
        userFlashcards.length > 0 ? (
          userFlashcards.map((flashcard) => (
            <Flashcard
              flashcard={flashcard}
              key={flashcard.id}
              onOptionSelect={handleOptionSelect}
            />
          ))
        ) : (
          <Typography>You haven't added any flashcards yet.</Typography>
        )
      ) : flashcards.length > 0 ? (
        <>
        {/* quiz completed section */}
          {quizCompleted ? (
            <>
              <Typography
                variant="h6"
                style={{ display: "flex", alignItems: "center" }}
              >
                {`Total Score: ${score} `}
                <FaStar
                  style={{
                    marginLeft: "5px",
                    color: "green",
                  }}
                />
              </Typography>

              <Button
                onClick={takeAnotherQuiz}
                sx={{
                  backgroundColor: "green",
                  color: (theme) => theme.palette.primary.contrastText,
                  "&:hover": {
                    backgroundColor: "lightgreen",
                  },
                  width: "200px",
                  height: "50px",
                }}
              >
                Take Another Quiz
              </Button>
            </>
          ) : (
            <>
              <Typography variant="h6">{`Question ${
                currentCardIndex + 1
              } out of ${totalQuestions}`}</Typography>

              <div style={{ display: "flex", alignItems: "center" }}>
                <FaHourglassHalf
                  className="hourglass-animation"
                  style={{ marginRight: "8px", color: "red" }}
                />
                <Typography variant="h6">{`Time Left: ${customTimer} seconds`}</Typography>
              </div>
              <Flashcard
                flashcard={flashcards[currentCardIndex]}
                key={flashcards[currentCardIndex].id}
                onOptionSelect={handleOptionSelect}
              />
              <TextField
                label="Increase Timer"
                type="number"
                value={customTimer}
                onChange={(e) => setCustomTimer(parseInt(e.target.value, 10))}
                InputProps={{ inputProps: { min: 10, max: 60 } }}
              />
              <div>
                {currentCardIndex === flashcards.length - 1 ? (
                  <Button
                    onClick={finishQuiz}
                    sx={{
                      backgroundColor: "red",
                      color: (theme) => theme.palette.primary.contrastText,
                      "&:hover": {
                        backgroundColor: "darkred",
                      },
                      width: "230px",
                      height: "50px",
                    }}
                  >
                    Finish Quiz
                  </Button>
                ) : (
                  <Button
                    onClick={nextCard}
                    sx={{
                      backgroundColor: (theme) => theme.palette.secondary.main,
                      color: (theme) => theme.palette.secondary.contrastText,
                      "&:hover": {
                        backgroundColor: (theme) =>
                          theme.palette.secondary.dark,
                      },
                      width: "230px",
                      height: "50px",
                    }}
                  >
                    Next Card
                  </Button>
                )}
              </div>
            </>
          )}
        </>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            color: "#2563EB",
          }}
        >
          <AiOutlineForward style={{ marginRight: "8px", fontSize: "100px" }} />
        </div>
      )}
    </div>
  );
}
