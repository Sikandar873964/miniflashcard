/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import flipSound from "./notification.wav";
import Typography from "@mui/material/Typography";

export default function Flashcard({ flashcard, onOptionSelect }) {

  // variables to store state of the component

    const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState("initial");
  const [selectedOption, setSelectedOption] = useState(null);
  const [optionDisabled, setOptionDisabled] = useState(false);

    const frontEl = useRef();
  const backEl = useRef();

  const flipAudio = new Audio(flipSound);

//   setting dimentions for the card

  function setMaxHeight() {
    const frontHeight = frontEl.current.getBoundingClientRect().height;
    const backHeight = backEl.current.getBoundingClientRect().height;
    setHeight(Math.max(frontHeight, backHeight, 100));
  }

// setting options for the card
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
// custom function to handle radio button changes
    const handleRadioChange = (event) => {
        if (!optionDisabled) {
          setSelectedOption(event.target.value);
          onOptionSelect(event.target.value);
          setOptionDisabled(true);
        } else {
          alert("You can only select an option once.");
        }
      };
// custon function to flip cards with sound
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
