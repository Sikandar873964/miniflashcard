/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";

export default function Flashcard({ flashcard, onOptionSelect }) {


    useEffect(setMaxHeight, [
        flashcard.question,
        flashcard.answer,
        flashcard.options,
      ]);


    const handleCardClick = () => {
        if (flashcard.options.length === 1 || flashcard.options.length === 0) {
          setFlipWithSound(!flip);
        } else if (selectedOption) {
          setFlipWithSound(!flip);
        }
      };

    useEffect(() => {
        window.addEventListener("resize", setMaxHeight);
        return () => window.removeEventListener("resize", setMaxHeight);
      }, []);

    const handleRadioChange = (event) => {
        if (!optionDisabled) {
          setSelectedOption(event.target.value);
          onOptionSelect(event.target.value);
          setOptionDisabled(true);
        } else {
          alert("You can only select an option once.");
        }
      };

    const setFlipWithSound = (value) => {
        if (value) {
          flipAudio.play();
        }
        setFlip(value);
      };

  return (
    <div
    className={`card ${flip ? "flip" : ""} ${
      flashcard.userGenerated ? "user-generated" : ""
    }`}
    style={{ height: height }}
    onClick={handleCardClick}
  >
    <Typography className="front " ref={frontEl}>
      {flashcard.question}
      {flashcard.options.length > 1 && (
        <div className="flashcard-options mt-4">
          {flashcard.options.map((option) => (
            <div className="radio-option mb-2">
              <FormControlLabel
                control={
                  <Radio
                    id={option}
                    name="flashcardOptions"
                    value={option}
                    checked={selectedOption === option}
                    onChange={handleRadioChange}
                    disabled={flip || optionDisabled}
                    color="primary"
                  />
                }
                label={option}
                htmlFor={option}
              />
            </div>
          ))}
        </div>
      )}
    </Typography>
    <Typography
        className="back bg-green-200 text-green-800 p-4 rounded-md mt-4"
        ref={backEl}
      >
        {flashcard.answer}
      </Typography>
    </div>
  );
}
