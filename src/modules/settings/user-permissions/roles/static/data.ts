import type { ListDataTypes } from '../types'

export const ListData: ListDataTypes[] = [
  {
    id: '1',
    name: 'Admin',
    description: 'Full access to all pages and settings',
    userCount: 12,
  },
  {
    id: '2',
    name: 'Editor',
    description: 'Can edit and view pages, no delete rights',
    userCount: 7,
  },
  {
    id: '3',
    name: 'Viewer',
    description: 'Can only view pages',
    userCount: 25,
  },
]
