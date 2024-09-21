<template>
    <div class="styleContainer">
        <div class="styleContentWrapper">
            <div class="styleLogoContainer">
                <svg class="styleLogo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path
                        d="M446.6 222.7c-1.8-8-6.8-15.4-12.5-18.5-1.8-1-13-2.2-25-2.7-20.1-.9-22.3-1.3-28.7-5-10.1-5.9-12.8-12.3-12.9-29.5-.1-33-13.8-63.7-40.9-91.3-19.3-19.7-40.9-33-65.5-40.5-5.9-1.8-19.1-2.4-63.3-2.9-69.4-.8-84.8 .6-108.4 10C45.9 59.5 14.7 96.1 3.3 142.9 1.2 151.7 .7 165.8 .2 246.8c-.6 101.5 .1 116.4 6.4 136.5 15.6 49.6 59.9 86.3 104.4 94.3 14.8 2.7 197.3 3.3 216 .8 32.5-4.4 58-17.5 81.9-41.9 17.3-17.7 28.1-36.8 35.2-62.1 4.9-17.6 4.5-142.8 2.5-151.7zm-322.1-63.6c7.8-7.9 10-8.2 58.8-8.2 43.9 0 45.4 .1 51.8 3.4 9.3 4.7 13.4 11.3 13.4 21.9 0 9.5-3.8 16.2-12.3 21.6-4.6 2.9-7.3 3.1-50.3 3.3-26.5 .2-47.7-.4-50.8-1.2-16.6-4.7-22.8-28.5-10.6-40.8zm191.8 199.8l-14.9 2.4-77.5 .9c-68.1 .8-87.3-.4-90.9-2-7.1-3.1-13.8-11.7-14.9-19.4-1.1-7.3 2.6-17.3 8.2-22.4 7.1-6.4 10.2-6.6 97.3-6.7 89.6-.1 89.1-.1 97.6 7.8 12.1 11.3 9.5 31.2-4.9 39.4z" />
                </svg>
            </div>
            <div class="styleWelcomeText">
                <h1 class="styleTitle">welcome back to santalucia's blog</h1>
                <p class="styleSubtitle">Enter your username and password to continue</p>
            </div>
            <div class="styleFormWrapper">
                <form class="styleForm" @submit.prevent="handleSignup" action="">
                    <div class="styleInputContainer">
                        <label class="styleLabelInput" for="name">name</label>
                        <input v-model="form.name" class="styleInput" placeholder="Name" required />
                    </div>
                    <div class="styleInputContainer">
                        <label class="styleLabelInput" for="email">email</label>
                        <input class="styleInput" v-model="form.email" type="email" placeholder="Email" required />
                    </div>
                    <div class="styleInputContainer">
                        <label class="styleLabelInput" for="password">password</label>
                        <input class="styleInput" v-model="form.password" type="password" placeholder="Password" required>
                    </div>
                    <div class="styleSubmitButton">
                        <button class="styleButton styleButtonGray" type="submit">sign un</button>
                    </div>
                </form>
                <ErrorNotification v-if="errorMessage" :message="errorMessage" />
            </div>
            <div class="styleSignupWith">or Sign Up with</div>
            <div class="styleSocialSignup">
                <button class="styleButton" type="button"><font-awesome-icon :icon="['fab', 'google']" />google</button>
            </div>
            <div class="styleSignupOption">
                <p>Don't have an account?</p>
                <RouterLink class="styleSignupLink" to="/signin">sign in</RouterLink>
            </div>
        </div>
        <div class="styleErrorNotification">

        </div>
    </div>

    <!-- <div class="styleSignupPage">
        <form @submit.prevent="Signup" class="styleForm">
            <div class="styleInputContainer">
                <input v-model="form.name" class="styleInput" placeholder="Name" required />
            </div>
            <div class="styleInputContainer">
                <input v-model="form.email" class="styleInput" type="email" placeholder="Email" required />
            </div>
            <div class="styleInputContainer">
                <input v-model="form.password" class="styleInput" type="password" placeholder="Password" required />
            </div>
            <button type="submit" class="styleButton buttonShape">Signup</button>
        </form>
        <RouterLink to="/" class="styleInicioLink">Início</RouterLink>
    </div> -->
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

const handleSignup = async () => {
    try {
        const response = await axios.post('http://localhost:4000/api/users/signup', form.value);
        router.push('/'); // Redireciona após o registro

        // Salva o usuário no Vuex, se necessário
        if (response.data && response.data.user) {
            store.dispatch('signup', response.data.user);
        }
    } catch (error) {
        console.error('Error signuping:', error.response?.data || error.message);
        // Aqui você pode adicionar um tratamento para exibir uma mensagem ao usuário
    }
};
</script>

<style scoped>
.styleContainer {
    @apply grid grid-cols-2 justify-center items-center h-screen p-2 gap-2 bg-gray-200;
}

.styleContentWrapper {
    @apply flex flex-col justify-center items-center container h-full bg-white rounded-lg gap-2;
}

.styleLogoContainer {
    @apply flex justify-center items-center w-1/2;
}

.styleWelcomeText {
    @apply text-center flex flex-col justify-center items-center w-1/2;
}

.styleTitle {
    @apply text-xl font-semibold capitalize;
}

.styleSubtitle {
    @apply text-sm normal-case text-gray-400;
}

.styleFormWrapper {
    @apply text-center w-1/2;
}

.styleSubmitButton {
    @apply w-full;
}

.styleSignupWith {
    @apply text-gray-400 text-sm
}

.styleSocialSignup {
    @apply w-1/2 flex gap-2;
}

.styleSignupOption {
    @apply w-1/2 flex justify-center items-center gap-2 text-gray-400;
}

.styleSignupLink {
    @apply capitalize underline text-blue-600;
}

.styleErrorNotification {
    @apply flex w-full p-2 h-full justify-center items-center
}
</style>
