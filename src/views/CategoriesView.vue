﻿﻿﻿﻿﻿<template>
  <div class="categories">
    <!-- 顶部轮播 -->
    <div class="slider">
      <div class="slider-images">
        <img
          v-for="(image, index) in sliderImages"
          :key="index"
          :src="image"
          :alt="'课程展示' + (index + 1)"
          :class="{ active: currentSlide === index }"
        />
      </div>
      <div class="slider-controls">
        <div
          v-for="(image, index) in sliderImages"
          :key="index"
          class="slider-control"
          :class="{ active: currentSlide === index }"
          @click="currentSlide = index"
        ></div>
      </div>
    </div>

    <!-- 课程总览 -->
    <section class="category-section">
      <div class="container">
        <h2 class="section-title" v-scroll-animation>课程总览</h2>
        <p class="category-intro" v-scroll-animation>
          数智赋能传统音乐,从乐器演奏到非遗声乐、从乐理根基到音乐制作,打造系统化、可交互的中华音乐美育课程体系。
        </p>

        <!-- 分类筛选 -->
        <div class="category-filter">
          <button
            v-for="filter in filters"
            :key="filter.value"
            class="filter-btn"
            :class="{ active: activeFilter === filter.value }"
            @click="activeFilter = filter.value"
          >
            {{ filter.label }}
          </button>
        </div>

        <!-- 课程网格 -->
        <div class="category-grid">
          <div
            v-for="course in filteredCourses"
            :key="course.title"
            class="category-item"
            v-scroll-animation
          >
            <img :src="course.image" :alt="course.title" />
            <div class="category-info">
              <h3>{{ course.title }}</h3>
              <p>{{ course.description }}</p>
              <a href="#" class="btn-view">查看详情 <i class="fas fa-arrow-right"></i></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { img } from '@/utils/base'

export default {
  name: 'CategoriesView',
  data() {
    return {
      currentSlide: 0,
      sliderInterval: null,
      sliderImages: [
        img('images/图片1(1).jpg'),
        img('images/图片2.png'),
        img('images/33.jpg'),
        img('images/44.jpg')
      ],
      activeFilter: 'all',
      filters: [
        { value: 'all', label: '全部课程' },
        { value: 'instrument', label: '传统乐器' },
        { value: 'vocal', label: '非遗声乐' },
        { value: 'theory', label: '乐理根基' },
        { value: 'production', label: '音乐制作' },
        { value: 'aesthetic', label: '美育素养' }
      ],
      courses: [
        // 传统乐器
        { category: 'instrument', title: '古琴', image: img('images/guqin.jpg'), description: '从零掌握古琴基础指法,学会识读减字谱,开启文人琴道之门。' },
        { category: 'instrument', title: '琵琶', image: img('images/pipa.jpg'), description: '精讲传统经典曲目,掌握琵琶特有的轮指与文武功法。' },
        { category: 'instrument', title: '二胡', image: img('images/erhu.jpg'), description: '训练运弓与音色控制,体味不同流派的歌唱性韵味。' },
        { category: 'instrument', title: '笛、箫', image: img('images/dixiao.png'), description: '系统练习气息与指法,区分南北风格,吹奏山水之情。' },
        { category: 'instrument', title: '古筝', image: img('images/guzheng.jpg'), description: '学习传统筝曲的按滑揉颤,演绎清雅悠远的古典韵味。' },
        // 非遗声乐
        { category: 'vocal', title: '长海号子', image: img('images/changgaihaozi.png'), description: '学唱辽宁渔民的劳动号子,感受海洋文化与集体协作的原始力量。' },
        { category: 'vocal', title: '蒙古族长调', image: img('images/mengguzuchangdiao.jpg'), description: '练习悠长的气息与自由节奏,领悟草原音乐的苍茫与辽阔。' },
        { category: 'vocal', title: '侗族大歌', image: img('images/tongzudage.jpg'), description: '体验多声部无指挥的天然和声,探索侗族复调歌唱的独特魅力。' },
        { category: 'vocal', title: '川江号子', image: img('images/chuanjianghaozi.png'), description: '模拟船工拉纤的节奏与呐喊,体会川江激流中的粗犷与坚韧。' },
        { category: 'vocal', title: '昆曲唱腔', image: img('images/kunquchangqiang.jpg'), description: '学习水磨腔的咬字与行腔,入门百戏之祖的典雅与细腻。' },
        // 乐理根基
        { category: 'theory', title: '工尺谱识读', image: img('images/gongchi.png'), description: '学会辨认上尺工凡六五乙,读懂古代音乐的文字密码。' },
        { category: 'theory', title: '宫商角徵羽', image: img('images/gongshang.jpg'), description: '掌握中国传统五声音阶,探索与西方十二律不同的调式思维。' },
        { category: 'theory', title: '传统节奏板式', image: img('images/jiezonbanshi.jpg'), description: '理解板、眼、赠板等节拍规律,打出戏曲与器乐的内在呼吸。' },
        { category: 'theory', title: '曲牌结构', image: img('images/qupaijieguo.jpg'), description: '分析典型曲牌,掌握填词与编曲的基本框架。' },
        // 音乐制作
        { category: 'production', title: 'AI编曲', image: img('images/AI.png'), description: '利用人工智能生成旋律与配器,将传统素材转化为现代作品。' },
        { category: 'production', title: '传统采样设计', image: img('images/chuangtongcaiyangsheji.jpg'), description: '采集古琴、琵琶等真实音色,制作可复用的民族乐器采样库。' },
        { category: 'production', title: '跨界混音', image: img('images/kuajiehunyin.png'), description: '融合民乐实录与电子音色,平衡虚实空间,创造新国风听觉体验。' },
        // 美育素养
        { category: 'aesthetic', title: '传统音乐简史', image: img('images/chuangtongyueqihianshi.jpg'), description: '梳理从先秦礼乐到明清俗乐的发展脉络,建立宏观历史认知。' },
        { category: 'aesthetic', title: '地域音乐文化', image: img('images/地域音乐文化.jpg'), description: '探访陕北、江南、云南等地的民歌与器乐,理解地理与风格的关联。' },
        { category: 'aesthetic', title: '传统音乐与生活美育', image: img('images/创痛音乐与生活美誉.png'), description: '将古乐意境融入日常,提升审美感知力,让传统成为当代修养的一部分。' }
      ]
    }
  },
  computed: {
    filteredCourses() {
      if (this.activeFilter === 'all') {
        return this.courses
      }
      return this.courses.filter((c) => c.category === this.activeFilter)
    }
  },
  mounted() {
    this.startSlider()
  },
  beforeUnmount() {
    this.stopSlider()
  },
  methods: {
    img,
    startSlider() {
      this.sliderInterval = setInterval(() => {
        this.currentSlide = (this.currentSlide + 1) % this.sliderImages.length
      }, 4000)
    },
    stopSlider() {
      if (this.sliderInterval) {
        clearInterval(this.sliderInterval)
      }
    }
  }
}
</script>

