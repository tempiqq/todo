import type { Todo } from '../../types/Todo';
import { DragOverlay } from '@dnd-kit/core';

interface DragAndDropOverlayComponentProps {
  activeTodo: Todo;
}

export const DragAndDropOverlayComponent = ({activeTodo}: DragAndDropOverlayComponentProps) => {
  return (
    <DragOverlay>
      {activeTodo && (
        <div
          className={`flex items-center p-4 border-b last:border-b-0 border-todo-border dark:border-dark-border rounded transition-colors shadow-lg ${activeTodo.completed ? 'bg-todo-completed dark:bg-todo-completed-dark' : 'bg-todo-bg dark:bg-todo-bg-dark'}`}
        >
          <span
            className={
              activeTodo.completed ?
                'ml-3 flex-1 line-through text-todo-muted dark:text-dark-muted'
              : 'ml-3 flex-1 text-todo-text dark:text-dark-text'
            }
          >
            {activeTodo.title}
          </span>
        </div>
      )}
    </DragOverlay>
  );
};
