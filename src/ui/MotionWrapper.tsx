import React from 'react';
import { containerVariants } from '../utils/ui/containerVariants';
import { motion } from 'framer-motion';

interface MotionWrapperProps {
  children: React.ReactNode;
}

export const MotionWrapper = ({ children }: MotionWrapperProps) => {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={containerVariants}
      className="border border-todo-border dark:border-dark-border shadow-lg rounded bg-todo-bg dark:bg-todo-bg-dark"
    >
      {children}
    </motion.div>
  );
};
