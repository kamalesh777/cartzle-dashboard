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
    key: 'builder',
    label: 'Builder',
    icon: 'square-pen',
  },
  {
    key: 'preview',
    label: 'Preview',
    icon: 'eye',
  },
  {
    key: 'config',
    label: 'Config JSON',
    icon: 'settings',
  },
]

export const layoutJson = {
  home: {
    sections: [
      {
        type: 'category',
        variant: 'grid',
        props: {
          title: 'Shop by Category',
          categories: [
            { id: 1, name: 'Furniture', image: '/cat-furniture.jpg', link: '/category/furniture' },
            { id: 2, name: 'Lighting', image: '/cat-lighting.jpg', link: '/category/lighting' },
            { id: 3, name: 'Decor', image: '/cat-decor.jpg', link: '/category/decor' },
          ],
          columns: 3,
        },
      },
      {
        type: 'category',
        variant: 'circle-icons',
        props: {
          title: 'Popular Categories',
          categories: [
            { id: 1, name: 'Men', image: '/cat-men.png', link: '/category/men' },
            { id: 2, name: 'Women', image: '/cat-women.png', link: '/category/women' },
            { id: 3, name: 'Kids', image: '/cat-kids.png', link: '/category/kids' },
          ],
        },
      },
      {
        type: 'category',
        variant: 'slider',
        props: {
          title: 'Browse Categories',
          categories: [
            { id: 1, name: 'Shoes', image: '/cat-shoes.jpg', link: '/category/shoes' },
            { id: 2, name: 'Bags', image: '/cat-bags.jpg', link: '/category/bags' },
            { id: 3, name: 'Accessories', image: '/cat-accessories.jpg', link: '/category/accessories' },
          ],
          slidesPerView: 4,
        },
      },
    ],
  },
}
