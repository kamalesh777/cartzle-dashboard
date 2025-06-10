const BACKEND_API_SERVICE = process.env.NEXT_PUBLIC_API_SERVICE || 'http://localhost:5000/api'
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || 'v1'

const API_BASE_URL = `${BACKEND_API_SERVICE}/${API_VERSION}`

const routesObj = {
  'api-testing': `${API_BASE_URL}`,
  'workspace-testing': `${API_BASE_URL}/workspace`,
  'create-workspace': `${API_BASE_URL}/workspace/create-workspace`,
  'view-workspace': `${API_BASE_URL}/workspace/view-workspace`,

  'view-user': `${API_BASE_URL}/user/view-user`,
  'update-user': `${API_BASE_URL}/user/update-user`,
  'except-me': `${API_BASE_URL}/user/list-except-me`,
}

export default routesObj
