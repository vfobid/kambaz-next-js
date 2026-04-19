"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
import { FaPencil } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../../store";
import { updateQuiz } from "../reducer";
import * as client from "../client";

export default function QuizDetails() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const isFaculty = currentUser?.role === "FACULTY";
  const [quiz, setQuiz] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const data = await client.findQuizById(qid as string);
      setQuiz(data);
    };
    load();
  }, [qid]);

  const handleTogglePublish = async () => {
    if (!quiz) return;
    const updated = { ...quiz, published: !quiz.published };
    await client.updateQuiz(updated);
    dispatch(updateQuiz(updated));
    setQuiz(updated);
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div id="wd-quiz-details" className="p-4">
      {isFaculty && (
        <div className="d-flex justify-content-end mb-3">
          <Button
            variant={quiz.published ? "secondary" : "success"}
            className="me-2"
            onClick={handleTogglePublish}
          >
            {quiz.published ? "Unpublish" : "Publish"}
          </Button>
          <Button
            variant="secondary"
            className="me-2"
            onClick={() =>
              router.push(`/courses/${cid}/quizzes/${qid}/preview`)
            }
          >
            Preview
          </Button>
          <Button
            variant="secondary"
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/editor`)}
          >
            <FaPencil className="me-1" /> Edit
          </Button>
        </div>
      )}

      <h2>{quiz.title}</h2>
      <hr />

      {!isFaculty && (
        <div className="mb-3">
          <Button
            variant="danger"
            onClick={() =>
              router.push(`/courses/${cid}/quizzes/${qid}/attempt`)
            }
          >
            Take Quiz
          </Button>
        </div>
      )}

      <table className="table table-borderless w-50">
        <tbody>
          <tr>
            <td className="text-end fw-bold">Quiz Type</td>
            <td>{quiz.quizType?.replace(/_/g, " ")}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Points</td>
            <td>{quiz.points}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Assignment Group</td>
            <td>{quiz.assignmentGroup}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Shuffle Answers</td>
            <td>{quiz.shuffleAnswers ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Time Limit</td>
            <td>{quiz.timeLimit} Minutes</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Multiple Attempts</td>
            <td>{quiz.multipleAttempts ? "Yes" : "No"}</td>
          </tr>
          {quiz.multipleAttempts && (
            <tr>
              <td className="text-end fw-bold">How Many Attempts</td>
              <td>{quiz.howManyAttempts}</td>
            </tr>
          )}
          <tr>
            <td className="text-end fw-bold">Show Correct Answers</td>
            <td>{quiz.showCorrectAnswers}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">One Question at a Time</td>
            <td>{quiz.oneQuestionAtTime ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Webcam Required</td>
            <td>{quiz.webcamRequired ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td className="text-end fw-bold">Lock Questions After Answering</td>
            <td>{quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</td>
          </tr>
        </tbody>
      </table>

      <table className="table w-75 mt-3">
        <thead>
          <tr>
            <th>Due</th>
            <th>For</th>
            <th>Available From</th>
            <th>Until</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{quiz.dueDate || "-"}</td>
            <td>Everyone</td>
            <td>{quiz.availableDate || "-"}</td>
            <td>{quiz.untilDate || "-"}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
