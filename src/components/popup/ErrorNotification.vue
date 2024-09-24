<template>
    <div v-if="visible" class="notification-container">
      <div class="notification-content">
        <span>{{ message }}</span>
        <button @click="closeNotification" class="close-btn">&times;</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  
  const props = defineProps({
    message: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      default: 5000, // Duração padrão de 5 segundos
    },
  });
  
  const visible = ref(true);
  
  const closeNotification = () => {
    visible.value = false;
  };
  
  onMounted(() => {
    setTimeout(() => {
      closeNotification();
    }, props.duration);
  });
  
  watch(() => props.message, () => {
    visible.value = true;
    setTimeout(() => {
      closeNotification();
    }, props.duration);
  });
  </script>
  
  <style scoped>
  .notification-container {
    @apply fixed top-5 right-5 max-w-xs p-4 bg-red-500 text-white rounded-lg shadow-lg z-50;
    animation: slide-in-right 0.3s ease-in-out;
  }
  
  .notification-content {
    @apply flex justify-between items-center;
  }
  
  .close-btn {
    @apply text-white text-lg font-bold cursor-pointer;
  }
  
  @keyframes slide-in-right {
    0% {
      transform: translateX(100%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
  </style>
  