import Router from 'vue-router';
import RegisterPage from '@/components/RegisterPage'
import LoginPage from '@/components/LoginPage';
// import NavBar from '@/components/NavBar';
import CalenderPage from '@/components/CalenderPage';
import AddMeeting from '@/components/AddMeeting';
import FilterMeeting from '@/components/FilterMeeting';
import TeamPage from '@/components/TeamPage';




// EXERCISE: Set up a component WorkshopDetails that appears on /workshops/1
const router = new Router({
  mode: 'history',
  routes: [
    {
      name: 'register',
      path: '/register',
      component: RegisterPage,
    },
    {
      name: 'login',
      path: '/login',
      component: LoginPage,
    },
    {
      name: 'calendar',
      path: '/calendar',
      component: CalenderPage,
    },
    {
      name: 'team',
      path: '/team',
      component: TeamPage,
    },
    {
      name: 'meetings-add',
      path: '/meetings/add',
      component: AddMeeting,
    },
    {
      name: 'meetings-filter',
      path: '/meetings/filter',
      component: FilterMeeting,
    },
    
    
  ],
});

export default router;
