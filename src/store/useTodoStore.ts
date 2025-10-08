import { create } from 'zustand';

import { ErrorMessage } from '../utils/ErrorMessage';
import { FilterStatus } from '../utils/FilterStatus';

import type { Todo } from '../types/Todo';

import * as todoServices from '../api/todos';
import { USER_ID } from '../api/todos';

interface TodoStore {
  todos: Todo[];
  isLoading: boolean;
  filter: FilterStatus;
  errorMessage: ErrorMessage;
  newTodoTitle: string;

  setTodos: (todos: Todo[]) => void;
  setIsLoading: (loading: boolean) => void;
  setFilter: (filter: FilterStatus) => void;
  setErrorMessage: (message: ErrorMessage) => void;
  setNewTodoTitle: (title: string) => void;

  loadTodos: () => Promise<void>;
  handleAddTodo: () => Promise<void>;
  handleToggleTodo: (id: number, completed: boolean) => Promise<void>;
  handleDeleteTodo: (id: number) => Promise<void>;
  handleDeleteAllCompletedTodos: () => Promise<void>;
  handleSaveTodo: (id: number, newTitle: string) => Promise<void>;
  handleToggleAll: () => Promise<void>;

  reorderTodos: (orderedIds: number[]) => void;
}

export const useTodoStore = create<TodoStore>((set, get) => ({
  todos: [],
  isLoading: true,
  filter: FilterStatus.All,
  errorMessage: ErrorMessage.DEFAULT_ERROR,
  newTodoTitle: '',

  setTodos: (todos) => set({ todos }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setFilter: (filter) => set({ filter }),
  setErrorMessage: (errorMessage) => set({ errorMessage }),
  setNewTodoTitle: (newTodoTitle) => set({ newTodoTitle }),

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
    const { newTodoTitle, todos } = get();
    const normalizedTitle = newTodoTitle.trim();

    if (!normalizedTitle) {
      set({ errorMessage: ErrorMessage.TITLE_EMPTY });
      return;
    }

    set({ errorMessage: ErrorMessage.DEFAULT_ERROR });

    // тимчасова тудушка
    const tempId = -Date.now();
    const tempTodo = {
      id: tempId,
      userId: USER_ID,
      title: normalizedTitle,
      completed: false,
    } as Todo;

    //оптимістичне оновлення
    set({ todos: [...todos, tempTodo], newTodoTitle: '' });

    try {
      const addedTodo = await todoServices.addTodo(normalizedTitle);

      // заміна тимчасової на додану
      set((state) => ({
        todos: state.todos.map((t) => (t.id === tempId ? addedTodo : t)),
      }));
    } catch {
      // видалення тимчасової, в разі помилки
      set((state) => ({
        errorMessage: ErrorMessage.ADD_TODO_FAILED,
        todos: state.todos.filter((t) => t.id !== tempId),
        newTodoTitle: normalizedTitle,
      }));
    }
  },

  handleToggleTodo: async (id: number, completed: boolean) => {
    const prevTodos = get().todos;
    // оптимістичне оновлення
    set({
      errorMessage: ErrorMessage.DEFAULT_ERROR,
      todos: prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed } : todo,
      ),
    });

    try {
      const updatedTodo = await todoServices.updateTodo(id, { completed });

      set((state) => ({
        todos: state.todos.map((todo) => (todo.id === id ? updatedTodo : todo)),
      }));
    } catch {
      // ролбек оптимістичного оновлення
      set({ errorMessage: ErrorMessage.UPDATE_TODO_FAILED, todos: prevTodos });
    }
  },

  handleDeleteTodo: async (id: number) => {
    const prevTodos = get().todos;
    // оптимістичне видалення
    set({
      errorMessage: ErrorMessage.DEFAULT_ERROR,
      todos: prevTodos.filter((todo) => todo.id !== id),
    });

    try {
      await todoServices.deleteTodo(id);
    } catch {
      // ролбек
      set({ errorMessage: ErrorMessage.DELETE_TODO_FAILED, todos: prevTodos });
    }
  },

  handleDeleteAllCompletedTodos: async () => {
    const prevTodos = get().todos;
    set({ errorMessage: ErrorMessage.DEFAULT_ERROR });

    const completedTodos = prevTodos.filter((todo) => todo.completed);

    // оптимістичне видалення виконаних
    set({ todos: prevTodos.filter((todo) => !todo.completed) });

    try {
      await Promise.all(
        completedTodos.map((todo) => todoServices.deleteTodo(todo.id)),
      );
    } catch {
      // ролбек
      set({ errorMessage: ErrorMessage.DELETE_TODO_FAILED, todos: prevTodos });
    }
  },

  handleSaveTodo: async (id: number, newTitle: string) => {
    const prevTodos = get().todos;
    // оптимістичне оновлення тайтлу
    set({
      errorMessage: ErrorMessage.DEFAULT_ERROR,
      todos: prevTodos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo,
      ),
    });

    try {
      const updatedTodo = await todoServices.updateTodo(id, {
        title: newTitle,
      });

      set((state) => ({
        todos: state.todos.map((todo) => (todo.id === id ? updatedTodo : todo)),
      }));
    } catch {
      // ролбек назви
      set({ errorMessage: ErrorMessage.UPDATE_TODO_FAILED, todos: prevTodos });
    }
  },

  handleToggleAll: async () => {
    const prevTodos = get().todos;
    set({ errorMessage: ErrorMessage.DEFAULT_ERROR });

    const allCompleted =
      prevTodos.length > 0 && prevTodos.every((todo) => todo.completed);
    const newStatus = !allCompleted;

    // оптимістичне оновлення
    set({
      todos: prevTodos.map((todo) => ({ ...todo, completed: newStatus })),
    });

    try {
      await Promise.all(
        prevTodos.map((todo) =>
          todoServices.updateTodo(todo.id, { completed: newStatus }),
        ),
      );
    } catch {
      // ролбек
      set({ errorMessage: ErrorMessage.UPDATE_TODO_FAILED, todos: prevTodos });
    }
  },

  //сортування тудушек для DnD
  reorderTodos: (orderedIds: number[]) => {
    const currentById = new Map(get().todos.map((todo) => [todo.id, todo] as const));

    const reordered: Todo[] = orderedIds
      .map((id) => currentById.get(id))
      .filter((todo): todo is Todo => Boolean(todo));

    const untouched = get().todos.filter((todo) => !orderedIds.includes(todo.id));

    set({ todos: [...reordered, ...untouched] });
  },
}));

//прибираю useEffect в апці
useTodoStore.getState().loadTodos();
