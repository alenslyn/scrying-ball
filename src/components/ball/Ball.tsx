import React from "react";
import { IoMdRefresh } from "react-icons/io";
import useBallLogic from "./useBallLogic";
import "./Ball.css";

interface BallProps {
  score: number;
  onReRoll: () => void;
}

const Ball: React.FC<BallProps> = ({ score, onReRoll }) => {
  const {
    isPressed,
    text,
    showReRoll,
    isThinking,
    thinkingText,
    imageSrc,
    handleClick,
    handleReRoll: handleInternalReRoll,
  } = useBallLogic(score);

  const handleReRollClick = () => {
    handleInternalReRoll();
    onReRoll();
  };

  return (
    <div className="ball-container">
      <div className="ball-inner">
        <div
          className={`ball ${isPressed ? "ball-pressed" : ""} ${
            showReRoll ? "ball-big" : ""
          } ${isThinking ? "ball-thinking" : ""}`}
          onClick={handleClick}
        ></div>
        <p onClick={handleClick} className="ball-text">
          {isThinking ? thinkingText : text}
        </p>
        {imageSrc && (
          <img src={imageSrc} alt="score result" className="ball-image" />
        )}
      </div>
      {showReRoll && (
        <div className="reroll-icon" onClick={handleReRollClick}>
          <IoMdRefresh />
        </div>
      )}
    </div>
  );
};

export default Ball;
