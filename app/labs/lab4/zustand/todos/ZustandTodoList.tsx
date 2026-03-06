"use client";
import { useTodoStore } from "./useTodoStore";
import { ListGroup } from "react-bootstrap";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

export default function ZustandTodoList() {
  const { todos } = useTodoStore((state) => state);

  return (
    <div id="wd-todo-list-zustand">
      <h2>Todo List</h2>
      <ListGroup>
        <TodoForm />
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
