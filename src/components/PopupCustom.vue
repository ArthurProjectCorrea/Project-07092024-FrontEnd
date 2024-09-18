<template>
    <div v-if="isOpen" class="stylePopup" @click="closePopup">
        <div class="styleWindowsPopup" @click.stop>
            <div class="styleHeadPopup">
                <h1 class="styleTitlePopup">{{ title }}</h1>
                <button @click="closePopup" class="clearButtonStyle" type="submit">
                    <font-awesome-icon :icon="['fas', 'xmark']" />
                </button>
            </div>
            <component :is="component" />
            <slot></slot>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, defineExpose } from 'vue'

// eslint-disable-next-line no-unused-vars
const props = defineProps({
    title: String,
    component: Object
})

const isOpen = ref(false)

const openPopup = () => {
    isOpen.value = true
}

const closePopup = () => {
    isOpen.value = false
}

// Expõe os métodos para serem usados externamente
defineExpose({
    openPopup,
    closePopup
})
</script>

<style scoped>
.stylePopup {
    @apply fixed flex justify-center items-start bg-black/50 w-full h-full top-0 left-0 right-0 bottom-0 py-10 px-80
}

.styleHeadPopup {
    @apply flex justify-between items-center p-2 border-b
}

.styleTitlePopup {
    @apply text-xl text-black font-semibold
}

.styleWindowsPopup {
    @apply bg-white rounded-md shadow-md w-full h-full overflow-auto
}
</style>