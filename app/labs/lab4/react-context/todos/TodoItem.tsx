"use client";
import { useTodos } from "./todosContext";
import { ListGroupItem, Button } from "react-bootstrap";

export default function TodoItem({
  todo,
}: {
  todo: { id: string; title: string };
}) {
  const { deleteTodo, setTodo } = useTodos()!;

  return (
    <ListGroupItem className="d-flex align-items-center">
      {todo.title}
      <Button
        onClick={() => setTodo(todo)}
        id="wd-set-todo-context-click"
        className="btn btn-primary ms-auto me-2"
      >
        Edit
      </Button>
      <Button
        onClick={() => deleteTodo(todo.id)}
        id="wd-delete-todo-context-click"
        className="btn btn-danger"
      >
        Delete
      </Button>
    </ListGroupItem>
  );
}