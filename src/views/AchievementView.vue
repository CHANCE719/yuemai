<template>
  <div class="achievement-page">
    <!-- 页面横幅 -->
    <section class="page-header">
      <div class="container">
        <h1>成果交流</h1>
        <div class="breadcrumb">
          <router-link to="/">首页</router-link>
          <span class="separator">/</span>
          <span class="current">成果交流</span>
        </div>
      </div>
    </section>

    <!-- 社区内容区 -->
    <section class="community-section">
      <div class="container">
        <!-- 工具栏 -->
        <div class="toolbar">
          <div class="toolbar-left">
            <h2><i class="fas fa-fire"></i> 学员成果展示</h2>
            <span class="count-badge">共 {{ works.length }} 件作品</span>
          </div>
          <div class="toolbar-right">
            <select v-model="sortBy" class="sort-select">
              <option value="latest">最新发布</option>
              <option value="oldest">最早发布</option>
              <option value="title">按名称</option>
            </select>
            <button class="btn-scroll-submit" @click="scrollToSubmit">
              <i class="fas fa-plus"></i> 提交作品
            </button>
          </div>
        </div>

        <!-- 成果展示网格 -->
        <div class="works-grid" v-if="sortedWorks.length">
          <div
            class="work-card"
            v-for="(work, index) in sortedWorks"
            :key="work.id"
            v-scroll-animation
            :style="{ '--delay': (index % 6) * 0.08 + 's' }"
          >
            <!-- Bilibili 视频播放器 -->
            <div class="video-wrapper" v-html="work.embedCode"></div>

            <!-- 卡片内容 -->
            <div class="card-body">
              <h3 class="work-title">{{ work.title }}</h3>
              <div class="work-author">
                <i class="fas fa-user-circle"></i>
                <span>{{ work.author }}</span>
              </div>

              <div class="work-tags">
                <span class="tag tag-instrument">
                  <i class="fas fa-music"></i> {{ work.instrument }}
                </span>
                <span class="tag tag-style">
                  <i class="fas fa-palette"></i> {{ work.style }}
                </span>
              </div>

              <p class="work-desc">{{ work.description }}</p>

              <!-- 百度网盘工程文件链接 -->
              <a
                v-if="work.netdiskUrl"
                :href="work.netdiskUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="netdisk-link"
              >
                <i class="fas fa-cloud-download-alt"></i>
                <span>百度网盘工程文件</span>
                <i class="fas fa-external-link-alt"></i>
              </a>

              <div class="card-footer">
                <span class="post-time">
                  <i class="far fa-clock"></i> {{ formatTime(work.createdAt) }}
                </span>
                <button class="btn-like" @click="toggleLike(work)">
                  <i :class="work.liked ? 'fas fa-heart' : 'far fa-heart'"></i>
                  <span>{{ work.likes }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 空状态 -->
        <div class="empty-state" v-else>
          <i class="fas fa-music"></i>
          <p>还没有作品,快来提交第一个吧!</p>
        </div>

        <!-- 提交成果表单 -->
        <div class="submit-section" ref="submitSection">
          <div class="submit-header">
            <h2><i class="fas fa-upload"></i> 提交我的作品</h2>
            <p>分享您的音乐成果,让更多人欣赏您的才华</p>
          </div>

          <form class="submit-form" @submit.prevent="handleSubmit">
            <div class="form-row">
              <div class="form-group">
                <label><i class="fas fa-heading"></i> 作品名称 <span class="required">*</span></label>
                <input
                  type="text"
                  v-model.trim="form.title"
                  placeholder="例如:古琴演奏《流水》"
                  maxlength="50"
                />
                <span class="error" v-if="errors.title">{{ errors.title }}</span>
              </div>

              <div class="form-group">
                <label><i class="fas fa-user"></i> 作者名称 <span class="required">*</span></label>
                <input
                  type="text"
                  v-model.trim="form.author"
                  placeholder="您的姓名或昵称"
                  maxlength="20"
                />
                <span class="error" v-if="errors.author">{{ errors.author }}</span>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label><i class="fas fa-guitar"></i> 所使用乐器或软件 <span class="required">*</span></label>
                <input
                  type="text"
                  v-model.trim="form.instrument"
                  placeholder="例如:古琴 / FL Studio / Ableton Live"
                  maxlength="30"
                />
                <span class="error" v-if="errors.instrument">{{ errors.instrument }}</span>
              </div>

              <div class="form-group">
                <label><i class="fas fa-palette"></i> 风格 <span class="required">*</span></label>
                <select v-model="form.style">
                  <option value="">请选择风格</option>
                  <option value="传统民乐">传统民乐</option>
                  <option value="古风">古风</option>
                  <option value="电子音乐">电子音乐</option>
                  <option value="跨界融合">跨界融合</option>
                  <option value="纯音乐">纯音乐</option>
                  <option value="人声演唱">人声演唱</option>
                  <option value="AI 编曲">AI 编曲</option>
                  <option value="其他">其他</option>
                </select>
                <span class="error" v-if="errors.style">{{ errors.style }}</span>
              </div>
            </div>

            <div class="form-group">
              <label>
                <i class="fab fa-bilibili"></i> Bilibili 视频嵌入代码 <span class="required">*</span>
              </label>
              <textarea
                v-model.trim="form.embedCode"
                placeholder='视频最好包含作品讲解，在Bilibili视频页面点击"分享"→"嵌入代码",将复制的代码粘贴到这里。例如:&#10;<iframe src="//player.bilibili.com/player.html?bvid=BV1xx411c7mD&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>'
                rows="4"
              ></textarea>
              <span class="error" v-if="errors.embedCode">{{ errors.embedCode }}</span>
              <span class="hint" v-else>
                <i class="fas fa-info-circle"></i>
                获取方式:B站网页版视频页 → 分享 → 嵌入代码 → 复制
              </span>
            </div>

            <div class="form-group">
              <label><i class="fas fa-align-left"></i> 简介 <span class="required">*</span></label>
              <textarea
                v-model.trim="form.description"
                placeholder="简要介绍您的作品灵感、创作过程或演奏心得(10-200字)"
                rows="3"
                maxlength="200"
              ></textarea>
              <div class="textarea-footer">
                <span class="error" v-if="errors.description">{{ errors.description }}</span>
                <span class="char-count">{{ form.description.length }} / 200</span>
              </div>
            </div>

            <div class="form-group">
              <label>
                <i class="fas fa-cloud-download-alt"></i> 百度网盘工程文件链接
                <span class="optional">(选填)</span>
              </label>
              <input
                type="url"
                v-model.trim="form.netdiskUrl"
                placeholder="例如:https://pan.baidu.com/s/1xxxxx"
              />
              <span class="error" v-if="errors.netdiskUrl">{{ errors.netdiskUrl }}</span>
              <span class="hint" v-else>
                <i class="fas fa-info-circle"></i>
                用于分享音乐工程文件压缩包,方便他人学习交流
              </span>
            </div>

            <div class="form-actions">
              <button type="button" class="btn-clear" @click="resetForm">
                <i class="fas fa-eraser"></i> 清空
              </button>
              <button type="submit" class="btn-submit">
                <i class="fas fa-paper-plane"></i> 提交作品
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>

    <!-- 提交成功提示 -->
    <transition name="toast">
      <div class="toast" v-if="showToast">
        <i class="fas fa-check-circle"></i>
        <span>作品提交成功!</span>
      </div>
    </transition>
  </div>
</template>

<script>
// 默认示例数据
const defaultWorks = [
  {
    id: 'demo-2',
    title: 'Luminescence',
    author: 'OBLEXX&CI-I4IVC3',
    instrument: 'FL Studio',
    style: '电子音乐',
    description: '平台合作的独立音乐创作人制作作品',
    embedCode: '<iframe src="//player.bilibili.com/player.html?bvid=BV17BGo6oE4H&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" class="bilibili-player"></iframe>',
    netdiskUrl: 'https://pan.baidu.com/s/114514',
    likes: 11,
    liked: false,
    createdAt: Date.now()
  }
]

export default {
  name: 'AchievementView',
  data() {
    return {
      works: [],
      sortBy: 'latest',
      showToast: false,
      form: {
        title: '',
        author: '',
        instrument: '',
        style: '',
        embedCode: '',
        description: '',
        netdiskUrl: ''
      },
      errors: {}
    }
  },
  computed: {
    sortedWorks() {
      const list = [...this.works]
      switch (this.sortBy) {
        case 'latest':
          return list.sort((a, b) => b.createdAt - a.createdAt)
        case 'oldest':
          return list.sort((a, b) => a.createdAt - b.createdAt)
        case 'title':
          return list.sort((a, b) => a.title.localeCompare(b.title, 'zh-CN'))
        default:
          return list
      }
    }
  },
  mounted() {
    this.loadWorks()
  },
  methods: {
    // 从 localStorage 加载作品数据
    loadWorks() {
      const stored = localStorage.getItem('yuemai_works')
      if (stored) {
        try {
          this.works = JSON.parse(stored)
        } catch {
          this.works = [...defaultWorks]
        }
      } else {
        this.works = [...defaultWorks]
      }
    },

    // 保存到 localStorage
    saveWorks() {
      localStorage.setItem('yuemai_works', JSON.stringify(this.works))
    },

    // 安全处理 Bilibili 嵌入代码
    sanitizeBilibiliEmbed(code) {
      if (!code) return null
      try {
        const parser = new DOMParser()
        const doc = parser.parseFromString(code, 'text/html')
        const iframe = doc.querySelector('iframe')
        if (!iframe) return null
        let src = iframe.getAttribute('src') || ''
        if (!src) return null
        // 补全协议
        if (src.startsWith('//')) {
          src = 'https:' + src
        }
        // 必须是 Bilibili 播放器域名
        if (!src.includes('player.bilibili.com')) return null
        // 重建干净的 iframe
        return `<iframe src="${src}" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" class="bilibili-player"></iframe>`
      } catch {
        return null
      }
    },

    // 表单校验
    validate() {
      const e = {}
      if (!this.form.title) {
        e.title = '请输入作品名称'
      } else if (this.form.title.length < 2) {
        e.title = '名称至少 2 个字符'
      }
      if (!this.form.author) {
        e.author = '请输入作者名称'
      }
      if (!this.form.instrument) {
        e.instrument = '请输入所使用的乐器或软件'
      }
      if (!this.form.style) {
        e.style = '请选择风格'
      }
      if (!this.form.embedCode) {
        e.embedCode = '请粘贴 Bilibili 视频嵌入代码'
      } else if (!this.sanitizeBilibiliEmbed(this.form.embedCode)) {
        e.embedCode = '嵌入代码无效,请确认是 Bilibili 官方分享的嵌入代码'
      }
      if (!this.form.description) {
        e.description = '请输入作品简介'
      } else if (this.form.description.length < 10) {
        e.description = '简介至少 10 个字符'
      }
      // 网盘链接选填,但若填写则校验格式
      if (this.form.netdiskUrl) {
        try {
          const u = new URL(this.form.netdiskUrl)
          if (!['http:', 'https:'].includes(u.protocol)) {
            e.netdiskUrl = '链接必须以 http:// 或 https:// 开头'
          }
        } catch {
          e.netdiskUrl = '请输入有效的网盘链接'
        }
      }
      this.errors = e
      return Object.keys(e).length === 0
    },

    // 提交作品
    handleSubmit() {
      if (!this.validate()) return
      const cleanEmbed = this.sanitizeBilibiliEmbed(this.form.embedCode)
      const newWork = {
        id: 'work-' + Date.now(),
        title: this.form.title,
        author: this.form.author,
        instrument: this.form.instrument,
        style: this.form.style,
        embedCode: cleanEmbed,
        description: this.form.description,
        netdiskUrl: this.form.netdiskUrl || '',
        likes: 0,
        liked: false,
        createdAt: Date.now()
      }
      this.works.unshift(newWork)
      this.saveWorks()
      this.resetForm()
      this.showToast = true
      setTimeout(() => {
        this.showToast = false
      }, 2500)
      // 滚动到顶部查看新作品
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },

    // 重置表单
    resetForm() {
      this.form = {
        title: '',
        author: '',
        instrument: '',
        style: '',
        embedCode: '',
        description: '',
        netdiskUrl: ''
      }
      this.errors = {}
    },

    // 点赞
    toggleLike(work) {
      work.liked = !work.liked
      work.likes += work.liked ? 1 : -1
      this.saveWorks()
    },

    // 滚动到提交表单
    scrollToSubmit() {
      this.$refs.submitSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    },

    // 格式化时间
    formatTime(ts) {
      const diff = Date.now() - ts
      const day = 86400000
      const hour = 3600000
      const minute = 60000
      if (diff < minute) return '刚刚'
      if (diff < hour) return Math.floor(diff / minute) + ' 分钟前'
      if (diff < day) return Math.floor(diff / hour) + ' 小时前'
      if (diff < day * 7) return Math.floor(diff / day) + ' 天前'
      const d = new Date(ts)
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    }
  }
}
</script>

<style scoped>
/* ===== 社区内容区 ===== */
.community-section {
  padding: 64px 0 96px;
}

/* ===== 工具栏 ===== */
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 40px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border-color);
}

