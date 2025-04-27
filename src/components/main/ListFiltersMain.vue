<script setup lang="ts">
import type { PropType } from 'vue'

import IconClose from '@/components/icons/IconClose.vue'

const emit = defineEmits(['clear-filter'])

defineProps({
  listFilterMovie: {
    type: Array as PropType<{ genre: string }[]>,
    required: true
  }
})

const handleClearFilter = (genre: string) => {
  emit('clear-filter', genre)
}
</script>

<template>
  <div v-if="listFilterMovie.length > 0" class="filters">
    <div v-for="filter in listFilterMovie" :key="filter.genre" class="filter-item">
      <div class="filter-item-title">
        {{ filter.genre }}
      </div>
      <div @click="handleClearFilter(filter.genre)" class="close-button">
        <IconClose />
      </div>
    </div>
  </div>
</template>

<style scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.filter-item {
  display: flex;
  align-items: center;
  background-color: var(--text-color-primary);
  border-radius: 20px;
  padding: 10px 13px;
}

.filter-item-title {
  font-size: 13px;
  color: var(--background-color-primary);
  margin-right: 5px;
  cursor: default;
}

.close-button {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-color-primary);
}

.close-button:hover {
  opacity: 0.7;
}

.close-button svg {
  width: 14px;
  stroke-width: 2px;
  color: var(--background-color-primary);
}
</style>
