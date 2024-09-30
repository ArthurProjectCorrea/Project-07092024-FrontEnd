<!-- Pagination.vue -->
<template>
  <div class="pagination">
    <button @click="prevPage" :disabled="currentPage === 1">Anterior</button>
    <span>Página {{ currentPage }} de {{ totalPages }}</span>
    <button @click="nextPage" :disabled="currentPage === totalPages">Próximo</button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  currentPage: Number,
  totalPages: Number,
});

const emit = defineEmits(['page-changed']);

function prevPage() {
  if (props.currentPage > 1) {
    emit('page-changed', props.currentPage - 1);
  }
}

function nextPage() {
  if (props.currentPage < props.totalPages) {
    emit('page-changed', props.currentPage + 1);
  }
}
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
button {
  margin: 0 5px;
}
</style>
