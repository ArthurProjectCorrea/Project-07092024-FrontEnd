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
                <h1 class="styleTitle">Forgot your password?</h1>
                <p class="styleSubtitle">Confirm the email to be able to reset the password.</p>
            </div>
            <div class="styleFormWrapper">
                <form class="styleForm" @submit.prevent>
                    <div class="styleInputContainer">
                        <label class="styleLabelInput" for="email">e-mail</label>
                        <input :disabled="step === 2 || step === 3" class="styleInput" v-model="email" type="email"
                            placeholder="Enter your email" required />
                    </div>
                    <div v-if="step === 2" class="styleInputContainer">
                        <label class="styleLabelInput" for="">Code</label>
                        <input class="styleInput" v-model="code" type="text" placeholder="Enter the code sent" required>
                    </div>
                    <div v-if="step === 3" class="styleInputContainer">
                        <label class="styleLabelInput" for="password">Password</label>
                        <input v-model="newPassword" class="styleInput" type="password"
                            placeholder="Enter your new password" required />
                    </div>
                    <div v-if="step === 3" class="styleInputContainer">
                        <label class="styleLabelInput" for="confirmPassword">Confirm Password</label>
                        <input v-model="confirmPassword" class="styleInput" type="password"
                            placeholder="Confirm your new password" required />
                    </div>
                    <div class="styleSubmitButton">
                        <button v-if="step === 1" @click="sendCode" class="styleButton styleButtonGray" type="submit">
                            <div v-if="!loading">Send Code</div>
                            <div v-if="loading" class="styleLoading">
                                <font-awesome-icon :icon="['fas', 'arrows-rotate']" />
                            </div>
                        </button>
                        <button v-if="step === 2" @click="checkCode" class="styleButton styleButtonGray" type="submit">
                            <div v-if="!loading">Check Code</div>

                            <div v-if="loading" class="styleLoading">
                                <font-awesome-icon :icon="['fas', 'arrows-rotate']" />
                            </div>
                        </button>
                        <button v-if="step === 3" @click="resetPassword" class="styleButton styleButtonGray"
                            type="submit">
                            <div v-if="!loading">Reset Password</div>

                            <div v-if="loading" class="styleLoading">
                                <font-awesome-icon :icon="['fas', 'arrows-rotate']" />
                            </div>
                        </button>
                    </div>
                </form>
                <NotificationCustom v-if="errorMessage" :message="errorMessage" :type="messageType" />
            </div>
            <div class="styleForgotPasswordOption">
                <p>Remembered the password?</p>
                <RouterLink class="styleForgotPasswordLink" to="/signin">sign ip</RouterLink>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import NotificationCustom from '@/components/popup/NotificationCustom.vue';


const email = ref('');
const code = ref('');
const newPassword = ref('');
const confirmPassword = ref('');
const step = ref(1);
const errorMessage = ref('');
const messageType = ref('success');
const router = useRouter();
const loading = ref(false);


const sendCode = async () => {
    loading.value = true;
    errorMessage.value = '';
    try {
        await axios.post('http://localhost:4000/api/users/sendCode', { email: email.value });
        errorMessage.value = 'Código enviado para seu e-mail!';
        messageType.value = 'success';
        step.value = 2; // Muda para a etapa de verificação de código
        loading.value = false;
    } catch (error) {
        console.error('Erro ao enviar código:', error);
        errorMessage.value = 'Erro ao enviar código. Verifique se o e-mail está correto.';
        messageType.value = 'warning';
        loading.value = false;
    }
};

const checkCode = async () => {
    loading.value = true;
    errorMessage.value = '';
    try {
        const response = await axios.post('http://localhost:4000/api/users/checkCode', {
            codeValue: code.value,
        });
        if (response.data.message === 'Code is valid.') {
            errorMessage.value = 'Código verificado com sucesso!';
            messageType.value = 'success';
            step.value = 3; // Muda para a etapa de redefinição de senha
            loading.value = false;

        } else {
            loading.value = false;
            errorMessage.value = 'Código inválido. Tente novamente.';
            messageType.value = 'warning';
        }
    } catch (error) {
        loading.value = false;
        console.error('Erro ao verificar código:', error);
        errorMessage.value = 'Erro ao verificar código';
        messageType.value = 'error';

    }
};

const resetPassword = async () => {
    loading.value = true;
    errorMessage.value = '';
    if (newPassword.value !== confirmPassword.value) {
        errorMessage.value = 'As senhas não coincidem!';
        messageType.value = 'warning';
        return;
    }

    try {
        await axios.post('http://localhost:4000/api/users/resetPassword', {
            email: email.value,
            password: newPassword.value,
        });
        errorMessage.value = 'Senha redefinida com sucesso!';
        messageType.value = 'success';
        router.push('/signin'); // Redirecionando após o login
    } catch (error) {
        loading.value = false;
        console.error('Erro ao redefinir senha:', error);
        errorMessage.value = 'Erro ao redefinir a senha. Tente novamente.';
        messageType.value = 'error';

    }
};
</script>

<style scoped>
.styleContainer {
    @apply flex justify-center items-center h-screen md:p-4 bg-gray-200;
}

.styleContentWrapper {
    @apply flex flex-col justify-normal items-center  w-full max-w-md bg-white rounded-lg shadow-lg gap-2 p-6 md:max-w-lg lg:max-w-xl;
}

.styleLogoContainer {
    @apply flex justify-center items-center w-16 md:w-24;
}

.styleWelcomeText {
    @apply text-center;
}

.styleTitle {
    @apply text-xl font-semibold capitalize md:text-2xl;
}

.styleSubtitle {
    @apply text-sm text-gray-500 md:text-base;
}

.styleFormWrapper {
    @apply w-full;
}


.styleSubmitButton {
    @apply w-full;
}

.styleForgotPasswordOption {
    @apply flex justify-center items-center gap-2 text-gray-500;
}

.styleForgotPasswordLink {
    @apply text-blue-600 font-medium capitalize;
}
</style>
