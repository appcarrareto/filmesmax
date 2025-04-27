<script setup lang="ts">
defineEmits(['shadow'])

defineProps({
  show: {
    type: Boolean,
    required: true
  },
  full: {
    type: Boolean,
    default: false
  },
  maxWidth: {
    type: Number,
    default: 500
  }
})
</script>

<template>
  <div v-if="show" class="main-modal">
    <div @click="$emit('shadow')" class="shadow"></div>
    <div class="modal" :class="{ full: full }" :style="{ maxWidth: `${maxWidth}px` }">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.main-modal {
  width: 100%;
}
.modal {
  position: fixed;
  width: 90%;
  left: 50%;
  top: 50%;
  background-color: var(--item-background-color);
  z-index: 10;
  border-radius: 1rem;
  transform: translate(-50%, -50%);
  cursor: default;
}

.modal.full {
  width: 80%;
  max-width: 500px;
  left: 50%;
  top: 50%;
  background-color: var(--item-background-color);
  z-index: 10;
  border-radius: 4px;
  transform: translate(-50%, -50%);
}

.shadow {
  z-index: 5;
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  height: 100%;
  background: #000000a5;
  touch-action: none;
  cursor: default;
}

@media screen and (max-width: 960px) {
  .modal.full {
    width: 100%;
    max-width: 100%;
    height: 100vh;
    left: 0;
    top: 0;
    border-radius: 0px;
    transform: translate(0%, 0%);
  }
}
</style>
