import type { AxiosResponse } from 'axios'

export interface ModalPropTypes<T> {
  openModal: boolean
  setOpenModal: (parama: boolean) => void
  selectedList?: T
  selectedId?: string
  afterSubmit?: () => void
}

export interface DataResponse<T> extends AxiosResponse {
  result: T
  message?: string
  success: number
}
