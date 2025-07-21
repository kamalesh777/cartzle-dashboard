const BACKEND_API_SERVICE = process.env.NEXT_PUBLIC_API_SERVICE || 'http://localhost:5000/api'
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || 'v1'

// Base URL for API requests eg. http://localhost:5000/api/v1
const API_BASE_URL = `${BACKEND_API_SERVICE}/${API_VERSION}`

const API_COMMON_SRV = `${API_BASE_URL}/common-srv`

const routesObj = {
  'api-testing': `${API_BASE_URL}`,

  // FILE OR MEDIA
  'product-media-upload': `${API_BASE_URL}/media-srv/upload`,
  'brand-media-upload': `${API_BASE_URL}/media-srv/upload-brand-media`,

  // generate new token
  'generate-token': `${API_BASE_URL}/token/generate-new-token`,

  // User login
  login: `${API_BASE_URL}/user/login`,

  // Create company
  'company-create': `${API_BASE_URL}/company/create`,

  // Create brand
  'brand-create': `${API_BASE_URL}/brand/create`,

  // Create category
  'category-create': `${API_COMMON_SRV}/category/create`,
  'category-list': `${API_COMMON_SRV}/category/list`,
  'category-details': `${API_COMMON_SRV}/category/details`,

  // Create unit type
  'unit-group-list': `${API_COMMON_SRV}/unit-group/list`,
  'unit-group-create': `${API_COMMON_SRV}/unit-group/create`,
  'unit-group-details': `${API_COMMON_SRV}/unit-group/details`,

  // units list
  'unit-list': `${API_COMMON_SRV}/unit/list`,
  'unit-create': `${API_COMMON_SRV}/unit/create`,
}

export default routesObj
