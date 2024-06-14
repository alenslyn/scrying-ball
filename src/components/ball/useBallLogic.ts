import { useState, useEffect } from "react";
import image5 from "./images/haha.jpeg";
import image6 from "./images/wise.jpeg";
import image7 from "./images/weird.jpeg";
import image8 from "./images/social.jpeg";
import image9 from "./images/reddot.jpeg";
import image10 from "./images/like.jpeg";

interface UseBallLogic {
  isPressed: boolean;
  text: string;
  showReRoll: boolean;
  isThinking: boolean;
  thinkingText: string;
  imageSrc: string | null;
  handleClick: () => void;
  handleReRoll: () => void;
}

const useBallLogic = (score: number): UseBallLogic => {
  const [isPressed, setIsPressed] = useState(false);
  const [text, setText] = useState("PRESS ME");
  const [pressCount, setPressCount] = useState(0);
  const [showReRoll, setShowReRoll] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingText, setThinkingText] = useState("Let's see");
  const [imageSrc, setImageSrc] = useState<string | null>(null);

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
      setText((prevText) =>
        prevText === "PRESS ME" ? "Try again?" : "Again?"
      );
      setTimeout(() => {
        setIsPressed(false);
      }, 220);
    } else {
      setIsThinking(true);
      setText("");

      setTimeout(() => {
        setIsThinking(false);
        setImageSrc(getImageForScore(score));
        setShowReRoll(true);
      }, 5000);
    }
  };

  const handleReRoll = () => {
    setPressCount(0);
    setText("PRESS ME");
    setShowReRoll(false);
    setIsPressed(false);
    setImageSrc(null);
  };

  const getImageForScore = (score: number): string => {
    switch (score) {
      case 5:
        return image5;
      case 6:
        return image6;
      case 7:
        return image7;
      case 8:
        return image8;
      case 9:
        return image9;
      case 10:
        return image10;
      default:
        return "";
    }
  };

  return {
    isPressed,
    text,
    showReRoll,
    isThinking,
    thinkingText,
    imageSrc,
    handleClick,
    handleReRoll,
  };
};

export default useBallLogic;
