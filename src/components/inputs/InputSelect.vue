<script setup lang="ts">
import { useField } from 'vee-validate'
import { useId } from 'vue'
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
  }
})

const id = useId()

defineEmits<{
  (e: 'update:modelValue', v: string): void
}>()

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
  <div class="select-container">
    <label v-if="label" :for="id">{{ label }}</label>
    <div class="select-input">
      <select
        :name="name"
        :value="value"
        :id="id"
        :placeholder="placeholder"
        v-on="validationListeners"
        required
        class="select-text"
        :class="{ 'has-error': !!errorMessage }"
      >
        <option value="" disabled>{{ placeholder }}</option>
        <slot></slot>
      </select>
    </div>

    <p class="help-message" v-show="errorMessage">
      {{ errorMessage }}
    </p>
  </div>
</template>

<style scoped>
.select-container {
  width: 100%;
  display: block;
}
.select-container label {
  display: inline-flex;
  margin-bottom: 6px;
  font-size: 13px;
}
.select-input {
  position: relative;
  height: 46px;
}

.select-input:after {
  position: absolute;
  top: 40%;
  right: 14px;
  width: 0;
  height: 0;
  padding: 0;
  content: '';
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid var(--text-color-primary);
  opacity: 0.2;
  pointer-events: none;
}

.select-text {
  width: 100%;
  height: 44px;
  position: relative;
  font-family: inherit;
  outline: none;
  border-radius: 10px;
  border: 0.1rem solid var(--border-color-primary);
  background-color: transparent;
  padding-left: 14px;
  padding-right: 14px;
  appearance: none;
  font-size: 14px;
}

.select-text {
  appearance: none;
  -webkit-appearance: none;
  color: var(--text-color-primary);
}
.select-text:invalid {
  color: var(--text-color-secondary);
}

.select-text:valid {
  color: var(--text-color-primary);
}

.select-text.has-error {
  border-color: var(--danger-color);
}

.select-text:focus {
  background-color: var(--background-color-primary);
  border: 0.1rem solid var(--text-color-primary);
  box-shadow: 0 0 0 0.2rem rgba(155, 151, 255, 0.25);
}

.select-text.has-error:focus {
  border-color: var(--danger-color);
}

.select-text.has-error input:focus {
  box-shadow: 0 0 0 0.2rem rgba(255, 0, 0, 0.192);
}
.help-message {
  margin-top: 5px;
  font-size: 13px;
  color: var(--danger-color);
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
