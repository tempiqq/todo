import { useTodoStore } from '../store/useTodoStore';

export const NewTodoInput = () => {
  const { newTodoTitle, setNewTodoTitle, handleAddTodo } = useTodoStore();

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        handleAddTodo();
      }}
    >
      <input
        type="text"
        value={newTodoTitle}
        onChange={(e) => setNewTodoTitle(e.target.value)}
        placeholder="What need to be done?"
        className="w-full px-4 py-3 border border-todo-border dark:border-dark-border rounded-lg bg-white dark:bg-dark-surface
         text-todo-text dark:text-dark-text placeholder-todo-muted dark:placeholder-dark-muted
         focus:outline-none focus:border-todo-inputFocus focus:ring-2 focus:ring-todo-inputGlow"
      />
    </form>
  );
};
