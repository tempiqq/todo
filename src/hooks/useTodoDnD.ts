import {
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DndContextProps,
  type DragEndEvent,
} from '@dnd-kit/core';
import { useState } from 'react';
import type { Todo } from '../types/Todo';
import { arrayMove } from '@dnd-kit/sortable';

interface useTodoDnDProps {
  todos: Todo[];
  visibleTodos: Todo[];
  reorderTodos: (orderedIds: number[]) => void;
}

export const useTodoDnD = ({
  todos,
  visibleTodos,
  reorderTodos,
}: useTodoDnDProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 100, tolerance: 5 },
    }),
  );

  const [activeId, setActiveId] = useState<number | null>(null);
  const activeTodo = todos.find((todo) => todo.id === activeId)!;
  const items = visibleTodos.map((todo) => todo.id);

  const handleDragStart: DndContextProps['onDragStart'] = (event) => {
    const id = event.active.id;
    if (typeof id === 'number') {
      setActiveId(id);
    }
  };

  const handleDragEnd: DndContextProps['onDragEnd'] = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }

    const ids = visibleTodos.map((todo) => todo.id);
    const oldIndex = ids.indexOf(active.id as number);
    const newIndex = ids.indexOf(over.id as number);
    const newOrderVisibleTodos = arrayMove(ids, oldIndex, newIndex);

    const hiddenTodos = todos.filter((todo) => !visibleTodos.includes(todo));
    const hiddenTodosIds = hiddenTodos.map((todo) => todo.id);

    const mergedOrdered = [...hiddenTodosIds, ...newOrderVisibleTodos];

    reorderTodos(mergedOrdered);
    setActiveId(null);
  };

  const handleDragOver: DndContextProps['onDragOver'] = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }

    const ids = visibleTodos.map((todo) => todo.id);
    const oldIndex = ids.indexOf(active.id as number);
    const newIndex = ids.indexOf(over.id as number);

    if (oldIndex === -1 || newIndex === -1) {
      return;
    }

    const newOrderVisibleTodos = arrayMove(ids, oldIndex, newIndex);

    const hiddenTodos = todos.filter((todo) => !visibleTodos.includes(todo));
    const hiddenTodosIds = hiddenTodos.map((todo) => todo.id);

    const mergedOrdered = [...hiddenTodosIds, ...newOrderVisibleTodos];

    reorderTodos(mergedOrdered);
  };

 return {
    sensors,
    items,
    activeTodo,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
  } as const;
};
