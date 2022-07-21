<template>
  <div>
    <AlertBox v-show="error" :Message="Message" alert="danger" />
    <AlertBox v-show="success" Message="Successfully logged in" alert="success" />
    <div class="register-container">
      <div class="register-div">
        <div class="div-center"><h1>Login</h1></div>
        <div class="div-center login-quotes">See your meetings and work</div>
      </div>
      <form @submit.prevent="onLogin" id="login-form">
        <div class="form-content">
          <div>
            <label for="email">Email</label>
          </div>
          <div>
            <input type="email" v-model="email" class="input-box" id="email" placeholder="abc@example.com" />
          </div>
          <div>
            <label for="password">Password</label>
          </div>
          <div><input type="password" v-model="password" id="password" class="input-box" placeholder="Password" /></div>

          <div>
            <input type="submit" class="submit" value="Login" />
          </div>
          <div>New User? <router-link to="/register" class="secondary"> Create account</router-link></div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AlertBox from '@/components/utils/AlertBox';
import { mapActions } from 'vuex';

export default {
  name: 'LoginPage',
  components: {
    AlertBox,
  },
  data() {
    return {
      error: false,
      success: false,
      Message: '',
      email: '',
      password: '',
    };
  },
  methods: {
    ...mapActions(['login']),
    setBack() {
      setTimeout(() => (this.error = false), 3000);
      setTimeout(() => {
        this.success = false;
      }, 3000);
    },
    isValid(data) {
      const email = data.email;
      const password = data.password;

      if (email === '') {
        this.Message = 'Email Field Required';
        this.error = true;
        this.setBack();
        return false;
      }
      if (password == '') {
        this.Message = 'Plese enter the password field';
        this.error = true;
        this.setBack();
        return false;
      }
      return true;
    },
    async onLogin() {
      const data = {
        email: this.email,
        password: this.password,
      };
      if (this.isValid(data)) {
        const msg = await this.login(data);
        if (msg) {
          this.Message = 'Logined in Successfully';
          this.success = true;
          this.setBack();
          setTimeout(() => {
            this.$router.push('/calendar');
          }, 2500);
        } else {
          this.Message = 'Credentials do not match';
          this.error = true;
          this.setBack();
        }
      } else {
        this.Message = 'Please enter email and password before logging in';
        this.error = true;
        this.setBack();
      }
    },
  },
};
</script>

<style scoped>
@import '../assets/css/pages/register.css';
@import '../assets/css/pages/login.css';
</style>
