"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Button, Form, Nav } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { updateQuiz } from "../../reducer";
import * as client from "../../client";
import { FaTrash } from "react-icons/fa";

function MultipleChoiceEditor({ question, onChange }: any) {
  const addChoice = () => {
    const choices = [
      ...(question.choices || []),
      { _id: uuidv4(), text: "", correct: false },
    ];
    onChange({ ...question, choices });
  };
  const removeChoice = (id: string) => {
    onChange({
      ...question,
      choices: question.choices.filter((c: any) => c._id !== id),
    });
  };
  const setCorrect = (id: string) => {
    onChange({
      ...question,
      choices: question.choices.map((c: any) => ({
        ...c,
        correct: c._id === id,
      })),
    });
  };
  const updateChoiceText = (id: string, text: string) => {
    onChange({
      ...question,
      choices: question.choices.map((c: any) =>
        c._id === id ? { ...c, text } : c,
      ),
    });
  };

  return (
    <div>
      <Form.Label className="fw-bold">Answers:</Form.Label>
      {(question.choices || []).map((choice: any) => (
        <div key={choice._id} className="d-flex align-items-center mb-2">
          <Form.Check
            type="radio"
            name={`correct-${question._id}`}
            checked={choice.correct}
            onChange={() => setCorrect(choice._id)}
            className="me-2"
          />
          <Form.Control
            value={choice.text}
            onChange={(e) => updateChoiceText(choice._id, e.target.value)}
            placeholder={choice.correct ? "Correct Answer" : "Possible Answer"}
            className={choice.correct ? "border-success" : ""}
          />
          <Button
            variant="link"
            className="text-danger ms-2"
            onClick={() => removeChoice(choice._id)}
          >
            <FaTrash />
          </Button>
        </div>
      ))}
      <Button variant="link" onClick={addChoice}>
        + Add Another Answer
      </Button>
    </div>
  );
}

function TrueFalseEditor({ question, onChange }: any) {
  return (
    <div>
      <Form.Label className="fw-bold">Correct Answer:</Form.Label>
      <div>
        <Form.Check
          type="radio"
          label="True"
          name={`tf-${question._id}`}
          checked={question.correctAnswer === true}
          onChange={() => onChange({ ...question, correctAnswer: true })}
          className={
            question.correctAnswer === true ? "text-success fw-bold" : ""
          }
        />
        <Form.Check
          type="radio"
          label="False"
          name={`tf-${question._id}`}
          checked={question.correctAnswer === false}
          onChange={() => onChange({ ...question, correctAnswer: false })}
        />
      </div>
    </div>
  );
}

function FillInBlankEditor({ question, onChange }: any) {
  const addBlank = () => {
    onChange({ ...question, blanks: [...(question.blanks || []), ""] });
  };
  const removeBlank = (i: number) => {
    onChange({
      ...question,
      blanks: question.blanks.filter((_: any, idx: number) => idx !== i),
    });
  };
  const updateBlank = (i: number, val: string) => {
    const blanks = [...question.blanks];
    blanks[i] = val;
    onChange({ ...question, blanks });
  };

  return (
    <div>
      <Form.Label className="fw-bold">Possible Correct Answers:</Form.Label>
      {(question.blanks || []).map((blank: string, i: number) => (
        <div key={i} className="d-flex align-items-center mb-2">
          <Form.Control
            value={blank}
            onChange={(e) => updateBlank(i, e.target.value)}
            placeholder="Possible Answer"
          />
          <Button
            variant="link"
            className="text-danger ms-2"
            onClick={() => removeBlank(i)}
          >
            <FaTrash />
          </Button>
        </div>
      ))}
      <Button variant="link" onClick={addBlank}>
        + Add Another Answer
      </Button>
    </div>
  );
}

