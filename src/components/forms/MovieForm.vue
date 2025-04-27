<script setup lang="ts">
import genreData from '@/utils/mocks/genre.json'

import InputText from '@/components/inputs/InputText.vue'
import InputSelect from '@/components/inputs/InputSelect.vue'
import InputTextarea from '@/components/inputs/InputTextarea.vue'
</script>

<template>
  <InputText name="title" type="text" label="Título" />

  <div class="divider-input">
    <InputText name="coverUrl" type="text" label="Link da capa" />
    <InputText name="trailerUrl" type="text" label="Link do trailer" />
  </div>

  <div class="divider-input">
    <InputText name="director" type="text" label="Diretor" />
    <InputText name="year" type="number" label="Ano" />
  </div>

  <InputSelect name="genre" label="Gênero" placeholder="Selecione um gênero">
    <option v-for="genre in genreData" :key="genre.value" :value="genre.value">
      {{ genre.label }}
    </option>
  </InputSelect>

  <InputTextarea name="description" label="Descrição" />
</template>
