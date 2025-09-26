import React from 'react';
import { motion } from 'framer-motion';

interface ClearCompletedButtonProps {
  onClick: () => void;
}

export const ClearCompletedButton: React.FC<ClearCompletedButtonProps> = ({
  onClick,
}) => {
  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      onClick={onClick}
      className=" px-3 py-2 text-sm rounded-md border border-todo-pillBorder dark:border-dark-border transition-colors bg-pill-hover 
      dark:bg-pill-hover-dark text-todo-text dark:text-dark-text hover:bg-pill-active dark:hover:bg-pill-active-dark hover:text-white"
    >
      Clear completed
    </motion.button>
  );
};
