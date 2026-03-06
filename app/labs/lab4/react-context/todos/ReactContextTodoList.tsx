"use client";
import { useTodos } from "./todosContext";
import { ListGroup } from "react-bootstrap";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";

export default function ReactContextTodoList() {
  const { todos } = useTodos()!;

  return (
    <div id="wd-todo-list-context">
      <h2>Todo List</h2>
      <ListGroup>
        <TodoForm />
        {todos.map((todo) => (
            <TodoItem key={todo.id}
                todo={todo} />
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
