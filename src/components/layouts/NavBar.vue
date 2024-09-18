<template>
    <nav class="styleNavBar">
        <div class="styleLogo">
            <h1 class="styleLogo">Blog</h1>
            <h2 class="styleLogo">do Santalucia</h2>
        </div>
        <div class="styleNavigation">
            <RouterLink to="/" active-class="active">Início</RouterLink>
            <RouterLink to="/categories" active-class="active">Categorias</RouterLink>
            <RouterLink to="/on" active-class="active">Sobre</RouterLink>
            <RouterLink to="/contact" active-class="active">Contato</RouterLink>
        </div>
        <div class="styleButtons">
            <div v-if="!isAuthenticated" class="styleButtons">
                <RouterLink to="/login">
                    <button class="clearButtonStyle buttonShape">
                        Login
                    </button>
                </RouterLink>
                <RouterLink to="/register">
                    <button class="darkButtonStyle buttonShape">
                        Register
                    </button>
                </RouterLink>
            </div>
            <div v-if="isAuthenticated" class="styleButtons">
                <button class="clearButtonStyle buttonShape">{{ user.name }}</button>
                <button @click="logout" class="darkButtonStyle buttonShape">
                    <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
                </button>
            </div>
        </div>
    </nav>
    <Popup ref="popup" :visible="isPopupVisible" :title="popupTitle" :component="currentComponent" />
</template>

<script setup>
import { RouterLink, useRouter } from 'vue-router'
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

const isAuthenticated = computed(() => {
    console.log('Checking authentication:', store.getters.isAuthenticated)
    return store.getters.isAuthenticated
})

const user = computed(() => {
    console.log('Getting user:', store.getters.getUser)
    return store.getters.getUser
})

const logout = () => {
    store.dispatch('logout')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
}
</script>

<style scoped>
.styleNavBar {
    @apply flex justify-between items-center px-10 border-b h-16 bg-slate-50;
}

.styleLogo {
    @apply flex justify-center items-center gap-2 select-none font-suse font-bold text-xl py-2;
}

h1.styleLogo {
    @apply text-emerald-600;
}

h2.styleLogo {
    @apply text-black;
}

.styleNavigation {
    @apply flex justify-between items-center gap-8 text-black  font-semibold h-full capitalize;
}

.active {
    @apply border-b-4 border-emerald-600 h-full flex justify-center items-center;
}

div.styleButtons {
    @apply flex justify-center items-center gap-2;
}
</style>
