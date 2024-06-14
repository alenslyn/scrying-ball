import { useState } from "react";
import "./App.css";
import Ball from "./components/ball/Ball";
import Quiz from "./components/quiz/Quiz";
import StartScreen from "./components/start/StartScreen";

function App() {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [startScreenVisible, setStartScreenVisible] = useState(true);

  const handleQuizComplete = (finalScore: number) => {
    setScore(finalScore);
    setQuizCompleted(true);
  };

  const handleReRoll = () => {
    setQuizCompleted(false);
    setScore(0);
  };

  const handleStartQuiz = () => {
    setStartScreenVisible(false);
    setTimeout(() => {
      setQuizStarted(true);
    }, 500);
  };

  return (
    <div className="App">
      <header className="App-header">
        {startScreenVisible ? (
          <StartScreen onStart={handleStartQuiz} />
        ) : quizCompleted ? (
          <Ball score={score} onReRoll={handleReRoll} />
        ) : (
          quizStarted && <Quiz onComplete={handleQuizComplete} />
        )}
      </header>
    </div>
  );
}

export default App;
