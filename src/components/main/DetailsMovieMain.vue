<script setup lang="ts">
import type { Movie } from '@/interfaces/Movie'
import type { PropType } from 'vue'

defineProps({
  movie: {
    type: Object as PropType<Movie>,
    required: true
  }
})
</script>

<template>
  <div class="movie-details">
    <h2 class="movie-title">{{ movie.title }}</h2>
    <p class="movie-description">
      {{ movie.description }}
    </p>

    <div class="movie-info">
      <div class="info-item">
        <span class="info-label">Diretor:</span>
        <span class="info-value">{{ movie.director }}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Ano de lançamento:</span>
        <span class="info-value">{{ movie.year }}</span>
      </div>
      <div class="info-item">
        <span class="info-label">Gênero:</span>
        <span class="info-value">{{ movie.genre }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-details {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.movie-title {
  font-size: 28px;
  font-weight: 600;
  color: var(--text-color-primary);
}

.movie-description {
  font-size: 16px;
  line-height: 1.5;
  color: var(--text-color-secondary);
}

.movie-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.info-item {
  display: flex;
  gap: 0.5rem;
}

.info-label {
  font-size: 16px;
  font-weight: 600;
}

.info-value {
  font-size: 16px;
  font-weight: 300;
  color: var(--text-color-primary);
}
</style>
