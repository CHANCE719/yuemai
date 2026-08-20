<template>
  <nav class="navbar" :class="{ scrolled: isScrolled }">
    <div class="container">
      <router-link to="/" class="logo">乐脉<span>工坊</span></router-link>
      <ul class="nav-links" :class="{ active: mobileMenuOpen }">
        <li><router-link to="/" exact>首页</router-link></li>
        <li><router-link to="/about">关于我们</router-link></li>
        <li><router-link to="/categories">课程介绍</router-link></li>
        <li><router-link to="/techniques">教学方法</router-link></li>
        <li><router-link to="/resources">教学保障</router-link></li>
        <li><router-link to="/achievement">成果交流</router-link></li>
        <li><router-link to="/contact">联系我们</router-link></li>
        <li><router-link to="/login" class="btn-login">登录</router-link></li>
        <li><router-link to="/register" class="btn-register">注册</router-link></li>
      </ul>
      <div class="hamburger" @click="toggleMobileMenu">
        <i :class="mobileMenuOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'TheNavbar',
  data() {
    return {
      isScrolled: false,
      mobileMenuOpen: false
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
      this.isScrolled = window.scrollY > 50
    },
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen
    },
    closeMobileMenu() {
      this.mobileMenuOpen = false
    }
  },
  watch: {
    $route() {
      this.closeMobileMenu()
    }
  }
}
</script>
