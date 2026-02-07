"use client";

import Link from "next/link";
import { BsGripVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import AssignmentControlButtons from "./AssignmentControlButtons";
import LessonControlButtons from "../modules/LessonControlButtons";

export default function Assignments() {
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
              <li className="wd-assignment-list-item list-group-item p-3 ps-1 d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <div className="flex-grow-1">
                  <Link
                    href="/courses/1234/assignments/123"
                    className="wd-assignment-link text-dark text-decoration-none fw-bold"
                  >
                    A1 - ENV + HTML
                  </Link>
                  <br />
                  <span className="text-secondary">
                    Multiple Modules | <b>Not available until</b> May 6 at 12:00am |{" "}
                    <b>Due</b> May 13 at 11:59pm | 100pts
                  </span>
                </div>
                <LessonControlButtons />
              </li>

              <li className="wd-assignment-list-item list-group-item p-3 ps-1 d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <div className="flex-grow-1">
                  <Link
                    href="/courses/1234/assignments/124"
                    className="wd-assignment-link text-dark text-decoration-none fw-bold"
                  >
                    A2 - CSS + BOOTSTRAP
                  </Link>
                  <br />
                  <span className="text-muted">
                    Multiple Modules | <b>Not available until</b> May 13 at 12:00am |{" "}
                    <b>Due</b> May 20 at 11:59pm | 100pts
                  </span>
                </div>
                <LessonControlButtons />
              </li>

              <li className="wd-assignment-list-item list-group-item p-3 ps-1 d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <div className="flex-grow-1">
                  <Link
                    href="/courses/1234/assignments/125"
                    className="wd-assignment-link text-dark text-decoration-none fw-bold"
                  >
                    A3 - JAVASCRIPT + REACT
                  </Link>
                  <br />
                  <span className="text-muted">
                    Multiple Modules | <b>Not available until</b> May 20 at 12:00am |{" "}
                    <b>Due</b> May 27 at 11:59pm | 100pts
                  </span>
                </div>
                <LessonControlButtons />
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}
