"use client";
import { useState } from "react";
import Link from "next/link";
import { BsGripVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { FaSearch, FaTrash } from "react-icons/fa";
import { Button, InputGroup, FormControl, Modal } from "react-bootstrap";
import AssignmentControlButtons from "./AssignmentControlButtons";
import LessonControlButtons from "../modules/LessonControlButtons";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { deleteAssignment } from "./reducer";
import { RootState } from "../../../store";

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector(
    (state: RootState) => state.assignmentsReducer,
  );
  const dispatch = useDispatch();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(
    null,
  );

  const handleDeleteClick = (assignmentId: string) => {
    setAssignmentToDelete(assignmentId);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (assignmentToDelete) {
      dispatch(deleteAssignment(assignmentToDelete));
    }
    setShowDeleteDialog(false);
    setAssignmentToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteDialog(false);
    setAssignmentToDelete(null);
  };

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
            <Button
              variant="secondary"
              size="lg"
              className="me-2"
              id="wd-add-assignment-group"
            >
              <FaPlus className="me-1" /> Group
            </Button>
            <Link href={`/courses/${cid}/assignments/new`}>
              <Button variant="danger" size="lg" id="wd-add-assignment">
                <FaPlus className="me-1" /> Assignment
              </Button>
            </Link>
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
                .filter((assignment: any) => assignment.course === cid)
                .map((assignment: any) => (
                  <li
                    key={assignment._id}
                    className="wd-assignment-list-item list-group-item p-3 ps-1 d-flex align-items-center wd-lesson"
                  >
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
                        <span className="text-danger">Multiple Modules</span> |{" "}
                        <b>Not available until</b>{" "}
                        {assignment.availableDate || "TBD"} | <b>Due</b>{" "}
                        {assignment.dueDate || "TBD"} |{" "}
                        {assignment.points || 100} pts
                      </span>
                    </div>
                    <FaTrash
                      className="text-danger me-3"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDeleteClick(assignment._id)}
                    />
                    <LessonControlButtons />
                  </li>
                ))}
            </ul>
          </li>
        </ul>
      </div>

      <Modal show={showDeleteDialog} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Assignment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove this assignment?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
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
