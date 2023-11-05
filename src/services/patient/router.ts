import Dashboard from '@/services/patient/pages/Dashboard.vue'
import MainPatientPage from '@/services/patient/pages/MainPatientPage.vue'
import PatientList from '@/services/patient/pages/PatientList.vue'
import PersonalAccountPage from '@/services/security/pages/PersonalAccountPage.vue'
import PatientNavBar from '@/services/patient/parials/PatientNavBar.vue'
import AddAppointment from '@/services/patient/pages/AddAppointment.vue'
import AppointmentsHistory from '@/services/patient/pages/AppointmentsHistory.vue'
import AppointmentHistory from '@/services/patient/pages/AppointmentHistory.vue'

export const PatientRoutes = [
  {
    path: '/space',
    name: 'MainPatientPage',
    component: MainPatientPage,
    meta: {
      PageTitle: 'Add Patient',
      requiredAuth: true
    },

    children: [
      {
        path: 'dashboard',
        alias: '',
        name: 'Dashboard',
        components: { default: Dashboard, patientHeader: PatientNavBar},
        meta: {
          PageTitle: 'Dashboard'
        }
      },
      {
        path: 'add',
        name: 'AddAppointment',
        components: { default: AddAppointment},
        meta: {
          PageTitle: 'Оформление нового приема'
        }
      },
      {
        path: 'list',
        name: 'PatientList',
        components: { default: PatientList, patientHeader: PatientNavBar },
        meta: {
          PageTitle: 'Список пациентов'
        }
      },
      {
        path: 'history',
        name: 'AppointmentsHistory',
        components: { default: AppointmentsHistory, patientHeader: PatientNavBar },
        meta: {
          PageTitle: 'История приема'
        }
      },
      {
        path: 'history/:id',
        name: 'AppointmentHistory',
        components: { default: AppointmentHistory, patientHeader: PatientNavBar },
        meta: {
          PageTitle: 'История приема'
        }
      },
      {
        path: 'account',
        name: 'PersonalAccountPage',
        components: { default: PersonalAccountPage },
        meta: {
          PageTitle: 'Личный кабинет'
        }
      }
    ]
  }
]
