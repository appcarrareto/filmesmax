<script setup lang="ts">
import type { Movie } from '@/interfaces/Movie'

import IconOptions from '@/components/icons/IconOptions.vue'
import IconEdit from '@/components/icons/IconEdit.vue'
import IconDelete from '@/components/icons/IconDelete.vue'

import RatingMain from '@/components/main/RatingMain.vue'

defineProps<{
  movie: Movie
  index: number
}>()

defineEmits<{
  (e: 'movieClick', id: number): void
  (e: 'optionsClick', event: Event, index: number): void
  (e: 'closeOption', index: number): void
  (e: 'editClick', id: number): void
  (e: 'deleteClick', id: number): void
}>()
</script>

<template>
  <div class="movie-card" @click="$emit('movieClick', movie.id)">
    <div class="movie-image" :style="{ backgroundImage: `url(${movie.coverUrl})` }">
      <div class="genre-tag">
        {{ movie.genre }}
      </div>
      <div class="options-button" @click="$emit('optionsClick', $event, index)">
        <IconOptions />
      </div>

      <transition name="fade">
        <div
          v-show="movie.showOptions"
          v-click-outside="() => $emit('closeOption', index)"
          class="options"
        >
          <div @click.stop="$emit('editClick', movie.id)" class="option-item">
            <IconEdit />Editar
          </div>
          <div @click.stop="$emit('deleteClick', movie.id)" class="option-item delete">
            <IconDelete />Excluir
          </div>
        </div>
      </transition>
    </div>
    <div class="movie-info">
      <div class="movie-title">{{ movie.title }}</div>
      <div class="movie-rating">
        <RatingMain :rating="movie.rating" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.movie-card {
  width: 100%;
  background-color: var(--background-color-secondary);
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.2s ease;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  z-index: 0;
}

.movie-card:hover {
  transform: translateY(-4px);
}

.movie-image {
  position: relative;
  aspect-ratio: 2/3;
  background-color: #333;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 8px;
  background-size: cover;
  background-position: center;
}

.movie-image::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.5) 0%,
    rgba(0, 0, 0, 0.2) 40%,
    rgba(0, 0, 0, 0) 70%
  );
  z-index: 1;
}

.genre-tag {
  padding: 4px 12px;
  border-radius: 50px;
  font-size: 12px;
  font-weight: 500;
  z-index: 2;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  background-color: var(--accent-color);
  color: white;
}

.options-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  color: white;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  cursor: pointer;
}

.options-button svg {
  width: 16px;
  height: 16px;
}

.options-button:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

.movie-info {
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.movie-title {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-color-primary);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
}

.movie-rating {
  display: flex;
  align-items: center;
}

.options {
  display: grid;
  position: absolute;
  grid-template-rows: auto;
  width: 150px;
  top: 36px;
  right: 6px;
  border-radius: 1rem;
  background-color: var(--item-background-color);
  box-shadow:
    0px 0px 2px 0px rgba(0, 0, 0, 0.15),
    0px 8px 40px 0px rgba(0, 0, 0, 0.04),
    0px 2px 5px 0px rgba(0, 0, 0, 0.05);
  z-index: 2;
  padding: 8px;
  row-gap: 2px;
}

.options svg {
  width: 100%;
}

.option-item {
  display: grid;
  width: 100%;
  height: 40px;
  grid-template-columns: 14px 1fr;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 400;
  color: var(--text-color-primary);
  cursor: pointer;
}

.option-item.delete {
  color: var(--danger-color);
}

.option-item:hover {
  background-color: var(--background-color-secondary);
}
</style>
