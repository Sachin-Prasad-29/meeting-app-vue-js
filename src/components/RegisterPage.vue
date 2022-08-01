<template>
    <div>
        
        <div class="box"></div>
        <div class="register-container">
            <div class="register-div">
                <div class="div-center"><h1>Create Account</h1></div>
                <div class="div-center login-quotes">Access and Manage all your meetings</div>
            </div>
            <form @submit.prevent="onSubmit" id="register-form">
                <div class="form-content">
                    <div>
                        <label for="username">Username</label>
                    </div>
                    <div>
                        <input
                            type="text"
                            v-model.trim="$v.username.$model"
                            id="username"
                            class="input-box"
                            placeholder="username"
                            :class="{ error: $v.username.$error, valid: !$v.username.$invalid }"
                        />
                        <transition name="bounce">
                            <div v-if="$v.username.$error" class="errorMessage">
                                <p v-if="!$v.username.required">Username is Required !</p>
                            </div>
                        </transition>
                    </div>

                    <div class="mt-3">
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
                                <p v-if="!$v.email.required">Email is Required !</p>
                                <p v-else-if="$v.email.$invalid">Please enter valid Email !</p>
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
                                <p v-if="!$v.password.required">Password is Required !</p>
                                <p v-else-if="!$v.password.minLength">Password should contain 8 Minimum Character !</p>
                                <p v-else-if="!$v.password.passwordValidation">Password must contain One Upper, Lower , Numeric and Special Character !</p>
                            </div>
                        </transition>
                    </div>

                    <div class="mt-3">
                        <label for="confirm-Password">Confirm Password</label>
                    </div>
                    <div>
                        <input
                            type="password"
                            v-model.trim="$v.confirmPassword.$model"
                            name="Confirmpassword"
                            class="input-box"
                            id="confirm-Password"
                            placeholder="Confirm password"
                            :class="{
                                error: $v.confirmPassword.$error,
                                valid: password != '' ? !$v.confirmPassword.$invalid : '',
                            }"
                        />
                        <transition name="bounce">
                            <div v-if="$v.confirmPassword.$error" class="errorMessage">
                                <p v-if="!$v.confirmPassword.sameAsPassword">Password must be identical 1</p>
                            </div>
                        </transition>
                    </div>

                    <div>
                        <button type="submit" class="btn-submit">Submit</button>
                    </div>
                    <div>Already have an account? <router-link to="/login" class="secondary"> Log in</router-link></div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { passwordValidation } from '@/services/validationMethods';
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators';
import { register } from '@/services/accountServices';

export default {
    name: 'RegisterPage',

    components: {},

    data() {
        return {
            Message: '',
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            showPassword: false,
            submitStatus: null,
        };
    },

    validations: {
        username: {
            required,
        },
        email: {
            required,
            email,
        },
        password: {
            required,
            minLength: minLength(8),
            passwordValidation,
        },
        confirmPassword: {
            sameAsPassword: sameAs('password'),
        },
    },

    methods: {
        async onRegister() {
             this.loadScreen = this.$loading.show(this.$spinner);
            const data = {
                name: this.username,
                email: this.email,
                password: this.password,
            };

            const response = await register(data);
            if (response == true) {
                this.$toast.success('Successfully Regestered');
                setTimeout(() => {
                    this.$router.push('/login');
                    this.loadScreen.hide();
                }, 1000);
            } else {
                this.$toast.error(response);
                this.loadScreen.hide();
            }
        },

        toggleShow() {
            this.showPassword = !this.showPassword;
        },
        
        onSubmit() {
            this.$v.$touch();
            if (this.$v.$invalid) {
                this.submitStatus = 'FAIL';
            } else {
                this.submitStatus = 'SUCCESS';
                this.onRegister();
            }
        },
    },
};
</script>

<style scoped>
@import '../assets/css/pages/register.css';
@keyframes slideInLeft {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(0);
    }
}
.box {
    animation: 0.5s ease-out 0s 1 slideInLeft;
    top: 0;
    width: 60%;
    height: 100%;
    position: absolute;
    background: rgb(16, 235, 137);
    background: linear-gradient(
        90deg,
        rgba(16, 235, 137, 0.534) 9%,
        rgba(121, 209, 155, 0.527) 36%,
        rgba(0, 229, 255, 0.527) 62%
    );

    z-index: -1;
    border-radius: 0 0 100% 0%;
}
</style>
