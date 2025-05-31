import type { AxiosResponse } from 'axios'

export interface ModalPropTypes {
  openModal: boolean
  setOpenModal: (parama: boolean) => void
}

export interface responseType {
  code: number
  message: string
  result: Record<string, unknown>
  success: boolean
}

export interface dataResponse extends AxiosResponse {
  data: responseType
  message?: string
  status: number
}
