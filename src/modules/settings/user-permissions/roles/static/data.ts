import type { ListDataTypes } from '../types'

export const listData: ListDataTypes[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full access to all pages and settings',
    user_count: 12,
  },
  {
    id: '2',
    name: 'Editor',
    description: 'Can edit and view pages, no delete rights',
    user_count: 7,
  },
  {
    id: '3',
    name: 'Viewer',
    description: 'Can only view pages',
    user_count: 25,
  },
]
