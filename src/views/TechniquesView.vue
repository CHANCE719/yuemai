﻿﻿﻿﻿﻿<template>
  <div class="techniques">
    <PageHeader title="教学方法" />

    <!-- 分类标签 -->
    <section class="technique-categories">
      <div class="container">
        <div class="category-tabs">
          <button
            v-for="tab in tabs"
            :key="tab.value"
            class="category-tab"
            :class="{ active: activeTab === tab.value }"
            @click="activeTab = tab.value"
          >
            {{ tab.label }}
          </button>
        </div>
      </div>
    </section>

    <!-- 方法体系 -->
    <section class="techniques-section">
      <div class="container">
        <h2 class="section-title" v-scroll-animation>教学方法体系</h2>
        <p class="techniques-intro" v-scroll-animation>
          我们以数字化技术为核心,采用科学、系统的传统音乐教学方法,助力B端课堂高效教学与C端用户自主学习传统音乐
        </p>
        <div class="technique-grid">
          <div
            v-for="tech in filteredTechniques"
            :key="tech.title"
            class="technique-card"
            v-scroll-animation
            @click="openModal(tech)"
          >
            <img :src="tech.image" :alt="tech.title" />
            <div class="technique-info">
              <h3>{{ tech.title }}</h3>
              <p>{{ tech.description }}</p>
              <p>{{ tech.detail }}</p>
              <a href="#" class="btn-more" @click.prevent="openModal(tech)">
                了解更多 <i class="fas fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 详情模态框 -->
    <div class="modal" :class="{ active: showModal }" @click.self="closeModal">
      <div class="modal-content">
        <span class="close-modal" @click="closeModal">
          <i class="fas fa-times"></i>
        </span>
        <div class="modal-body" v-if="selectedTech">
          <img :src="selectedTech.image" :alt="selectedTech.title" />
          <h3>{{ selectedTech.title }}</h3>
          <p>{{ selectedTech.description }}</p>
          <p>{{ selectedTech.detail }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'
import { img } from '@/utils/base'

export default {
  name: 'TechniquesView',
  components: { PageHeader },
  data() {
    return {
      activeTab: 'all',
      showModal: false,
      selectedTech: null,
      tabs: [
        { value: 'all', label: '全部方法' },
        { value: 'instrument', label: '乐器教学' },
        { value: 'vocal', label: '声乐教学' },
        { value: 'theory', label: '理论教学' },
        { value: 'ensemble', label: '合奏训练' }
      ],
      techniques: [
        {
          category: 'instrument',
          title: 'AI辅助交互模拟练习',
          image: img('images/b1.png'),
          description: '针对传统乐器演奏学习场景,应用智能反馈系统,为使用者提供动作捕捉、音准实时纠正、节奏辅助等教学工具,学员可随时随地进行交互练习。',
          detail: '同时"乐脉工坊"后台可为学员实时生成学习报告,精准定位问题,适配中小学课堂集体练习与个人自主提升。'
        },
        {
          category: 'instrument',
          title: '虚拟乐器库音效模拟系统',
          image: img('images/b2.png'),
          description: '平台拥有庞大的传统音乐知识库和数字化虚拟乐器库,可复刻古琴、古筝、二胡等数十种传统乐器的真实音色,学员无需实体乐器即可完成演奏练习、编曲创作。',
          detail: '解决中小学乐器采购成本高、个人练习不便等痛点,实现零门槛进行传统音乐学习。'
        },
        {
          category: 'theory',
          title: 'AI智能成曲创作工具',
          image: img('images/b3.png'),
          description: '依托原创中国传统音乐曲式、调式、律制数字化素材库训练AI模型,用户可输入旋律片段、风格需求,一键生成完整传统音乐作品,同时支持自主编曲、乐器配器。',
          detail: '从而激发学生创作灵感,进而培养传统音乐创新能力,适配中小学音乐理论课堂。',
          to: '/techniques/ai-compose'
        },
        {
          category: 'ensemble',
          title: '数字化合奏训练课程',
          image: img('images/b4.png'),
          description: '打造虚拟合奏乐团系统,支持多乐器、多声部同步合奏练习,AI智能适配声部节奏、音量,解决线下合奏排练难、时间难协调等问题。',
          detail: '覆盖传统民乐合奏、戏曲伴奏等多种形式,定期举办线上合奏展演,培养学员协作能力,同时为音乐爱好者搭建社群。'
        },
        {
          category: 'vocal',
          title: '线上沉浸式直播教学',
          image: img('images/b5.png'),
          description: '线上数智平台突破地域限制,邀请非遗传承人、专业演奏家开展线上直播课,搭配高清画面、无损音质、实时连麦指导,还原线下教学体验。',
          detail: '配套数字化课件、课后AI练习系统,确保教学质量,服务全国中小学与个人爱好者。'
        },
        {
          category: 'ensemble',
          title: '数字化录音实践课程',
          image: img('images/b6.png'),
          description: '提供专业数字化录音棚环境与AI后期降噪处理工具,学员可完成演唱录音,并由AI智能优化音色、节奏,生成专属个人作品。',
          detail: '配套录音技巧、传统音乐混音教学,让学员掌握传统音乐数字化制作技能,记录学习成长。'
        }
      ]
    }
  },
  computed: {
    filteredTechniques() {
      if (this.activeTab === 'all') {
        return this.techniques
      }
      return this.techniques.filter((t) => t.category === this.activeTab)
    }
  },
  methods: {
    img,
    openModal(tech) {
      if (tech.to) {
        this.$router.push(tech.to)
        return
      }
      this.selectedTech = tech
      this.showModal = true
      document.body.style.overflow = 'hidden'
    },
    closeModal() {
      this.showModal = false
      document.body.style.overflow = ''
    }
  }
}
</script>

<style scoped>
.technique-categories {
  padding: 30px 0;
}

.category-tabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  border-bottom: 1px solid var(--surface-border, #eee);
  padding-bottom: 15px;
}

.category-tab {
  padding: 10px 25px;
  background: none;
  border: none;
  font-size: 1.05rem;
  font-weight: 500;
  color: var(--gray-color);
  cursor: pointer;
  position: relative;
  transition: var(--transition);
  border-radius: 4px;
}

.category-tab:hover,
.category-tab.active {
  color: var(--secondary-color);
  background-color: rgba(34, 211, 238, 0.1);
}

.techniques-section {
  padding: 60px 0 80px;
}

.techniques-intro {
  text-align: center;
  margin-bottom: 30px;
  color: var(--gray-color);
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.technique-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.technique-card {
  background-color: var(--white-color);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--box-shadow);
  transition: var(--transition);
  cursor: pointer;
}

.technique-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.technique-card img {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.technique-info {
  padding: 25px;
}

.technique-info h3 {
  font-size: 1.4rem;
  margin-bottom: 15px;
  color: var(--secondary-color);
}

.technique-info p {
  color: var(--gray-color);
  margin-bottom: 10px;
  line-height: 1.7;
}

/* 模态框 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 2000;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal.active {
  display: flex;
}

.modal-content {
  background-color: var(--white-color);
  border-radius: 8px;
  max-width: 700px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: modalFadeIn 0.3s ease;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.close-modal {
  position: absolute;
  top: 15px;
  right: 20px;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--gray-color);
  z-index: 1;
}

.close-modal:hover {
  color: var(--primary-color);
}

.modal-body img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
}

.modal-body h3 {
  font-size: 1.6rem;
  margin: 20px 25px 15px;
  color: var(--secondary-color);
}

.modal-body p {
  margin: 0 25px 15px;
  color: var(--gray-color);
  line-height: 1.8;
}

@media (max-width: 768px) {
  .technique-grid {
    grid-template-columns: 1fr;
  }
}
</style>
