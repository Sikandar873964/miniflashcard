/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";

export default function Flashcard({ flashcard, onOptionSelect }) {


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
    </div>
  );
}
