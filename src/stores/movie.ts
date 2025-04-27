import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

import type { Movie } from '@/interfaces/Movie'

import moviesData from '@/utils/mocks/movies.json'

const movie = ref<Movie>()
const movies = ref<Movie[]>(moviesData.movies)

export const useMovieStore = defineStore('movie', () => {
  const getMovies = computed(() => movies.value)
  const getMovie = computed(() => movie.value)

  const showMovie = (id: number) => {
    movie.value = movies.value.find((movie) => movie.id === id)
  }

  const indexMovies = (query: string, genre: string[]) => {
    if (!query && genre.length === 0) {
      movies.value = moviesData.movies
      return movies.value
    }

    movies.value = moviesData.movies.filter((movie) => {
      const matchTitle = movie.title.toLowerCase().includes(query.toLowerCase())
      const matchgenre = genre.length === 0 || genre.includes(movie.genre)

      return matchTitle && matchgenre
    })

    return movies.value
  }

  const createMovie = (payload: Movie) => {
    movies.value.unshift(payload)
  }

  const updateMovie = (id: number, payload: Movie) => {
    const index = movies.value.findIndex((movie) => movie.id === id)
    if (index !== -1) {
      movies.value[index] = payload
      movie.value = payload
    }
  }

  const destroyMovie = (id: number) => {
    const index = movies.value.findIndex((movie) => movie.id === id)
    if (index !== -1) {
      movies.value.splice(index, 1)
    }
  }

  return {
    movies,
    getMovies,
    getMovie,
    showMovie,
    indexMovies,
    updateMovie,
    createMovie,
    destroyMovie
  }
})
