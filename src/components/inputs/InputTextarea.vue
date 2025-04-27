<script setup lang="ts">
import { onMounted, ref, watch, nextTick } from 'vue'
import { useField } from 'vee-validate'

const props = defineProps({
  value: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: false
  },
  modelValue: {
    type: String,
    required: false
  },
  placeholder: {
    type: String,
    default: ''
  },
  maxlength: {
    type: String,
    default: undefined
  },
  maxHeight: {
    type: Number,
    default: 150
  }
})

const textareaRef = ref<HTMLTextAreaElement | null>(null)

const { errorMessage, value, handleChange, handleBlur } = useField<string>(
  () => props.name,
  undefined,
  {
    syncVModel: true,
    validateOnValueUpdate: false
  }
)

const adjustTextareaHeight = () => {
  if (textareaRef.value) {
    textareaRef.value.style.height = '0px'
    const scrollHeight = textareaRef.value.scrollHeight
    const minHeight = 44
    const newHeight = Math.min(Math.max(scrollHeight, minHeight), props.maxHeight)
    textareaRef.value.style.height = `${newHeight}px`
  }
}

watch(
  () => value.value,
  () => {
    nextTick(() => {
      adjustTextareaHeight()
    })
  }
)

onMounted(() => {
  adjustTextareaHeight()
})

defineEmits<{
  (e: 'update:modelValue', v: string): void
}>()

const validationListeners = {
  blur: (evt: Event) => handleBlur(evt, true),
  change: (e: Event) => {
    handleChange(e, false)
    adjustTextareaHeight()
  },
  input: (evt: Event) => {
    handleChange(evt, !!errorMessage.value)
    adjustTextareaHeight()
  }
}
</script>

<template>
  <div class="textarea-container">
    <label v-if="label" :for="name"
      >{{ label }}
      <div v-if="maxlength && value">{{ value.length }}/{{ maxlength }}</div>
    </label>
    <div class="textarea-main" :class="{ 'has-error': !!errorMessage }">
      <textarea
        ref="textareaRef"
        v-model="value"
        :id="name"
        :name="name"
        :placeholder="placeholder"
        :maxlength="maxlength"
        v-on="validationListeners"
      ></textarea>
    </div>

    <p class="help-message" v-show="errorMessage">
      {{ errorMessage }}
    </p>
  </div>
</template>

<style scoped>
.textarea-container {
  width: 100%;
}

.textarea-container label {
  display: inline-flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  margin-bottom: 6px;
  width: 100%;
  font-size: 13px;
  color: var(--text-color-primary);
}
.textarea-main {
  width: 100%;
  position: relative;
  flex: 1 1 0%;
}

.textarea-main textarea {
  width: 100%;
  height: auto;
  max-height: 150px;
  padding: 12px;
  scroll-padding: 12px;
  overflow: hidden;
  border-radius: 10px;
  border: 0.1rem solid var(--border-color-primary);
  outline: none;
  background-color: transparent;
  color: var(--text-color-primary);
  font-size: 14px;
  font-family: inherit;
  resize: none;
  -webkit-border-radius: 10px;
  appearance: none;
  -webkit-appearance: none;
}

.textarea-main textarea[style*='height: 150px'] {
  overflow-y: auto;
}

.textarea-main textarea:focus {
  background-color: var(--background-color-primary);
  border: 0.1rem solid var(--text-color-primary);
  box-shadow: 0 0 0 0.2rem rgba(155, 151, 255, 0.25);
  outline: none;
}

.textarea-main.has-error textarea {
  border-color: var(--error-color);
}

.textarea-main.has-error textarea:focus {
  box-shadow: 0 0 0 0.2rem rgba(255, 0, 0, 0.192);
}

::placeholder {
  color: var(--text-color-secondary);
  opacity: 1;
}

:-ms-textarea-placeholder {
  color: var(--text-color-secondary);
}

::-ms-textarea-placeholder {
  color: var(--text-color-secondary);
}

.help-message {
  font-size: 13px;
  color: var(--error-color);
}
</style>
