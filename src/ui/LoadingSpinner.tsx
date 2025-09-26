import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="text-center py-8">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-todo-borderHover"></div>
    </div>
  );
};
