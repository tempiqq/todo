import React from 'react';
import { motion } from 'framer-motion';

interface CompleteAllButtonProps {
  allCompleted: boolean;
  remaining: number;
  onToggleAll: () => void;
}

export const CompleteAllButton: React.FC<CompleteAllButtonProps> = ({
  allCompleted,
  remaining,
  onToggleAll,
}) => {
  return (
    <div className="flex items-center gap-3 mb-2">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        onClick={onToggleAll}
        className={`h-8 px-3 border rounded-md text-sm ${
          allCompleted ?
            'bg-todo-pillBgActive border-todo-pillBgActive text-todo-pillTextActive dark:bg-pill-active-dark dark:border-transparent'
          : 'bg-todo-pillBg dark:bg-pill-hover-dark border-todo-pillBorder dark:border-dark-border text-todo-pillText dark:text-dark-text hover:bg-pill-hover dark:hover:bg-pill-active-dark'
        }`}
        title={allCompleted ? 'Mark all as incomplete' : 'Mark all as complete'}
      >
        {allCompleted ? 'Uncomplete all' : 'Complete all'}
      </motion.button>
      <span className="text-todo-muted dark:text-dark-muted">
        {allCompleted ? 'All todos completed' : `${remaining} remaining`}
      </span>
    </div>
  );
};
