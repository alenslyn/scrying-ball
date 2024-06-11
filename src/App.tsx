import { useState } from "react";
import "./App.css";
import Ball from "./components/ball/Ball";
import Quiz from "./components/quiz/Quiz";

function App() {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const handleQuizComplete = (finalScore: number) => {
    setScore(finalScore);
    setQuizCompleted(true);
  };

  const handleReRoll = () => {
    setQuizCompleted(false);
    setScore(0);
  };

  return (
    <div className="App">
      <header className="App-header">
        {quizCompleted ? (
          <>
            <p>Your score: {score}</p>
            <Ball score={score} onReRoll={handleReRoll} />
          </>
        ) : (
          <Quiz onComplete={handleQuizComplete} />
        )}
      </header>
    </div>
  );
}

export default App;
