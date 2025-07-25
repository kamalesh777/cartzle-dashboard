import { MEDIA_BASE_URL } from './ApiConstant'

export const PRIMARY_DOMAIN = process.env.NEXT_PUBLIC_PRIMARY_DOMAIN
export const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/
export const EMPTY_PLACEHOLDER = '--'
export const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME

// List of paths where we don't want to generate new tokens for 401 and 403 errors
export const AUTH_PATHS = ['/auth/login', '/auth/logout', '/auth/register', '/auth/forgot-password']

export const LOGIN_ROUTE = '/auth/login'
export const LOGOUT_ROUTE = '/auth/logout'
export const SETTINGS_ROUTE = '/settings'
export const USER_PERMISSION_ROUTE = '/user-permissions'
export const PRODUCT_LIST_ROUTE = '/products'
export const ORDER_LIST_ROUTE = '/orders'
export const SALE_LIST_ROUTE = '/orders/sales'

export const ERROR_MSG = 'Field is required.'
export const WHITESPACE_MSG = 'Enter a vaild input'
export const COMMON_ROW_GUTTER = 16

export const IMAGE_PLACEHOLDER = `${MEDIA_BASE_URL}/6882ad4d5c7cd75eb8762b74?preview=true&type=url`

// common required rules
export const requiredFieldRules = [
  {
    required: true,
    message: ERROR_MSG,
  },
]

// common required rules with checking of whitespace
export const requiredWithWhitspcFieldRules = [
  {
    required: true,
    message: ERROR_MSG,
  },
  {
    whitespace: true,
    message: WHITESPACE_MSG,
  },
]

//  mesaurement option
export const MeasurementOptions = [
  {
    label: 'IN',
    value: 'in',
  },
  {
    label: 'FT',
    value: 'ft',
  },
  {
    label: 'CFT',
    value: 'cft',
  },
]

// categories options
export const categoriesOptions = [
  { value: 'raw', label: 'Raw' },
  { value: 'semi_finished', label: 'Semi Finished' },
  { value: 'finished', label: 'Finished' },
]

export const PaymentMethods = ['PhonePe', 'GPay', 'Paytm', 'Amazon Pay', 'Cash', 'Bank Transfer']
export const PaymentOptions = PaymentMethods?.map(item => ({ value: item, label: item }))
export const PageLeaveConfirmMessage = 'You have unsaved changes. Leave anyway?'
