<template>
    <nav :class="['styleNavBar', isDarkMode ? 'dark' : '']">
        <div class="styleLogo">
            <h1 class="styleLogoText">Blog</h1>
            <h2 class="styleLogoText">do Santalucia</h2>
        </div>
        <div class="styleNavigation">
            <RouterLink to="/" active-class="active">Início</RouterLink>
            <RouterLink to="/categories" active-class="active">Categorias</RouterLink>
            <RouterLink to="/on" active-class="active">Sobre</RouterLink>
            <RouterLink to="/contact" active-class="active">Contato</RouterLink>
        </div>
        <div class="styleButtons">
            <button @click="toggleDarkMode" class="clearButtonHover buttonShape">
                <font-awesome-icon :icon="['fas', isDarkMode ? 'sun' : 'moon']" />
            </button>
            <div v-if="!isAuthenticated" class="styleButtons">
                <RouterLink to="/login">
                    <button class="clearButtonHover buttonShape">
                        <font-awesome-icon :icon="['fas', 'right-to-bracket']" />
                    </button>
                </RouterLink>
            </div>
            <div v-if="isAuthenticated" class="styleButtons">
                <button @click="logout" class="styleButton buttonShape">
                    <font-awesome-icon :icon="['fas', 'user']" />
                </button>
            </div>
        </div>
    </nav>
    <!-- <Popup ref="popup" :visible="isPopupVisible" :title="popupTitle" :component="currentComponent" /> -->
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

const isAuthenticated = computed(() => store.getters.isAuthenticated)
const isDarkMode = ref(false);

const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    if (isDarkMode.value) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('dark-mode', 'enabled');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('dark-mode', 'disabled');
    }
};

const logout = () => {
    store.dispatch('logout')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
}

onMounted(() => {
    if (localStorage.getItem('dark-mode') === 'enabled') {
        isDarkMode.value = true;
        document.documentElement.classList.add('dark');
    } else {
        isDarkMode.value = false;
        document.documentElement.classList.remove('dark');
    }
});
</script>

<style scoped>
.styleNavBar {
    @apply flex justify-between items-center px-10 border-b h-16 bg-slate-50;
    @apply dark:bg-gray-800 dark:border-gray-700;
    /* Estilo para modo escuro */
}

.styleLogo {
    @apply flex justify-center items-center gap-2 select-none font-bold text-xl py-2;
}

.styleLogoText {
    @apply font-suse text-black;
    @apply dark:text-white;
    /* Texto em branco no modo escuro */
}

.styleNavigation {
    @apply flex justify-between items-center gap-8 font-semibold h-full capitalize;
    @apply text-black dark:text-gray-300;
    /* Texto em cinza claro no modo escuro */
}

.active {
    @apply border-b-4 border-emerald-600 h-full flex justify-center items-center;
    @apply dark:border-emerald-400;
    /* Borda para modo escuro */
}

.styleButtons {
    @apply flex justify-center items-center gap-2;
}
</style>
