<template>
  <section class="subpage-banner">
    <div class="subpage-banner-overlay"></div>
    <div class="subpage-decoration" aria-hidden="true">
      <div class="deco-ring deco-ring-1"></div>
      <div class="deco-ring deco-ring-2"></div>
      <div class="deco-ring deco-ring-3"></div>
      <div class="deco-core"></div>
      <i class="fas fa-music deco-note deco-note-1"></i>
      <i class="fas fa-music deco-note deco-note-2"></i>
      <i class="fas fa-music deco-note deco-note-3"></i>
      <i class="fas fa-music deco-note deco-note-4"></i>
      <div class="deco-wave deco-wave-1"></div>
      <div class="deco-wave deco-wave-2"></div>
      <div class="deco-wave deco-wave-3"></div>
    </div>
    <div class="container">
      <div class="subpage-banner-content">
        <h1>{{ title }}</h1>
        <div class="breadcrumb">
          <router-link to="/">首页</router-link>
          <span>/</span>
          <router-link :to="currentPath">{{ title }}</router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  computed: {
    currentPath() {
      return this.$route.path
    }
  }
}
</script>
