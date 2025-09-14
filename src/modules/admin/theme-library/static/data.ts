import type { ListDataTypes } from '../types'

export const listData: ListDataTypes[] = [
  {
    id: 'theme-0001',
    name: 'Theme 1',
    active: true,
    repoUrl: 'https://github.com/username/theme-1',
    framework: 'Next.js',
    envVariables: ['VAR1', 'VAR2', 'VAR3'],
    createdAt: '2023-01-15T09:30:00Z',
  },
  {
    id: 'theme-0002',
    name: 'Theme 2',
    active: false,
    repoUrl: 'https://github.com/username/theme-2',
    framework: 'Next.js',
    envVariables: ['VAR1', 'VAR2', 'VAR3'],
    createdAt: '2023-01-15T09:30:00Z',
  },
  {
    id: 'theme-0003',
    name: 'Theme 3',
    active: false,
    repoUrl: 'https://github.com/username/theme-3',
    framework: 'Next.js',
    envVariables: ['VAR1', 'VAR2', 'VAR3'],
    createdAt: '2023-01-15T09:30:00Z',
  },
  {
    id: 'theme-0004',
    name: 'Theme 4',
    active: false,
    repoUrl: 'https://github.com/username/theme-4',
    framework: 'Next.js',
    envVariables: ['VAR1', 'VAR2', 'VAR3'],
    createdAt: '2023-01-15T09:30:00Z',
  },
]

// tabs array
export const tabsArray = [
  {
    key: '1',
    label: 'Builder',
    children: 'Builder',
    icon: 'square-pen',
  },
  {
    key: '2',
    label: 'Preview',
    children: 'Preview',
    icon: 'eye',
  },
  {
    key: '3',
    label: 'Config JSON',
    children: 'Config JSON',
    icon: 'settings',
  },
]

// storefront pages array
export const pagesArray = [
  {
    key: 'home',
    label: 'Home',
    children: 'Home',
    icon: 'square-pen',
  },
  {
    key: 'product_list',
    label: 'Product List',
    children: 'About',
    icon: 'eye',
  },
  {
    key: 'product_details',
    label: 'Product Details',
    children: 'Contact',
    icon: 'settings',
  },
]
