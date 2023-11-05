import LoginPage from './pages/LoginPage.vue';
import NavbarComponent from '../../components/NavbarComponent.vue';
import PersonalAccountPage from './pages/PersonalAccountPage.vue';
import RegisterPage from './pages/RegisterPage.vue';
export const SecurityRoutes = [
    {
        path: '/login',
        name: 'LoginPage',
        components: { default: LoginPage },
        meta: {
            PageTitle: 'Login',
            guest: true
        }
    },
    {
        path: '/register',
        name: 'RegisterPage',
        components: { default: RegisterPage },
        meta: {
            PageTitle: 'Registration',
            guest: true
        }
    },
];
