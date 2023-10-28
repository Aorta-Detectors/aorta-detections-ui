import AddPatient from '@/services/patient/pages/AddPatient.vue'
import Dashboard from '@/services/patient/pages/Dashboard.vue'
import AsideNav from '@/services/patient/parials/AsideNav.vue'
import MainPatientPage from '@/services/patient/pages/MainPatientPage.vue'
import NavbarComponent from '@/components/NavbarComponent.vue'


export const PatientRoutes = [
  {
    path: '/space',
    name: 'MainPatientPage',
    components: { default: MainPatientPage, asideNav: AsideNav, header: NavbarComponent },
    meta: {
      PageTitle: 'Add Patient ',
      guest: true
    },

    children: [
      {
        path: 'add',
        name: 'AddPatient',
        components: { default: AddPatient},
        meta: {
          PageTitle: 'Add Patient ',
          guest: true
        }
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        components: { default: Dashboard},
        meta: {
          PageTitle: 'Dashboard',
          guest: true
        }
      }
    ]
  }
]
