<template>
  <div id="app">
    <TheNavbar />
    <main>
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <TheFooter />
    <BackToTop />
  </div>
</template>

<script>
import TheNavbar from '@/components/TheNavbar.vue'
import TheFooter from '@/components/TheFooter.vue'
import BackToTop from '@/components/BackToTop.vue'

export default {
  name: 'App',
  components: {
    TheNavbar,
    TheFooter,
    BackToTop
  }
}
</script>

<style>
/* 页面切换过渡动画 */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
