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
        key: 'workspace-controls',
        // path: `${WORKSPACE_CONTROLS_ROUTE}/products`,
        label: 'Workspace Controls',
        icon: 'baggage-claim',
        children: [
          // Product Settings
          {
            key: 'product-settings',
            path: `${WORKSPACE_CONTROLS_ROUTE}/products`,
            label: 'Products',
            icon: 'file-cog',
            pagemenu: [
              {
                key: 'workspace-controls-brands',
                href: '#brands',
                label: 'Brands',
                icon: '',
              },
              {
                key: 'workspace-controls-categories',
                href: '#categories',
                label: 'Categories',
                icon: '',
              },
              {
                key: 'workspace-controls-unit-groups',
                href: '#unit-groups',
                label: 'Unit Groups',
                icon: '',
              },
              {
                key: 'workspace-controls-units',
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
            label: 'Users Controls',
            icon: 'user-round-cog',
            pagemenu: [
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
              {
                key: 'users-section-controls',
                path: `${WORKSPACE_CONTROLS_ROUTE}${USER_CONTROLS_ROUTE}/section-controls`,
                label: 'Section Controls',
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
            key: 'system-settings',
            path: `${SYSTEM_SETTINGS_ROUTE}/company`,
            label: 'Manage Company',
            icon: 'warehouse',
            pagemenu: [
              {
                key: 'system-settings',
                href: '#brand',
                label: 'Brand',
                icon: '',
              },
              {
                key: 'system-settings-domain',
                href: '#domain',
                label: 'Domain',
                icon: '',
              },
              {
                key: 'system-settings-profile',
                href: '#profile',
                label: 'Profile',
                icon: '',
              },
            ],
          },
          // Theme library
          {
            key: 'theme-library',
            path: `${SYSTEM_SETTINGS_ROUTE}/theme-library`,
            label: 'Theme Library',
            icon: 'layout-template',
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
