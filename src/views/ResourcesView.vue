<template>
  <div class="resources">
    <PageHeader title="教学保障" />

    <!-- 保障措施 -->
    <section class="protection-section">
      <div class="container">
        <div class="protection-intro" v-scroll-animation>
          <p>乐脉工坊建立了完善的教学保障体系,从师资力量、教学设施、课程体系到学员服务,全方位确保教学质量,让每一位学员都能获得优质的音乐教育体验。</p>
        </div>

        <h2 class="section-title" v-scroll-animation>教学保障措施</h2>
        <div class="protection-grid">
          <div
            v-for="item in protections"
            :key="item.title"
            class="protection-card"
            v-scroll-animation
          >
            <img :src="item.image" :alt="item.title" />
            <div class="protection-info">
              <h3>{{ item.title }}</h3>
              <p>{{ item.description }}</p>
              <a href="#" class="btn btn-primary">了解更多</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 学员成就 -->
    <section class="success-section">
      <div class="container">
        <h2 class="section-title" v-scroll-animation>学员成就展示</h2>
        <div class="success-grid">
          <div
            v-for="item in achievements"
            :key="item.title"
            class="success-item"
            v-scroll-animation
          >
            <img :src="item.image" :alt="item.title" />
            <div class="success-content">
              <h3>{{ item.title }}</h3>
              <p class="success-date">{{ item.date }}</p>
              <p>{{ item.description }}</p>
              <a href="#" class="btn btn-primary">查看详情</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 加入我们 -->
    <section class="getinvolved-section">
      <div class="container">
        <div class="getinvolved-content" v-scroll-animation>
          <h2 class="section-title">加入我们</h2>
          <p>乐脉工坊欢迎所有热爱音乐的朋友加入。无论您是零基础入门还是希望提升技艺,我们都能为您提供专业的指导和优质的服务。</p>
          <div class="action-buttons">
            <router-link to="/contact" class="btn btn-primary">预约试听</router-link>
            <router-link to="/categories" class="btn btn-outline">了解课程</router-link>
            <router-link to="/about" class="btn btn-outline">关于我们</router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'

export default {
  name: 'ResourcesView',
  components: { PageHeader },
  data() {
    return {
      protections: [
        {
          title: '专业师资保障',
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20music%20teachers%20team%20portrait%20experienced%20instructors%20in%20modern%20music%20school&image_size=landscape_16_9',
          description: '所有教师均毕业于国内外知名音乐院校,拥有丰富的教学经验和舞台表演经历。定期组织教师培训和教学研讨,不断提升教学水平。'
        },
        {
          title: '优质教学设施',
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20music%20classroom%20with%20pianos%20and%20instruments%20professional%20teaching%20facilities&image_size=landscape_16_9',
          description: '配备专业琴房、录音棚、排练厅等教学空间,所有教室均安装专业隔音设备和空调系统,为学员提供舒适的学习环境。'
        },
        {
          title: '丰富演出机会',
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=music%20student%20performing%20on%20stage%20concert%20hall%20audience%20watching%20recital&image_size=landscape_16_9',
          description: '定期举办学员汇报演出、音乐会、比赛等活动,为学员提供展示才华的舞台,培养舞台表现力和自信心。'
        },
        {
          title: '考级辅导服务',
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=music%20education%20certificate%20award%20ceremony%20students%20receiving%20diplomas%20achievement&image_size=landscape_16_9',
          description: '提供各类音乐考级辅导课程,帮助学员系统备考。历年来学员考级通过率保持在95%以上,优秀率逐年提升。'
        }
      ],
      achievements: [
        {
          title: '全国青少年钢琴大赛金奖',
          date: '2024年8月 北京',
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=young%20pianist%20winning%20music%20competition%20trophy%20award%20ceremony%20happy&image_size=landscape_16_9',
          description: '学员李明在全国青少年钢琴大赛中荣获金奖,展现了扎实的基本功和出色的音乐表现力。'
        },
        {
          title: '年度学员汇报音乐会',
          date: '2024年6月 音乐厅',
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=music%20student%20concert%20performance%20violin%20solo%20stage%20lights%20audience&image_size=landscape_16_9',
          description: '超过200名学员参与演出,展示了钢琴、小提琴、声乐等多种艺术形式的学习成果。'
        },
        {
          title: '音乐考级优异成绩',
          date: '2024年度',
          image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=music%20exam%20certificates%20students%20celebrating%20success%20achievement%20happy%20group&image_size=landscape_16_9',
          description: '本年度学员考级通过率达98%,其中优秀率达45%,多位学员获得十级证书。'
        }
      ]
    }
  }
}
</script>

<style scoped>
.protection-section {
  padding: 80px 0;
}

.protection-intro {
  text-align: center;
  max-width: 900px;
  margin: 0 auto 40px;
}

.protection-intro p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--gray-color);
}

.protection-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.protection-card {
  background-color: var(--white-color);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--box-shadow);
  transition: var(--transition);
}

.protection-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.protection-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.protection-info {
  padding: 20px;
}

.protection-info h3 {
  font-size: 1.3rem;
  margin-bottom: 12px;
  color: var(--secondary-color);
}

.protection-info p {
  color: var(--gray-color);
  margin-bottom: 15px;
  line-height: 1.6;
}

/* 学员成就 */
.success-section {
  padding: 80px 0;
}

.success-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.success-item {
  background-color: var(--white-color);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--box-shadow);
  transition: var(--transition);
}

.success-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.success-item img {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.success-content {
  padding: 20px;
}

.success-content h3 {
  font-size: 1.3rem;
  margin-bottom: 8px;
  color: var(--secondary-color);
}

.success-date {
  color: var(--primary-color);
  font-size: 0.9rem;
  margin-bottom: 10px !important;
}

.success-content p {
  color: var(--gray-color);
  margin-bottom: 15px;
  line-height: 1.6;
}

/* 加入我们 */
.getinvolved-section {
  padding: 80px 0;
  background: linear-gradient(135deg, rgba(21, 120, 138, 0.05) 0%, rgba(0, 163, 184, 0.05) 100%);
}

.getinvolved-content {
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
}

.getinvolved-content p {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--gray-color);
  margin-bottom: 30px;
}

.action-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 15px;
}
</style>
