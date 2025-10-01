import React from 'react';
import { FooterFilterButtons } from '../ui/Footer/FooterFilterButtons';
import { ClearCompletedButton } from '../ui/Footer/ClearCompletedButton';
import { useTodoStore } from '../store/useTodoStore';
import { useTodoMemo } from '../hooks/useTodoMemo';

export const Footer = () => {
  const { todos } = useTodoStore();
  const { itemsLeft } = useTodoMemo(todos);

  const showTodos = useTodoStore((state) => state.todos.length > 0);

  return (
    showTodos && (
      <div className="px-6 py-4 bg-items-gradient dark:bg-items-gradient-dark rounded-md mt-3 border border-todo-border dark:border-dark-border">
        <div className="flex justify-between items-center mb-4">
          <span className=" text-todo-text dark:text-dark-text">
            <span className="font-semibold">{itemsLeft}</span> items left
          </span>

          <ClearCompletedButton />
        </div>

        <FooterFilterButtons />
      </div>
    )
  );
};
