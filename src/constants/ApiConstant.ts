const BACKEND_API_SERVICE = process.env.NEXT_PUBLIC_API_SERVICE || 'http://localhost:5000/api'
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || 'v1'

const API_BASE_URL = `${BACKEND_API_SERVICE}/${API_VERSION}`

const routesObj = {
  'api-testing': `${API_BASE_URL}`,

  // User login
  login: `${API_BASE_URL}/user/login`,
}

export default routesObj
