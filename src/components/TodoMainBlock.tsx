import { LoadingSpinner } from '../ui/LoadingSpinner';
import { TodoList } from './TodoList';
import { EmptyState } from './EmptyState';
import { Footer } from './Footer';

import { useTodoStore } from '../store/useTodoStore';

export const TodoMainBlock = () => {
  const { isLoading } = useTodoStore();

  return (
    <>
      {isLoading ?
        <LoadingSpinner />
      : <>
          <TodoList />

          <EmptyState />

          <Footer />
        </>
      }
    </>
  );
};
