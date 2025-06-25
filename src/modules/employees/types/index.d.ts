import type { JobTypeOptions } from '../static/contstants'
import type { Dayjs } from 'dayjs'

export interface ListDataTypes {
  id: string
  name: string
  role: string
  mobile: string
  alternateMobile?: string
  address: string
  joiningDate: string
  salaryType: 'monthly' | 'daily'
  salaryAmount: number
  status?: 'active' | 'inactive'
  jobType: keyof JobTypeOptions[number]
}

export interface AttendanceFormData {
  id: string
  date: Dayjs
  status: 'present' | 'absent' | 'half-day' | 'leave'
  remarks?: string
}

export interface EmployeePaymentFormData {
  id: string
  paymentType: 'salary' | 'advance'
  amount: number
  date: Dayjs | string
  notes?: string
}
