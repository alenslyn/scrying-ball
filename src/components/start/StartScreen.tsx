import { useState, useEffect } from "react";
import "./StartScreen.css";

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [fade, setFade] = useState(true);

  const handleClick = () => {
    setFade(false);
    setTimeout(() => {
      onStart();
    }, 1000);
  };

  useEffect(() => {
    setFade(true);
  }, []);

  return (
    <div
      className={`start-screen ${fade ? "fade-in" : "fade-out"}`}
      onClick={handleClick}
      title="START"
    >
      START
    </div>
  );
};

export default StartScreen;
