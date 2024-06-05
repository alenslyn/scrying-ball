import { useState } from "react";
import "./Ball.css";

const Ball = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [text, setText] = useState("Well...");

  const handleClick = () => {
    setIsPressed(true);
    setText(text === "Well..." ? "Try again?" : "Again?");
    setTimeout(() => {
      setIsPressed(false);
    }, 200);
  };

  return (
    <div className="ball-container">
      <div
        className={`ball ${isPressed ? "ball-pressed" : ""}`}
        onClick={handleClick}
      ></div>
      <p className="ball-text">{text}</p>
    </div>
  );
};

export default Ball;
