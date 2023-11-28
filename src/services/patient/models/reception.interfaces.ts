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

export interface IPatients {
  current_page: number
  objects_count_on_current_page: number
  objects_count_total: number
  page_total_count: number
  requested_patients: IRequestedPatient[]
}

export interface IRequestedPatient {
  patient_id: string
  full_name: string,
  birth_date: Date,
  is_male: boolean,
  height: number,
  weight: number
}

export interface IExamination {
  patient_id: string,
  creator_id: string,
  created_at: Date,
  examination_id: number,
  patient: IRequestedPatient, 
  appointments: IAppointmentItem[]
}

export  interface IAppointmentItem {
  user_id: string, 
  examination_id: string,
  appointment_time: string,
  blood_pressure: string,
  pulse: string,
  swell: string,
  complains: string,
  diagnosis: string,
  disease_complications: string,
  comorbidities: string,
  disease_anamnesis: string,
  life_anamnesis: string,
  echocardiogram_data: string,
  is_ready: boolean,
  appointment_id: string
}