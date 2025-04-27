<template>
  <div class="button">
    <slot class="icon"></slot>
  </div>
</template>

<style scoped>
.button,
.button:hover {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  color: var(--text-color-primary);
  background-color: var(--background-color-secondary);
  cursor: pointer;
  padding: 8px;
}

.button:hover {
  opacity: 0.6;
}
</style>
