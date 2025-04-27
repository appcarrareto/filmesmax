<script setup lang="ts">
import type { Movie } from '@/interfaces/Movie'
import type { Filter } from '@/interfaces/Filter'

import genreData from '@/utils/mocks/genre.json'

import IconFilter from '@/components/icons/IconFilter.vue'
import IconClose from '@/components/icons/IconClose.vue'
import IconMovie from '@/components/icons/IconMovie.vue'

import MovieForm from '@/components/forms/MovieForm.vue'
import InputSearch from '@/components/inputs/InputSearch.vue'
import InputSelect from '@/components/inputs/InputSelect.vue'
import ButtonFixed from '@/components/buttons/ButtonFixed.vue'
import ButtonMain from '@/components/buttons/ButtonMain.vue'
import ButtonIcon from '@/components/buttons/ButtonIcon.vue'
import MovieCardMain from '@/components/main/MovieCardMain.vue'
import ListFiltersMain from '@/components/main/ListFiltersMain.vue'
import ModalMain from '@/components/main/ModalMain.vue'

import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useMovieStore } from '@/stores/movie'

import { Form } from 'vee-validate'
import { movieRule, filterRule } from '@/utils/rules'
import { notify } from '@kyvg/vue3-notification'

const router = useRouter()

const querySearch = ref('')
const showModalDelete = ref(false)
const showModalNew = ref(false)
const showModalEdit = ref(false)
const showModalFilter = ref(false)
const loadingProcess = ref(false)
const loadingSearch = ref(false)

const isUpdateMovie = ref<Movie | null>(null)
const isDeleteMovie = ref<number | null>(null)
const listFilterMovie = ref<{ genre: string }[]>([])

const formEdit = ref<InstanceType<typeof Form>>()
const formNew = ref<InstanceType<typeof Form>>()
const formFilter = ref<InstanceType<typeof Form>>()

const movieStore = useMovieStore()
const movies = ref(movieStore.getMovies)

const onSearch = (event: string) => {
  querySearch.value = event
  movies.value = movieStore.indexMovies(
    querySearch.value,
    listFilterMovie.value.map((filter) => filter.genre)
  )
}

const onCleanSearch = () => {
  querySearch.value = ''
  movies.value = movieStore.indexMovies(
    '',
    listFilterMovie.value.map((filter) => filter.genre)
  )
}

const handleClearFilter = (genre: string) => {
  listFilterMovie.value = listFilterMovie.value.filter((item) => item.genre !== genre)
  movies.value = movieStore.indexMovies(
    querySearch.value,
    listFilterMovie.value.map((filter) => filter.genre)
  )
}

const handleMovieOpen = (id: number) => {
  router.push(`/details/${id}`)
}

const handleMovieOptions = (event: Event, index: number) => {
  event.stopPropagation()
  movies.value.forEach((item, i) => {
    item.showOptions = i === index ? !item.showOptions : false
  })
}

const handleCloseOption = (index: number) => {
  if (index >= 0 && index < movies.value.length) {
    movies.value[index].showOptions = false
  }
}

const handleNewMovie = () => {
  showModalNew.value = true
}

const handleEditMovie = (id: number) => {
  isUpdateMovie.value = movies.value.find((movie) => movie.id === id) || null
  showModalEdit.value = true
}

const handleDeleteMovie = (id?: number) => {
  if (id) {
    isDeleteMovie.value = id
    showModalDelete.value = true
  } else {
    if (isDeleteMovie.value) {
      movieStore.destroyMovie(isDeleteMovie.value)
      showModalDelete.value = false
      notify({
        title: 'Filme excluído com sucesso!',
        type: 'success'
      })
    }
  }
}

const submitFilter = (values: Filter) => {
  const genreExist = listFilterMovie.value.some((item) => item.genre === values.genre)

  if (!genreExist) {
    listFilterMovie.value = [...listFilterMovie.value, { genre: values.genre }]
    movies.value = movieStore.indexMovies(
      querySearch.value,
      listFilterMovie.value.map((filter) => filter.genre)
    )
  }

  showModalFilter.value = false
}

const submitCreate = (values: Movie, { resetForm }: { resetForm: () => void }) => {
  values.id = Math.floor(Math.random() * 1000000)
  values.showOptions = false
  values.rating = 0

  movieStore.createMovie(values)

  notify({
    title: 'Filme adicionado com sucesso!',
    type: 'success'
  })
  showModalNew.value = false

  resetForm()
}

const submitEdit = (values: Movie) => {
  if (isUpdateMovie.value) {
    movieStore.updateMovie(isUpdateMovie.value.id, values)
  }
  notify({
    title: 'Filme editado com sucesso!',
    type: 'success'
  })

  showModalEdit.value = false
}
</script>