.toolbar-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.toolbar-left h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.toolbar-left h2 i {
  color: #ff6b35;
  margin-right: 8px;
}

.count-badge {
  padding: 4px 14px;
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
}

.toolbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.sort-select {
  padding: 8px 16px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  background: var(--surface);
  color: var(--text-primary);
  font-size: 0.9rem;
  cursor: pointer;
  transition: var(--transition);
}

.sort-select:hover {
  border-color: var(--primary-color);
}

.btn-scroll-submit {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 18px;
  background: var(--gradient-primary);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: 0 2px 8px rgba(14, 165, 233, 0.25);
}

.btn-scroll-submit:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.35);
}

/* ===== 成果展示网格 ===== */
.works-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: 28px;
}

.work-card {
  background: var(--surface);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  overflow: hidden;
  transition: var(--transition);
  display: flex;
  flex-direction: column;
}

.work-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--box-shadow-hover);
  border-color: rgba(14, 165, 233, 0.3);
}

/* Bilibili 视频播放器 */
.video-wrapper {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  background: #000;
  border-radius: 16px 16px 0 0;
  overflow: hidden;
}

.video-wrapper :deep(.bilibili-player) {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

/* 卡片内容 */
.card-body {
  padding: 20px 22px 18px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.work-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 8px;
  line-height: 1.4;
}

.work-author {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 14px;
}

.work-author i {
  color: var(--primary-color);
  font-size: 1rem;
}

.work-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 500;
}

