<template>
    <nav class="style00">
        <div class="style01">
            <svg class="styleLogo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                <path
                    d="M446.6 222.7c-1.8-8-6.8-15.4-12.5-18.5-1.8-1-13-2.2-25-2.7-20.1-.9-22.3-1.3-28.7-5-10.1-5.9-12.8-12.3-12.9-29.5-.1-33-13.8-63.7-40.9-91.3-19.3-19.7-40.9-33-65.5-40.5-5.9-1.8-19.1-2.4-63.3-2.9-69.4-.8-84.8 .6-108.4 10C45.9 59.5 14.7 96.1 3.3 142.9 1.2 151.7 .7 165.8 .2 246.8c-.6 101.5 .1 116.4 6.4 136.5 15.6 49.6 59.9 86.3 104.4 94.3 14.8 2.7 197.3 3.3 216 .8 32.5-4.4 58-17.5 81.9-41.9 17.3-17.7 28.1-36.8 35.2-62.1 4.9-17.6 4.5-142.8 2.5-151.7zm-322.1-63.6c7.8-7.9 10-8.2 58.8-8.2 43.9 0 45.4 .1 51.8 3.4 9.3 4.7 13.4 11.3 13.4 21.9 0 9.5-3.8 16.2-12.3 21.6-4.6 2.9-7.3 3.1-50.3 3.3-26.5 .2-47.7-.4-50.8-1.2-16.6-4.7-22.8-28.5-10.6-40.8zm191.8 199.8l-14.9 2.4-77.5 .9c-68.1 .8-87.3-.4-90.9-2-7.1-3.1-13.8-11.7-14.9-19.4-1.1-7.3 2.6-17.3 8.2-22.4 7.1-6.4 10.2-6.6 97.3-6.7 89.6-.1 89.1-.1 97.6 7.8 12.1 11.3 9.5 31.2-4.9 39.4z" />
            </svg>
            <h1 class="style01-01">Blog</h1>
            <h2 class="style01-01">do Santalucia</h2>
        </div>
        <div class="styleNavigation">
            <RouterLink to="/" active-class="active">Início</RouterLink>
            <RouterLink to="/categories" active-class="active">Categorias</RouterLink>
            <RouterLink to="/on" active-class="active">Sobre</RouterLink>
            <RouterLink to="/contact" active-class="active">Contato</RouterLink>
        </div>
        <div class="styleButtons">
            <div v-if="!isLoggedIn" class="styleButtons">
                <RouterLink to="/signin">
                    <button class="styleButton">
                        <font-awesome-icon :icon="['fas', 'right-to-bracket']" />
                    </button>
                </RouterLink>
            </div>
            <div v-if="isLoggedIn" class="styleButtons">
                <button @click="logout" class="styleButton">
                    <font-awesome-icon :icon="['fas', 'user']" />
                </button>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

const isLoggedIn = computed(() => store.state.isLoggedIn)

const logout = () => {
    store.dispatch('signout')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
}

</script>

<style scoped>
.style00 {
    @apply flex justify-between items-center px-6 p-2 border-b max-h-16;
}

.style01 {
    @apply flex justify-center items-center gap-2 py-2;
}

.style01-01 {
    @apply select-none font-semibold font-ubuntu text-xl;
}

.styleNavigation {
    @apply flex justify-between items-center gap-8 font-semibold h-full capitalize;
}

.active {
    @apply border-b-4 border-emerald-600 h-full flex justify-center items-center;
    @apply dark:border-emerald-400;
}

.styleButtons {
    @apply flex justify-center items-center gap-2;
}
</style>
