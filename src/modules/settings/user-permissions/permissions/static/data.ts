import type { ListDataTypes } from '../types'

export const listData: ListDataTypes[] = [
  {
    id: 'perm-001',
    name: 'dashboard',
    description: 'Access to the main dashboard page',
    createdAt: '2023-01-15T09:30:00Z',
  },
  {
    id: 'perm-002',
    name: 'userManagement',

    description: 'Access to user management module',
    createdAt: '2023-02-20T14:15:00Z',
  },
  {
    id: 'perm-003',
    name: 'reports',
    description: 'Access to generate and view reports',
    createdAt: '2023-03-10T11:45:00Z',
  },
  {
    id: 'perm-004',
    name: 'settings',
    description: 'Access to system configuration settings',
    createdAt: '2023-04-05T16:20:00Z',
  },
  {
    id: 'perm-005',
    name: 'billing',
    createdAt: '2023-05-12T10:00:00Z',
    // description is optional, so omitted here
  },
  {
    id: 'perm-006',
    name: 'auditLogs',

    description: 'Access to view system audit logs',
    createdAt: '2023-06-18T13:25:00Z',
  },
]