.tag-instrument {
  background: rgba(14, 165, 233, 0.1);
  color: #0284c7;
}

.tag-style {
  background: rgba(139, 92, 246, 0.1);
  color: #7c3aed;
}

.work-desc {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 16px;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 百度网盘工程文件链接 */
.netdisk-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 14px;
  margin-bottom: 14px;
  background: rgba(14, 165, 233, 0.06);
  border: 1px dashed rgba(14, 165, 233, 0.35);
  border-radius: 10px;
  color: #0284c7;
  font-size: 0.82rem;
  font-weight: 500;
  text-decoration: none;
  transition: var(--transition);
}

.netdisk-link:hover {
  background: rgba(14, 165, 233, 0.12);
  border-color: var(--primary-color);
  border-style: solid;
  transform: translateX(2px);
}

.netdisk-link i.fa-cloud-download-alt {
  font-size: 1rem;
}

.netdisk-link span {
  flex: 1;
}

.netdisk-link i.fa-external-link-alt {
  font-size: 0.7rem;
  opacity: 0.7;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 14px;
  border-top: 1px solid var(--border-light);
}

.post-time {
  font-size: 0.78rem;
  color: var(--text-tertiary);
}

.post-time i {
  margin-right: 4px;
}

.btn-like {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: transparent;
  border: 1px solid var(--border-color);
  border-radius: 20px;
  color: var(--text-secondary);
  font-size: 0.82rem;
  cursor: pointer;
  transition: var(--transition);
}

