import { JobTypeOptions } from "../static/contstants";

export interface ListDataTypes {
  id: string
  name: string;
  role: string;
  mobile: string;
  alternate_mobile?: string
  address: string;
  joining_date: string;
  salary_type: 'monthly' | 'daily';
  salary_amount: number;
  status?: 'active' | 'inactive'
  job_type: keyof JobTypeOptions[number]
}