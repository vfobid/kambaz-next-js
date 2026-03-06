"use client";
import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "../reducer";
import { RootState } from "../../../../store";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer,
  );

  const isNew = aid === "new";
  const existingAssignment = assignments.find((a: any) => a._id === aid);

  const [assignment, setAssignment] = useState<any>(
    isNew
      ? {
          title: "New Assignment",
          description: "New Assignment Description",
          points: 100,
          dueDate: "2024-05-13",
          availableDate: "2024-05-06",
          course: cid,
        }
      : { ...existingAssignment },
  );

  if (!isNew && !existingAssignment) {
    return <div>Assignment not found. Looking for ID: {aid}</div>;
  }

  const handleSave = () => {
    if (isNew) {
      dispatch(addAssignment(assignment));
    } else {
      dispatch(updateAssignment(assignment));
    }
    router.push(`/courses/${cid}/assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-4">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
          <Form.Control
            id="wd-name"
            type="text"
            value={assignment.title}
            onChange={(e) =>
              setAssignment({ ...assignment, title: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="wd-description">Description</Form.Label>
          <Form.Control
            as="textarea"
            id="wd-description"
            rows={9}
            value={assignment.description}
            onChange={(e) =>
              setAssignment({ ...assignment, description: e.target.value })
            }
          />
        </Form.Group>

        <div className="row mb-3">
          <div className="col-md-3">
            <Form.Label htmlFor="wd-points">Points</Form.Label>
            <Form.Control
              id="wd-points"
              type="number"
              value={assignment.points}
              onChange={(e) =>
                setAssignment({
                  ...assignment,
                  points: parseInt(e.target.value),
                })
              }
            />
          </div>
        </div>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="wd-group">Assignment Group</Form.Label>
          <Form.Select id="wd-group">
            <option value="ASSIGNMENTS">ASSIGNMENTS</option>
            <option value="QUIZZES">QUIZZES</option>
            <option value="EXAMS">EXAMS</option>
            <option value="PROJECT">PROJECT</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="wd-display-grade-as">
            Display Grade as
          </Form.Label>
          <Form.Select id="wd-display-grade-as">
            <option value="Percentage">Percentage</option>
            <option value="Points">Points</option>
            <option value="Letter">Letter Grade</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="wd-submission-type">Submission Type</Form.Label>
          <div className="border rounded p-3">
            <Form.Select id="wd-submission-type" className="mb-3">
              <option value="Online">Online</option>
              <option value="Paper">Paper</option>
              <option value="External">External Tool</option>
            </Form.Select>

            <div className="mb-2 fw-bold">Online Entry Options</div>
            <Form.Check type="checkbox" id="wd-text-entry" label="Text Entry" />
            <Form.Check
              type="checkbox"
              id="wd-website-url"
              label="Website URL"
              defaultChecked
            />
            <Form.Check
              type="checkbox"
              id="wd-media-recordings"
              label="Media Recordings"
            />
            <Form.Check
              type="checkbox"
              id="wd-student-annotation"
              label="Student Annotation"
            />
            <Form.Check
              type="checkbox"
              id="wd-file-upload"
              label="File Uploads"
            />
          </div>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Assign</Form.Label>
          <div className="border rounded p-3">
            <Form.Group className="mb-3">
              <Form.Label htmlFor="wd-assign-to" className="fw-bold">
                Assign to
              </Form.Label>
              <Form.Control
                id="wd-assign-to"
                type="text"
                defaultValue="Everyone"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="wd-due-date" className="fw-bold">
                Due
              </Form.Label>
              <Form.Control
                id="wd-due-date"
                type="date"
                value={assignment.dueDate}
                onChange={(e) =>
                  setAssignment({ ...assignment, dueDate: e.target.value })
                }
              />
            </Form.Group>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="wd-available-from" className="fw-bold">
                    Available from
                  </Form.Label>
                  <Form.Control
                    id="wd-available-from"
                    type="date"
                    value={assignment.availableDate}
                    onChange={(e) =>
                      setAssignment({
                        ...assignment,
                        availableDate: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="wd-available-until" className="fw-bold">
                    Until
                  </Form.Label>
                  <Form.Control
                    id="wd-available-until"
                    type="datetime-local"
                    defaultValue="2024-05-20T23:59"
                  />
                </Form.Group>
              </div>
            </div>
          </div>
        </Form.Group>

        <hr />

        <div className="d-flex justify-content-end gap-2">
          <Link href={`/courses/${cid}/assignments`}>
            <Button variant="secondary">Cancel</Button>
          </Link>
          <Button variant="danger" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  );
}
