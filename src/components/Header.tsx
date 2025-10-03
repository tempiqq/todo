import { Heading } from '../ui/Heading';
import { ToggleThemeButton } from '../ui/Header/ToggleThemeButton';
import { CompleteAllButton } from '../ui/Header/CompleteAllButton';
import { NewTodoInput } from './NewTodoInput';

export const Header = () => {
  return (
    <>
      <header className="flex items-center justify-between px-6">
        <Heading text={'Todos'} />
        <ToggleThemeButton />
      </header>

      <div className="px-6 pb-4">
        <CompleteAllButton />
        <NewTodoInput />
      </div>
    </>
  );
};
