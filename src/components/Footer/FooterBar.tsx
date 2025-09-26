import React from 'react';
import type { FilterStatus } from '../../utils/FilterStatus';
import { FooterFilterButtons } from './FooterFilterButtons';
import { ClearCompletedButton } from './ClearCompletedButton';

interface FooterBarProps {
  itemsLeft: number;
  filter: FilterStatus;
  onFilterChange: (status: FilterStatus) => void;
  hasCompleted: boolean;
  onClearCompleted: () => void;
}

export const FooterBar: React.FC<FooterBarProps> = ({
  itemsLeft,
  filter,
  onFilterChange,
  hasCompleted,
  onClearCompleted,
}) => {
  return (
    <div className="px-6 py-4 bg-items-gradient dark:bg-items-gradient-dark rounded-md mt-3 border border-todo-border dark:border-dark-border">
      <div className="flex justify-between items-center mb-4">
        <span className=" text-todo-text dark:text-dark-text">
          <span className="font-semibold">{itemsLeft}</span> items left
        </span>
        {hasCompleted && <ClearCompletedButton onClick={onClearCompleted} />}
      </div>

      <FooterFilterButtons
        filter={filter}
        onChange={onFilterChange}
      />
    </div>
  );
};