.btn-like:hover {
  border-color: #ef4444;
  color: #ef4444;
}

.btn-like.liked,
.btn-like i.fas {
  color: #ef4444;
}

/* ===== 空状态 ===== */
.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: var(--text-tertiary);
}

.empty-state i {
  font-size: 3.5rem;
  margin-bottom: 20px;
  opacity: 0.4;
}

.empty-state p {
  font-size: 1.1rem;
}

/* ===== 提交表单 ===== */
.submit-section {
  margin-top: 80px;
  background: var(--surface);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 48px;
  box-shadow: var(--box-shadow);
}

.submit-header {
  text-align: center;
  margin-bottom: 36px;
}

.submit-header h2 {
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 10px;
}

.submit-header h2 i {
  color: var(--primary-color);
  margin-right: 8px;
}

.submit-header p {
  font-size: 0.95rem;
  color: var(--text-secondary);
}

.submit-form {
  max-width: 760px;
  margin: 0 auto;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.form-group label i {
  color: var(--primary-color);
  margin-right: 6px;
  width: 16px;
}

.required {
  color: #ef4444;
}

.optional {
  color: var(--text-tertiary);
  font-weight: 400;
  font-size: 0.8rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  background: var(--surface);
  color: var(--text-primary);
  font-size: 0.92rem;
  font-family: inherit;
  transition: var(--transition);
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.12);
}

