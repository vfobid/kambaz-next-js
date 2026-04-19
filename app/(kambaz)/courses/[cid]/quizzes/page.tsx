"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { BsGripVertical, BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus, FaRocket } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { MdDoNotDisturb } from "react-icons/md";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { RootState } from "../../../store";
import { setQuizzes, deleteQuiz, updateQuiz, addQuiz } from "./reducer";
import * as client from "./client";

function getAvailability(quiz: any): string {
  const now = new Date();
  if (quiz.availableDate && new Date(quiz.availableDate) > now) {
    return `Not available until ${new Date(quiz.availableDate).toLocaleDateString()}`;
  }
  if (quiz.untilDate && new Date(quiz.untilDate) < now) {
    return "Closed";
  }
  return "Available";
}

export default function Quizzes() {
  const { cid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { quizzes } = useSelector((state: RootState) => state.quizzesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const isFaculty = currentUser?.role === "FACULTY";

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [quizToDelete, setQuizToDelete] = useState<string | null>(null);
  const [scores, setScores] = useState<Record<string, number | null>>({});

  useEffect(() => {
    const load = async () => {
      const data = await client.findQuizzesForCourse(cid as string);
      dispatch(setQuizzes(data));
    };
    load();
  }, []);

  useEffect(() => {
    if (isFaculty || quizzes.length === 0) return;
    const loadScores = async () => {
      const newScores: Record<string, number | null> = {};
      for (const quiz of quizzes) {
        try {
          const attempt = await client.getLastAttempt(quiz._id);
          newScores[quiz._id] = attempt ? attempt.score : null;
        } catch {
          newScores[quiz._id] = null;
        }
      }
      setScores(newScores);
    };
    loadScores();
  }, [quizzes, isFaculty]);

  const handleAddQuiz = async () => {
    const newQuiz = await client.createQuiz(cid as string, {
      title: "Unnamed Quiz",
      course: cid,
      published: false,
      questions: [],
    });
    dispatch(addQuiz(newQuiz));
    router.push(`/courses/${cid}/quizzes/${newQuiz._id}/editor`);
  };

  const handleDelete = (quizId: string) => {
    setQuizToDelete(quizId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (quizToDelete) {
      await client.deleteQuiz(quizToDelete);
      dispatch(deleteQuiz(quizToDelete));
    }
    setShowDeleteDialog(false);
    setQuizToDelete(null);
  };

  const togglePublish = async (quiz: any) => {
    const updated = { ...quiz, published: !quiz.published };
    await client.updateQuiz(updated);
    dispatch(updateQuiz(updated));
  };

  const sorted = [...quizzes].sort((a: any, b: any) => {
    if (!a.availableDate) return 1;
    if (!b.availableDate) return -1;
    return (
      new Date(a.availableDate).getTime() - new Date(b.availableDate).getTime()
    );
  });

  return (
    <div id="wd-quizzes">
      {isFaculty && (
        <div className="d-flex justify-content-end mb-3">
          <Button variant="danger" size="lg" onClick={handleAddQuiz}>
            <FaPlus className="me-1" /> Quiz
          </Button>
        </div>
      )}

      {quizzes.length === 0 && (
        <p className="text-muted">
          No quizzes yet.{isFaculty && " Click + Quiz to add one."}
        </p>
      )}

      <ul className="list-group rounded-0">
        <li className="list-group-item p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" />
            <strong>Assignment Quizzes</strong>
          </div>
          <ul className="list-group rounded-0">
            {sorted.map((quiz: any) => {
              const availability = getAvailability(quiz);
              return (
                <li
                  key={quiz._id}
                  className="list-group-item p-3 ps-1 d-flex align-items-center"
                >
                  <BsGripVertical className="me-2 fs-1" />
                  <FaRocket className="me-2 text-success fs-5" />
                  <div className="flex-grow-1">
                    {isFaculty ? (
                      <Link
                        href={`/courses/${cid}/quizzes/${quiz._id}`}
                        className="text-dark text-decoration-none fw-bold"
                      >
                        {quiz.title}
                      </Link>
                    ) : (
                      <Link
                        href={`/courses/${cid}/quizzes/${quiz._id}/attempt`}
                        className="text-dark text-decoration-none fw-bold"
                      >
                        {quiz.title}
                      </Link>
                    )}
                    <br />
                    <small className="text-muted">
                      <span
                        className={
                          availability === "Available"
                            ? "text-success fw-bold"
                            : availability === "Closed"
                              ? "fw-bold"
                              : ""
                        }
                      >
                        {availability}
                      </span>
                      {quiz.dueDate && (
                        <>
                          {" "}
                          | <b>Due</b>{" "}
                          {new Date(quiz.dueDate).toLocaleDateString()}
                        </>
                      )}
                      {" | "}
                      {quiz.points} pts
                      {" | "}
                      {quiz.questions?.length || 0} Questions
                      {!isFaculty &&
                        scores[quiz._id] !== undefined &&
                        scores[quiz._id] !== null && (
                          <>
                            {" "}
                            | <b>Score:</b> {scores[quiz._id]}/{quiz.points}
                          </>
                        )}
                    </small>
                  </div>

                  {isFaculty && (
                    <div className="d-flex align-items-center">
                      <span
                        onClick={() => togglePublish(quiz)}
                        style={{ cursor: "pointer" }}
                        className="me-2"
                      >
                        {quiz.published ? (
                          <FaCircleCheck className="text-success fs-5" />
                        ) : (
                          <MdDoNotDisturb className="text-secondary fs-5" />
                        )}
                      </span>
                      <Dropdown>
                        <Dropdown.Toggle
                          variant="white"
                          size="sm"
                          className="border-0"
                        >
                          <BsThreeDotsVertical />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() =>
                              router.push(
                                `/courses/${cid}/quizzes/${quiz._id}/editor`,
                              )
                            }
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => handleDelete(quiz._id)}>
                            Delete
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => togglePublish(quiz)}>
                            {quiz.published ? "Unpublish" : "Publish"}
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </li>
      </ul>

      <Modal show={showDeleteDialog} onHide={() => setShowDeleteDialog(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this quiz?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteDialog(false)}
          >
            No
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
