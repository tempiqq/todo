import { motion } from 'framer-motion';
import clsx from 'clsx';

import { useTodoStore } from '../../store/useTodoStore';
import { useTodoMemo } from '../../hooks/useTodoMemo';

export const CompleteAllButton = () => {
  const { handleToggleAll, todos } = useTodoStore();
  const { remainTodos, allCompleted } = useTodoMemo(todos);

  return (
    <div className="flex items-center gap-3 mb-2">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        title={allCompleted ? 'Mark all as incomplete' : 'Mark all as complete'}
        onClick={handleToggleAll}
        className={clsx(
          'h-8 px-3 border rounded-md text-sm',
          allCompleted &&
            'bg-todo-pillBgActive border-todo-pillBgActive text-todo-pillTextActive dark:bg-pill-active-dark dark:border-transparent',
          !allCompleted &&
            'bg-todo-pillBg dark:bg-pill-hover-dark border-todo-pillBorder dark:border-dark-border text-todo-pillText dark:text-dark-text hover:bg-pill-hover dark:hover:bg-pill-active-dark',
        )}
      >
        {allCompleted ? 'Uncomplete all' : 'Complete all'}
      </motion.button>
      <span className="text-todo-muted dark:text-dark-muted">
        {allCompleted ? 'All todos completed' : `${remainTodos} remaining`}
      </span>
    </div>
  );
};
