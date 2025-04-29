<script setup lang="ts">
import type { Movie } from '@/interfaces/Movie'

import IconClose from '@/components/icons/IconClose.vue'

import MovieForm from '@/components/forms/MovieForm.vue'
import InputRating from '@/components/inputs/InputRating.vue'
import ButtonMain from '@/components/buttons/ButtonMain.vue'
import ButtonIcon from '@/components/buttons/ButtonIcon.vue'
import ModalMain from '@/components/main/ModalMain.vue'
import NavigationMain from '@/components/main/NavigationMain.vue'
import TrailerMain from '@/components/main/TrailerMain.vue'
import DetailsMovieMain from '@/components/main/DetailsMovieMain.vue'

import { ref, onActivated } from 'vue'
import { useRouter } from 'vue-router'
import { useMovieStore } from '@/stores/movie'

import { Form } from 'vee-validate'
import { movieRule } from '@/utils/rules'
import { notify } from '@kyvg/vue3-notification'

const movieStore = useMovieStore()

const router = useRouter()
const movieId = parseInt(router.currentRoute.value.params.id as string)

const showModalDelete = ref(false)
const showModalEdit = ref(false)
const loadingProcess = ref(false)

const isUpdateMovie = ref<Movie | null>(null)
const isDeleteMovie = ref<number | null>(null)

const formEdit = ref<InstanceType<typeof Form>>()

onActivated(() => {
  movieStore.showMovie(movieId)
})

const handleSetRating = (rating: number) => {
  if (movieStore.getMovie) {
    movieStore.updateMovie(movieId, { ...movieStore.getMovie, rating })
  }
}

const handleEditMovie = () => {
  if (movieStore.getMovie) {
    isUpdateMovie.value = movieStore.getMovie
    showModalEdit.value = true
  }
}

const handleDeleteMovie = (id?: number) => {
  if (id) {
    isDeleteMovie.value = id
    showModalDelete.value = true
  } else {
    movieStore.destroyMovie(movieId)
    showModalDelete.value = false
    notify({
      title: 'Filme excluído com sucesso!',
      type: 'success'
    })
    router.push('/')
  }
}

const submitEdit = (values: Movie) => {
  movieStore.updateMovie(movieId, values)
  notify({
    title: 'Filme editado com sucesso!',
    type: 'success'
  })
  showModalEdit.value = false
}
</script>

<template>
  <NavigationMain
    title="Detalhes do filme"
    :active-options="true"
    @edit="handleEditMovie"
    @delete="handleDeleteMovie(movieId)"
  />

  <div v-if="movieStore.getMovie" class="content">
    <TrailerMain :trailer-url="movieStore.getMovie.trailerUrl" />
    <DetailsMovieMain :movie="movieStore.getMovie" />
    <div class="divider"></div>
    <InputRating :rating="movieStore.getMovie.rating" @update:rating="handleSetRating" />
  </div>

  <ModalMain :show="showModalDelete" @shadow="showModalDelete = false">
    <div class="dialog">
      <p>Tem certeza que deseja excluir o filme?</p>
      <div class="modal-button dialog">
        <ButtonMain @click="showModalDelete = false" type="secondary min" title="Cancelar" />
        <ButtonMain
          @click="handleDeleteMovie()"
          title="Excluir"
          type="danger min"
          :loading="loadingProcess"
        />
      </div>
    </div>
  </ModalMain>

  <ModalMain :show="showModalEdit" @shadow="showModalEdit = false">
    <Form
      @submit="submitEdit as any"
      ref="formEdit"
      :initial-values="isUpdateMovie || undefined"
      :validation-schema="movieRule"
      class="modal-container"
      id="form-edit-movie"
      v-slot="{ meta }"
    >
      <div class="modal-title">
        Editar filme
        <div class="modal-close">
          <ButtonIcon @click="showModalEdit = false">
            <IconClose />
          </ButtonIcon>
        </div>
      </div>

      <MovieForm />

      <div class="modal-button">
        <ButtonMain @click="showModalEdit = false" title="Cancelar" type="secondary min" />

        <ButtonMain
          form="form-edit-movie"
          title="Editar"
          :loading="loadingProcess"
          type="primary min"
          :disabled="!meta.dirty || !meta.valid"
        />
      </div>
    </Form>
  </ModalMain>
</template>

<style>
.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.divider {
  height: 1px;
  background-color: var(--border-color-primary);
  width: 100%;
  margin: 1rem 0;
}
</style>
