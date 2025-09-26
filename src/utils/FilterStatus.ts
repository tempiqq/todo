export const FilterStatus = {
  All: 'All',
  Active: 'Active',
  Completed: 'Completed',
} as const;

export type FilterStatus = typeof FilterStatus[keyof typeof FilterStatus];