<template>
    <div class="styleRegisterPage">
        <form @submit.prevent="register" class="styleForm">
            <div class="styleInputContainer">
                <input v-model="form.name" class="styleInput" placeholder="Name" required />
            </div>
            <div class="styleInputContainer">
                <input v-model="form.email" class="styleInput" type="email" placeholder="Email" required />
            </div>
            <div class="styleInputContainer">
                <input v-model="form.password" class="styleInput" type="password" placeholder="Password" required />
            </div>
            <button type="submit" class="styleButton buttonShape">Register</button>
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
    password: '',
    accessTypeId: 1
});

const register = async () => {
    try {
        const response = await axios.post('http://localhost:4000/api/users/register', form.value);
        router.push('/'); // Redireciona após o registro

        // Salva o usuário no Vuex, se necessário
        if (response.data && response.data.user) {
            store.dispatch('login', response.data.user);
        }
    } catch (error) {
        console.error('Error registering:', error.response?.data || error.message);
        // Aqui você pode adicionar um tratamento para exibir uma mensagem ao usuário
    }
};
</script>

<style scoped>
.styleRegisterPage {
    @apply flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800;
}

.styleForm {
    @apply w-full max-w-md bg-white shadow-lg rounded-lg p-8 space-y-6 dark:bg-gray-900;
}

.styleInputContainer {
    @apply relative;
}

.styleInicioLink {
    @apply text-emerald-600 hover:underline mt-6 text-center dark:text-emerald-400;
}
</style>
