import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { containerVariants } from '../utils/ui/containerVariants';

import type { Todo } from '../types/Todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onSave: (id: number, newTitle: string) => Promise<void>;
  onDelete: (id: number) => void;
  onToggle: (id: number, completed: boolean) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  onSave,
  onDelete,
  onToggle,
}) => {
  
  return (
    <div className="p-6">
      <motion.div
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="border border-todo-border dark:border-dark-border shadow-lg rounded bg-todo-bg dark:bg-todo-bg-dark"
      >
        {/* анімація тудушек: без popLayout, щоб не штовхати сусідів */}
        <AnimatePresence>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onSave={onSave}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
