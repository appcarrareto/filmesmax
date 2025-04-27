<script setup lang="ts">
import IconBack from '@/components/icons/IconBack.vue'
import IconOptions from '@/components/icons/IconOptions.vue'
import IconEdit from '@/components/icons/IconEdit.vue'
import IconDelete from '@/components/icons/IconDelete.vue'

import { ref } from 'vue'

const emit = defineEmits(['edit', 'delete'])

defineProps({
  title: {
    type: String,
    required: true
  },
  activeOptions: {
    type: Boolean,
    default: false
  }
})

const showOptions = ref(false)

const handleOptionsClick = () => {
  showOptions.value = !showOptions.value
}

const closeOption = () => {
  showOptions.value = false
}

const handleEdit = () => {
  emit('edit')
}

const handleDelete = () => {
  emit('delete')
}
</script>

<template>
  <div class="navigation">
    <RouterLink to="/" class="back-button">
      <IconBack />
    </RouterLink>
    <h1>{{ title }}</h1>
    <div v-if="activeOptions" @click="handleOptionsClick" class="options-button">
      <IconOptions />
    </div>

    <transition name="fade">
      <div v-show="showOptions" v-click-outside="() => closeOption()" class="options">
        <div @click.stop="handleEdit" class="option-item"><IconEdit />Editar</div>
        <div @click.stop="handleDelete" class="option-item delete"><IconDelete />Excluir</div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.navigation {
  display: grid;
  position: relative;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  width: 100%;
  gap: 1rem;
  color: var(--text-color-primary);
}

.back-button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color-primary);
}

.back-button svg {
  width: 24px;
  height: 24px;
}

.options-button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-color-primary);
  border-radius: 6px;
  padding: 0.5rem;
  color: var(--text-color-primary);
}

.options-button svg {
  width: 20px;
  height: 20px;
}

.navigation h1 {
  font-size: 1.2rem;
  font-weight: 500;
  margin: 0;
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
