const BACKEND_API_SERVICE = process.env.NEXT_PUBLIC_API_SERVICE

const routesObj = {
  'api-testing': `${BACKEND_API_SERVICE}/test`,
  'workspace-testing': `${BACKEND_API_SERVICE}/workspace`,
  'create-workspace': `${BACKEND_API_SERVICE}/workspace/create-workspace`,
  'view-workspace': `${BACKEND_API_SERVICE}/workspace/view-workspace`,

  'view-user': `${BACKEND_API_SERVICE}/user/view-user`,
  'update-user': `${BACKEND_API_SERVICE}/user/update-user`,
  'except-me': `${BACKEND_API_SERVICE}/user/list-except-me`,
}

export default routesObj
