import { FilterStatus } from '../utils/FilterStatus';
import { useTodoMemo } from '../hooks/useTodoMemo';
import { useTodoStore } from '../store/useTodoStore';

export const EmptyState = () => {
  const { todos, filter } = useTodoStore();
  const { noTodos } = useTodoMemo(todos, filter);

  return (
    noTodos && (
      <div className="px-6 mb-4 text-todo-text dark:text-dark-text">
        {filter === FilterStatus.All && 'No todos yet'}
        {filter === FilterStatus.Active && 'No active todos'}
        {filter === FilterStatus.Completed && 'No completed todos'}
      </div>
    )
  );
};
