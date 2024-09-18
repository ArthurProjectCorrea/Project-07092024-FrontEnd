<template>
    <div class="styleLogin">
        <div class="styleFormContainer">
            <div class="styleInicioLink">
                <RouterLink to="/" class="styleButton">
                    <font-awesome-icon :icon="['fas', 'arrow-left']" />
                </RouterLink>
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
                    <button class="styleButton" type="submit">Login</button>
                </form>
                <div class="styleRegisterLink">
                    <RouterLink class="styleLink" to="/register">
                        Não tem uma conta? Registre-se
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter, RouterLink } from 'vue-router';
import axios from 'axios';

const store = useStore();
const router = useRouter();

const email = ref('');
const password = ref('');

const handleLogin = async () => {
    try {
        const response = await axios.post('http://localhost:4000/api/users/login', {
            email: email.value,
            password: password.value
        });

        console.log('Login response:', response.data);

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
    }
};
</script>

<style scoped>
.styleLogin {
    @apply flex flex-col items-center justify-center min-h-screen bg-gray-100;
}

.styleFormContainer {
    @apply w-full max-w-md bg-white shadow-lg rounded-lg p-8;
}

.styleInicioLink {
    @apply mb-6;
}

.styleInicioText {
    @apply text-emerald-600 font-bold text-xl;
}

.styleForm {
    @apply space-y-6;
}

.styleInputContainer {
    @apply relative;
}

.styleIcon {
    @apply absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400;
}

.styleInput {
    @apply pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-600 focus:outline-none;
}

.styleLinkRight {
    @apply text-right;
}

.styleLink {
    @apply text-emerald-600 hover:underline;
}

.styleButton {
    @apply w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600;
}

.styleRegisterLink {
    @apply text-center mt-6;
}
</style>