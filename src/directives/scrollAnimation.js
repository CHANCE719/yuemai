/**
 * 滚动动画指令 v-scroll-animation
 * 元素进入视口时添加 .active 类触发 CSS 过渡动画
 *
 * 用法:
 *   <div class="fade-in" v-scroll-animation>...</div>
 *   <div class="slide-in-left" v-scroll-animation>...</div>
 */
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active')
      }
    })
  },
  { threshold: 0.15 }
)

export default {
  mounted(el) {
    observer.observe(el)
  },
  unmounted(el) {
    observer.unobserve(el)
  }
}
