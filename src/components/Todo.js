import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Import library uuid

import style from "./TodoList.module.css";

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAddTodo = () => {
    if (inputValue.trim() !== "") {
      const newTodo = { id: uuidv4(), value: inputValue, completed: false };
      setTodos([...todos, newTodo]);
      setInputValue("");
      setError(null);
    } else {
      setError("Input harus diisi!");
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  };

  const handleToggleTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (id) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };

  return (
    <div className={style.container}>
      <h1>To Do App</h1>
      <br />
      <div className={style["input-container"]}>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={error ? error : "Add to do..."}
          className={error ? `${style.input} ${style.error}` : style.input}
        />
        <button className={style["add-button"]} onClick={handleAddTodo}>
          Add Todo
        </button>
      </div>
      <h1>Tasks</h1>
      <ul className={style["todo-list"]}>
        {todos.map((todo) => (
          <li key={todo.id} className={style["todo-item"]}>
            <button
              className={style["delete-button"]}
              onClick={() => handleDeleteTodo(todo.id)}
            >
              Delete
            </button>
            <span
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                opacity: todo.completed ? "0.3" : "1",
              }}
            >
              {todo.value}
            </span>

            <button
              className={style["toggle-button"]}
              onClick={() => handleToggleTodo(todo.id)}
            >
              {todo.completed ? "Undone?" : "Done?"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
