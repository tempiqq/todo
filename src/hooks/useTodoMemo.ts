import { useMemo } from 'react';
import { FilterStatus } from '../utils/FilterStatus';
import type { Todo } from '../types/Todo';

export const useTodoMemo = (todos: Todo[], filter?: FilterStatus) => {

  const visibleTodos = useMemo(() => {

    switch (filter) {
      case FilterStatus.Active:
        return todos.filter((todo) => !todo.completed);
      case FilterStatus.Completed:
        return todos.filter((todo) => todo.completed);
      case FilterStatus.All:
      default:
        return todos;
    }
  }, [todos, filter]);

  const allCompleted = useMemo(() => {
    return todos.length > 0 && todos.every((todo) => todo.completed);
  }, [todos]);

  const itemsLeft = useMemo(() => {
    return todos.filter((todo) => !todo.completed).length;
  }, [todos]);

  const noTodos = useMemo(() => {
    return visibleTodos.length === 0;
  }, [visibleTodos]);

  return {
    visibleTodos,
    allCompleted,
    itemsLeft,
    noTodos,
  };
};