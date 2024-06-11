import { useState, useEffect } from "react";

interface UseBallLogic {
  isPressed: boolean;
  text: string;
  showReRoll: boolean;
  isThinking: boolean;
  thinkingText: string;
  handleClick: () => void;
  handleReRoll: () => void;
}

const useBallLogic = (score: number): UseBallLogic => {
  const [isPressed, setIsPressed] = useState(false);
  const [text, setText] = useState("Well...");
  const [pressCount, setPressCount] = useState(0);
  const [showReRoll, setShowReRoll] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingText, setThinkingText] = useState("Let's see");

  useEffect(() => {
    if (isThinking) {
      let dotCount = 0;
      const interval = setInterval(() => {
        dotCount = (dotCount + 1) % 4;
        setThinkingText(`Let's see${".".repeat(dotCount)}`);
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
        setIsThinking(false);
        setText(`That's ${score}`);
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

  return {
    isPressed,
    text,
    showReRoll,
    isThinking,
    thinkingText,
    handleClick,
    handleReRoll,
  };
};

export default useBallLogic;
