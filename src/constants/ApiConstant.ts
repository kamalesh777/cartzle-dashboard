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
  'create-company': `${API_BASE_URL}/company/create`,

  // Create brand
  'create-brand': `${API_BASE_URL}/brand/create`,

  // Create category
  'create-category-full': `${API_BASE_URL}/category/create/full`,
  'categories-list-full': `${API_BASE_URL}/category/list/full`,

  // Create unit type
  'unit-types-list': `${API_BASE_URL}/category/unit-types/list`,
  'create-unit-type': `${API_BASE_URL}/category/unit-types/create`,

  // units list
  'units-list': `${API_BASE_URL}/category/units/list`,
  'create-unit': `${API_BASE_URL}/category/units/create`,

  
}

export default routesObj
