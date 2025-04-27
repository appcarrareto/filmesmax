import { object, string } from 'yup'

export const filterRule = object().shape({
  genre: string().required('Selecione um gênero')
})
