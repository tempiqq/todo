import { closestCenter, DndContext } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { DragAndDropOverlayComponent } from './DragAndDropOverlayComponent';
import type { Todo } from '../../types/Todo';
import { useTodoDnD } from '../../hooks/useTodoDnD';
import { useTodoStore } from '../../store/useTodoStore';

interface DragAndDropWrapperComponentProps {
  children: React.ReactNode;
  visibleTodos: Todo[];
}

export const DragAndDropWrapperComponent = ({
  children,
  visibleTodos,
}: DragAndDropWrapperComponentProps) => {
  const { todos, reorderTodos } = useTodoStore();

  const {
    sensors,
    items,
    activeTodo,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
  } = useTodoDnD({ todos, visibleTodos, reorderTodos });

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <SortableContext
        items={items}
        strategy={verticalListSortingStrategy}
      >
        {children}
      </SortableContext>

      <DragAndDropOverlayComponent activeTodo={activeTodo} />
    </DndContext>
  );
};
