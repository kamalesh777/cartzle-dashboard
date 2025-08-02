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
        icon: 'DashboardOutlined',
      },
      {
        key: 'products',
        path: '/products',
        label: 'Products',
        icon: 'ProductOutlined',
      },
      {
        key: 'parties',
        path: '/parties',
        label: 'Parties',
        icon: 'UsergroupAddOutlined',
      },
      {
        key: 'orders',
        path: '/orders/purchases',
        label: 'Orders',
        icon: 'InboxOutlined',
        children: [
          {
            key: 'purchases',
            path: '/orders/purchases',
            label: 'Purchases',
            icon: 'ImportOutlined',
          },
          {
            key: 'sales',
            path: '/orders/sales',
            label: 'Sales',
            icon: 'ExportOutlined',
          },
        ],
      },
      {
        key: 'employees',
        path: '/employees',
        label: 'Employees',
        icon: 'ScheduleOutlined',
      },
      {
        key: 'expenses',
        path: '/expenses',
        label: 'Expenses',
        icon: 'FundProjectionScreenOutlined',
      },
      {
        key: 'reports',
        path: '/reports',
        label: 'Reports',
        icon: 'LineChartOutlined',
      },
    ],
  },
  // Settings
  {
    type: 'group',
    label: 'Settings',
    key: 'settings',
    children: [
      // Company Info
      {
        key: 'company',
        path: '/settings/company',
        label: 'Company',
        icon: 'ShopOutlined',
        pagemenu: [
          {
            key: 'company-brand',
            href: '#brand',
            label: 'Brand',
            icon: '',
          },
          {
            key: 'company-domain',
            href: '#domain',
            label: 'Domain',
            icon: '',
          },
          {
            key: 'company-profile',
            href: '#company',
            label: 'Profile',
            icon: '',
          },
        ],
      },
      // Product Settings
      {
        key: 'product',
        path: '/settings/product',
        label: 'Product',
        icon: 'ProfileOutlined',
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
        icon: 'PropertySafetyOutlined',
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
      {
        key: 'account-settings',
        path: '/settings/account-settings',
        label: 'Account Settings',
        icon: 'BarsOutlined',
      },
    ],
  },
]

export default menuData