function QuestionEditor({ question, onSave, onCancel }: any) {
  const [q, setQ] = useState({ ...question });

  return (
    <div className="border rounded p-3 mb-3">
      <div className="d-flex align-items-center mb-3 gap-2">
        <Form.Control
          value={q.title}
          onChange={(e) => setQ({ ...q, title: e.target.value })}
          placeholder="Question Title"
          style={{ width: "200px" }}
        />
        <Form.Select
          value={q.type}
          onChange={(e) => setQ({ ...q, type: e.target.value })}
          style={{ width: "200px" }}
        >
          <option value="MULTIPLE_CHOICE">Multiple Choice</option>
          <option value="TRUE_FALSE">True/False</option>
          <option value="FILL_IN_BLANK">Fill in the Blank</option>
        </Form.Select>
        <span className="ms-auto">pts:</span>
        <Form.Control
          type="number"
          value={q.points}
          onChange={(e) => setQ({ ...q, points: Number(e.target.value) })}
          style={{ width: "80px" }}
        />
      </div>

      <Form.Group className="mb-3">
        <Form.Label className="fw-bold">Question:</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={q.question || ""}
          onChange={(e) => setQ({ ...q, question: e.target.value })}
        />
      </Form.Group>

      {q.type === "MULTIPLE_CHOICE" && (
        <MultipleChoiceEditor question={q} onChange={setQ} />
      )}
      {q.type === "TRUE_FALSE" && (
        <TrueFalseEditor question={q} onChange={setQ} />
      )}
      {q.type === "FILL_IN_BLANK" && (
        <FillInBlankEditor question={q} onChange={setQ} />
      )}

      <div className="d-flex justify-content-end gap-2 mt-3">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => onSave(q)}>
          Update Question
        </Button>
      </div>
    </div>
  );
}

export default function QuizQuestionsEditor() {
  const { cid, qid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [quiz, setQuiz] = useState<any>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await client.findQuizById(qid as string);
      setQuiz(data);
    };
    load();
  }, [qid]);

  const totalPoints = (quiz?.questions || []).reduce(
    (sum: number, q: any) => sum + (q.points || 0),
    0,
  );

  const addQuestion = () => {
    const newQ = {
      _id: uuidv4(),
      title: "New Question",
      type: "MULTIPLE_CHOICE",
      points: 1,
      question: "",
      choices: [
        { _id: uuidv4(), text: "", correct: true },
        { _id: uuidv4(), text: "", correct: false },
      ],
      blanks: [],
      correctAnswer: true,
    };
    setQuiz({ ...quiz, questions: [...(quiz.questions || []), newQ] });
    setEditingId(newQ._id);
  };

  const saveQuestion = (updated: any) => {
    setQuiz({
      ...quiz,
      questions: quiz.questions.map((q: any) =>
        q._id === updated._id ? updated : q,
      ),
    });
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const handleSave = async () => {
    const updated = { ...quiz, points: totalPoints };
    await client.updateQuiz(updated);
    dispatch(updateQuiz(updated));
    router.push(`/courses/${cid}/quizzes/${qid}`);
  };

  if (!quiz) return <div>Loading...</div>;

  return (
    <div id="wd-quiz-questions-editor" className="p-4">
      <div className="d-flex justify-content-end mb-2">
        <span>Points {totalPoints}</span>
      </div>

      <Nav variant="tabs" className="mb-3">
        <Nav.Item>
          <Nav.Link
            onClick={() => router.push(`/courses/${cid}/quizzes/${qid}/editor`)}
          >
            Details
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link active>Questions</Nav.Link>
        </Nav.Item>
      </Nav>

      {quiz.questions?.map((q: any) =>
        editingId === q._id ? (
          <QuestionEditor
            key={q._id}
            question={q}
            onSave={saveQuestion}
            onCancel={cancelEdit}
          />
        ) : (
          <div
            key={q._id}
            className="border rounded p-3 mb-2 d-flex justify-content-between align-items-center"
          >
            <div>
              <strong>{q.title}</strong> — {q.type.replace(/_/g, " ")} —{" "}
              {q.points} pts
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setEditingId(q._id)}
            >
              Edit
            </Button>
          </div>
        ),
      )}

      <div className="d-flex justify-content-center my-3">
        <Button variant="secondary" onClick={addQuestion}>
          + New Question
        </Button>
      </div>

      <hr />
      <div className="d-flex justify-content-end gap-2">
        <Button
          variant="secondary"
          onClick={() => router.push(`/courses/${cid}/quizzes`)}
        >
          Cancel
        </Button>
        <Button variant="danger" onClick={handleSave}>
          Save
        </Button>
      </div>
    </div>
  );
}
