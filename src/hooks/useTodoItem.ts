import { useEffect, useRef, useState } from 'react';
import type { Todo } from '../types/Todo';
import { useTodoStore } from '../store/useTodoStore';

export interface UseTodoItemProps {
  todo: Todo;
}

export const useTodoItem = ({ todo }: UseTodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [isSaving, setIsSaving] = useState(false);
  
  const { handleSaveTodo, handleDeleteTodo, handleToggleTodo } = useTodoStore();

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
        await handleSaveTodo(todo.id, trimmedTitle);
      } finally {
        setIsSaving(false);
      }
    } else if (!trimmedTitle) {
      handleDeleteTodo(todo.id);
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

  const handleToggle = (checked: boolean) => handleToggleTodo(todo.id, checked);
  const handleDelete = () => handleDeleteTodo(todo.id);

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
