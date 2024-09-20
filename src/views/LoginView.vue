<template>
    <div class="style00">
        <div class="style01">

            <div class="style01-01">
                <svg class="styleLogo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path
                        d="M446.6 222.7c-1.8-8-6.8-15.4-12.5-18.5-1.8-1-13-2.2-25-2.7-20.1-.9-22.3-1.3-28.7-5-10.1-5.9-12.8-12.3-12.9-29.5-.1-33-13.8-63.7-40.9-91.3-19.3-19.7-40.9-33-65.5-40.5-5.9-1.8-19.1-2.4-63.3-2.9-69.4-.8-84.8 .6-108.4 10C45.9 59.5 14.7 96.1 3.3 142.9 1.2 151.7 .7 165.8 .2 246.8c-.6 101.5 .1 116.4 6.4 136.5 15.6 49.6 59.9 86.3 104.4 94.3 14.8 2.7 197.3 3.3 216 .8 32.5-4.4 58-17.5 81.9-41.9 17.3-17.7 28.1-36.8 35.2-62.1 4.9-17.6 4.5-142.8 2.5-151.7zm-322.1-63.6c7.8-7.9 10-8.2 58.8-8.2 43.9 0 45.4 .1 51.8 3.4 9.3 4.7 13.4 11.3 13.4 21.9 0 9.5-3.8 16.2-12.3 21.6-4.6 2.9-7.3 3.1-50.3 3.3-26.5 .2-47.7-.4-50.8-1.2-16.6-4.7-22.8-28.5-10.6-40.8zm191.8 199.8l-14.9 2.4-77.5 .9c-68.1 .8-87.3-.4-90.9-2-7.1-3.1-13.8-11.7-14.9-19.4-1.1-7.3 2.6-17.3 8.2-22.4 7.1-6.4 10.2-6.6 97.3-6.7 89.6-.1 89.1-.1 97.6 7.8 12.1 11.3 9.5 31.2-4.9 39.4z" />
                </svg>
            </div>
            <div class="style01-02">
                <h1 class="style01-02">welcome back to santalucia's blog</h1>
                <p class="style01-02">Enter your username and password to continue</p>
            </div>
            <div class="style01-03">
                <form class="styleForm" @submit.prevent="handleLogin" action="">
                    <div class="styleInputContainer">
                        <label class="styleLabel" for="email">email</label>
                        <input class="styleInput" v-model="email" type="email" placeholder="Email" required />
                    </div>
                    <div class="styleInputContainer">
                        <label class="styleLabel" for="">password</label>
                        <input class="styleInput" v-model="password" type="password" placeholder="Password" required>
                    </div>
                    <div class="style01-03-01">
                        <div class="styleCheckBoxContainer">
                            <input type="checkbox" name="" id="">
                            <label class="styleLabel" for="">remember me</label>
                        </div>
                        <RouterLink class="style01-03-01-01" to="/">forgot password</RouterLink>
                    </div>
                    <div>
                        <button type="submit">sign in</button>
                    </div>
                </form>
            </div>
            <div>or login with</div>
            <div>
                <button type="button"><font-awesome-icon :icon="['fab', 'google']" />google</button>
            </div>
            <div>
                <p>don't have an accont?</p>
                <RouterLink class="" to="/register">register</RouterLink>
            </div>

        </div>
        <div class="style02">carrocel</div>
    </div>




    <!-- <div class="styleLogin">
        <div class="styleFormContainer">
            <div class="styleInicioLink">
                <RouterLink to="/" class="styleButton buttonShape">
                    <font-awesome-icon :icon="['fas', 'arrow-left']" />
                </RouterLink>
            </div>
            <div class="welcome-container">
                <h1 class="welcome-title">Welcome Back!</h1>
                <p class="welcome-message">We're glad to see you again. Please log in to continue.</p>
            </div>
            <div>
                <form @submit.prevent="handleLogin" class="styleForm">
                    <div class="styleInputContainer">
                        <label class="styleIcon">
                            <font-awesome-icon :icon="['fas', 'envelope']" />
                        </label>
                        <input class="styleInput" v-model="email" type="email" placeholder="Email" required />
                    </div>
                    <div class="styleInputContainer">
                        <label class="styleIcon">
                            <font-awesome-icon :icon="['fas', 'key']" />
                        </label>
                        <input class="styleInput" v-model="password" type="password" placeholder="Password" required />
                    </div>
                    <div class="styleLinkRight">
                        <RouterLink class="styleLink" to="/">Recuperar Senha?</RouterLink>
                    </div>
                    <button class="styleButton buttonShape" type="submit">Login</button>
                </form>
                <div class="styleRegisterLink ">
                    <RouterLink class="styleLink" to="/register">
                        Não tem uma conta? Registre-se
                    </RouterLink>
                </div>
                <div v-if="errorMessage" class="error-message">
                    {{ errorMessage }}
                </div>
            </div>
        </div>
    </div> -->
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import axios from 'axios';

const store = useStore();
const router = useRouter();

const email = ref('');
const password = ref('');
const errorMessage = ref('');

const handleLogin = async () => {
    errorMessage.value = '';
    try {
        const response = await axios.post('http://localhost:4000/api/users/login', {
            email: email.value,
            password: password.value
        });

        if (response.data && response.data._id && response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify({
                _id: response.data._id,
                name: response.data.name,
                email: response.data.email
            }));

            store.dispatch('login', {
                _id: response.data._id,
                name: response.data.name,
                email: response.data.email
            });

            router.push('/');
        } else {
            console.error('Unexpected response format:', response.data);
        }
    } catch (error) {
        console.error('Error logging in:', error);
        errorMessage.value = error.response?.data?.message || 'Erro ao fazer login. Tente novamente.';
    }
};
</script>

<style scoped>
.style00 {
    @apply flex justify-between items-center p-2 h-screen w-screen gap-2
}

.style01 {
    @apply w-1/2 flex-col justify-center items-center border h-full space-y-2
}

.style01-01 {
    @apply w-full border flex justify-center items-center px-32
}

.style01-02 {
    @apply w-full border text-center px-32
}

h1.style01-02 {
    @apply text-xl font-semibold capitalize px-0
}

p.style01-02 {
    @apply text-sm normal-case px-0 text-gray-400
}

.style01-03 {
    @apply w-full border text-center px-32
}

.style01-03-01 {
    @apply border flex justify-between items-center w-full
}
.style01-03-01-01 {
    @apply border flex justify-end items-center w-full font-semibold capitalize
}

.style02 {
    @apply w-1/2 flex-auto justify-center items-center border h-full
}
</style>