import type { DirectiveBinding } from 'vue'

interface HTMLElementWithClickOutsideEvent extends HTMLElement {
  clickOutsideEvent?: (event: MouseEvent) => void
}

export const clickOutside = {
  beforeMount(el: HTMLElementWithClickOutsideEvent, binding: DirectiveBinding<() => void>) {
    el.clickOutsideEvent = (event: MouseEvent) => {
      if (!document.body.contains(el)) return
      if (!(el === event.target)) {
        binding.value?.()
      }
    }

    document.addEventListener('pointerup', el.clickOutsideEvent as EventListener)
  },
  unmounted(el: HTMLElementWithClickOutsideEvent) {
    document.removeEventListener('pointerup', el.clickOutsideEvent as EventListener)
  }
}
