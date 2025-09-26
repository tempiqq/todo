import { create } from 'zustand';

import { ErrorMessage } from '../utils/ErrorMessage';
import { FilterStatus } from '../utils/FilterStatus';

import type { Todo } from '../types/Todo';

import * as todoServices from '../api/todos';

interface TodoStore {
  // Стан
  todos: Todo[];
  isLoading: boolean;
  filter: FilterStatus;
  errorMessage: ErrorMessage;
  newTodoTitle: string;

  // Дії
  setTodos: (todos: Todo[]) => void;
  setIsLoading: (loading: boolean) => void;
  setFilter: (filter: FilterStatus) => void;
  setErrorMessage: (message: ErrorMessage) => void;
  setNewTodoTitle: (title: string) => void;

  // CRUD операції
  loadTodos: () => Promise<void>;
  handleAddTodo: () => Promise<void>;
  handleToggleTodo: (id: number, completed: boolean) => Promise<void>;
  handleDeleteTodo: (id: number) => Promise<void>;
  handleDeleteAllCompletedTodos: () => Promise<void>;
  handleSaveTodo: (id: number, newTitle: string) => Promise<void>;
  handleToggleAll: () => Promise<void>;
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  // Початковий стан
  todos: [],
  isLoading: true,
  filter: FilterStatus.All,
  errorMessage: ErrorMessage.DEFAULT_ERROR,
  newTodoTitle: '',

  // Сеттери
  setTodos: (todos) => set({ todos }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setFilter: (filter) => set({ filter }),
  setErrorMessage: (errorMessage) => set({ errorMessage }),
  setNewTodoTitle: (newTodoTitle) => set({ newTodoTitle }),

  // CRUD
  loadTodos: async () => {
    try {
      set({ errorMessage: ErrorMessage.DEFAULT_ERROR, isLoading: true });
      const loadedTodos = await todoServices.getTodos();
      set({ todos: loadedTodos });
    } catch {
      set({ errorMessage: ErrorMessage.LOAD_TODOS_FAILED });
    } finally {
      set({ isLoading: false });
    }
  },

  handleAddTodo: async () => {
    const { newTodoTitle } = get();
    const normalizedTitle = newTodoTitle.trim();

    if (!normalizedTitle) {
      set({ errorMessage: ErrorMessage.TITLE_EMPTY });
      return;
    }

    set({ errorMessage: ErrorMessage.DEFAULT_ERROR });

    try {
      const addedTodo = await todoServices.addTodo(normalizedTitle);
      
      set((state) => ({
        todos: [...state.todos, addedTodo],
        newTodoTitle: '',
      }));
    } catch {
      set({ errorMessage: ErrorMessage.ADD_TODO_FAILED });
    }
  },

  handleToggleTodo: async (id: number, completed: boolean) => {
    try {
      set({ errorMessage: ErrorMessage.DEFAULT_ERROR });
      const updatedTodo = await todoServices.updateTodo(id, { completed });
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? updatedTodo : todo,
        ),
      }));
    } catch {
      set({ errorMessage: ErrorMessage.UPDATE_TODO_FAILED });
    }
  },

  handleDeleteTodo: async (id: number) => {
    try {
      set({ errorMessage: ErrorMessage.DEFAULT_ERROR });
      await todoServices.deleteTodo(id);
      set((state) => ({
        todos: state.todos.filter((todo) => todo.id !== id),
      }));
    } catch {
      set({ errorMessage: ErrorMessage.DELETE_TODO_FAILED });
    }
  },

  handleDeleteAllCompletedTodos: async () => {
    try {
      set({ errorMessage: ErrorMessage.DEFAULT_ERROR });
      const { todos } = get();
      const completedTodos = todos.filter((todo) => todo.completed);

      await Promise.all(
        completedTodos.map((todo) => todoServices.deleteTodo(todo.id)),
      );

      set((state) => ({
        todos: state.todos.filter((todo) => !todo.completed),
      }));
    } catch {
      set({ errorMessage: ErrorMessage.DELETE_TODO_FAILED });
    }
  },

  handleSaveTodo: async (id: number, newTitle: string) => {
    try {
      set({ errorMessage: ErrorMessage.DEFAULT_ERROR });
      const updatedTodo = await todoServices.updateTodo(id, {
        title: newTitle,
      });
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? updatedTodo : todo,
        ),
      }));
    } catch {
      set({ errorMessage: ErrorMessage.UPDATE_TODO_FAILED });
    }
  },

  handleToggleAll: async () => {
    try {
      set({ errorMessage: ErrorMessage.DEFAULT_ERROR });
      const { todos } = get();
      const allCompleted = todos.length > 0 && todos.every((todo) => todo.completed);
      const newStatus = !allCompleted;

      const updatePromise = todos.map((todo) =>
        todoServices.updateTodo(todo.id, { completed: newStatus }),
      );

      await Promise.all(updatePromise);

      set((state) => ({
        todos: state.todos.map((todo) => ({ ...todo, completed: newStatus })),
      }));
    } catch {
      set({ errorMessage: ErrorMessage.UPDATE_TODO_FAILED });
    }
  },
}));