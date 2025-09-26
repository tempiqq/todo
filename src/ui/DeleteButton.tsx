import { motion } from 'framer-motion';

interface DeleteButtonProps {
  handleDelete: () => void;
  isSaving: boolean;
}

export const DeleteButton = ({ handleDelete, isSaving }: DeleteButtonProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.75 }}
      whileHover={{ scale: 1.05 }}
      transition={{
        type: 'spring',
        stiffness: 400,
        damping: 20,
      }}
      onClick={handleDelete}
      disabled={isSaving}
      className="ml-2 text-todo-danger dark:text-dark-danger hover:text-todo-dangerHover text-xl font-bold disabled:opacity-60"
    >
      ×
    </motion.button>
  );
};
