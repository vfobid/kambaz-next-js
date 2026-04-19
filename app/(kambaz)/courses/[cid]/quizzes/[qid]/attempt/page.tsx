"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import * as client from "../../client";

export default function QuizAttempt() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const [quiz, setQuiz] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [lastAttempt, setLastAttempt] = useState<any>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const load = async () => {
      const data = await client.findQuizById(qid as string);
      setQuiz(data);
      try {
        const attempt = await client.getLastAttempt(qid as string);
        if (attempt) {
          setLastAttempt(attempt);
          setSubmitted(true);
          const prev: Record<string, any> = {};
          for (const a of attempt.answers) {
            prev[a.questionId] = a.answer;
          }
          setAnswers(prev);
        }
      } catch {}
    };
    load();
  }, [qid]);

  const setAnswer = (questionId: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    const answerList = Object.entries(answers).map(([questionId, answer]) => ({
      questionId,
      answer,
    }));
    try {
      const attempt = await client.submitAttempt(qid as string, answerList);
      setLastAttempt(attempt);
      setSubmitted(true);
    } catch (e: any) {
      setError(e.response?.data?.message || "Could not submit quiz.");
    }
  };

  const isCorrect = (q: any) => {
    if (!lastAttempt) return null;
    const given = answers[q._id];
    if (q.type === "MULTIPLE_CHOICE") {
      const correct = q.choices.find((c: any) => c.correct);
      return correct && given === correct._id;
    }
    if (q.type === "TRUE_FALSE") return given === q.correctAnswer;
    if (q.type === "FILL_IN_BLANK") {
      const normalized = (q.blanks || []).map((b: string) => b.toLowerCase());
      return normalized.includes(String(given).toLowerCase());
    }
    return false;
  };

  if (!quiz) return <div>Loading...</div>;

  const questions = quiz.questions || [];
  const oneAtATime = quiz.oneQuestionAtTime;
const visibleQuestions =
  oneAtATime && !submitted
    ? [questions[currentIndex]].filter(Boolean)
    : questions;

  return (
    <div id="wd-quiz-attempt" className="p-4">
      <h2>{quiz.title}</h2>
      {quiz.description && <p>{quiz.description}</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      <hr />

      {visibleQuestions.map((q: any, i: number) => {
        const globalIndex = oneAtATime && !submitted ? currentIndex : i;
        const correct = submitted ? isCorrect(q) : null;
        return (
          <div
            key={q._id}
            className={`border rounded p-3 mb-3 ${submitted ? (correct ? "border-success" : "border-danger") : ""}`}
          >
            <div className="d-flex justify-content-between">
              <strong>Question {globalIndex + 1}</strong>
              <span>{q.points} pts</span>
            </div>
            <p className="mt-2">{q.question}</p>

            {q.type === "MULTIPLE_CHOICE" &&
              q.choices.map((c: any) => (
                <Form.Check
                  key={c._id}
                  type="radio"
                  name={q._id}
                  label={c.text}
                  disabled={submitted}
                  checked={answers[q._id] === c._id}
                  onChange={() => setAnswer(q._id, c._id)}
                  className={
                    submitted && c.correct ? "text-success fw-bold" : ""
                  }
                />
              ))}

            {q.type === "TRUE_FALSE" && (
              <>
                <Form.Check
                  type="radio"
                  name={q._id}
                  label="True"
                  disabled={submitted}
                  checked={answers[q._id] === true}
                  onChange={() => setAnswer(q._id, true)}
                />
                <Form.Check
                  type="radio"
                  name={q._id}
                  label="False"
                  disabled={submitted}
                  checked={answers[q._id] === false}
                  onChange={() => setAnswer(q._id, false)}
                />
              </>
            )}

            {q.type === "FILL_IN_BLANK" && (
              <Form.Control
                type="text"
                disabled={submitted}
                value={answers[q._id] || ""}
                onChange={(e) => setAnswer(q._id, e.target.value)}
                placeholder="Your answer"
              />
            )}

            {submitted && (
              <div
                className={`mt-2 fw-bold ${correct ? "text-success" : "text-danger"}`}
              >
                {correct ? "✓ Correct" : "✗ Incorrect"}
              </div>
            )}
          </div>
        );
      })}

      {oneAtATime && !submitted && (
        <div className="d-flex justify-content-between">
          {currentIndex > 0 && (
            <Button
              variant="secondary"
              onClick={() => setCurrentIndex(currentIndex - 1)}
            >
              ◀ Previous
            </Button>
          )}
          {currentIndex < questions.length - 1 ? (
            <Button
              variant="secondary"
              className="ms-auto"
              onClick={() => setCurrentIndex(currentIndex + 1)}
            >
              Next ▶
            </Button>
          ) : (
            <Button variant="danger" className="ms-auto" onClick={handleSubmit}>
              Submit Quiz
            </Button>
          )}
        </div>
      )}

      {!oneAtATime && !submitted && (
        <Button variant="danger" onClick={handleSubmit}>
          Submit Quiz
        </Button>
      )}

      {submitted && lastAttempt && (
        <div className="mt-3">
          <h4>
            Score: {lastAttempt.score} / {quiz.points}
          </h4>
          <p className="text-muted">
            Submitted: {new Date(lastAttempt.takenAt).toLocaleString()}
          </p>
          <Button
            variant="secondary"
            onClick={() => router.push(`/courses/${cid}/quizzes`)}
          >
            Back to Quizzes
          </Button>
        </div>
      )}
    </div>
  );
}
