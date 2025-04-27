<script setup lang="ts">
import { defineAsyncComponent, useId } from 'vue'
import { useField } from 'vee-validate'

const props = defineProps({
  type: {
    type: String,
    default: 'text'
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
  icon: {
    type: String,
    required: false
  },
  maxlength: {
    type: String,
    default: undefined
  }
})

const id = useId()

defineEmits<{
  (e: 'update:modelValue', v: string): void
}>()

const Icon = defineAsyncComponent({
  loader: () => import(`../icons/${props.icon}.vue`)
})

const { errorMessage, value, handleChange, handleBlur } = useField<string>(
  () => props.name,
  undefined,
  {
    syncVModel: true,
    validateOnValueUpdate: false
  }
)

const validationListeners = {
  blur: (evt: Event) => handleBlur(evt, true),
  change: (evt: Event) => handleBlur(evt, false),
  input: (evt: Event) => handleChange(evt, !!errorMessage.value)
}
</script>

<template>
  <div class="input-container">
    <label v-if="label" :for="id"
      >{{ label }}
      <div v-if="maxlength && value">{{ value.length }}/{{ maxlength }}</div>
    </label>
    <div class="input-main" :class="{ 'has-error': !!errorMessage }">
      <Icon v-if="icon" />
      <input
        :id="id"
        :name="name"
        :value="value"
        v-model="value"
        :type="type"
        :placeholder="placeholder"
        v-on="validationListeners"
        :class="{ space: icon }"
        :maxlength="maxlength"
      />
    </div>
    <p class="help-message" v-show="errorMessage">
      {{ errorMessage }}
    </p>
  </div>
</template>

<style scoped>
.input-container {
  width: 100%;
}

.input-container label {
  display: inline-flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  margin-bottom: 6px;
  width: 100%;
  font-size: 13px;
  font-weight: 400;
  color: var(--text-color-primary);
}

.input-main {
  position: relative;
  flex: 1 1 0%;
}

.input-main svg {
  width: 16px;
  position: absolute;
  left: 10px;
  top: 50%;
  stroke-width: 1.5;
  transform: translateY(-50%);
  color: var(--text-color-primary);
  opacity: 0.5;
}

.input-main input {
  width: 100%;
  height: 44px;
  border-radius: 10px;
  padding-left: 12px;
  padding-right: 12px;
  border: 0.1rem solid var(--border-color-primary);
  outline: none;
  background-color: transparent;
  color: var(--text-color-primary);
  font-size: 14px;
  appearance: none;
  -webkit-appearance: none;
}

.input-main input:focus {
  background-color: transparent;
  border: 0.1rem solid var(--text-color-primary);
  box-shadow: 0 0 0 0.2rem rgba(155, 151, 255, 0.25);
  color: var(--text-color-primary);
  outline: none;
}

.input-main.is-percentage input {
  padding-right: 30px;
}

.input-main.has-error input {
  border-color: var(--danger-color);
}

.input-main:focus.has-error input {
  border-color: var(--danger-color);
}

.input-main.has-error input:focus {
  box-shadow: 0 0 0 0.2rem rgba(255, 0, 0, 0.192);
}

::placeholder {
  color: var(--text-color-secondary);
  opacity: 1;
}

:-ms-input-placeholder {
  color: var(--text-color-secondary);
}

::-ms-input-placeholder {
  color: var(--text-color-secondary);
}

.help-message {
  margin-top: 5px;
  font-size: 13px;
  color: var(--danger-color);
}

.space {
  padding-left: 30px !important;
}
</style>
