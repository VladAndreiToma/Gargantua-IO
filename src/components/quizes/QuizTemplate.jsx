import { useEffect, useState } from "react";
import NavigationBar from "../../navigation/NavigationBar";
import ScoreGauge from "./ScoreGauge";
import { useLocation } from "react-router-dom";
import { FaLock } from "react-icons/fa6";

export default function QuizTemplate({ title, subject, questions }) {
  const location = useLocation();
  const lastPart = location.pathname.split("/").pop(); // ex: "quiz-3"

  // 🧠 States
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [score, setScore] = useState(null);
  const [unlocked, setUnlocked] = useState(false); // poate fi accesat?
  
  // 🔹 selectare răspunsuri
  const handleSelect = (qIdx, optionIdx) => {
    const newAnswers = [...answers];
    newAnswers[qIdx] = optionIdx;
    setAnswers(newAnswers);
  };

  // 🔹 evaluare quiz
  const evaluate = () => {
    let correctCount = 0;
    answers.forEach((ans, idx) => {
      if (ans === questions[idx].correct) correctCount++;
    });

    const percent = Math.round((correctCount / questions.length) * 100);
    setScore(percent);

    // 🔸 salvăm scorul doar dacă e mai bun decât precedentul
    const prevScore = parseInt(localStorage.getItem(`${lastPart}_score`) || "0");
    if (percent > prevScore) {
      localStorage.setItem(`${lastPart}_score`, percent);
    }

    // 🔓 deblocăm următorul quiz doar la 100%
    if (percent === 100) {
      const currentIdx = parseInt(lastPart.split("-")[1]);
      const nextQuiz = `quiz-${currentIdx + 1}_unlocked`;
      localStorage.setItem(nextQuiz, "true");
    }
  };

  // 🔹 verificăm dacă quizul e deblocat (la mount)
  useEffect(() => {
    const currentIdx = parseInt(lastPart.split("-")[1]);

    // primul quiz e mereu deblocat
    if (currentIdx === 1) {
      setUnlocked(true);
      return;
    }

    // verificăm dacă quizul anterior e completat cu 100%
    const prevQuiz = `quiz-${currentIdx - 1}`;
    const prevScore = parseInt(localStorage.getItem(`${prevQuiz}_score`) || "0");
    const prevUnlocked = localStorage.getItem(`${prevQuiz}_unlocked`) === "true";

    if (prevScore === 100 || prevUnlocked) {
      setUnlocked(true);
    }
  }, [lastPart]);

  // 🔹 încărcăm scorul salvat (pentru gauge)
  useEffect(() => {
    const savedScore = localStorage.getItem(`${lastPart}_score`);
    if (savedScore) {
      setScore(parseInt(savedScore));
    }
  }, [lastPart]);

  // 🔸 UI
  return (
    <div className="page-container">
      <NavigationBar />
      <div className="quiz-scroller">
        {unlocked ? (
          <>
            <h1 className="chapter-title">{title}</h1>
            <h2 className="quiz-subject">{subject}</h2>
            {questions.map((q, idx) => (
              <p key={idx}>
                {q.question}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "0.8rem",
                    flexWrap: "wrap",
                    marginTop: "1.5rem",
                  }}
                >
                  {q.options.map((op, opIdx) => (
                    <label
                      key={opIdx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        fontSize: "0.9rem",
                        cursor: "pointer",
                        color: "#ccc",
                      }}
                    >
                      <input
                        type="radio"
                        name={`question-${idx}`}
                        checked={answers[idx] === opIdx}
                        onChange={() => handleSelect(idx, opIdx)}
                        style={{
                          width: "1.3rem",
                          height: "1.3rem",
                          accentColor: "#6611aa",
                          cursor: "pointer",
                        }}
                      />
                      {op}
                    </label>
                  ))}
                </div>
              </p>
            ))}

            <button className="evaluate-button" onClick={evaluate}>
              Evaluate
            </button>

            {score !== null && <ScoreGauge score={score} />}
          </>
        ) : (
          <div style={{ textAlign: "center", marginTop: "3rem", color: "#bbb" }}>
            <p style={{gap:'1rem', fontSize:'1rem', display:"flex", flexDirection:'column', justifyContent:"center", alignItems:"center"}}>
              <FaLock style={{fontSize:'7rem'}}/>
              <label>You haven’t unlocked this quiz yet.</label>
              <label>Complete the previous one with 100% score to unlock it.</label>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
