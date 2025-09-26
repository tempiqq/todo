import { useEffect, useRef, useState } from 'react';
import type { Todo } from '../types/Todo';

export interface UseTodoItemProps {
  todo: Todo;
  onSave: (id: number, newTitle: string) => Promise<void>;
  onDelete: (id: number) => void;
  onToggle: (id: number, completed: boolean) => void;
}

export const useTodoItem = ({
  todo,
  onSave,
  onDelete,
  onToggle,
}: UseTodoItemProps) => {
  
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [isSaving, setIsSaving] = useState(false);

  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
    setEditTitle(todo.title);
  };

  const handleSaveEdit = async () => {
    const trimmedTitle = editTitle.trim();

    if (trimmedTitle && trimmedTitle !== todo.title) {
      try {
        setIsSaving(true);
        await onSave(todo.id, trimmedTitle);
      } finally {
        setIsSaving(false);
      }
    } else if (!trimmedTitle) {
      onDelete(todo.id);
    }

    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTitle(todo.title);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  const handleToggle = (checked: boolean) => onToggle(todo.id, checked);
  const handleDelete = () => onDelete(todo.id);

  return {
    isEditing,
    editTitle,
    isSaving,

    editInputRef,
    
    setEditTitle,
    
    handleDoubleClick,
    handleSaveEdit,
    handleCancelEdit,
    handleKeyDown,
    handleToggle,
    handleDelete,
  };
};
