import { useState, useEffect } from "react";
import { IoMdRefresh } from "react-icons/io";
import "./Ball.css";

const Ball: React.FC = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [text, setText] = useState("Well...");
  const [pressCount, setPressCount] = useState(0);
  const [showReRoll, setShowReRoll] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingText, setThinkingText] = useState("Hmm");

  useEffect(() => {
    if (isThinking) {
      let dotCount = 0;
      const interval = setInterval(() => {
        dotCount = (dotCount + 1) % 4;
        setThinkingText(`Hmm${".".repeat(dotCount)}`);
      }, 500);

      return () => clearInterval(interval);
    }
  }, [isThinking]);

  const handleClick = () => {
    if (pressCount < 2) {
      setPressCount((prevCount) => prevCount + 1);
      setIsPressed(true);
      setText((prevText) => (prevText === "Well..." ? "Try again?" : "Again?"));
      setTimeout(() => {
        setIsPressed(false);
      }, 220);
    } else {
      setIsThinking(true);
      setText("Hmm");
      setTimeout(() => {
        setText("Here is your answer!");
        setIsThinking(false);
        setShowReRoll(true);
      }, 5000);
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
