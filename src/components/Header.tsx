import { NewTodoInput } from './NewTodoInput';
import { CompleteAllButton } from '../ui/Header/CompleteAllButton';
import { ToggleThemeButton } from '../ui/Header/ToggleThemeButton';

export const Header = () => {
  return (
    <>
      <header className="flex items-center justify-between px-6">
        <h1 className="text-4xl font-light text-center py-6 text-todo-text dark:text-dark-text">
          Todos
        </h1>
        <ToggleThemeButton />
      </header>

      <div className="px-6 pb-4">
        <CompleteAllButton />
        <NewTodoInput />
      </div>
    </>
  );
};
