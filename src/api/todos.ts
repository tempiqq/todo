import type { Todo } from '../types/Todo';
import { client } from '../utils/fetchClient';

export const USER_ID = 3093;

export const getTodos = async (): Promise<Todo[]> => {
  const response = await client.get<Todo[]>(`/todos?userId=${USER_ID}`);

  return response.data;
};

export const addTodo = async (title: string): Promise<Todo> => {
  const response = await client.post<Todo>('/todos', {
    userId: USER_ID,
    title,
    completed: false,
  });

  return response.data;
};

export const deleteTodo = async (todoId: number): Promise<void> => {
  await client.delete(`/todos/${todoId}`);
};

export const updateTodo = async (
  todoId: number,
  data: Partial<Todo>,
): Promise<Todo> => { 
  const response = await client.patch<Todo>(`/todos/${todoId}`, data);

  return response.data
};
