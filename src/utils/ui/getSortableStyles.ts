import React from 'react';
import { CSS } from '@dnd-kit/utilities';
import type { Transform } from '@dnd-kit/utilities';

interface getSortableStylesProps {
  transform: Transform | null;
  transition: string | undefined;
  isDragging: boolean;
}

export const getSortableStyles = ({
  transform,
  transition,
  isDragging,
}: getSortableStylesProps) => {

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    cursor: 'grab',
  };

  return style;
};
