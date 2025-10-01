import clsx from 'clsx';
import { motion } from 'framer-motion';
import { FilterStatus } from '../../utils/FilterStatus';
import { useTodoStore } from '../../store/useTodoStore';

export const FooterFilterButtons = () => {
  const { filter, setFilter } = useTodoStore();
  const buttonBaseClasses = 'px-3 py-1.5 text-sm rounded-full border transition-colors';

  return (
    <div className="flex gap-2">
      {Object.values(FilterStatus).map((status) => {
        const buttonDynamicClasses = clsx(buttonBaseClasses, {
          'bg-pill-active dark:bg-pill-active-dark border-transparent text-todo-pillTextActive shadow-sm':
            filter === status,
          'bg-todo-pillBg dark:bg-dark-surface border-todo-pillBorder dark:border-dark-border text-todo-pillText dark:text-dark-text hover:bg-pill-hover dark:hover:bg-pill-hover-dark':
            filter !== status,
        });

        return (
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            key={status}
            onClick={() => setFilter(status)}
            className={buttonDynamicClasses}
          >
            {status}
          </motion.button>
        );
      })}
    </div>
  );
};
