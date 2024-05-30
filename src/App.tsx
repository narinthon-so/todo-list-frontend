import React, { useEffect, useState } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { getTodos, createTodo, updateTodo, deleteTodo } from './api/todoApi';
import { Todo } from './models/todo';
import './App.css';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await getTodos();
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const addTodo = async (title: string) => {
    try {
      const response = await createTodo(title);
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleComplete = async (id: number, completed: boolean) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (todo) {
        const response = await updateTodo(id, todo.title, completed);
        setTodos(todos.map(t => (t.id === id ? response.data : t)));
      }
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const removeTodo = async (id: number) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const renameTodo = async (id: number, newTitle: string) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (todo) {
        const response = await updateTodo(id, newTitle, todo.completed);
        setTodos(todos.map(t => (t.id === id ? response.data : t)));
      }
    } catch (error) {
      console.error('Error renaming todo:', error);
    }
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <TodoForm addTodo={addTodo} />
      <TodoList todos={todos} toggleComplete={toggleComplete} deleteTodo={removeTodo} renameTodo={renameTodo} />
    </div>
  );
};

export default App;
