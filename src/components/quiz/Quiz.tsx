import React, { useState } from "react";

type Question = {
  question: string;
  options: string[];
};

const questions: Question[] = [
  {
    question: "1 or 2?",
    options: ["1", "2"],
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4"],
  },
  {
    question: "3 or 4?",
    options: ["3", "4"],
  },
  {
    question: "This or that?",
    options: ["this", "that"],
  },
];

interface QuizProps {
  onComplete: (score: number) => void;
}

const Quiz: React.FC<QuizProps> = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const handleAnswer = (answerIndex: number) => {
    if (answerIndex === 0) {
      setScore(score + 1);
    } else if (answerIndex === 1) {
      setScore(score + 2);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(score + (answerIndex === 0 ? 1 : 2));
    }
  };

  const { question, options } = questions[currentQuestion];

  return (
    <div className="quiz">
      <h2>{question}</h2>
      {options.map((option, index) => (
        <button key={option} onClick={() => handleAnswer(index)}>
          {option}
        </button>
      ))}
    </div>
  );
};

export default Quiz;

// 4 5 6 7 8
