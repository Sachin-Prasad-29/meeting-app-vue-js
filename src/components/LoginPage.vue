<template>
    <div>
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
                        <input
                            type="email"
                            v-model="email"
                            class="input-box"
                            id="email"
                            placeholder="abc@example.com"
                        />
                    </div>
                    <div>
                        <label for="password">Password</label>
                    </div>
                    <div>
                        <input
                            type="password"
                            v-model="password"
                            id="password"
                            class="input-box"
                            placeholder="Password"
                            :class="{ error: $v.form.password.$error }"
                            @blur="$v.form.password.$touch()"
                        />
                    </div>

                    <div>
                        <input type="submit" class="submit" value="Login" />
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
        };
    },
    validations: {
        form: {
            email: {
                required,
                email,
            },
            password: {
                required,
                minLength: minLength(8),
            },
        },
    },
    methods: {
        ...mapActions(['fetchAllEmail', 'fetchAllTeam', 'login']),

        isValid(data) {
            const email = data.email;
            const password = data.password;

            if (email === '') {
                this.Message = 'Email Field Required';

                return false;
            }
            if (password == '') {
                this.Message = 'Please enter the password field';

                return false;
            }
            return true;
        },
        async helper() {
            await this.fetchAllEmail();
            await this.fetchAllTeam();
        },
        async onLogin() {
            const data = {
                email: this.email,
                password: this.password,
            };
            if (this.isValid(data)) {
                const msg = await this.login(data);
                if (msg) {
                    await this.helper();
                    this.Message = 'Logged in Successfully';
                    this.$toast.success(this.Message);
                    setTimeout(() => {
                        this.$router.push('/calendar');
                    }, 1000);
                } else {
                    this.Message = 'Credentials do not match';
                    this.$toast.error(this.Message);
                }
            } else {
                this.$toast.error(this.Message);
            }
        },
    },
};
</script>

<style scoped>
@import '../assets/css/pages/register.css';
@import '../assets/css/pages/login.css';
</style>