<style scoped>
/* 轮播 */
.slider {
  position: relative;
  margin-top: 70px;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background-color: #f1f5f9;
}

.slider-images {
  position: relative;
  width: 100%;
  height: 100%;
}

.slider-images img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  opacity: 0;
  transition: opacity 1s ease;
}

.slider-images img.active {
  opacity: 1;
}

.slider-controls {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 10;
}

.slider-control {
  width: 12px;
  height: 12px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  cursor: pointer;
  transition: var(--transition);
}

.slider-control.active {
  background-color: var(--secondary-color);
  transform: scale(1.2);
}

/* 课程区域 */
.category-section {
  padding: 80px 0;
}

.category-intro {
  text-align: center;
  margin-bottom: 30px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}

.category-filter {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 40px;
}

.filter-btn {
  padding: 10px 25px;
  background: transparent;
  border: 1px solid var(--surface-border, #ddd);
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: var(--transition);
  color: var(--gray-color);
}

.filter-btn:hover,
.filter-btn.active {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: var(--white-color);
  border-color: transparent;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
}

.category-item {
  background-color: var(--white-color);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: var(--box-shadow);
  transition: var(--transition);
}

.category-item:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.category-item img {
  width: 100%;
  height: 220px;
  object-fit: cover;
}

.category-info {
  padding: 20px;
}

.category-info h3 {
  font-size: 1.3rem;
  margin-bottom: 10px;
  color: var(--secondary-color);
}

.category-info p {
  color: var(--gray-color);
  margin-bottom: 15px;
  line-height: 1.6;
}

.btn-view {
  color: var(--primary-color);
  font-weight: 500;
  display: inline-flex;
  align-items: center;
}

.btn-view i {
  margin-left: 5px;
  transition: var(--transition);
}

.btn-view:hover i {
  transform: translateX(5px);
}
</style>
