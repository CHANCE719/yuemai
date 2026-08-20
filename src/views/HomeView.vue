<template>
  <div class="home">
    <!-- 英雄区域 -->
    <header class="hero">
      <div class="hero-content">
        <h1 class="logo"><span class="yuemai">乐脉</span><span class="gongfang">工坊</span></h1>
        <h2>以乐为脉 以智为光</h2>
        <p>以科技为脉,传千年乐韵,将数智融入中华传统音乐传承与美育推广,让传统音乐在现代创作中焕发新生。</p>
        <router-link to="/categories" class="btn-explore">探索课程</router-link>
      </div>
      <div class="hero-decoration" aria-hidden="true">
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
      <div class="hero-overlay"></div>
    </header>

    <!-- 特色课程 -->
    <section class="featured-section" id="courses">
      <div class="container">
        <h2 class="section-title fade-in" v-scroll-animation>特色音乐课程</h2>
        <div class="featured-grid">
          <div
            v-for="(course, index) in featuredCourses"
            :key="course.title"
            class="featured-item"
            :class="course.animation"
            v-scroll-animation
            :style="{ transitionDelay: index * 0.1 + 's' }"
          >
            <img :src="course.image" :alt="course.title" />
            <div class="featured-info">
              <h3>{{ course.title }}</h3>
              <p>{{ course.description }}</p>
              <p style="font-size: 0.9rem; color: var(--gray-color); margin-top: 10px;">
                {{ course.features }}
              </p>
              <a href="#" class="btn-more">了解更多 <i class="fas fa-arrow-right"></i></a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 统计区域 -->
    <section class="stats-section">
      <div class="container">
        <div class="stats-grid">
          <StatCounter
            v-for="stat in stats"
            :key="stat.label"
            :target="stat.target"
            :icon="stat.icon"
            :label="stat.label"
            :animation-class="stat.animation"
          />
        </div>
      </div>
    </section>

    <!-- 音乐活动与演出 -->
    <section class="news-section">
      <div class="container">
        <h2 class="section-title fade-in" v-scroll-animation>音乐活动与演出</h2>
        <div class="news-grid">
          <div
            v-for="(item, index) in newsItems"
            :key="item.title"
            class="news-item"
            :class="item.animation"
            v-scroll-animation
            :style="{ transitionDelay: index * 0.1 + 's' }"
          >
            <img :src="item.image" :alt="item.title" />
            <div class="news-info">
              <span class="news-date">{{ item.date }}</span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
              <a href="#" class="btn-more">阅读更多 <i class="fas fa-arrow-right"></i></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import StatCounter from '@/components/StatCounter.vue'
import { img } from '@/utils/base'

export default {
  name: 'HomeView',
  components: { StatCounter },
  methods: { img },
  data() {
    return {
      featuredCourses: [
        {
          title: '传统乐器',
          image: img('images/dixiao.png'),
          description: '跟随非遗传承人示范视频逐句学习经典曲目,AI指法分析系统实时纠错,从指法到韵味层层深入。',
          features: '非遗传承人亲授｜AI指法识别｜曲目文化背景详解',
          animation: 'slide-in-left'
        },
        {
          title: '非遗声乐',
          image: img('images/kunquchangqiang.jpg'),
          description: '以典籍乐谱原声为教材,逐字学习咬字与独特润腔,AI气息与音准辅助工具帮助掌握原生唱法。',
          features: '典籍译谱｜逐字教唱｜AI实时音准反馈',
          animation: 'fade-in'
        },
        {
          title: '乐理根基',
          image: img('images/f10.jpg'),
          description: '古谱数字化对照一目了然,知识图谱可视化讲解梳理脉络,互动式识谱闯关巩固记忆。',
          features: '古谱数字对照｜知识图谱可视化｜互动识谱闯关',
          animation: 'slide-in-right'
        }
      ],
      stats: [
        { target: 5000, icon: 'fas fa-users', label: '中小学师生与音乐爱好者客群', animation: 'slide-in-up' },
        { target: 50, icon: 'fas fa-user-tie', label: '传统音乐专业与非遗传承人师资', animation: 'slide-in-up' },
        { target: 30, icon: 'fas fa-book', label: '传统音乐数字化课程', animation: 'slide-in-up' },
        { target: 500, icon: 'fas fa-music', label: '曲谱素材库', animation: 'slide-in-up' }
      ],
      newsItems: [
        {
          title: '校园传统音乐会',
          image: img('images/yinyuehui1.jpeg'),
          date: '定期举办',
          description: '定期组织中小学传统音乐课堂成果展演,为学生提供展示舞台,推动数字化传统音乐进校园,助力青少年美育建设。',
          animation: 'slide-in-left'
        },
        {
          title: '非遗传承人线上大师讲座',
          image: img('images/jiangzuo.webp'),
          date: '定期直播',
          description: '邀请国家级非遗音乐传承人开设线上直播课,结合"乐脉工坊"数智录播回放,让全国师生与音乐爱好者轻松接触优质传统音乐资源。',
          animation: 'fade-in'
        },
        {
          title: '传统音乐AI创作大赛',
          image: img('images/aizhuangzuo.jpg'),
          date: '年度赛事',
          description: '面向青少年与音乐爱好者,依托平台AI成曲、虚拟乐器等工具,举办传统音乐数字化创作大赛,激发传统音乐创新活力。',
          animation: 'slide-in-right'
        }
      ]
    }
  }
}
</script>
