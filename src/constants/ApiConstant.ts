const BACKEND_API_SERVICE = process.env.NEXT_PUBLIC_API_SERVICE || 'http://localhost:5000/api'
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || 'v1'

// Base URL for API requests eg. http://localhost:5000/api/v1
export const API_BASE_URL = `${BACKEND_API_SERVICE}/${API_VERSION}`

// MEDIA BASE URL
export const MEDIA_BASE_URL = `${API_BASE_URL}/media-srv`

const API_COMMON_SRV = `${API_BASE_URL}/common-srv`

const routesObj = {
  'api-testing': `${API_BASE_URL}`,

  // MEDIA SERVICE
  'media-service': `${MEDIA_BASE_URL}`,

  // COMPANY INFO
  'company-create': `${API_BASE_URL}/company/create`,
  'company-update': `${API_BASE_URL}/company/update`,
  'company-list': `${API_BASE_URL}/company/list`,
  'company-details': `${API_BASE_URL}/company/details`,

  // FILE OR MEDIA
  'product-media-upload': `${API_BASE_URL}/media-srv/upload`,
  'brand-media-upload': `${API_BASE_URL}/media-srv/upload-brand-media`,

  // GENERATE NEW TOKEN
  'generate-token': `${API_BASE_URL}/token/generate-new-token`,

  // USER LOGIN
  login: `${API_BASE_URL}/user/login`,

  // CREATE BRAND
  'brand-create': `${API_BASE_URL}/brand/create`,

  // CREATE CATEGORY
  'category-create': `${API_COMMON_SRV}/category/create`,
  'category-list': `${API_COMMON_SRV}/category/list`,
  'category-details': `${API_COMMON_SRV}/category/details`,

  // CREATE UNIT TYPE
  'unit-group-list': `${API_COMMON_SRV}/unit-group/list`,
  'unit-group-create': `${API_COMMON_SRV}/unit-group/create`,
  'unit-group-details': `${API_COMMON_SRV}/unit-group/details`,

  // UNITS LIST
  'unit-list': `${API_COMMON_SRV}/unit/list`,
  'unit-create': `${API_COMMON_SRV}/unit/create`,
}

export default routesObj
