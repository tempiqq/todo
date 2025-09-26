import { useEffect, useState } from 'react';
import { ErrorMessage } from '../utils/ErrorMessage';
import { FilterStatus } from '../utils/FilterStatus';
import type { Todo } from '../types/Todo';
import * as todoServices from '../api/todos';

export const useTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.All);
  const [errorMessage, setErrorMessage] = useState<ErrorMessage>(
    ErrorMessage.DEFAULT_ERROR,
  );
  const [newTodoTitle, setNewTodoTitle] = useState('');

  // початкове завантаження тудушок
  useEffect(() => {
    const loadTodos = async () => {
      try {
        setErrorMessage(ErrorMessage.DEFAULT_ERROR);
        setIsLoading(true);

        const loadedTodos = await todoServices.getTodos();
        setTodos(loadedTodos);
      } catch {
        setErrorMessage(ErrorMessage.LOAD_TODOS_FAILED);
      } finally {
        setIsLoading(false);
      }
    };

    loadTodos();
  }, []);

  const visibleTodos = todos.filter((todo) => {
    switch (filter) {
      case FilterStatus.Active:
        return !todo.completed;
      case FilterStatus.Completed:
        return todo.completed;
      case FilterStatus.All:
      default:
        return true;
    }
  });

  // додавання
  const handleAddTodo = async () => {
    const normalizedTitle = newTodoTitle.trim();

    if (!normalizedTitle) {
      setErrorMessage(ErrorMessage.TITLE_EMPTY);
      return;
    }

    setErrorMessage(ErrorMessage.DEFAULT_ERROR);

    try {
      const addedTodo = await todoServices.addTodo(normalizedTitle);

      setTodos((prevTodos) => [...prevTodos, addedTodo]);

      setNewTodoTitle('');
    } catch {
      setErrorMessage(ErrorMessage.ADD_TODO_FAILED);
    }
  };

  // виконане
  const handleToggleTodo = async (id: number, completed: boolean) => {
    try {
      setErrorMessage(ErrorMessage.DEFAULT_ERROR);

      const updatedTodo = await todoServices.updateTodo(id, { completed });

      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo)),
      );
    } catch {
      setErrorMessage(ErrorMessage.UPDATE_TODO_FAILED);
    }
  };

  // видалення
  const handleDeleteTodo = async (id: number) => {
    try {
      setErrorMessage(ErrorMessage.DEFAULT_ERROR);

      await todoServices.deleteTodo(id);

      setTodos((prevTodo) => prevTodo.filter((todo) => todo.id !== id));
    } catch {
      setErrorMessage(ErrorMessage.DELETE_TODO_FAILED);
    }
  };

  //видалення всіх
  const handleDeleteAllCompletedTodos = async () => {
    try {
      setErrorMessage(ErrorMessage.DEFAULT_ERROR);

      const completedTodos = todos.filter((todo) => todo.completed);

      await Promise.all(
        completedTodos.map((todo) => todoServices.deleteTodo(todo.id)),
      );

      setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
    } catch {
      setErrorMessage(ErrorMessage.DELETE_TODO_FAILED);
    }
  };

  //редагування
  const handleSaveTodo = async (
    id: number,
    newTitle: string,
  ): Promise<void> => {
    try {
      setErrorMessage(ErrorMessage.DEFAULT_ERROR);

      const updatedTodo = await todoServices.updateTodo(id, {
        title: newTitle,
      });

      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo : todo)),
      );
    } catch {
      setErrorMessage(ErrorMessage.UPDATE_TODO_FAILED);
    }
  };

  // кнопка виконати всі
  const handleToggleAll = async () => {
    try {
      setErrorMessage(ErrorMessage.DEFAULT_ERROR);

      const newStatus = !allCompleted;

      const updatePromise = todos.map((todo) =>
        todoServices.updateTodo(todo.id, { completed: newStatus }),
      );

      await Promise.all(updatePromise);

      setTodos((prevTodos) =>
        prevTodos.map((todo) => ({ ...todo, completed: newStatus })),
      );
    } catch {
      setErrorMessage(ErrorMessage.UPDATE_TODO_FAILED);
    }
  };

  const allCompleted =
    todos.length > 0 && todos.every((todo) => todo.completed);
  const itemsLeft = todos.filter((todo) => !todo.completed).length;
  const hasCompleted = todos.some((todo) => todo.completed);
  const noTodos = visibleTodos.length === 0;
  const showTodos = todos.length > 0;
  const remainTodos = todos.filter((todo) => !todo.completed).length;

  return {
    todos,
    setTodos,
    isLoading,
    setIsLoading,
    filter,
    setFilter,
    errorMessage,
    setErrorMessage,
    newTodoTitle,
    setNewTodoTitle,
    visibleTodos,
    handleAddTodo,
    handleToggleTodo,
    handleDeleteTodo,
    handleDeleteAllCompletedTodos,
    handleSaveTodo,
    allCompleted,
    handleToggleAll,
    itemsLeft,
    hasCompleted,
    noTodos,
    showTodos,
    remainTodos,
  };
};