.form-group textarea {
  resize: vertical;
  font-family: 'Courier New', monospace;
  line-height: 1.5;
}

.form-group textarea:not(:nth-of-type(1)) {
  font-family: inherit;
}

.form-group select {
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%2394a3b8' d='M6 8L0 0h12z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 16px center;
  padding-right: 40px;
}

.error {
  display: block;
  margin-top: 6px;
  font-size: 0.8rem;
  color: #ef4444;
}

.hint {
  display: block;
  margin-top: 6px;
  font-size: 0.8rem;
  color: var(--text-tertiary);
}

.hint i {
  margin-right: 4px;
}

.textarea-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 6px;
}

.char-count {
  font-size: 0.8rem;
  color: var(--text-tertiary);
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 28px;
}

.btn-clear {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 12px 28px;
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  border: 1px solid var(--border-color);
  border-radius: 10px;
  font-size: 0.92rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition);
}

.btn-clear:hover {
  background: var(--bg-secondary);
  color: var(--text-primary);
}

.btn-submit {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 36px;
  background: var(--gradient-primary);
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 0.92rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.3);
}

.btn-submit:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(14, 165, 233, 0.4);
}

/* ===== 提示弹窗 ===== */
.toast {
  position: fixed;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 28px;
  background: #10b981;
  color: #fff;
  border-radius: 12px;
  font-size: 0.95rem;
  font-weight: 500;
  box-shadow: 0 8px 24px rgba(16, 185, 129, 0.3);
  z-index: 9999;
}

.toast i {
  font-size: 1.2rem;
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(-20px);
}

/* ===== 响应式 ===== */
@media (max-width: 768px) {
  .works-grid {
    grid-template-columns: 1fr;
  }

  .toolbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .submit-section {
    padding: 28px 20px;
  }

  .submit-header h2 {
    font-size: 1.3rem;
  }
}

@media (max-width: 576px) {
  .community-section {
    padding: 40px 0 64px;
  }

  .toolbar-right {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
  }

  .sort-select,
  .btn-scroll-submit {
    width: 100%;
    justify-content: center;
  }

  .form-actions {
    flex-direction: column-reverse;
  }

  .btn-clear,
  .btn-submit {
    width: 100%;
    justify-content: center;
  }
}
</style>
