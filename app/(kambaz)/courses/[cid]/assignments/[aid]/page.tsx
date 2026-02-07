"use client";

import { Form, Button } from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor" className="p-4">
      <Form>
        <Form.Group className="mb-3">
          <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
          <Form.Control
            id="wd-name"
            type="text"
            defaultValue="A1"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="wd-description">Description</Form.Label>
          <Form.Control
            as="textarea"
            id="wd-description"
            rows={9}
            defaultValue={`The assignment is available online

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:

- Your full name and section
- Links to each of the lab assignments
- Link to the Kambaz application
- Links to all relevant source code repositories

The Kambaz application should include a link to navigate back to the landing page.`}
          />
        </Form.Group>

        <div className="row mb-3">
          <div className="col-md-3">
            <Form.Label htmlFor="wd-points">Points</Form.Label>
            <Form.Control
              id="wd-points"
              type="number"
              defaultValue={100}
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
          <Form.Label htmlFor="wd-display-grade-as">Display Grade as</Form.Label>
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
            <Form.Check
              type="checkbox"
              id="wd-text-entry"
              label="Text Entry"
            />
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
              <Form.Label htmlFor="wd-assign-to" className="fw-bold">Assign to</Form.Label>
              <Form.Control
                id="wd-assign-to"
                type="text"
                defaultValue="Everyone"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="wd-due-date" className="fw-bold">Due</Form.Label>
              <Form.Control
                id="wd-due-date"
                type="datetime-local"
                defaultValue="2024-05-13T23:59"
              />
            </Form.Group>

            <div className="row">
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="wd-available-from" className="fw-bold">Available from</Form.Label>
                  <Form.Control
                    id="wd-available-from"
                    type="datetime-local"
                    defaultValue="2024-05-06T00:00"
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group className="mb-3">
                  <Form.Label htmlFor="wd-available-until" className="fw-bold">Until</Form.Label>
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
          <Button variant="secondary">Cancel</Button>
          <Button variant="danger">Save</Button>
        </div>
      </Form>
    </div>
  );
}