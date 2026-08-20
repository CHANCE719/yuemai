<template>
  <div class="about">
    <PageHeader title="关于我们" />

    <!-- 公司简介 -->
    <section class="about-section">
      <div class="container">
        <div class="about-content">
          <div class="about-text fade-in" v-scroll-animation>
            <h2>乐脉工坊简介</h2>
            <p>乐脉工坊成立于2025年,是专注于音乐教育的大学生创业平台。其与构建国家文化大数据体系、培育新型文化业态的核心任务高度契合,以"科技赋能教育、数字激活经典"为核心,致力于为各个年龄段的音乐爱好者提供高质量的音乐教育服务,帮助客户发掘音乐潜能,实现音乐梦想。</p>
            <p>我们拥有数智全过程化的教学体系。聚焦中华传统音乐传承断层与城乡美育资源不均的现状,通过人工智能、大数据等技术构建全链条传承体系,推动传统音乐的标准化、数字化保存与传播。无论是传统乐器或是非遗声乐,平台都能提供专业的指导。</p>
            <p>我们相信,每个人都可以在这里找寻到血脉中的音乐梦想。</p>
          </div>
          <div class="about-image slide-in-right" v-scroll-animation>
            <img src="/images/about-intro.png" alt="乐脉工坊" />
          </div>
        </div>

        <div class="about-content reverse">
          <div class="about-image slide-in-left" v-scroll-animation>
            <img src="/images/about-teaching.png" alt="教学理念" />
          </div>
          <div class="about-text fade-in" v-scroll-animation>
            <h2>我们的教学理念</h2>
            <p>我们坚信,音乐教育不仅仅是技能的传授,更是艺术素养的培养和人格的塑造。我们的教学理念包括:</p>
            <ul class="philosophy-list">
              <li><strong>普惠美育</strong>:通过线上平台将系统化传统音乐课程输送至任何网络可达的地区,让城乡学生同起点学习传统音乐。</li>
              <li><strong>活态传承</strong>:通过AI技术对工尺谱、减字谱进行数字化采集与整理,实现传统音乐的永久保存与持续活化。</li>
              <li><strong>科技赋能</strong>:依托AI智能成曲、交互模拟练习、智能曲谱解析等数字化工具,降低学习与创作门槛。</li>
              <li><strong>兴趣导向</strong>:根据每位学员的特点和需求,制定个性化的学习计划,以培养学员的音乐兴趣为核心,确保教学效果最大化。</li>
              <li><strong>全面发展</strong>:注重音乐理论、演奏技巧、音乐欣赏等多方面的培养,通过丰富的演出机会和实践活动,让学员在舞台上成长,建立自信心。</li>
              <li><strong>文化出海</strong>:通过独立站向全球创作者提供传统音乐素材授权与AI工具服务,向世界呈现中华音乐魅力。</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- 发展历程 -->
    <section class="timeline-section">
      <div class="container">
        <h2 class="section-title" v-scroll-animation>发展历程</h2>
        <div class="timeline">
          <div
            v-for="(item, index) in timeline"
            :key="item.date"
            class="timeline-item"
            :class="index % 2 === 0 ? 'left' : 'right'"
            v-scroll-animation
          >
            <div class="timeline-content">
              <div class="timeline-date">{{ item.date }}</div>
              <h3 class="timeline-title">{{ item.title }}</h3>
              <p>{{ item.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 核心优势 -->
    <section class="features-section">
      <div class="container">
        <h2 class="section-title" v-scroll-animation>我们的优势</h2>
        <div class="features-grid">
          <div
            v-for="(feature, index) in features"
            :key="feature.title"
            class="feature-card"
            v-scroll-animation
            :style="{ transitionDelay: index * 0.1 + 's' }"
          >
            <div class="feature-icon">
              <i :class="feature.icon"></i>
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'

export default {
  name: 'AboutView',
  components: { PageHeader },
  data() {
    return {
      timeline: [
        {
          date: '2025.9',
          title: '团队建立',
          description: '组建跨学科团队,联动省级音乐名师,确立"科技赋能传统音乐传承"核心方向。'
        },
        {
          date: '2025.11',
          title: '企业合作',
          description: '与中软国际信息技术有限公司、双字节科技有限公司形成战略合作,启动数字化素材库及线上课程体系建设。'
        },
        {
          date: '2026.3',
          title: '平台建立',
          description: '建成"乐脉工坊"线上音乐教育云平台,以数智赋能推动传统音乐传承与推广。'
        }
      ],
      features: [
        { icon: 'fas fa-user-graduate', title: '专业师资', description: '所有教师均毕业于知名音乐院校,拥有丰富教学经验和专业演奏背景。获辽宁省音乐学科带头人、特级教师李廷海老师及中软国际技术团队全程支持。' },
        { icon: 'fas fa-robot', title: 'AI数字赋能', description: '支持智能曲谱解析、AI智能成曲、传统乐器音色复刻、交互模拟练习,极大降低学习与创作门槛。' },
        { icon: 'fas fa-book', title: '完整课程体系', description: '涵盖从音乐基础到美育素养提升五大模块,可按入门、进阶、创作、师资四级智能推荐。' },
        { icon: 'fas fa-laptop', title: '便捷线上学习', description: '国内外线上平台提供音乐课程与AI工具,可随时随地享受优质音乐教育。' },
        { icon: 'fas fa-database', title: '海量素材库', description: '拥有经过标准化采集与分类整理的传统音乐素材库与知识库,方便随时检索、下载和使用。' },
        { icon: 'fas fa-copyright', title: 'IP衍生体验', description: '通过数字人"小乐"及周边产品,在课程学习之外享受传统音乐文化的趣味与创意体验。' }
      ]
    }
  }
}
</script>

<style scoped>
.about-section {
  padding: 80px 0;
}

.about-content {
  display: flex;
  align-items: center;
  gap: 50px;
  margin-bottom: 60px;
}

.about-content.reverse {
  flex-direction: row-reverse;
}

.about-text {
  flex: 1;
}

.about-text h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: var(--secondary-color);
}

.about-text p {
  margin-bottom: 15px;
  line-height: 1.8;
}

.philosophy-list {
  list-style-type: disc;
  padding-left: 20px;
  margin-bottom: 15px;
}

.philosophy-list li {
  margin-bottom: 10px;
  line-height: 1.8;
}

.about-image {
  flex: 1;
}

.about-image img {
  width: 100%;
  border-radius: 8px;
  box-shadow: var(--box-shadow);
}

/* 时间轴 */
.timeline-section {
  padding: 80px 0;
  background-color: rgba(248, 249, 250, 0.5);
}

.timeline {
  position: relative;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px 0;
}

.timeline::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 3px;
  background: linear-gradient(to bottom, var(--primary-color), var(--secondary-color));
  transform: translateX(-50%);
}

