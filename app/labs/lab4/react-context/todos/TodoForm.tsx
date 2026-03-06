"use client";
import { useTodos } from "./todosContext";
import { ListGroupItem, Button, FormControl } from "react-bootstrap";

export default function TodoForm() {
  const { todo, setTodo, addTodo, updateTodo } = useTodos()!;

  return (
    <ListGroupItem className="d-flex align-items-center">
      <FormControl
        className="me-2"
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <Button
        onClick={() => updateTodo(todo)}
        id="wd-update-todo-context-click"
        className="btn btn-warning me-2"
      >
        Update
      </Button>
      <Button
        onClick={() => addTodo(todo)}
        id="wd-add-todo-context-click"
        className="btn btn-success"
      >
        Add
      </Button>
    </ListGroupItem>
  );
}