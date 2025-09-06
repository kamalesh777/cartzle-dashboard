export interface ListDataTypes {
  id: string // unique key for React (could be role ID)
  name: string // role name (e.g., Admin, Editor)
  description: string // short description of the role
  userCount: number // number of users assigned to this role
}
