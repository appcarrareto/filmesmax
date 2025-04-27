<script setup lang="ts">
import { computed } from 'vue'
import { convertToYoutubeEmbed } from '@/utils/youtube/convert'

const props = defineProps({
  trailerUrl: {
    type: String,
    required: true
  }
})

const formatTrailerUrl = computed(() => {
  return convertToYoutubeEmbed(props.trailerUrl)
})
</script>

<template>
  <div class="movie-trailer">
    <iframe
      v-if="formatTrailerUrl"
      :src="formatTrailerUrl"
      frameborder="0"
      allowfullscreen
      class="youtube-iframe"
    ></iframe>
  </div>
</template>

<style>
.movie-trailer {
  width: 100%;
  height: 0;
  padding-bottom: 56.25%;
  background-color: var(--background-color-secondary);
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

.youtube-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
}
</style>
