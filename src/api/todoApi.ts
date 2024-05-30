import axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:3000/api/todos";

export const getTodos = () => axios.get(API_URL);
export const createTodo = (title: string) => axios.post(API_URL, { title });
export const updateTodo = (id: number, title: string, completed: boolean) =>
  axios.put(`${API_URL}/${id}`, { title, completed });
export const deleteTodo = (id: number) => axios.delete(`${API_URL}/${id}`);
