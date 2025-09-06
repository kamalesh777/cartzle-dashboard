import { WORKSPACE_CONTROLS_ROUTE, USER_CONTROLS_ROUTE, SYSTEM_SETTINGS_ROUTE } from './AppConstant'

const menuData = [
  {
    type: 'group',
    label: 'General',
    key: 'grp',
    children: [
      {
        key: 'dashboard',
        path: '/',
        label: 'Dashboard',
        icon: 'gauge',
      },
      {
        key: 'products',
        path: '/products',
        label: 'Products',
        icon: 'package-search',
      },
      {
        key: 'parties',
        path: '/parties',
        label: 'Parties',
        icon: 'handshake',
      },
      {
        key: 'orders',
        path: '/orders/purchases',
        label: 'Orders',
        icon: 'boxes',
        children: [
          {
            key: 'purchases',
            path: '/orders/purchases',
            label: 'Purchases',
            icon: 'shopping-basket',
          },
          {
            key: 'sales',
            path: '/orders/sales',
            label: 'Sales',
            icon: 'badge-indian-rupee',
          },
        ],
      },
      {
        key: 'employees',
        path: '/employees',
        label: 'Employees',
        icon: 'id-card-lanyard',
      },
      {
        key: 'expenses',
        path: '/expenses',
        label: 'Expenses',
        icon: 'coins',
      },
      {
        key: 'reports',
        path: '/reports',
        label: 'Reports',
        icon: 'book-open',
      },
    ],
  },
  // Settings
  {
    type: 'group',
    label: 'Admin',
    key: 'admin',
    children: [
      {
        key: 'workspace',
        // path: `${WORKSPACE_CONTROLS_ROUTE}/products`,
        label: 'Workspace Controls',
        icon: 'baggage-claim',
        children: [
          // Product Settings
          {
            key: 'product',
            path: `${WORKSPACE_CONTROLS_ROUTE}/products`,
            label: 'Products',
            icon: 'file-cog',
            pagemenu: [
              {
                key: 'product-brands',
                href: '#brands',
                label: 'Brands',
                icon: '',
              },
              {
                key: 'product-categories',
                href: '#categories',
                label: 'Categories',
                icon: '',
              },
              {
                key: 'product-unit-groups',
                href: '#unit-groups',
                label: 'Unit Groups',
                icon: '',
              },
              {
                key: 'product-units',
                href: '#units',
                label: 'Units',
                icon: '',
              },
            ],
          },
          // User Permissions
          {
            key: 'users',
            path: `${WORKSPACE_CONTROLS_ROUTE}${USER_CONTROLS_ROUTE}`,
            label: 'Users',
            icon: 'user-round-cog',
            pagemenu: [
              {
                key: 'users-page-menu',
                path: `${WORKSPACE_CONTROLS_ROUTE}${USER_CONTROLS_ROUTE}/page-menu`,
                label: 'Page Menu',
                icon: '',
              },
              {
                key: 'users-roles',
                path: `${WORKSPACE_CONTROLS_ROUTE}${USER_CONTROLS_ROUTE}/roles`,
                label: 'Roles',
                icon: '',
              },
              {
                key: 'users-permissions',
                path: `${WORKSPACE_CONTROLS_ROUTE}${USER_CONTROLS_ROUTE}/permissions`,
                label: 'Permissions',
                icon: '',
              },
            ],
          },
        ],
      },
      {
        key: 'system',
        // path: `${SYSTEM_SETTINGS_ROUTE}/store-manage`,
        label: 'System Management',
        icon: 'sliders-horizontal',
        children: [
          // Store Info
          {
            key: 'store-manage',
            path: `${SYSTEM_SETTINGS_ROUTE}/store-manage`,
            label: 'Store Manage',
            icon: 'warehouse',
            pagemenu: [
              {
                key: 'store-manage-brand',
                href: '#brand',
                label: 'Brand',
                icon: '',
              },
              {
                key: 'store-manage-domain',
                href: '#domain',
                label: 'Domain',
                icon: '',
              },
              {
                key: 'store-manage-profile',
                href: '#store',
                label: 'Profile',
                icon: '',
              },
            ],
          },

          // Account Settings
          {
            key: 'account-settings',
            path: `${SYSTEM_SETTINGS_ROUTE}/account-settings`,
            label: 'Account Settings',
            icon: 'monitor-cog',
          },
        ],
      },
    ],
  },
]

export default menuData
