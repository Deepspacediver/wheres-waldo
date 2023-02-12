import React, { useRef, MouseEvent, Dispatch, SetStateAction } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
import { convertTime } from "../../helpers/utilFunctions";
import "./SubmitScore.styles.css";

interface SubmitScoreProps {
  time: number;
  setIsScoreSubmit: Dispatch<SetStateAction<boolean>>;
}

const SubmitScore = ({ time, setIsScoreSubmit }: SubmitScoreProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    console.log(inputRef.current?.value);
    if (!inputRef.current?.value) return;
    try {
      console.log("ayo");
      await addDoc(collection(db, "players"), {
        name: inputRef.current.value,
        time: time,
      });
      inputRef.current.value = "";
      setIsScoreSubmit(true);
    } catch (err) {
      console.error("Failed to submit the score", err);
    }
  };

  const { minutes, seconds } = convertTime(time);

  return (
    <div className="submit-modal">
      <section className="submit-modal__result">
        <p>Your time:</p>
        <p className="submit-modal__time">
          {minutes}:{seconds}
        </p>
      </section>
      <label htmlFor="name-input" className="submit-modal__name-label">
        Enter your name :
      </label>
      <input
        ref={inputRef}
        type="text"
        className="submit-modal__name-input"
        id="name-input"
        name="name-input"
        placeholder="Name"
        maxLength={8}
      />
      <button className="btn btn_submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default SubmitScore;
