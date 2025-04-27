<script setup lang="ts">
import IconStar from '@/components/icons/IconStar.vue'

defineProps({
  rating: {
    type: Number,
    required: true
  },
  totalRatings: {
    type: Number,
    default: 5
  }
})
</script>

<template>
  <div class="stars">
    <div v-for="n in totalRatings" :key="n" class="star" :class="{ active: n <= rating }">
      <IconStar />
    </div>
  </div>
</template>

<style scoped>
.stars {
  display: flex;
  gap: 2px;
}

.star {
  width: 14px;
  height: 14px;
  color: #787878;
}

.star.active {
  color: #ffc107;
}
</style>
