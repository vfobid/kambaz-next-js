"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Button, Form, Tab, Nav } from "react-bootstrap";
import { updateQuiz } from "../../reducer";
import * as client from "../../client";
import { FaCircleCheck } from "react-icons/fa6";
import { MdDoNotDisturb } from "react-icons/md";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [quiz, setQuiz] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const data = await client.findQuizById(qid as string);
      setQuiz(data);
    };
    load();
  }, [qid]);

  const handleChange = (field: string, value: any) => {
    setQuiz((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    await client.updateQuiz(quiz);
    dispatch(updateQuiz(quiz));
    router.push(`/courses/${cid}/quizzes/${qid}`);
  };

  const handleSaveAndPublish = async () => {
    const published = { ...quiz, published: true };
    await client.updateQuiz(published);
    dispatch(updateQuiz(published));
    router.push(`/courses/${cid}/quizzes`);
  };

  const handleCancel = () => {
    router.push(`/courses/${cid}/quizzes`);
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div id="wd-quiz-editor" className="p-4">
      <div className="d-flex justify-content-end mb-2">
        <span className="me-3">Points {quiz.points}</span>
        <span className={quiz.published ? "text-success" : "text-secondary"}>
          {quiz.published ? <FaCircleCheck /> : <MdDoNotDisturb />}
        </span>
      </div>

      <Nav variant="tabs" className="mb-3">
        <Nav.Item>
          <Nav.Link active>Details</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() =>
              router.push(`/courses/${cid}/quizzes/${qid}/questions`)
            }
          >
            Questions
          </Nav.Link>
        </Nav.Item>
      </Nav>

      <Form>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            value={quiz.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Quiz Instructions</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            value={quiz.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3 row">
          <Form.Label className="col-sm-3 col-form-label text-end">
            Quiz Type
          </Form.Label>
          <div className="col-sm-4">
            <Form.Select
              value={quiz.quizType}
              onChange={(e) => handleChange("quizType", e.target.value)}
            >
              <option value="GRADED_QUIZ">Graded Quiz</option>
              <option value="PRACTICE_QUIZ">Practice Quiz</option>
              <option value="GRADED_SURVEY">Graded Survey</option>
              <option value="UNGRADED_SURVEY">Ungraded Survey</option>
            </Form.Select>
          </div>
        </Form.Group>

        <Form.Group className="mb-3 row">
          <Form.Label className="col-sm-3 col-form-label text-end">
            Assignment Group
          </Form.Label>
          <div className="col-sm-4">
            <Form.Select
              value={quiz.assignmentGroup}
              onChange={(e) => handleChange("assignmentGroup", e.target.value)}
            >
              <option value="QUIZZES">Quizzes</option>
              <option value="EXAMS">Exams</option>
              <option value="ASSIGNMENTS">Assignments</option>
              <option value="PROJECT">Project</option>
            </Form.Select>
          </div>
        </Form.Group>

        <fieldset className="mb-3 border p-3">
          <legend className="w-auto fs-6 fw-bold">Options</legend>

          <Form.Check
            type="checkbox"
            label="Shuffle Answers"
            checked={quiz.shuffleAnswers}
            onChange={(e) => handleChange("shuffleAnswers", e.target.checked)}
            className="mb-2"
          />

          <div className="d-flex align-items-center mb-2">
            <Form.Check
              type="checkbox"
              label="Time Limit"
              checked={!!quiz.timeLimit}
              onChange={(e) =>
                handleChange("timeLimit", e.target.checked ? 20 : 0)
              }
              className="me-2"
            />
            {!!quiz.timeLimit && (
              <>
                <Form.Control
                  type="number"
                  value={quiz.timeLimit}
                  onChange={(e) =>
                    handleChange("timeLimit", Number(e.target.value))
                  }
                  style={{ width: "80px" }}
                  className="me-2"
                />
                <span>Minutes</span>
              </>
            )}
          </div>

          <Form.Check
            type="checkbox"
            label="Allow Multiple Attempts"
            checked={quiz.multipleAttempts}
            onChange={(e) => handleChange("multipleAttempts", e.target.checked)}
            className="mb-2"
          />

          {quiz.multipleAttempts && (
            <Form.Group className="mb-2 ms-4 d-flex align-items-center">
              <Form.Label className="me-2 mb-0">How Many Attempts</Form.Label>
              <Form.Control
                type="number"
                value={quiz.howManyAttempts}
                onChange={(e) =>
                  handleChange("howManyAttempts", Number(e.target.value))
                }
                style={{ width: "80px" }}
              />
            </Form.Group>
          )}
        </fieldset>

        <Form.Group className="mb-3 row">
          <Form.Label className="col-sm-3 col-form-label text-end">
            Show Correct Answers
          </Form.Label>
          <div className="col-sm-4">
            <Form.Select
              value={quiz.showCorrectAnswers}
              onChange={(e) =>
                handleChange("showCorrectAnswers", e.target.value)
              }
            >
              <option value="immediately">Immediately</option>
              <option value="after_due">After Due Date</option>
              <option value="never">Never</option>
            </Form.Select>
          </div>
        </Form.Group>

        <Form.Group className="mb-3 row">
          <Form.Label className="col-sm-3 col-form-label text-end">
            Access Code
          </Form.Label>
          <div className="col-sm-4">
            <Form.Control
              type="text"
              value={quiz.accessCode || ""}
              onChange={(e) => handleChange("accessCode", e.target.value)}
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3 row">
          <Form.Label className="col-sm-3 col-form-label text-end">
            One Question at a Time
          </Form.Label>
          <div className="col-sm-4">
            <Form.Select
              value={quiz.oneQuestionAtTime ? "yes" : "no"}
              onChange={(e) =>
                handleChange("oneQuestionAtTime", e.target.value === "yes")
              }
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </Form.Select>
          </div>
        </Form.Group>

        <Form.Group className="mb-3 row">
          <Form.Label className="col-sm-3 col-form-label text-end">
            Webcam Required
          </Form.Label>
          <div className="col-sm-4">
            <Form.Select
              value={quiz.webcamRequired ? "yes" : "no"}
              onChange={(e) =>
                handleChange("webcamRequired", e.target.value === "yes")
              }
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </Form.Select>
          </div>
        </Form.Group>

        <Form.Group className="mb-3 row">
          <Form.Label className="col-sm-3 col-form-label text-end">
            Lock Questions After Answering
          </Form.Label>
          <div className="col-sm-4">
            <Form.Select
              value={quiz.lockQuestionsAfterAnswering ? "yes" : "no"}
              onChange={(e) =>
                handleChange(
                  "lockQuestionsAfterAnswering",
                  e.target.value === "yes",
                )
              }
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </Form.Select>
          </div>
        </Form.Group>

        <fieldset className="mb-3 border p-3">
          <legend className="w-auto fs-6 fw-bold">Assign</legend>
          <Form.Group className="mb-3 row">
            <Form.Label className="col-sm-2 col-form-label">Due</Form.Label>
            <div className="col-sm-4">
              <Form.Control
                type="date"
                value={quiz.dueDate || ""}
                onChange={(e) => handleChange("dueDate", e.target.value)}
              />
            </div>
          </Form.Group>
          <div className="row">
            <Form.Group className="mb-3 col-sm-6">
              <Form.Label>Available From</Form.Label>
              <Form.Control
                type="date"
                value={quiz.availableDate || ""}
                onChange={(e) => handleChange("availableDate", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3 col-sm-6">
              <Form.Label>Until</Form.Label>
              <Form.Control
                type="date"
                value={quiz.untilDate || ""}
                onChange={(e) => handleChange("untilDate", e.target.value)}
              />
            </Form.Group>
          </div>
        </fieldset>

        <div className="d-flex justify-content-end gap-2">
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="secondary" onClick={handleSaveAndPublish}>
            Save & Publish
          </Button>
          <Button variant="danger" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
