import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  type DragStartEvent,
  type SensorDescriptor,
  type UniqueIdentifier,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { DragAndDropOverlayComponent } from './DragAndDropOverlayComponent';
import type { Todo } from '../../types/Todo';

interface DragAndDropWrapperComponentProps {
  children: React.ReactNode;
  sensors: SensorDescriptor<object>[];
  handleDragStart: (event: DragStartEvent) => void;
  handleDragEnd: (event: DragEndEvent) => void;
  handleDragOver: (event: DragOverEvent) => void;
  items: UniqueIdentifier[];
  activeTodo: Todo;
}

export const DragAndDropWrapperComponent = ({
  children,
  sensors,
  handleDragEnd,
  handleDragOver,
  handleDragStart,
  items,
  activeTodo,
}: DragAndDropWrapperComponentProps) => {
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
