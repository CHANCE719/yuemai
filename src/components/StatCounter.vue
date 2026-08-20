<template>
  <div class="stat-item" :class="animationClass">
    <i :class="icon"></i>
    <h3 class="count">{{ displayCount }}</h3>
    <p>{{ label }}</p>
  </div>
</template>

<script>
export default {
  name: 'StatCounter',
  props: {
    target: {
      type: Number,
      required: true
    },
    icon: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    animationClass: {
      type: String,
      default: 'slide-in-up'
    }
  },
  data() {
    return {
      currentCount: 0,
      hasAnimated: false,
      observer: null
    }
  },
  computed: {
    displayCount() {
      return Math.floor(this.currentCount)
    }
  },
  mounted() {
    this.setupIntersectionObserver()
  },
  beforeUnmount() {
    if (this.observer) {
      this.observer.disconnect()
    }
  },
  methods: {
    setupIntersectionObserver() {
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !this.hasAnimated) {
              this.hasAnimated = true
              entry.target.classList.add('active')
              this.animateCount()
            }
          })
        },
        { threshold: 0.3 }
      )
      this.observer.observe(this.$el)
    },
    animateCount() {
      const duration = 2000
      const increment = this.target / (duration / 16)
      const timer = setInterval(() => {
        this.currentCount += increment
        if (this.currentCount >= this.target) {
          this.currentCount = this.target
          clearInterval(timer)
        }
      }, 16)
    }
  }
}
</script>
