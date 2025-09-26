import { motion } from 'framer-motion';
import type { Todo } from '../types/Todo';

interface CustomCheckboxProps {
  todo: Todo;
}

export const CustomCheckbox = ({ todo }: CustomCheckboxProps) => {
  return (
    <>
      <motion.span
        whileTap={{ scale: 0.65 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        aria-hidden
        className="inline-block h-5 w-5 rounded-md border border-todo-borderHover dark:border-dark-border bg-white dark:bg-dark-surface transition-colors peer-checked:bg-pill-active peer-checked:border-transparent disabled:opacity-60"
      />
      <motion.svg
        initial={{ scale: 0 }}
        animate={{ scale: todo.completed ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
        viewBox="0 0 20 20"
        className="pointer-events-none absolute left-0 top-0 h-5 w-5 p-[3px] text-white opacity-0 transition-opacity peer-checked:opacity-100"
        fill="currentColor"
        aria-hidden
      >
        <path d="M7.5 13.3L4.2 10l1.4-1.4 1.9 1.9 6-6L15 5.9z" />
      </motion.svg>
    </>
  );
};
