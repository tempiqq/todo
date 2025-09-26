import React from 'react';

interface NewTodoInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export const NewTodoInput: React.FC<NewTodoInputProps> = ({
  value,
  onChange,
  onSubmit,
}) => {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="What need to be done?"
        className="w-full px-4 py-3 border border-todo-border dark:border-dark-border rounded-lg bg-white dark:bg-dark-surface
         text-todo-text dark:text-dark-text placeholder-todo-muted dark:placeholder-dark-muted
         focus:outline-none focus:border-todo-inputFocus focus:ring-2 focus:ring-todo-inputGlow"
      />
    </form>
  );
};
