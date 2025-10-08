import { AnimatePresence } from 'framer-motion';

import { useTodoStore } from '../store/useTodoStore';
import { useTodoMemo } from '../hooks/useTodoMemo';

import { TodoItem } from './TodoItem';
import { DragAndDropWrapperComponent } from '../ui/DnD/DragAndDropWrapperComponent';
import { MotionWrapper } from '../ui/MotionWrapper';

export const TodoList = () => {
  const { todos, filter } = useTodoStore();
  const { visibleTodos } = useTodoMemo(todos, filter);

  return (
    <div className="p-6">
      <MotionWrapper>
        <DragAndDropWrapperComponent visibleTodos={visibleTodos}>
          <AnimatePresence>
            {visibleTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
              />
            ))}
          </AnimatePresence>
        </DragAndDropWrapperComponent>
      </MotionWrapper>
      
    </div>
  );
};
