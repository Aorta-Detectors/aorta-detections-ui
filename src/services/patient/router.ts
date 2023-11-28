import Dashboard from '@/services/patient/pages/Dashboard.vue'
import MainPatientPage from '@/services/patient/pages/MainPatientPage.vue'
import PatientList from '@/services/patient/pages/PatientList.vue'
import PersonalAccountPage from '@/services/security/pages/PersonalAccountPage.vue'
import PatientNavBar from '@/services/patient/parials/PatientNavBar.vue'
import AppointmentsHistory from '@/services/patient/pages/AppointmentsHistory.vue'
import AppointmentHistory from '@/services/patient/pages/AppointmentHistory.vue'
import MainAppointmentPage from '@/services/patient/pages/MainAppointmentPage.vue'
import ViewAppointmentReport from '@/services/patient/pages/ViewAppointmentReport.vue'
import AddAppointment from '@/services/patient/pages/AddAppointment.vue'

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
        components: { default: Dashboard, patientHeader: PatientNavBar },
        meta: {
          PageTitle: 'Dashboard'
        }
      },
      {
        path: 'add',
        name: 'AddAppointment',
        components: { default: AddAppointment },
        meta: {
          PageTitle: 'Оформление нового обследования'
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
          PageTitle: 'История обследования'
        }
      },
      {
        path: 'appointment/:id',
        name: 'MainAppointmentPage',
        components: { default: MainAppointmentPage, patientHeader: PatientNavBar },
        meta: {
          PageTitle: 'Обследования'
        },
        children: [
          {
            path: 'history',
            name: 'AppointmentHistory',
            component:AppointmentHistory,
            meta: {
              PageTitle: 'Просмотр Обследования'
            }
          },
          {
            path: 'report/:appointment_id',
            name: 'ViewAppointmentReport',
            component:ViewAppointmentReport,
            meta: {
              PageTitle: 'Просмотр Отчета'
            }
          }
        ]
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
