import Vue from 'vue';
import App from './App.vue';
import Router from 'vue-router';
import router from './router';
import store from './store';
import VueToast from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import Vuelidate from 'vuelidate';

Vue.config.productionTip = false;
Vue.prototype.$spinner = {
    color: 'rgb(51, 102, 255)',
    backgroundColor: 'lightblue',
    blur: '9px',
    height: 150,
    width: 150,
};
Vue.use(Router);
Vue.use(VueLoading);
Vue.use(VueToast, {
    position: 'top-right',
});
Vue.use(Vuelidate);

new Vue({
    store,
    router,
    VueToast,
    VueLoading,
    render: (h) => h(App),
}).$mount('#app');
