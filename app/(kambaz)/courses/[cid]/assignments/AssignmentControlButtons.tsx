import { IoEllipsisVertical } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";

export default function AssignmentControlButtons() {
  return (
    <div className="float-end">
      <FaPlus className="fs-5" />
      <IoEllipsisVertical className="fs-4 ms-2" />
    </div>
  );
}