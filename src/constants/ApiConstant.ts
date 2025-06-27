const BACKEND_API_SERVICE = process.env.NEXT_PUBLIC_API_SERVICE || 'http://localhost:5000/api'
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || 'v1'

// Base URL for API requests eg. http://localhost:5000/api/v1
const API_BASE_URL = `${BACKEND_API_SERVICE}/${API_VERSION}`

const routesObj = {
  'api-testing': `${API_BASE_URL}`,

  // generate new token
  'generate-token': `${API_BASE_URL}/token/generate-new-token`,

  // User login
  login: `${API_BASE_URL}/user/login`,

  // Create company
  'company-create': `${API_BASE_URL}/company/create`,

  // Create brand
  'brand-create': `${API_BASE_URL}/brand/create`,

  // Create category
  'category-create': `${API_BASE_URL}/category/create`,
  'category-list': `${API_BASE_URL}/category/list`,

  // Create unit type
  'unit-group-list': `${API_BASE_URL}/category/unit-group/list`,
  'unit-group-create': `${API_BASE_URL}/category/unit-group/create`,

  // units list
  'unit-list': `${API_BASE_URL}/category/unit/list`,
  'unit-create': `${API_BASE_URL}/category/unit/create`,
}

export default routesObj
