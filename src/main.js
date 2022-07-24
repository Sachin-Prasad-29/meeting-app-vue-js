import Vue from 'vue';
import App from './App.vue';
import Router from 'vue-router';
import router from './router';
import store from './store';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';

Vue.config.productionTip = false;

Vue.use(Router);

Vue.use(VueToast, {
  position: 'top-right',
});

new Vue({
  store,
  router,
  VueToast,
  render: (h) => h(App),
}).$mount('#app');
