import { object, string, number } from 'yup'

export const movieRule = object().shape({
  title: string().required('Título é obrigatório'),
  coverUrl: string()
    .required('Link da capa é obrigatório')
    .matches(
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
      { message: 'Link da capa inválido' }
    ),
  trailerUrl: string()
    .required('Link do trailer é obrigatório')
    .matches(
      /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/,
      { message: 'Link do trailer inválido' }
    ),
  director: string().required('Diretor é obrigatório'),
  year: number()
    .required('Ano é obrigatório')
    .min(1900, 'Informe um ano válido')
    .max(new Date().getFullYear(), `Informe um ano válido`),
  genre: string().required('Gênero é obrigatório'),
  description: string().required('Descrição é obrigatório')
})
