import { USER_PERMISSION_ROUTE, SETTINGS_ROUTE } from './AppConstant'

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
        // path: '/settings/product',
        label: 'Workspace Controls',
        icon: 'baggage-claim',
        children: [
          // Product Settings
          {
            key: 'product',
            path: '/settings/workforce-controls/product',
            label: 'Product',
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
            key: 'permissions',
            path: `${SETTINGS_ROUTE}${USER_PERMISSION_ROUTE}`,
            label: 'Permissions',
            icon: 'user-round-cog',
            pagemenu: [
              {
                key: 'permissions-page',
                path: `${SETTINGS_ROUTE}${USER_PERMISSION_ROUTE}/page-menu`,
                label: 'Page Menu',
                icon: '',
              },
              {
                key: 'roles-page',
                path: `${SETTINGS_ROUTE}${USER_PERMISSION_ROUTE}/roles`,
                label: 'Roles',
                icon: '',
              },
              {
                key: 'permissions-page',
                path: `${SETTINGS_ROUTE}${USER_PERMISSION_ROUTE}/permissions`,
                label: 'Permissions',
                icon: '',
              },
            ],
          },
        ],
      },
      {
        key: 'system-management',
        path: '/settings/system-management/store-manage',
        label: 'System Management',
        icon: 'sliders-horizontal',
        children: [
          // Store Info
          {
            key: 'store-manage',
            path: '/settings/system-management/store-manage',
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
            path: '/settings/account-settings',
            label: 'Account Settings',
            icon: 'monitor-cog',
          },
        ],
      },
    ],
  },
]

export default menuData