<template>
  <div class="content">
    <div class="content-title">
      <h1 class="title">Sua melhor lista de filmes!</h1>
      <ButtonFixed label="Novo filme" :fixed="true" @click="handleNewMovie" />
    </div>

    <div class="filter">
      <InputSearch
        name="search"
        :query="querySearch"
        :loading="loadingSearch"
        placeholder="Buscar no catálogo"
        @search="onSearch($event)"
        @clean="onCleanSearch"
      />
      <div @click="showModalFilter = true" class="button-filter">
        <span v-if="listFilterMovie.length > 0" class="badge"></span>
        <IconFilter />
      </div>
    </div>

    <ListFiltersMain :list-filter-movie="listFilterMovie" @clear-filter="handleClearFilter" />

    <div v-if="movies.length > 0" class="content-list">
      <MovieCardMain
        v-for="(movie, index) in movies"
        :key="movie.id"
        :movie="movie"
        :index="index"
        @movie-click="handleMovieOpen"
        @options-click="handleMovieOptions"
        @close-option="handleCloseOption"
        @edit-click="handleEditMovie"
        @delete-click="handleDeleteMovie"
      />
    </div>

    <div v-else class="empty-list">
      <div class="empty-list-icon"><IconMovie /></div>
      <div class="empty-list-title">Nenhum filme encontrado</div>
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

    <ModalMain :show="showModalFilter" @shadow="showModalFilter = false">
      <Form
        @submit="submitFilter as any"
        ref="formFilter"
        :validation-schema="filterRule"
        class="modal-container"
        id="form-filter-movie"
        v-slot="{ meta }"
      >
        <div class="modal-title">
          Filtrar filmes
          <div class="modal-close">
            <ButtonIcon @click="showModalFilter = false">
              <IconClose />
            </ButtonIcon>
          </div>
        </div>

        <InputSelect name="genre" label="Gênero" placeholder="Selecione um gênero">
          <option v-for="genre in genreData" :key="genre.value" :value="genre.value">
            {{ genre.label }}
          </option>
        </InputSelect>

        <div class="modal-button">
          <ButtonMain @click="showModalFilter = false" title="Cancelar" type="secondary min" />

          <ButtonMain
            form="form-filter-movie"
            title="Filtrar"
            :loading="loadingProcess"
            type="primary min"
            :disabled="!meta.dirty || !meta.valid"
          />
        </div>
      </Form>
    </ModalMain>

    <ModalMain :show="showModalNew" @shadow="showModalNew = false">
      <Form
        @submit="submitCreate as any"
        ref="formNew"
        :validation-schema="movieRule"
        class="modal-container"
        id="form-new-movie"
        v-slot="{ meta }"
      >
        <div class="modal-title">
          Novo filme
          <div class="modal-close">
            <ButtonIcon @click="showModalNew = false">
              <IconClose />
            </ButtonIcon>
          </div>
        </div>

        <MovieForm />

        <div class="modal-button">
          <ButtonMain @click="showModalNew = false" title="Cancelar" type="secondary min" />

          <ButtonMain
            form="form-new-movie"
            title="Adicionar"
            :loading="loadingProcess"
            type="primary min"
            :disabled="!meta.dirty || !meta.valid"
          />
        </div>
      </Form>
    </ModalMain>

    <ModalMain :show="showModalEdit" @shadow="showModalEdit = false">
      <Form
        @submit="submitEdit as any"
        ref="formEdit"
        :validation-schema="movieRule"
        :initial-values="isUpdateMovie || undefined"
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
  </div>
</template>

<style scoped>
.content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  gap: 2rem;
}

.content-title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.title {
  font-size: 31px;
  font-weight: 600;
  color: var(--text-color-primary);
}

.filter {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.5rem;
}

.button-filter {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 46px;
  cursor: pointer;
}

.button-filter:hover {
  transition: opacity 0.3s ease;
  background-color: var(--background-color-secondary);
  border-radius: 100px;
}

.button-filter svg {
  width: 20px;
  height: 20px;
  color: var(--text-color-primary);
}

.badge {
  position: absolute;
  top: 6px;
  right: 6px;
  width: 12px;
  height: 12px;
  background-color: #ff825b;
  border: 2px solid var(--background-color-primary);
  border-radius: 50%;
}

.content-list {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 1.5rem;
  padding-bottom: 1.5rem;
}

.empty-list {
  width: 100%;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  color: var(--text-color-secondary);
}

.empty-list-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
}

.empty-list-icon svg {
  width: 100%;
  height: 100%;
  color: var(--text-color-primary);
}

@media screen and (max-width: 960px) {
  .content-list {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 1rem;
  }
}
</style>
