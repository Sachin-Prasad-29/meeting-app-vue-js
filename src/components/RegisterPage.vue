<template>
  <div>
    <AlertBox v-show="error" :Message="Message" alert="danger" />
    <AlertBox v-show="success" Message="SuccessFully Registered" alert="success" />
    <div class="register-container">
      <div class="register-div">
        <div class="div-center"><h1>Create Account</h1></div>
        <div class="div-center login-quotes">Access and Manage all your meetings</div>
      </div>
      <form @submit.prevent="onRegister" id="register-form">
        <div class="form-content">
          <div>
            <label for="username">Username</label>
          </div>
          <div>
            <input type="text" v-model="username" id="username" class="input-box" placeholder="username" />
          </div>

          <div>
            <label for="email">Email</label>
          </div>
          <div>
            <input
              type="email"
              v-model="email"
              name="email"
              id="email"
              class="input-box"
              placeholder="example@gmail.com"
            />
          </div>
          <div>
            <label for="password">Password</label>
          </div>
          <div>
            <input
              type="password"
              v-model="password"
              name="password"
              id="password"
              class="input-box"
              placeholder="Password"
            />
          </div>
          <div>
            <label for="confirm-Password">Confirm Password</label>
          </div>
          <div>
            <input
              type="password"
              v-model="confirmPassword"
              name="Confirmpassword"
              class="input-box"
              id="confirm-Password"
              placeholder="Confirm password"
            />
          </div>

          <div>
            <input type="submit" class="submit" />
          </div>
          <div>Already have an account? <router-link to="/login" class="secondary"> Log in</router-link></div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AlertBox from '@/components/utils/AlertBox';
import { mapActions } from 'vuex';
import config from '@/config'

export default {
  name: 'RegisterPage',
  components: {
    AlertBox,
  },
  data() {
    return {
      success: false,
      error: false,
      Message: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  },
  methods: {
    ...mapActions(['register']),
    // To validate the form details
    setBack() {
      setTimeout(() => (this.error = false), 2500);
      setTimeout(() => {
        this.success = false;
        }, 3000);
    },
    isValid(data) {
      const name = data.name;
      const email = data.email;
      const password = data.password;
      const confirmPassword = data.confirmPassword;
      if (name === '') {
        this.Message = 'Username Field Required';
        this.error = true;
        this.setBack();
        return false;
      }
      if (email === '') {
        this.Message = 'Email Field Required';
        this.error = true;
        this.setBack();
        return false;
      }
      let passValid = () => {
        var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        return re.test(password);
      };
      if (password == '') {
        this.Message = 'Plese enter the password field';
        this.error = true;
        this.setBack();
        return false;
      }
      let passvalid = passValid();
      if (!passvalid) {
        this.Message =
          'Password must be at least eight characters and include a mix of upper and lower case letters, numbers, and symbols';
        this.error = true;
        this.setBack();
        return false;
      }

      
      if (confirmPassword == '') {
        this.Message = 'Please enter confirm password field';
        this.error = true;
        this.setBack();
        return false;
      }
      if (password.localeCompare(confirmPassword) != 0) {
        this.Message = 'your Confirm password not matching';
        this.error = true;
        this.setBack();
        return false;
      }
      return true;
    },


    async onRegister() {
      const data = {
        name: this.username,
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
      };
      if (this.isValid(data)) {
          const registerData = { name:data.name, email:data.email, password:data.password};
           await axios
          .post(`${config.BaseUrl}/auth/register`, registerData)
          .then((response) => {
            console.log(response);
            this.success = true;
            this.setBack(this.success);
            setTimeout(()=>{
              this.$router.push("/login");
            },2000)
            
          })
          .catch((error) => {
            const err = error.request.response;
            this.Message = err.substring(12, 49);
            this.error = true;
            this.setBack();
          });
      } else {
        console.log('somthing error happend');
      }
    },
  },
};
</script>

<style scoped>
@import '../assets/css/pages/register.css';

</style>
