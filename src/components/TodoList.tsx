import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../models/todo';

interface TodoListProps {
  todos: Todo[];
  toggleComplete: (id: number, completed: boolean) => void;
  deleteTodo: (id: number) => void;
  renameTodo: (id: number, title: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, toggleComplete, deleteTodo, renameTodo }) => {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleComplete={toggleComplete}
          deleteTodo={deleteTodo}
          renameTodo={renameTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
