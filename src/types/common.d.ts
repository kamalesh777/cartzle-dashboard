import type { AxiosResponse } from 'axios'

export interface ModalPropTypes<T> {
  openModal: boolean
  setOpenModal: (param: boolean) => void
  selectedList?: T
  selectedId?: string
  selectedIndex?: number | string
  afterSubmit?: () => void
}

export interface DataResponse<T = null> extends AxiosResponse {
  result: T
  message?: string
  success: number
}

export interface MenuObject {
  label?: string
  type?: string
  path: string
  notification: string
  key: string
  icon: string
  isCollapse?: boolean
  children?: MenuObject[]
}
