import AddPatient from '@/services/patient/pages/AddPatient.vue'


export const PatientRoutes = [
  {
    path: '/add-patient',
    name: 'AddPatient',
    components: { default: AddPatient },
    meta: {
      PageTitle: 'Add Patient ',
      guest: true
    }
  }
]
