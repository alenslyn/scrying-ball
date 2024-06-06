import { useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import "./Ball.css";

const Ball: React.FC = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [text, setText] = useState("Well...");
  const [pressCount, setPressCount] = useState(0);
  const [showReRoll, setShowReRoll] = useState(false);

  const handleClick = () => {
    if (pressCount < 2) {
      setPressCount((prevCount) => prevCount + 1);
      setIsPressed(true);
      setText((prevText) => (prevText === "Well..." ? "Try again?" : "Again?"));
      setTimeout(() => {
        setIsPressed(false);
      }, 220);
    } else {
      setText("Here is your answer!");
      setShowReRoll(true);
    }
  };

  const handleReRoll = () => {
    setPressCount(0);
    setText("Well...");
    setShowReRoll(false);
    setIsPressed(false);
  };

  return (
    <div className="ball-container">
      <div className="ball-inner">
        <div
          className={`ball ${isPressed ? "ball-pressed" : ""} ${
            showReRoll ? "ball-big" : ""
          }`}
          onClick={handleClick}
        ></div>
        <p className="ball-text">{text}</p>
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
