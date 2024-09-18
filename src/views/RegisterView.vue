<template>
    <div class="styleRegisterPage">
        <form @submit.prevent="register" class="styleForm">
            <div class="styleInputContainer">
                <input v-model="form.name" class="styleInput" placeholder="Name" />
            </div>
            <div class="styleInputContainer">
                <input v-model="form.email" class="styleInput" type="email" placeholder="Email" />
            </div>
            <div class="styleInputContainer">
                <input v-model="form.password" class="styleInput" type="password" placeholder="Password" />
            </div>
            <button type="submit" class="styleButton">Register</button>
        </form>
        <RouterLink to="/" class="styleInicioLink">Início</RouterLink>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();
const form = ref({
    name: '',
    email: '',
    password: ''
});

const register = async () => {
    try {
        const response = await axios.post('http://localhost:4000/api/users/register', form.value);
        store.dispatch('login', response.data.user); // Salva o usuário no Vuex
        router.push({ name: '/' }); // Redireciona após o registro
    } catch (error) {
        console.error('Error registering:', error.response.data);
    }
};
</script>

<style scoped>
.styleRegisterPage {
    @apply flex flex-col items-center justify-center min-h-screen bg-gray-100;
}

.styleForm {
    @apply w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-6;
}

.styleInputContainer {
    @apply relative;
}

.styleInput {
    @apply w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600;
}

.styleButton {
    @apply w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-600;
}

.styleInicioLink {
    @apply text-emerald-600 hover:underline mt-6 text-center;
}
</style>