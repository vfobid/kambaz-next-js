"use client";

import Link from "next/link";
import { BsGripVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import AssignmentControlButtons from "./AssignmentControlButtons";
import LessonControlButtons from "../modules/LessonControlButtons";
import { useParams } from "next/navigation";
import * as db from "../../../database";

export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;

  return (
    <div>
      <div id="wd-assignments">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <InputGroup style={{ width: "300px" }}>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <FormControl
              id="wd-search-assignment"
              placeholder="Search for Assignments"
            />
          </InputGroup>
          <div>
            <Button variant="secondary" size="lg" className="me-2" id="wd-add-assignment-group">
              <FaPlus className="me-1" /> Group
            </Button>
            <Button variant="danger" size="lg" id="wd-add-assignment">
              <FaPlus className="me-1" /> Assignment
            </Button>
          </div>
        </div>

        <ul className="list-group rounded-0">
          <li className="list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
              <BsGripVertical className="me-2 fs-3" />
              <strong>ASSIGNMENTS</strong>
              <span className="ms-3">40% of Total</span>
              <AssignmentControlButtons />
            </div>
            <ul className="list-group rounded-0">
              {assignments
                .filter((assignment) => assignment.course === cid)
                .map((assignment) => (
                  <li key={assignment._id} className="wd-assignment-list-item list-group-item p-3 ps-1 d-flex align-items-center wd-lesson">
                    <BsGripVertical className="me-2 fs-1" />
                    <div className="flex-grow-1">
                      <Link
                        href={`/courses/${cid}/assignments/${assignment._id}`}
                        className="wd-assignment-link text-dark text-decoration-none fw-bold"
                      >
                        {assignment.title}
                      </Link>
                      <br />
                      <span className="text-muted">
                        <span className="text-danger">Multiple Modules</span> | <b>Not available until</b> Friday at 12:00am |{" "}
                        <b>Due</b> Monday at 11:59pm | 10 pts
                      </span>
                    </div>
                    <LessonControlButtons />
                  </li>
                ))}
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}