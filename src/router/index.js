import Router from 'vue-router';
import RegisterPage from '@/components/RegisterPage';
import LoginPage from '@/components/LoginPage';
import CalenderPage from '@/components/CalenderPage';
import AddMeeting from '@/components/AddMeeting';
import FilterMeeting from '@/components/FilterMeeting';
import TeamPage from '@/components/TeamPage';
import PageNotFound from '@/components/PageNotFound'

const router = new Router({
    mode: 'history',
    routes: [
        {
            name: 'register',
            path: '/',
            component: RegisterPage,
            meta: {
                auth: false,
            },
        },
        {
            name: 'login',
            path: '/login',
            component: LoginPage,
            meta: {
                auth: false,
            },
        },
        {
            name: 'calendar',
            path: '/calendar',
            component: CalenderPage,
            meta: {
                auth: true,
            },
        },
        {
            name: 'team',
            path: '/team',
            component: TeamPage,
            meta: {
                auth: true,
            },
        },
        {
            name: 'meetings-add',
            path: '/meetings-add',
            component: AddMeeting,
            meta: {
                auth: true,
            },
        },
        {
            name: 'meetings-filter',
            path: '/meetings-filter',
            component: FilterMeeting,
            meta: {
                auth: true,
            },
        },
        {
            name: 'page-not-found',
            path: '*',
            component: PageNotFound
        }
    ],
});

router.beforeEach((to, from, next) => {
    if (to.meta.auth && !localStorage.getItem('token')) {
        next('*');
    } else if (!to.meta.auth && localStorage.getItem('token')) {
        next('/calendar');
    } else {
        next();
    }
});

export default router;
