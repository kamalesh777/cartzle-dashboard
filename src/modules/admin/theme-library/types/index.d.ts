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
  key: string
  label: string
  icon?: string
  children?: LayoutCardTypes[]
}
