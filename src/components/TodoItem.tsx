import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

import type { Todo } from '../types/Todo';
import { CustomCheckbox } from '../ui/CustomCheckbox';
import { DeleteButton } from '../ui/DeleteButton';
import { SavingSpinner } from '../ui/SavingSpinner';

import { useTodoItem } from '../hooks/useTodoItem';

interface TodoItemProps {
  todo: Todo;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const {
    isEditing,
    editTitle,
    isSaving,
    editInputRef,
    setEditTitle,
    handleDoubleClick,
    handleSaveEdit,
    handleKeyDown,
    handleToggle,
    handleDelete,
  } = useTodoItem({ todo });

  return (
    // relative для спінера
    <motion.div
      className="relative"
      initial={{ opacity: 0, height: 0, y: 50 }} //анімація тудушек
      animate={{ opacity: 1, height: 'auto', y: 0 }}
      exit={{ opacity: 0, height: 0, x: -100, transition: { duration: 0.3 } }}
      layout
    >
      <div
        className={clsx(
          'flex items-center p-4 border-b last:border-b-0 border-todo-border dark:border-dark-border rounded transition-colors hover:bg-todo-hover dark:hover:bg-todo-hover-dark',
          todo.completed ?
            'bg-todo-completed dark:bg-todo-completed-dark'
          : 'bg-todo-bg dark:bg-todo-bg-dark',
        )}
      >
        {/* чекбокс */}
        <label
          htmlFor={`todo-${todo.id}`}
          className="relative inline-flex items-center focus-within:ring-2 focus-within:ring-todo-inputGlow rounded-md"
        >
          <input
            id={`todo-${todo.id}`}
            type="checkbox"
            checked={todo.completed}
            onChange={(e) => handleToggle(e.target.checked)}
            disabled={isSaving}
            className="peer sr-only"
          />

          <CustomCheckbox todo={todo} />
        </label>

        {/* інпут редагування / назва тудушки */}
        {isEditing ?
          <input
            ref={editInputRef}
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleSaveEdit}
            onKeyDown={handleKeyDown}
            disabled={isSaving}
            className="ml-3 flex-1 px-2 py-1 border border-todo-border dark:border-dark-border rounded bg-white dark:bg-dark-surface
              text-todo-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-todo-inputGlow disabled:opacity-60"
          />
        : <span
            onDoubleClick={handleDoubleClick}
            className={clsx('ml-3 flex-1', {
              'line-through text-todo-muted dark:text-dark-muted':
                todo.completed,
              'text-todo-text dark:text-dark-text': !todo.completed,
            })}
          >
            {todo.title}
          </span>
        }

        {!isEditing && (
          <DeleteButton
            handleDelete={handleDelete}
            isSaving={isSaving}
          />
        )}
      </div>

      {isSaving && <SavingSpinner />}
    </motion.div>
  );
};
