import { AnimatePresence, motion } from 'framer-motion';
import { containerVariants } from '../utils/ui/containerVariants';

import { TodoItem } from './TodoItem';

import { useTodoStore } from '../store/useTodoStore';
import { useTodoMemo } from '../hooks/useTodoMemo';

export const TodoList = () => {
  const { todos, filter } = useTodoStore();

  const { visibleTodos } = useTodoMemo(todos, filter);

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
          {visibleTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
