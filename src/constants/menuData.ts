import { USER_PERMISSION_ROUTE, SETTINGS_ROUTE } from './AppConstant'

const menuData = [
  {
    key: 'dashboard',
    path: '/',
    title: 'Dashboard',
    icon: 'DashboardOutlined',
  },
  {
    key: 'products',
    path: '/products',
    title: 'Products',
    icon: 'ProductOutlined',
  },
  {
    key: 'parties',
    path: '/parties',
    title: 'Parties',
    icon: 'UsergroupAddOutlined',
  },
  {
    key: 'orders',
    path: '/orders/purchases',
    title: 'Orders',
    icon: 'InboxOutlined',
    children: [
      {
        key: 'purchases',
        path: '/orders/purchases',
        title: 'Purchases',
        icon: 'ImportOutlined',
      },
      {
        key: 'sales',
        path: '/orders/sales',
        title: 'Sales',
        icon: 'ExportOutlined',
      },
    ],
  },
  {
    key: 'employees',
    path: '/employees',
    title: 'Employees',
    icon: 'ScheduleOutlined',
  },
  {
    key: 'expenses',
    path: '/expenses',
    title: 'Expenses',
    icon: 'FundProjectionScreenOutlined',
  },
  {
    key: 'reports',
    path: '/reports',
    title: 'Reports',
    icon: 'LineChartOutlined',
  },
  // Settings
  {
    key: 'settings',
    path: '/settings/manage-company',
    title: 'Settings',
    icon: 'SettingOutlined',
    children: [
      // Company Info
      {
        key: 'manage-company',
        path: '/settings/manage-company',
        title: 'Manage Company',
        icon: 'ShopOutlined',
        pagemenu: [
          {
            key: 'manage-company-theme',
            href: '#theme',
            title: 'Theme',
            icon: '',
          },
          {
            key: 'manage-company-domain',
            href: '#domain',
            title: 'Domain',
            icon: '',
          },
          {
            key: 'manage-company-profile',
            href: '#company',
            title: 'Company',
            icon: '',
          },
        ],
      },
      // Product Settings
      {
        key: 'product-settings',
        path: '/settings/product-settings',
        title: 'Product Settings',
        icon: 'ProfileOutlined',
        pagemenu: [
          {
            key: 'product-settings-brands',
            href: '#brands',
            title: 'Brands',
            icon: '',
          },
          {
            key: 'product-settings-categories',
            href: '#categories',
            title: 'Categories',
            icon: '',
          },
          {
            key: 'product-settings-unit-groups',
            href: '#unit-groups',
            title: 'Unit Groups',
            icon: '',
          },
          {
            key: 'product-settings-units',
            href: '#units',
            title: 'Units',
            icon: '',
          },
        ],
      },
      // User Permissions
      {
        key: 'user-permissions',
        path: `${SETTINGS_ROUTE}${USER_PERMISSION_ROUTE}`,
        title: 'User Permissions',
        icon: 'PropertySafetyOutlined',
        pagemenu: [
          {
            key: 'user-permissions-page',
            path: `${SETTINGS_ROUTE}${USER_PERMISSION_ROUTE}/page-menu`,
            title: 'Page Menu',
            icon: '',
          },
          {
            key: 'user-roles-page',
            path: `${SETTINGS_ROUTE}${USER_PERMISSION_ROUTE}/roles`,
            title: 'Roles',
            icon: '',
          },
          {
            key: 'user-permission-page',
            path: `${SETTINGS_ROUTE}${USER_PERMISSION_ROUTE}/permissions`,
            title: 'Permissions',
            icon: '',
          },
        ],
      },
      {
        key: 'account-settings',
        path: '/settings/account-settings',
        title: 'Account Settings',
        icon: 'BarsOutlined',
      },
    ],
  },
]

export default menuData
