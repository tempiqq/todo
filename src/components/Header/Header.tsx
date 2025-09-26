import { useTodoMemo } from '../../hooks/useTodoMemo';
import { useTodoStore } from '../../store/useTodoStore';
import { NewTodoInput } from '../NewTodoInput';
import { CompleteAllButton } from './CompleteAllButton';
import { ToggleThemeButton } from './ToggleThemeButton';


export const Header = () => {
  const {
    todos,
    filter,
    newTodoTitle,
    setNewTodoTitle,
    handleAddTodo,
    handleToggleAll,
  } = useTodoStore();

  const { allCompleted, showTodos, remainTodos } = useTodoMemo(todos, filter);
  
  return (
    <>
      <header className="flex items-center justify-between px-6">
        <h1 className="text-4xl font-light text-center py-6 text-todo-text dark:text-dark-text">
          Todos
        </h1>
        <ToggleThemeButton />
      </header>

      <div className="px-6 pb-4">
        {showTodos && (
          <CompleteAllButton
            allCompleted={allCompleted}
            remaining={remainTodos}
            onToggleAll={handleToggleAll}
          />
        )}
        <NewTodoInput
          value={newTodoTitle}
          onChange={setNewTodoTitle}
          onSubmit={handleAddTodo}
        />
      </div>
    </>
  );
};
