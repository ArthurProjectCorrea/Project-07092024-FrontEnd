<template>
  <div v-if="visible" :class="['styleNotificationContainer', notificationClass]">
    <div class="styleNotificationContent">
      <span>{{ message }}</span>
      <button @click="closeNotification" class="clearButtonHover"><font-awesome-icon :icon="['fas', 'xmark']" /></button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    default: 5000, // Duração padrão de 5 segundos
  },
  type: {
    type: String,
    default: '', // Tipo padrão de notificação
  },
});

const visible = ref(true);

const closeNotification = () => {
  visible.value = false;
};

// Define classes de estilo com base no tipo de notificação
const notificationClass = computed(() => {
  return `notification-${props.type}`;
});

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
.styleNotificationContainer {
  @apply fixed top-5 right-5 max-w-xs p-4 text-white rounded-lg shadow-lg z-50;
  animation: slide-in-right 0.3s ease-in-out;
}

.styleNotificationContent {
  @apply flex justify-between items-center gap-2;
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

.notification-error {
  @apply bg-red-500;
}

.notification-success {
  @apply bg-green-500;
}

.notification-warning {
  @apply bg-yellow-500;
}

.notification-info {
  @apply bg-blue-500;
}
</style>
