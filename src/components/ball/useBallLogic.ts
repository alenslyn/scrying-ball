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

const useBallLogic = (): UseBallLogic => {
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

  const handleClick = async () => {
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

      setTimeout(async () => {
        try {
          const response = await fetch("https://api.adviceslip.com/advice");
          const data = await response.json();
          setText(data.slip.advice);
        } catch (error) {
          setText("Failed to get advice. Try again.");
        } finally {
          setIsThinking(false);
          setShowReRoll(true);
        }
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
