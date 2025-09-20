export interface ListDataTypes {
  id: string
  name: string
  repoUrl: string
  framework: string
  envVariables: string[]
  createdAt: string
  active: boolean
}

export interface LayoutCardTypes {
  id: string
  label: string
  icon?: string
  children?: LayoutCardTypes[]
}

export interface ComponentStateTypes {
  id: string
  variant: string
  label: string
  type: string
  page: string
}
