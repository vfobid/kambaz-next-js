"use client";
import { useTodoStore } from "./useTodoStore";
import { ListGroupItem, Button, FormControl } from "react-bootstrap";

export default function TodoForm() {
  const { todo, setTodo, addTodo, updateTodo } = useTodoStore((state) => state);

  return (
    <ListGroupItem className="d-flex align-items-center">
      <FormControl
        className="me-2"
        value={todo.title}
        onChange={(e) => setTodo({ ...todo, title: e.target.value })}
      />
      <Button
        onClick={() => updateTodo(todo)}
        id="wd-update-todo-zustand-click"
        className="btn btn-warning me-2"
      >
        Update
      </Button>
      <Button
        onClick={() => addTodo(todo)}
        id="wd-add-todo-zustand-click"
        className="btn btn-success"
      >
        Add
      </Button>
    </ListGroupItem>
  );
}