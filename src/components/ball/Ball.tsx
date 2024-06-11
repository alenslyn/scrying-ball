import React from "react";
import { IoMdRefresh } from "react-icons/io";
import useBallLogic from "./useBallLogic";
import "./Ball.css";

interface BallProps {
  score: number;
}

const Ball: React.FC<BallProps> = ({ score }) => {
  const {
    isPressed,
    text,
    showReRoll,
    isThinking,
    thinkingText,
    handleClick,
    handleReRoll,
  } = useBallLogic(score);

  return (
    <div className="ball-container">
      <div className="ball-inner">
        <div
          className={`ball ${isPressed ? "ball-pressed" : ""} ${
            showReRoll ? "ball-big" : ""
          } ${isThinking ? "ball-thinking" : ""}`}
          onClick={handleClick}
        ></div>
        <p className="ball-text">{isThinking ? thinkingText : text}</p>
      </div>
      {showReRoll && (
        <div className="reroll-icon" onClick={handleReRoll}>
          <IoMdRefresh />
        </div>
      )}
    </div>
  );
};

export default Ball;
