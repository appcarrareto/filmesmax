<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'primary'
  },
  form: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <button :class="['button', type, { disabled }]" :disabled="loading" :form="form">
    <div v-if="loading" class="spinner"></div>
    <samp> {{ title }}</samp>
  </button>
</template>

<style scoped>
.button {
  height: 50px;
  display: flex;
  gap: 8px;
  border-radius: 50px;
  padding-left: 14px;
  padding-right: 14px;
  cursor: pointer;
  align-items: center;
  align-content: center;
  justify-content: center;
  border: 0;
  white-space: nowrap;
}

.button:active {
  opacity: 0.8;
}

.button .icon {
  display: inline-block;
  margin: 0;
  padding: 0;
}

.button.min {
  height: 42px;
}

.icon svg {
  width: 16px;
  margin: 0;
  padding: 0;
}

.button samp {
  font-size: 15px;
  font-weight: 500;
  display: inline-block;
  white-space: 0;
  margin: 0;
  padding: 0;
}

.primary {
  background-color: var(--accent-color);
  color: #fff;
}

.secondary {
  background-color: transparent;
  color: var(--text-color-primary);
  border: 1px solid var(--border-color-primary);
}

.secondary.min {
  height: 42px;
}

.finish {
  background-color: var(--success-color);
  color: #fff;
}

.danger {
  background-color: var(--danger-color);
  color: #fff;
}

.danger.min {
  height: 42px;
}

.disabled {
  opacity: 0.6;
  cursor: default;
}

.spinner {
  display: inline-block;
  border-radius: 100%;
  border-width: 2px;
  border-style: solid;
  border-image: initial;
  border-color: #fff rgba(238, 238, 238, 0.356) rgb(238, 238, 238, 0.356);
  width: 16px;
  height: 16px;
  animation: spinner-spin 0.8s linear infinite;
  transition: all 0.3s linear;
}

.secondary .spinner {
  border-color: var(--accent-color) rgba(200, 200, 200, 0.356) rgb(200, 200, 200, 0.356);
}
</style>
