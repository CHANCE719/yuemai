<template>
  <section class="subpage-banner">
    <div class="subpage-banner-overlay"></div>
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
