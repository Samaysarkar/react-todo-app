import React, { useState } from 'react';

export default function TodoList({ user, onLogout }) {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInput('');
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-box">
      <div className="todo-header">
        <h3>Welcome, {user.email.split('@')[0]}</h3>
        <button className="logout-btn" onClick={onLogout}>Logout</button>
      </div>

      <form onSubmit={addTodo} className="todo-input-group">
        <input
          type="text"
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit" style={{ width: 'auto' }}>Add</button>
      </form>

      <ul className="todo-list">
        {todos.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#888', marginTop: '1rem' }}>No tasks added yet!</p>
        ) : (
          todos.map((todo) => (
            <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <span onClick={() => toggleComplete(todo.id)} style={{ cursor: 'pointer', flex: 1 }}>
                {todo.completed ? '☑ ' : '☐ '} {todo.text}
              </span>
              <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>✕</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}