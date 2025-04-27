<script setup lang="ts">
import IconStar from '@/components/icons/IconStar.vue'

import { computed, ref } from 'vue'

const props = defineProps({
  rating: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update:rating'])

const hoverRating = ref(0)

const displayRating = computed(() => {
  if (hoverRating.value > 0) {
    return hoverRating.value
  }
  return props.rating
})

const ratingText = computed(() => getRatingText(displayRating.value))

const setRating = (rating: number) => {
  emit('update:rating', rating)
}

const handleHoverRating = (rating: number) => {
  hoverRating.value = rating
}

const resetHoverRating = () => {
  hoverRating.value = 0
}

const getRatingText = (rating: number): string => {
  switch (rating) {
    case 1:
      return 'Muito ruim'
    case 2:
      return 'Ruim'
    case 3:
      return 'Regular'
    case 4:
      return 'Bom'
    case 5:
      return 'Perfeito'
    default:
      return 'Não avaliado'
  }
}
</script>

<template>
  <div class="rating-section">
    <div class="rating-header">
      <div class="rating-title">
        <p class="rating-text">Avalie o filme</p>
        <h3 class="rating-value">{{ ratingText }}</h3>
      </div>
    </div>
    <div class="stars-container" @mouseleave="resetHoverRating">
      <div
        v-for="star in 5"
        :key="star"
        class="star-wrapper"
        @click="setRating(star)"
        @mouseenter="handleHoverRating(star)"
      >
        <IconStar :class="['star', star <= displayRating ? 'filled' : 'empty', 'interactive']" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.rating-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.rating-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rating-title {
  font-size: 22px;
  font-weight: 600;
}

.rating-title p {
  font-size: 14px;
  color: var(--text-color-secondary);
  margin-bottom: 0.5rem;
}

.rating-value {
  margin: 0;
}

.stars-container {
  display: flex;
  gap: 0.5rem;
}

.star-wrapper {
  cursor: pointer;
}

.star {
  width: 35px;
  height: 35px;
  color: var(--accent-color);
  transition:
    transform 0.2s,
    color 0.2s;
}

.star.filled {
  color: #e50914;
}

.star.empty {
  color: var(--border-color-primary);
}

.star.interactive:hover {
  transform: scale(1.2);
}
</style>
