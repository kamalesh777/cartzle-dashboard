import type { JobTypeOptions } from '../static/contstants'
import type { Dayjs } from 'dayjs'

export interface ListDataTypes {
  id: string
  name: string
  role: string
  mobile: string
  alternate_mobile?: string
  address: string
  joining_date: string
  salary_type: 'monthly' | 'daily'
  salary_amount: number
  status?: 'active' | 'inactive'
  job_type: keyof JobTypeOptions[number]
}

export interface AttendanceFormData {
  id: string
  date: Dayjs
  status: 'present' | 'absent' | 'half-day' | 'leave'
  remarks?: string
}

export interface EmployeePaymentFormData {
  id: string
  payment_type: 'salary' | 'advance'
  amount: number
  date: Dayjs | string
  notes?: string
}
