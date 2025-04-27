<script lang="ts" setup>
import IconPlus from '@/components/icons/IconPlus.vue'

import { onBeforeMount, onBeforeUnmount, ref } from 'vue'

const props = defineProps({
  fixed: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['click'])

const isButtonVisible = ref(false)

onBeforeMount(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleScroll)
})

const action = () => {
  emit('click')
}

const handleScroll = () => {
  const isMobile = window.innerWidth < 960
  if (isMobile && props.fixed) {
    const scrollPosition = window.scrollY
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const hasScroll = document.documentElement.scrollHeight > window.innerHeight

    if (!hasScroll) {
      isButtonVisible.value = true
      return
    }

    if (maxScroll - scrollPosition < 10) {
      isButtonVisible.value = false
    } else {
      isButtonVisible.value = true
    }
  }
}
</script>

<template>
  <div
    @click="action"
    class="button-main"
    :class="{ fixed: fixed, 'button-hidden': !isButtonVisible }"
  >
    <IconPlus /> {{ label }}
  </div>
</template>

<style scoped>
.button-main {
  width: fit-content;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: 50px;
  background-color: var(--accent-color);
  font-size: 14px;
  font-weight: 400;
  color: #fff;
  padding: 0 16px;
  cursor: pointer;
  transition: transform 0.3s ease;
  grid-area: button;
}

.button-main svg {
  width: 14px;
}

.button-main:hover {
  opacity: 0.8;
}

@media screen and (max-width: 960px) {
  .button-main.fixed {
    position: fixed;
    height: 44px;
    right: 28px;
    bottom: 28px;
    z-index: 1;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    transform: translateY(0);
  }

  .button-main.fixed.button-hidden {
    transform: translateY(100px);
  }

  .button-main:hover {
    opacity: 1;
  }

  .button-main:active {
    opacity: 0.8;
  }
}
</style>
