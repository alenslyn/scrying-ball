import { useState, useEffect } from "react";
import "./Quiz.css";
import StartScreen from "../start/StartScreen";

type Question = {
  question: string;
  options: string[];
};

const questions: Question[] = [
  {
    question:
      "If you could live in the universe of any video game, which one would you choose?",
    options: ["The Legend of Zelda", "Animal Crossing"],
  },
  {
    question:
      "If you could only speak in song lyrics for a week, which artist’s lyrics would you choose?",
    options: ["Taylor Swift", "Wheeler Walker Jr."],
  },
  {
    question: "3 or 4?",
    options: ["3", "4"],
  },
  {
    question: "If you were a superhero, what would your superpower be?",
    options: ["Clean rooms instantly", "Speak any language"],
  },
  {
    question: "Do aliens live among us??",
    options: ["Yes", "Yes, I'm the one"],
  },
];

interface QuizProps {
  onComplete: (score: number) => void;
}

const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [fade, setFade] = useState(false);

  const handleStartQuiz = () => {
    setFade(false);
    setTimeout(() => {
      setQuizStarted(true);
      setFade(true);
    }, 700);
  };

  useEffect(() => {
    setFade(true);
  }, [currentQuestion]);

  const handleAnswer = (answerIndex: number) => {
    if (answerIndex === 0) {
      setScore(score + 1);
    } else if (answerIndex === 1) {
      setScore(score + 2);
    }

    setFade(false);
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        onComplete(score + (answerIndex === 0 ? 1 : 2));
      }
      setFade(true);
    }, 500);
  };

  if (!quizStarted) {
    return <StartScreen onStart={handleStartQuiz} />;
  }

  const { question, options } = questions[currentQuestion];

  return (
    <div className={`quiz ${fade ? "fade-in" : "fade-out"}`}>
      <h2>{question}</h2>
      {options.map((option, index) => (
        <button
          className="button-85"
          key={option}
          onClick={() => handleAnswer(index)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Quiz;