.timeline-item {
  position: relative;
  width: 50%;
  padding: 20px 40px;
  box-sizing: border-box;
}

.timeline-item.left {
  left: 0;
  text-align: right;
}

.timeline-item.right {
  left: 50%;
}

.timeline-content {
  background-color: var(--white-color);
  padding: 25px;
  border-radius: 8px;
  box-shadow: var(--box-shadow);
  position: relative;
  transition: var(--transition);
}

.timeline-content:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.timeline-item.left .timeline-content::after {
  content: '';
  position: absolute;
  right: -10px;
  top: 25px;
  width: 20px;
  height: 20px;
  background-color: var(--primary-color);
  border-radius: 50%;
  border: 4px solid var(--white-color);
}

.timeline-item.right .timeline-content::after {
  content: '';
  position: absolute;
  left: -10px;
  top: 25px;
  width: 20px;
  height: 20px;
  background-color: var(--primary-color);
  border-radius: 50%;
  border: 4px solid var(--white-color);
}

.timeline-date {
  font-size: 1rem;
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: 8px;
}

.timeline-title {
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: var(--secondary-color);
}

/* 优势区域 */
.features-section {
  padding: 80px 0;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.feature-card {
  background-color: var(--white-color);
  padding: 30px;
  border-radius: 8px;
  box-shadow: var(--box-shadow);
  text-align: center;
  transition: var(--transition);
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  width: 70px;
  height: 70px;
  margin: 0 auto 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: 50%;
}

.feature-icon i {
  font-size: 1.8rem;
  color: var(--white-color);
}

.feature-card h3 {
  font-size: 1.3rem;
  margin-bottom: 15px;
  color: var(--secondary-color);
}

.feature-card p {
  color: var(--gray-color);
  line-height: 1.6;
}

@media (max-width: 768px) {
  .about-content,
  .about-content.reverse {
    flex-direction: column;
  }

  .timeline::before {
    left: 20px;
  }

  .timeline-item {
    width: 100%;
    left: 0 !important;
    text-align: left;
    padding-left: 50px;
    padding-right: 20px;
  }

  .timeline-item.left .timeline-content::after,
  .timeline-item.right .timeline-content::after {
    left: 10px;
    right: auto;
  }
}
</style>
