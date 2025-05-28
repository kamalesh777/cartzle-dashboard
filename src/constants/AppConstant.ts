export const PRIMARY_DOMAIN = process.env.NEXT_PUBLIC_PRIMARY_DOMAIN
export const ENVIRONMENT = process.env.NEXT_PUBLIC_ENVIRONMENT

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/
export const EMPTY_PLACEHOLDER = '--'
export const BRAND_NAME = process.env.NEXT_PUBLIC_BRAND_NAME

export const CONTROL_PANEL_ROUTE = '/control-panel'
export const ROLE_LIST_ROUTE = '/roles'
export const PRODUCT_LIST_ROUTE = '/products'
export const ERROR_MSG = 'Field is required.'
export const WHITESPACE_MSG = 'Enter a vaild input'
export const COMMON_ROW_GUTTER = 16

export const requiredFieldRules = [
  {
    required: true,
    message: ERROR_MSG,
  },
]

export const reqWithWhitspcFieldRules = [
  {
    required: true,
    message: ERROR_MSG,
  },
  {
    whitespace: true,
    message: WHITESPACE_MSG,
  },
]

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
