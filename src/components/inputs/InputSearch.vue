<script setup lang="ts">
import IconSearch from '@/components/icons/IconSearch.vue'
import IconClose from '@/components/icons/IconClose.vue'

import { ref } from 'vue'

defineExpose({ onClean: () => onClean() })

const emit = defineEmits(['search', 'clean'])

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  query: {
    type: String,
    default: '',
  },
})

const query = ref(props.query)

const onSearch = (event: Event) => {
  const target = event.target as HTMLInputElement | null
  if (target) {
    emit('search', target.value)
  }
}

const onClean = () => {
  emit('clean')
  query.value = ''
}
</script>

<template>
  <div class="search">
    <input
      v-model="query"
      :name="name"
      type="search"
      :placeholder="placeholder"
      @input="onSearch"
    />
    <div class="icon-search">
      <IconSearch />
    </div>
    <div v-if="query.trim()" @click="onClean" class="clean-search">
      <div v-if="loading" class="spinner"></div>
      <IconClose v-else />
    </div>
  </div>
</template>

<style scoped>
.search {
  width: 100%;
  position: relative;
}

.search input {
  width: 100%;
  height: 46px;
  border-radius: 50px;
  padding-left: 58px;
  padding-right: 58px;
  border: 0;
  outline: none;
  background-color: var(--background-color-secondary);
  color: var(--text-color-primary);
  font-size: 15px;
  appearance: none;
  -webkit-appearance: none;
}

.search input:focus {
  background-color: transparent;
  border: 0;
  box-shadow: 0 0 0 0.2rem rgba(166, 44, 0, 0.25);
  color: var(--text-color-primary);
  outline: none;
}

.search input::placeholder {
  color: var(--text-color-secondary);
  opacity: 1;
}

.search input::-ms-input-placeholder {
  color: var(--text-color-secondary);
}

.search input::-ms-input-placeholder {
  color: var(--text-color-secondary);
}

.icon-search {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 14px;
  left: 24px;
  background-color: transparent;
  color: var(--text-color-secondary);
  border-radius: 50px;
  justify-self: start;
}

.icon-search svg {
  width: 18px;
}

.clean-search {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 5px;
  right: 8px;
  background-color: transparent;
  color: var(--text-color-secondary);
  border-radius: 50px;
  justify-self: start;
  cursor: pointer;
}

.clean-search svg {
  width: 18px;
}

.clean-search:hover {
  background-color: var(--background-color-secondary);
}

.spinner {
  display: inline-block;
  border-radius: 100%;
  border-width: 2px;
  border-style: solid;
  border-image: initial;
  border-color: var(--accent-color) rgba(200, 200, 200, 0.356) rgb(200, 200, 200, 0.356);
  width: 20px;
  height: 20px;
  animation: spinner-spin 0.8s linear infinite;
  transition: all 0.3s linear;
}
</style>
