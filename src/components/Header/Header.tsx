import { useTodoStore } from '../../store/useTodoStore';
import { NewTodoInput } from '../NewTodoInput';
import { CompleteAllButton } from './CompleteAllButton';
import { ToggleThemeButton } from './ToggleThemeButton';

export const Header = () => {
  const showTodos = useTodoStore((state) => state.todos.length > 0);

  return (
    <>
      <header className="flex items-center justify-between px-6">
        <h1 className="text-4xl font-light text-center py-6 text-todo-text dark:text-dark-text">
          Todos
        </h1>
        <ToggleThemeButton />
      </header>

      <div className="px-6 pb-4">
        {showTodos && <CompleteAllButton />}
        <NewTodoInput />
      </div>
    </>
  );
};
