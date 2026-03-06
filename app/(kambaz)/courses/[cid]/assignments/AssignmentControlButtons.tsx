import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import GreenCheckmark from "../modules/GreenCheckmark";

export default function AssignmentControlButtons({
  assignmentId,
  deleteAssignment,
}: {
  assignmentId?: string;
  deleteAssignment?: (assignmentId: string) => void;
}) {
  return (
    <div className="float-end">
      {assignmentId && deleteAssignment && (
        <FaTrash
          className="text-danger me-2 mb-1"
          onClick={(e) => {
            e.preventDefault();
            deleteAssignment(assignmentId);
          }}
        />
      )}
      <GreenCheckmark />
      <FaPlus className="fs-5" />
      <IoEllipsisVertical className="fs-4 ms-2" />
    </div>
  );
}
