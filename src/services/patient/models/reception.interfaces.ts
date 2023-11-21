export  interface IReceptionItem {
  blood_pressure: string,
  pulse: string,
  swelling: string,
  complaints: string,
  diagnosis: string,
  complications: string,
  accompanying_illnesses: string,
  anamnesis_life: string,
  anamnesis_illness: string,
  EKG_data: string,
}

export interface IExaminations {
  current_page: number
  objects_count_on_current_page: number
  objects_count_total: number
  page_total_count: number
  requested_examinations: IRequestedExamination[]
}

export interface IRequestedExamination {
  examination_id: number
  patient_id: string
  patient_name: string
  last_appointment_time: string
}
