<template>
  <button
    id="back-to-top"
    :class="{ visible: isVisible }"
    title="返回顶部"
    @click="scrollToTop"
  >
    <i class="fas fa-arrow-up"></i>
  </button>
</template>

<script>
export default {
  name: 'BackToTop',
  data() {
    return {
      isVisible: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.isVisible = window.scrollY > 300
    },
    scrollToTop() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }
}
</script>
