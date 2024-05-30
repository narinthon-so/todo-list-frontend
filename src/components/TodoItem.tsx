import React, { useState } from 'react';
import { Todo } from '../models/todo';

interface TodoItemProps {
  todo: Todo;
  toggleComplete: (id: number, completed: boolean) => void;
  deleteTodo: (id: number) => void;
  renameTodo: (id: number, title: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleComplete, deleteTodo, renameTodo }) => {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);

  const handleToggleComplete = () => {
    toggleComplete(todo.id, !todo.completed);
  };

  const handleDeleteTodo = () => {
    deleteTodo(todo.id);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleRenameTodo = () => {
    if (title.trim() !== '') {
      renameTodo(todo.id, title.trim());
      setEditing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleRenameTodo();
    }
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggleComplete}
      />
      {editing ? (
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          onBlur={handleRenameTodo}
          onKeyPress={handleKeyPress}
          autoFocus
        />
      ) : (
        <span
          style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
          onClick={() => setEditing(true)}
        >
          {todo.title}
        </span>
      )}
      <button onClick={handleDeleteTodo}>Delete</button>
    </li>
  );
};

export default TodoItem;
