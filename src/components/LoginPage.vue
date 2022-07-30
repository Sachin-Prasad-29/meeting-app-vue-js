<template>
    <div>
        <div class="box"></div>
        <div class="register-container">
            <div class="register-div">
                <div class="div-center"><h1>Login</h1></div>
                <div class="div-center login-quotes">See your meetings and work</div>
            </div>
            <form @submit.prevent="onSubmit" id="login-form">
                <div class="form-content">
                    <div>
                        <label for="email">Email</label>
                    </div>
                    <div>
                        <input
                            type="email"
                            v-model.trim="$v.email.$model"
                            class="input-box"
                            placeholder="abc@example.com"
                            :class="{ error: $v.email.$error, valid: !$v.email.$invalid }"
                            novalidate
                        />
                        <transition name="bounce">
                            <div v-if="$v.email.$error" class="errorMessage">
                                <p v-if="!$v.email.required">Email is Required</p>
                                <p v-else-if="$v.email.$invalid">Please enter valid email</p>
                            </div>
                        </transition>
                    </div>
                    <div class="mt-3">
                        <label for="password">Password</label>
                    </div>
                    <div>
                        <div class="align-div">
                            <input
                                v-if="showPassword"
                                type="text"
                                v-model.trim="$v.password.$model"
                                class="input-box input-pass"
                                id="password"
                                placeholder="Password"
                                :class="{ error: $v.password.$error, valid: !$v.password.$invalid }"
                            />
                            <input
                                v-else
                                type="password"
                                v-model.trim="$v.password.$model"
                                class="input-box input-pass"
                                id="password"
                                placeholder="Password"
                                :class="{ error: $v.password.$error, valid: !$v.password.$invalid }"
                            />
                            <button class="button icon" @click.prevent="toggleShow">
                                <span class="is-small is-right">
                                    <i
                                        class="fas"
                                        :class="{ 'fa-eye-slash': showPassword, 'fa-eye': !showPassword }"
                                    ></i>
                                </span>
                            </button>
                        </div>
                        <transition name="bounce">
                            <div v-if="$v.password.$error" class="errorMessage">
                                <p v-if="!$v.password.required">Password is Required</p>
                                <p v-else-if="!$v.password.minLength">Password should contain 8 minimum character</p>
                            </div>
                        </transition>
                    </div>

                    <div>
                        <input type="submit" class="btn-submit" value="Login" />
                    </div>
                    <div>New User? <router-link to="/" class="secondary"> Create account</router-link></div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { required, email, minLength } from 'vuelidate/lib/validators';

export default {
    name: 'LoginPage',
    components: {},
    data() {
        return {
            error: false,
            success: false,
            Message: '',
            email: '',
            password: '',
            showPassword: false,
        };
    },
    validations: {
        email: {
            required,
            email,
            isUnique(value) {
                if (value === '') return true;

                //eslint-disable-next-line
                var email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,12})+$/;
                return new Promise((resolve) => {
                    setTimeout(() => {
                        resolve(email_regex.test(value));
                    }, 350 + Math.random() * 300);
                });
            },
        },
        password: {
            required,
            minLength: minLength(8),
        },
    },
    computed: {
        buttonLabel() {
            return this.showPassword ? 'Hide' : 'Show';
        },
    },
    methods: {
        ...mapActions(['fetchAllEmail', 'fetchAllTeam', 'login']),

        isValid(data) {
            const email = data.email;
            const password = data.password;

            if (email === '') {
                this.Message = 'Email Field Required';
                this.loadScreen.hide();
                return false;
            }
            if (password == '') {
                this.Message = 'Please enter the password field';
                this.loadScreen.hide();
                return false;
            }
            return true;
        },
        async helper() {
            await this.fetchAllEmail();
            await this.fetchAllTeam();
        },
        async onLogin() {
            this.loadScreen = this.$loading.show({
                color: 'rgb(51, 102, 255)',
                backgroundColor: 'lightblue',
                blur: '9px',
                height: 150,
                width: 150,
            });
            const data = {
                email: this.email,
                password: this.password,
            };
            console.log(data);
            if (this.isValid(data)) {
                const msg = await this.login(data);
                if (msg) {
                    await this.helper();
                    this.Message = 'Logged in Successfully';
                    this.$toast.success(this.Message);
                    setTimeout(() => {
                        this.loadScreen.hide();
                        this.$router.push('/calendar');
                    }, 800);
                } else {
                    this.Message = 'Credentials do not match';
                    this.loadScreen.hide();
                    this.$toast.error(this.Message);
                }
            } else {
                this.loadScreen.hide();
                this.$toast.error(this.Message);
            }
        },
        onSubmit() {
            this.$v.$touch();
            if (this.$v.$invalid) {
                this.submitStatus = 'FAIL';
            } else {
                this.submitStatus = 'SUCCESS';
                this.onLogin();
            }
        },
        toggleShow() {
            this.showPassword = !this.showPassword;
        },
    },
};
</script>

<style scoped>
@import '../assets/css/pages/register.css';
@import '../assets/css/pages/login.css';
@keyframes slideInLeft {
    0% {
        transform: translateX(100%);
    }
    100% {
        transform: translateX(0%);
    }
}
.box {
    animation: 0.5s ease-out 0s 1 slideInLeft;
    top: 0;
    left: 35%;
    width: 65%;
    height: 100%;
    position: absolute;
    background: rgb(0, 211, 255);
    background: linear-gradient(
        90deg,
        rgba(0, 213, 255, 0.398) 38%,
        rgba(121, 209, 155, 0.456) 77%,
        rgba(16, 235, 133, 0.448) 98%
    );
    z-index: -1;
    border-radius: 100% 0 0 0%;
     
}
</style>

#f9f9f9 79d19b
