<template>
  <footer class="footer">
    <p>&copy; {{ new Date().getFullYear() }} FilmesMax. Todos os direitos reservados.</p>
  </footer>
</template>

<style scoped>
.footer {
  width: 100%;
  text-align: start;
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
  border-top: 1px solid var(--border-color-primary);
  margin-left: auto;
  margin-right: auto;
}

.footer p {
  color: var(--text-color-secondary);
  font-size: 0.85rem;
}
</style>
