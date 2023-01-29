import React, { useRef, MouseEvent, Dispatch, SetStateAction } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/firebase-config";
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

  return (
    <div>
      <label htmlFor="name-input"></label>
      <input ref={inputRef} type="text" id="name-input" name="name-input" />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default SubmitScore;
