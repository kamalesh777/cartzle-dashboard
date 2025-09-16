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
