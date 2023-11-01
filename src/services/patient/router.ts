import AddPatient from '@/services/patient/pages/AddPatient.vue'
import Dashboard from '@/services/patient/pages/Dashboard.vue'
import MainPatientPage from '@/services/patient/pages/MainPatientPage.vue'
import PatientsHistory from '@/services/patient/pages/PatientsHistory.vue'
import PatientList from '@/services/patient/pages/PatientList.vue'
import PersonalAccountPage from '@/services/patient/pages/PersonalAccountPage.vue'
import PatientNavBar from '@/services/patient/parials/PatientNavBar.vue'

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
        name: 'AddPatient',
        components: { default: AddPatient},
        meta: {
          PageTitle: 'Добавление пациента'
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
        name: 'PatientsHistory',
        components: { default: PatientsHistory, patientHeader: PatientNavBar },
        meta: {
          PageTitle: 'История работы'
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
