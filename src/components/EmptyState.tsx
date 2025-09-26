import React from 'react';
import { FilterStatus } from '../utils/FilterStatus';

interface EmptyStateProps {
  filter: FilterStatus;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ filter }) => {
  return (
    <div className="px-6">
      {filter === FilterStatus.All && 'No todos yet'}
      {filter === FilterStatus.Active && 'No active todos'}
      {filter === FilterStatus.Completed && 'No completed todos'}
    </div>
  );
};
