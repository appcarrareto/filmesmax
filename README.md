# Projeto de Teste - Gerenciador de Filmes 🎬

[![NPM](https://img.shields.io/npm/v/npm.svg)](https://www.npmjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Este projeto foi desenvolvido como parte de um teste técnico para uma empresa.  
Trata-se de uma aplicação para cadastro, edição, avaliação e listagem de filmes, utilizando Vue.js e TypeScript.  
Busquei aplicar boas práticas de desenvolvimento, componentização, gestão de estado moderna e validação de formulários.

---

## 🚀 Tecnologias e Ferramentas Utilizadas

- **Editor:** Visual Studio Code (VSCode)
- **Linguagem:** TypeScript e Vue.js
- **Bibliotecas:**
  - **Pinia** (Gerenciamento de estado)
  - **vee-validate** e **YUP** (Validação de formulários)
  - **vue3-notification** (Toast de notificações)

---

## ⚙️ Decisões Técnicas

1. **Gerenciamento de Estado:**  
   Utilizei o **Pinia** em vez do **Vuex**, pois atualmente o Pinia é o padrão oficial recomendado para gerenciamento de estado no Vue.

2. **Interface:**  
   Como não foi fornecido design ou protótipo, criei a interface no **Figma** para ter uma visão das telas e componentes antes de iniciar o desenvolvimento.

3. **Estado Global dos Filmes:**  
   Mantive o estado dos filmes de forma global para refletir alterações em todas as telas da aplicação.

4. **Modal para Formulários:**  
   Optei por utilizar modais para criação e edição de filmes, deixando a experiência do usuário mais dinâmica e evitando telas vazias com poucos elementos.

5. **Busca e Filtros Dinâmicos:**  
   Implementei busca em tempo real pelo título dos filmes, além de permitir a aplicação de múltiplos filtros simultaneamente para refinar os resultados.

6. **CSS Puro:**  
   Não utilizei frameworks como Tailwind CSS. Preferi escrever o **CSS puro**, demonstrando habilidades manuais e tornando os componentes mais independentes.

7. **Trailer via YouTube:**  
   Desenvolvi uma função que permite adicionar qualquer URL do YouTube para exibir o trailer corretamente no player embutido.

8. **Avaliação de Filmes:**  
   Na tela de detalhes do filme, criei um componente de avaliação para que o usuário possa atribuir uma nota de forma prática, refletindo a avaliação em toda a aplicação.

9. **Formulários com Validação:**  
   Desenvolvi componentes próprios de formulário integrados com **vee-validate** e **YUP**, facilitando a validação de dados e futuras manutenções.

10. **Tipagem com TypeScript:**  
    Utilizei **TypeScript** em toda a aplicação, garantindo segurança, facilidade de manutenção e escalabilidade do código.

11. **Origem dos dados:**  
    Para simular os dados na aplicação, utilizei arquivos .JSON como mock. No entanto, toda a estrutura foi projetada com a flexibilidade necessária para ser facilmente integrada a uma API real no futuro, garantindo escalabilidade e consistência no fluxo de dados.

---

## 🛠️ Instalação e Execução

Clone o repositório:

```bash
git clone https://github.com/appcarrareto/filmesmax.git
```

Instale as dependências:

```bash
npm install
```

Execute o projeto em modo de desenvolvimento:

```bash
npm run dev
```

Gere o build para produção:

```bash
npm run build
```

## 👨‍💻 Autor

Desenvolvido por Jeferson Carrareto.
