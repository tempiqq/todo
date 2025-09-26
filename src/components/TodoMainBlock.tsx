import { EmptyState } from './EmptyState';
import { FooterBar } from './Footer/FooterBar';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { TodoList } from './TodoList';
import { useTodoStore } from '../store/useTodoStore';
import { useTodoMemo } from '../hooks/useTodoMemo';

export const TodoMainBlock = () => {
const {
    todos,
    isLoading,
    filter,
    handleSaveTodo,
    handleDeleteTodo,
    handleToggleTodo,
    handleDeleteAllCompletedTodos,
    setFilter,
  } = useTodoStore();

  const {
    visibleTodos,
    itemsLeft,
    hasCompleted,
    noTodos,
    showTodos,
  } = useTodoMemo(todos, filter);
  
  return (
    <>
      {isLoading ?
        <LoadingSpinner />
      : <>
          <TodoList
            todos={visibleTodos}
            onSave={handleSaveTodo}
            onDelete={handleDeleteTodo}
            onToggle={handleToggleTodo}
          />

          {noTodos && <EmptyState filter={filter} />}

          {showTodos && (
            <FooterBar
              itemsLeft={itemsLeft}
              filter={filter}
              onFilterChange={setFilter}
              hasCompleted={hasCompleted}
              onClearCompleted={handleDeleteAllCompletedTodos}
            />
          )}
        </>
      }
    </>
  );
};
