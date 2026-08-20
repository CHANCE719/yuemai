<template>
  <div class="ai-compose">
    <PageHeader title="AI智能成曲创作工具" />

    <!-- 工具介绍 -->
    <section class="intro-section">
      <div class="container">
        <div class="intro-grid">
          <div class="intro-text">
            <h2 class="section-title ai-title">智能成曲 · 守正创新</h2>
            <p>
              本工具依托中国传统音乐曲式、调式、律制数字化素材库,通过对接外部AI音乐生成模型(Suno),
              学员输入主音调式、情绪、速度、乐器与可选旋律动机,即可一键生成完整的传统音乐作品。
            </p>
            <p>
              生成结果支持在线试听、保存到本地创作空间,适配中小学音乐课堂的作曲启蒙与创新实践,
              让没有作曲基础的学生也能体验"我也能作曲"的成就感。
            </p>
            <div class="intro-tags">
              <span class="tag"><i class="fas fa-music"></i> 五声调式</span>
              <span class="tag"><i class="fas fa-robot"></i> AI生成</span>
              <span class="tag"><i class="fas fa-headphones"></i> 实时试听</span>
              <span class="tag"><i class="fas fa-book"></i> 曲式结构</span>
            </div>
          </div>
          <div class="intro-visual">
            <div class="visual-card">
              <i class="fas fa-robot"></i>
              <div class="visual-pulse"></div>
              <div class="visual-pulse delay"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 创作工作台 -->
    <section class="studio-section">
      <div class="container">
        <h2 class="section-title ai-title">创作工作台</h2>
        <p class="studio-intro">
          调整左侧参数,点击"生成作品",AI 将基于中国传统音乐语汇为你谱写一段专属作品。
          <button class="link-btn" @click="showSettings = true">
            <i class="fas fa-cog"></i> 接口配置
          </button>
        </p>

        <div class="studio-grid">
          <!-- 参数面板 -->
          <div class="params-panel">
            <h3 class="panel-title"><i class="fas fa-sliders-h"></i> 创作参数</h3>

            <div class="param-group">
              <label>主音调式</label>
              <div class="option-grid">
                <button
                  v-for="mode in modes"
                  :key="mode.value"
                  class="option-btn"
                  :class="{ active: params.mode === mode.value }"
                  @click="params.mode = mode.value"
                >
                  <span class="opt-title">{{ mode.label }}</span>
                  <span class="opt-desc">{{ mode.note }}</span>
                </button>
              </div>
            </div>

            <div class="param-group">
              <label>风格情绪</label>
              <div class="option-grid">
                <button
                  v-for="mood in moods"
                  :key="mood.value"
                  class="option-btn mood-btn"
                  :class="{ active: params.mood === mood.value }"
                  @click="params.mood = mood.value"
                >
                  <span class="opt-emoji">{{ mood.icon }}</span>
                  <span class="opt-title">{{ mood.label }}</span>
                </button>
              </div>
            </div>

            <div class="param-group">
              <label>主奏乐器</label>
              <div class="instrument-grid">
                <button
                  v-for="inst in instruments"
                  :key="inst.value"
                  class="inst-btn"
                  :class="{ active: params.instrument === inst.value }"
                  @click="params.instrument = inst.value"
                >
                  <i :class="inst.icon"></i>
                  <span>{{ inst.label }}</span>
                </button>
              </div>
            </div>

            <div class="param-group">
              <label>
                速度 BPM
                <span class="value-tag">{{ params.tempo }}</span>
              </label>
              <input
                type="range"
                v-model.number="params.tempo"
                min="40"
                max="160"
                step="5"
              />
              <div class="range-marks">
                <span>慢板</span><span>中板</span><span>快板</span>
              </div>
            </div>

            <div class="param-group">
              <label>
                作品时长
                <span class="value-tag">{{ params.duration }}秒</span>
              </label>
              <input
                type="range"
                v-model.number="params.duration"
                min="30"
                max="120"
                step="10"
              />
              <div class="range-marks">
                <span>30s</span><span>75s</span><span>120s</span>
              </div>
            </div>

            <div class="param-group">
              <label>
                旋律动机
                <small>(可选,简谱数字1-7,空格分隔)</small>
              </label>
              <input
                type="text"
                v-model="params.motive"
                placeholder="例: 1 2 3 5 6 - 5 3"
                maxlength="60"
              />
              <span class="hint">留空则由AI自由发挥</span>
            </div>

            <div class="param-group">
              <label>演唱方式</label>
              <div class="toggle-group">
                <button
                  class="toggle-btn"
                  :class="{ active: !params.instrumental }"
                  @click="params.instrumental = false"
                >
                  <i class="fas fa-microphone"></i> 含人声哼唱
                </button>
                <button
                  class="toggle-btn"
                  :class="{ active: params.instrumental }"
                  @click="params.instrumental = true"
                >
                  <i class="fas fa-music"></i> 纯器乐
                </button>
              </div>
            </div>

            <button
              class="generate-btn"
              :disabled="generating"
              @click="generate"
            >
              <i :class="generating ? 'fas fa-spinner fa-spin' : 'fas fa-magic'"></i>
              {{ generating ? 'AI创作中...' : '生成作品' }}
            </button>
            <p class="gen-tip" v-if="!settings.apiKey">
              <i class="fas fa-info-circle"></i>
              未配置 API Key,点击右上角
              <a href="javascript:void(0)" @click="showSettings = true">接口配置</a>
              填入密钥后即可生成。
            </p>
          </div>

          <!-- 结果面板 -->
          <div class="result-panel">
            <div class="result-header">
              <h3 class="panel-title"><i class="fas fa-star"></i> 生成作品</h3>
              <div class="result-actions" v-if="result">
                <button class="action-btn" @click="saveWork">
                  <i class="fas fa-save"></i> 保存到本地
                </button>
                <button class="action-btn" @click="resetResult">
                  <i class="fas fa-redo"></i> 重新生成
                </button>
              </div>
            </div>

            <!-- 空状态 -->
            <div class="result-empty" v-if="!result && !generating">
              <div class="empty-icon">
                <i class="fas fa-music"></i>
                <div class="empty-ring"></div>
              </div>
              <p>调整参数并点击"生成作品"<br />开启你的传统音乐 AI 创作之旅</p>
            </div>

            <!-- 生成中 -->
            <div class="result-loading" v-if="generating">
              <div class="loading-orb">
                <div class="orb-ring"></div>
                <div class="orb-ring"></div>
                <div class="orb-ring"></div>
                <i class="fas fa-robot"></i>
              </div>
              <p class="loading-status">{{ statusText }}</p>
              <div class="loading-progress">
                <div class="progress-bar" :style="{ width: progressPercent + '%' }"></div>
              </div>
              <p class="loading-tip">AI 正在融合中国传统音乐语汇,通常 30-90 秒出结果</p>
            </div>

            <!-- 结果 -->
            <div class="result-content" v-if="result">
              <div class="result-meta">
                <span class="meta-tag">{{ getModeLabel(params.mode) }}调</span>
                <span class="meta-tag">{{ getMoodLabel(params.mood) }}</span>
                <span class="meta-tag">♩= {{ params.tempo }}</span>
                <span class="meta-tag">{{ getInstrumentLabel(params.instrument) }}</span>
                <span class="meta-tag">{{ params.duration }}秒</span>
              </div>

              <div class="audio-player">
                <div class="player-cover" v-if="result.cover">
                  <img :src="result.cover" alt="作品封面" />
                </div>
                <div class="player-cover placeholder" v-else>
                  <i class="fas fa-compact-disc spinning"></i>
                </div>
                <div class="player-info">
                  <h4>{{ result.title || 'AI生成作品' }}</h4>
                  <p class="player-meta">{{ result.style || '中国传统音乐风格' }}</p>
                  <audio
                    :src="result.audio"
                    controls
                    preload="metadata"
                    class="audio-el"
                  ></audio>
                </div>
              </div>

              <div class="result-lyrics" v-if="result.lyrics">
                <h5><i class="fas fa-align-left"></i> AI 生成的曲谱/歌词</h5>
                <pre>{{ result.lyrics }}</pre>
              </div>

              <div class="result-tips">
                <i class="fas fa-lightbulb"></i>
                <span>{{ result.tip }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 教学应用场景 -->
    <section class="apply-section">
      <div class="container">
        <h2 class="section-title ai-title">教学应用场景</h2>
        <div class="apply-grid">
          <div
            v-for="app in applications"
            :key="app.title"
            class="apply-card"
          >
            <i :class="app.icon"></i>
            <h3>{{ app.title }}</h3>
            <p>{{ app.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 创作灵感库 -->
    <section class="inspire-section">
      <div class="container">
        <h2 class="section-title ai-title">创作灵感库</h2>
        <p class="inspire-intro">点击任意示例,参数将自动填入上方工作台</p>
        <div class="inspire-grid">
          <div
            v-for="ex in examples"
            :key="ex.id"
            class="inspire-card"
            @click="loadExample(ex)"
          >
            <div class="inspire-thumb">
              <i :class="ex.icon"></i>
            </div>
            <div class="inspire-info">
              <h4>{{ ex.title }}</h4>
              <p>{{ ex.desc }}</p>
              <div class="inspire-tags">
                <span
                  v-for="t in ex.tags"
                  :key="t"
                  class="inspire-tag"
                >{{ t }}</span>
              </div>
            </div>
            <div class="inspire-arrow">
              <i class="fas fa-arrow-right"></i>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 设置弹窗 -->
    <div
      class="modal"
      :class="{ active: showSettings }"
      @click.self="showSettings = false"
    >
      <div class="settings-modal">
        <div class="settings-header">
          <h3><i class="fas fa-cog"></i> AI 接口配置</h3>
          <button class="close-btn" @click="showSettings = false">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="settings-body">
          <div class="setting-group">
            <label>API Base URL</label>
            <input
              type="text"
              v-model="settings.baseUrl"
              placeholder="https://api.sunoapi.org"
            />
            <span class="hint">Suno API 服务地址</span>
          </div>
          <div class="setting-group">
            <label>API Key</label>
            <input
              type="password"
              v-model="settings.apiKey"
              placeholder="Bearer Token,从服务商官网获取"
            />
            <span class="hint">密钥仅保存在本地浏览器 localStorage,不上传服务器</span>
          </div>
          <div class="setting-group">
            <label>CORS 代理(可选)</label>
            <input
              type="text"
              v-model="settings.corsProxy"
              placeholder="https://corsproxy.io/?"
            />
            <span class="hint">浏览器直调需绕过 CORS,可填公共代理。留空则直连。</span>
          </div>
          <div class="setting-help">
            <p><i class="fas fa-info-circle"></i> 还没有 API Key?</p>
            <p>
              1. 访问
              <a href="https://sunoapi.org" target="_blank" rel="noopener">sunoapi.org</a>
              注册账号<br />
              2. 充值积分(约 $5 = 1000 积分,可生成约 400 首)<br />
              3. 在个人中心复制 API Key<br />
              4. 粘贴到上方输入框并保存
            </p>
          </div>
        </div>
        <div class="settings-footer">
          <button class="btn-secondary" @click="resetSettings">恢复默认</button>
          <button class="btn-primary" @click="saveSettings">保存配置</button>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <transition name="fade">
      <div class="toast" :class="toastType" v-if="toast">
        <i :class="toastIcon"></i>
        <span>{{ toast }}</span>
      </div>
    </transition>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'

const STORAGE_KEY = 'yuemai_ai_compose_settings'
const WORKS_KEY = 'yuemai_ai_works'

const DEFAULT_SETTINGS = {
  baseUrl: 'https://api.sunoapi.org',
  apiKey: '',
  corsProxy: ''
}

export default {
  name: 'AiComposeView',
  components: { PageHeader },
  data() {
    return {
      params: {
        mode: 'gong',
        mood: 'elegant',
        tempo: 80,
        duration: 60,
        instrument: 'guqin',
        motive: '',
        instrumental: true
      },
      modes: [
        { value: 'gong', label: '宫调', note: 'C 主音 · 典雅' },
        { value: 'shang', label: '商调', note: 'D 主音 · 高亢' },
        { value: 'jue', label: '角调', note: 'E 主音 · 轻盈' },
        { value: 'zhi', label: '徵调', note: 'G 主音 · 明亮' },
        { value: 'yu', label: '羽调', note: 'A 主音 · 柔婉' }
      ],
      moods: [
        { value: 'elegant', label: '古朴典雅', icon: '🍵' },
        { value: 'heroic', label: '激昂豪迈', icon: '⚔️' },
        { value: 'lyrical', label: '婉转抒情', icon: '🌙' },
        { value: 'lively', label: '轻快活泼', icon: '🌸' }
      ],
      instruments: [
        { value: 'guqin', label: '古琴', icon: 'fas fa-music' },
        { value: 'guzheng', label: '古筝', icon: 'fas fa-guitar' },
        { value: 'erhu', label: '二胡', icon: 'fas fa-wave-square' },
        { value: 'dizi', label: '笛子', icon: 'fas fa-wind' },
        { value: 'pipa', label: '琵琶', icon: 'fas fa-bell' }
      ],
      applications: [
        {
          icon: 'fas fa-chalkboard-teacher',
          title: '课堂作曲启蒙',
          desc: '教师现场演示 AI 生成过程,讲解旋律动机的发展手法,让学生直观感受一首乐曲如何从简单素材生长为完整作品。'
        },
        {
          icon: 'fas fa-user-edit',
          title: '个人创作实践',
          desc: '学员输入自己的旋律动机,选择风格与配器,即时生成多版本作品进行对比,激发创作灵感,降低作曲入门门槛。'
        },
        {
          icon: 'fas fa-layer-group',
          title: '曲式结构分析',
          desc: '生成结果遵循"起承转合"四段落结构,辅助学员理解传统音乐"散-慢-中-快-散"的板式布局与变奏手法。'
        }
      ],
      examples: [
        {
          id: 1,
          title: '《山居秋暝》',
          desc: '空山新雨,明月松间——古朴典雅的宫调古琴独奏',
          icon: 'fas fa-mountain',
          tags: ['宫调', '古琴', '慢板'],
          params: {
            mode: 'gong',
            mood: 'elegant',
            tempo: 70,
            duration: 60,
            instrument: 'guqin',
            motive: '1 2 3 2 1',
            instrumental: true
          }
        },
        {
          id: 2,
          title: '《塞外长歌》',
          desc: '大漠孤烟,长河落日——激昂豪迈的徵调笛子曲',
          icon: 'fas fa-flag',
          tags: ['徵调', '笛子', '快板'],
          params: {
            mode: 'zhi',
            mood: 'heroic',
            tempo: 120,
            duration: 90,
            instrument: 'dizi',
            motive: '5 6 5 3 2',
            instrumental: true
          }
        },
        {
          id: 3,
          title: '《月夜听筝》',
          desc: '清辉玉臂,冷露无声——婉转抒情的羽调古筝曲',
          icon: 'fas fa-moon',
          tags: ['羽调', '古筝', '慢板'],
          params: {
            mode: 'yu',
            mood: 'lyrical',
            tempo: 60,
            duration: 75,
            instrument: 'guzheng',
            motive: '6 1 2 3',
            instrumental: true
          }
        },
        {
          id: 4,
          title: '《春日游园》',
          desc: '花影摇红,莺啼绿柳——轻快活泼的商调琵琶曲',
          icon: 'fas fa-leaf',
          tags: ['商调', '琵琶', '中板'],
          params: {
            mode: 'shang',
            mood: 'lively',
            tempo: 110,
            duration: 60,
            instrument: 'pipa',
            motive: '2 3 5 6 5',
            instrumental: true
          }
        }
      ],
      settings: { ...DEFAULT_SETTINGS },
      showSettings: false,
      generating: false,
      statusText: '',
      progressPercent: 0,
      result: null,
      toast: '',
      toastType: 'success',
      pollTimer: null
    }
  },
  computed: {
    toastIcon() {
      const map = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
      }
      return map[this.toastType] || map.info
    }
  },
  mounted() {
    this.loadSettings()
  },
  beforeUnmount() {
    this.clearPollTimer()
  },
  methods: {
    loadSettings() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) {
          this.settings = { ...DEFAULT_SETTINGS, ...JSON.parse(raw) }
        }
      } catch (e) {
        console.warn('[AI Compose] load settings failed', e)
      }
    },
    saveSettings() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings))
        this.showSettings = false
        this.showToast('配置已保存', 'success')
      } catch (e) {
        this.showToast('保存失败: ' + e.message, 'error')
      }
    },
    resetSettings() {
      this.settings = { ...DEFAULT_SETTINGS }
      this.showToast('已恢复默认配置(尚未保存)', 'info')
    },
    wrapUrl(url) {
      if (this.settings.corsProxy) {
        return this.settings.corsProxy + encodeURIComponent(url)
      }
      return url
    },
    buildPrompt() {
      const modeMap = {
        gong: 'Gong mode (C-based pentatonic, 1=C 2=D 3=E 5=G 6=A)',
        shang: 'Shang mode (D-based pentatonic)',
        jue: 'Jue mode (E-based pentatonic)',
        zhi: 'Zhi mode (G-based pentatonic)',
        yu: 'Yu mode (A-based pentatonic)'
      }
      const moodMap = {
        elegant: 'elegant, serene, refined, contemplative',
        heroic: 'heroic, majestic, powerful, vigorous',
        lyrical: 'lyrical, gentle, emotive, sentimental',
        lively: 'lively, joyful, brisk, playful'
      }
      const instMap = {
        guqin: 'Guqin (7-string Chinese zither)',
        guzheng: 'Guzheng (16-string Chinese zither)',
        erhu: 'Erhu (2-string Chinese fiddle)',
        dizi: 'Dizi (Chinese bamboo transverse flute)',
        pipa: 'Pipa (Chinese lute)'
      }
      let p = `Chinese traditional ${instMap[this.params.instrument]} solo music, `
      p += `${modeMap[this.params.mode]}, `
      p += `${moodMap[this.params.mood]} mood, `
      p += `tempo ${this.params.tempo} BPM, `
      p += `duration about ${this.params.duration} seconds, `
      p += `following 起承转合 (qi-cheng-zhuan-he) form: `
      p += `introduction → development → transition → conclusion. `
      p += `Use traditional Chinese ornaments: glissando, vibrato, pitch bends, harmonics, slides. `
      p += `No percussion, no western harmony progression, no synth, no drums. `
      if (this.params.motive) {
        p += `Melodic motif based on jianpu (numbered notation): ${this.params.motive}. `
        p += `Develop the motif through repetition, sequence, inversion and variation. `
      }
      if (this.params.instrumental) {
        p += `Purely instrumental, no vocals, no lyrics.`
      } else {
        p += `With gentle Chinese vocal style similar to 京剧 or 昆曲 humming.`
      }
      return p
    },
    async generate() {
      if (this.generating) return
      if (!this.settings.apiKey) {
        this.showToast('请先在右上角"接口配置"中填入 API Key', 'warning')
        this.showSettings = true
        return
      }
      this.generating = true
      this.result = null
      this.progressPercent = 5
      this.statusText = '正在提交创作任务到 AI...'
      this.clearPollTimer()

      try {
        const prompt = this.buildPrompt()
        const submitUrl = this.wrapUrl(
          `${this.settings.baseUrl.replace(/\/$/, '')}/api/v1/generate`
        )

        const submitResp = await fetch(submitUrl, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${this.settings.apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            customMode: false,
            instrumental: this.params.instrumental,
            model: 'V4_5ALL',
            prompt
          })
        })

        if (!submitResp.ok) {
          const errText = await submitResp.text().catch(() => '')
          throw new Error(
            `提交失败(HTTP ${submitResp.status})。${errText.slice(0, 200)}`
          )
        }

        const submitData = await submitResp.json()
        const taskId =
          submitData?.data?.taskId ||
          submitData?.data?.task_id ||
          submitData?.taskId

        if (!taskId) {
          throw new Error(
            submitData?.msg || submitData?.message || '未获取到 taskId,请检查 API Key 与 Base URL'
          )
        }

        this.statusText = `任务已提交 (ID: ${String(taskId).slice(0, 10)}...),AI 正在创作中`
        this.progressPercent = 15
        await this.pollTask(taskId)
      } catch (err) {
        this.generating = false
        this.progressPercent = 0
        this.showToast(`生成失败: ${err.message}`, 'error')
        console.error('[AI Compose] generate error:', err)
      }
    },
    async pollTask(taskId) {
      const maxPolls = 60
      const interval = 3000
      let count = 0

      const poll = async () => {
        count++
        if (count > maxPolls) {
          this.generating = false
          this.showToast('生成超时,请稍后重试或检查任务状态', 'warning')
          return
        }

        this.progressPercent = Math.min(95, 15 + count * 1.5)
        this.statusText = `AI 创作中... (已等待 ${count * 3} 秒)`

        try {
          const statusUrl = this.wrapUrl(
            `${this.settings.baseUrl.replace(/\/$/, '')}/api/v1/generate/record?taskId=${taskId}`
          )
          const resp = await fetch(statusUrl, {
            headers: { Authorization: `Bearer ${this.settings.apiKey}` }
          })
          if (!resp.ok) {
            console.warn('[AI Compose] poll http', resp.status)
            this.pollTimer = setTimeout(poll, interval)
            return
          }
          const data = await resp.json()
          const payload = data?.data || data
          const state =
            payload?.state || payload?.status || payload?.taskStatus || ''
          const audioUrl =
            payload?.audioUrl ||
            payload?.audio_url ||
            payload?.resultJson?.audio_url ||
            payload?.output?.audio_url
          const imageUrl =
            payload?.imageUrl ||
            payload?.image_url ||
            payload?.resultJson?.image_url ||
            payload?.output?.image_url
          const lyrics = payload?.lyrics || payload?.prompt
          const title = payload?.title
          const style = payload?.style

          if (state === 'error' || state === 'failed') {
            this.generating = false
            this.progressPercent = 0
            this.showToast(
              payload?.failMsg ||
                payload?.fail_msg ||
                payload?.errorMsg ||
                'AI 生成失败,请调整参数后重试',
              'error'
            )
            return
          }

          if (audioUrl) {
            this.progressPercent = 100
            this.result = {
              audio: audioUrl,
              cover: imageUrl,
              title: title || `AI·${this.getModeLabel(this.params.mode)}调作品`,
              style,
              lyrics,
              tip: this.randomTip(),
              params: JSON.parse(JSON.stringify(this.params)),
              createdAt: new Date().toISOString()
            }
            this.generating = false
            this.showToast('作品生成完成,点击播放试听', 'success')
            return
          }
        } catch (e) {
          console.warn('[AI Compose] poll error', e)
        }
        this.pollTimer = setTimeout(poll, interval)
      }

      await poll()
    },
    clearPollTimer() {
      if (this.pollTimer) {
        clearTimeout(this.pollTimer)
        this.pollTimer = null
      }
    },
    resetResult() {
      this.result = null
      this.progressPercent = 0
    },
    saveWork() {
      if (!this.result) return
      try {
        const works = JSON.parse(localStorage.getItem(WORKS_KEY) || '[]')
        works.unshift(this.result)
        localStorage.setItem(WORKS_KEY, JSON.stringify(works.slice(0, 50)))
        this.showToast('作品已保存到本地创作空间', 'success')
      } catch (e) {
        this.showToast('保存失败: ' + e.message, 'error')
      }
    },
    loadExample(ex) {
      this.params = JSON.parse(JSON.stringify(ex.params))
      this.showToast(`已加载示例: ${ex.title}`, 'info')
      const section = document.querySelector('.studio-section')
      if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' })
    },
    randomTip() {
      const tips = [
        '作品遵循"起承转合"结构生成,可在课堂演示时引导学生分析每个乐句的落音走向。',
        '尝试切换不同主音调式,感受宫商角徵羽带来的色彩差异。',
        '调整速度与情绪,可得到截然不同的音乐气质——同一动机的多版本对比是绝佳的教学素材。',
        '建议教师将生成结果与经典传统曲目(如《高山流水》《春江花月夜》)做对比,讲解 AI 与人类的异同。',
        '保存后的作品可作为学生作曲课作业的参考素材,鼓励他们在此基础进行二次编曲。'
      ]
      return tips[Math.floor(Math.random() * tips.length)]
    },
    getModeLabel(v) {
      return this.modes.find((m) => m.value === v)?.label || ''
    },
    getMoodLabel(v) {
      return this.moods.find((m) => m.value === v)?.label || ''
    },
    getInstrumentLabel(v) {
      return this.instruments.find((i) => i.value === v)?.label || ''
    },
    showToast(msg, type = 'success') {
      this.toast = msg
      this.toastType = type
      setTimeout(() => {
        this.toast = ''
      }, 3000)
    }
  }
}
</script>

<style scoped>
/* ===== 主题色变量(紫色,符合用户偏好) ===== */
.ai-compose {
  --ai-primary: #8b5cf6;
  --ai-dark: #7c3aed;
  --ai-light: #a78bfa;
  --ai-soft: #ede9fe;
  --ai-accent: #ec4899;
  --ai-gradient: linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%);
  --ai-soft-gradient: linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(236, 72, 153, 0.08) 100%);
  padding-top: 80px;
}

/* ===== 标题紫色化 ===== */
.ai-compose :deep(.section-title) {
  background: linear-gradient(135deg, var(--ai-dark) 0%, var(--ai-primary) 50%, var(--ai-accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.ai-compose :deep(.section-title)::after {
  background: var(--ai-gradient) !important;
}

/* ===== 工具介绍 ===== */
.intro-section {
  padding: 60px 0 40px;
}
.intro-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 40px;
  align-items: center;
}
.intro-text p {
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 16px;
}
.intro-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 24px;
}
.intro-tags .tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  background: var(--ai-soft);
  color: var(--ai-dark);
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 500;
}
.intro-visual {
  display: flex;
  justify-content: center;
}
.visual-card {
  position: relative;
  width: 240px;
  height: 240px;
  border-radius: 50%;
  background: var(--ai-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 5rem;
  box-shadow: 0 20px 50px rgba(139, 92, 246, 0.3);
}
.visual-pulse {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 2px solid rgba(139, 92, 246, 0.4);
  animation: pulseRing 2.5s ease-out infinite;
}
.visual-pulse.delay {
  animation-delay: 1.25s;
}
@keyframes pulseRing {
  0% {
    transform: scale(1);
    opacity: 0.8;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

/* ===== 创作工作台 ===== */
.studio-section {
  padding: 60px 0;
  background: var(--bg-secondary);
}
.studio-intro {
  text-align: center;
  color: var(--text-secondary);
  margin: -10px 0 40px;
}
.link-btn {
  background: none;
  border: none;
  color: var(--ai-primary);
  font-weight: 600;
  cursor: pointer;
  font-size: inherit;
  padding: 0 4px;
}
.link-btn:hover {
  text-decoration: underline;
}
.studio-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 30px;
  align-items: start;
}
.params-panel,
.result-panel {
  background: var(--surface);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  padding: 32px;
  box-shadow: var(--box-shadow);
}
.panel-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 10px;
}
.panel-title i {
  color: var(--ai-primary);
}
.result-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}
.result-actions {
  display: flex;
  gap: 8px;
}
.action-btn {
  padding: 6px 12px;
  background: var(--ai-soft);
  border: none;
  border-radius: 8px;
  color: var(--ai-dark);
  font-size: 0.85rem;
  cursor: pointer;
  transition: var(--transition-fast);
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
.action-btn:hover {
  background: var(--ai-primary);
  color: #fff;
}

/* 参数组 */
.param-group {
  margin-bottom: 24px;
}
.param-group label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 12px;
}
.param-group label small {
  color: var(--text-tertiary);
  font-weight: 400;
  font-size: 0.8rem;
}
.value-tag {
  background: var(--ai-soft);
  color: var(--ai-dark);
  padding: 2px 10px;
  border-radius: 999px;
  font-size: 0.85rem;
  font-weight: 600;
}
.param-group input[type='text'] {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--border-color);
  border-radius: 10px;
  font-size: 0.95rem;
  background: var(--surface);
  transition: var(--transition-fast);
}
.param-group input[type='text']:focus {
  outline: none;
  border-color: var(--ai-primary);
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.15);
}
.param-group input[type='range'] {
  width: 100%;
  height: 6px;
  -webkit-appearance: none;
  background: var(--bg-tertiary);
  border-radius: 3px;
  outline: none;
}
.param-group input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--ai-primary);
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(139, 92, 246, 0.4);
  transition: transform 0.15s;
}
.param-group input[type='range']::-webkit-slider-thumb:hover {
  transform: scale(1.2);
}
.param-group input[type='range']::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--ai-primary);
  cursor: pointer;
  border: none;
}
.range-marks {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  font-size: 0.78rem;
  color: var(--text-tertiary);
}
.hint {
  display: block;
  margin-top: 6px;
  font-size: 0.78rem;
  color: var(--text-tertiary);
}

/* 选项网格 */
.option-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
}
.option-btn {
  padding: 10px 8px;
  background: var(--surface);
  border: 1.5px solid var(--border-color);
  border-radius: 10px;
  cursor: pointer;
  transition: var(--transition-fast);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  text-align: center;
}
.option-btn:hover {
  border-color: var(--ai-light);
  background: var(--ai-soft);
}
.option-btn.active {
  border-color: var(--ai-primary);
  background: var(--ai-soft);
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.15);
}
.opt-title {
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--text-primary);
}
.option-btn.active .opt-title {
  color: var(--ai-dark);
}
.opt-desc {
  font-size: 0.7rem;
  color: var(--text-tertiary);
}
.opt-emoji {
  font-size: 1.2rem;
  line-height: 1;
}
.mood-btn .opt-title {
  margin-top: 4px;
}

/* 乐器网格 */
.instrument-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
}
.inst-btn {
  padding: 14px 6px;
  background: var(--surface);
  border: 1.5px solid var(--border-color);
  border-radius: 12px;
  cursor: pointer;
  transition: var(--transition-fast);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  font-size: 0.82rem;
  color: var(--text-secondary);
}
.inst-btn i {
  font-size: 1.4rem;
}
.inst-btn:hover {
  border-color: var(--ai-light);
  color: var(--ai-dark);
}
.inst-btn.active {
  border-color: var(--ai-primary);
  background: var(--ai-soft);
  color: var(--ai-dark);
}
.inst-btn.active i {
  color: var(--ai-primary);
}

/* 切换按钮 */
.toggle-group {
  display: flex;
  gap: 8px;
  background: var(--bg-tertiary);
  padding: 4px;
  border-radius: 10px;
}
.toggle-btn {
  flex: 1;
  padding: 10px;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  color: var(--text-secondary);
  transition: var(--transition-fast);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
.toggle-btn.active {
  background: var(--surface);
  color: var(--ai-dark);
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);
  font-weight: 600;
}

/* 生成按钮 */
.generate-btn {
  width: 100%;
  margin-top: 8px;
  padding: 14px;
  background: var(--ai-gradient);
  border: none;
  border-radius: 12px;
  color: #fff;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: 0 8px 20px rgba(139, 92, 246, 0.35);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
.generate-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 28px rgba(139, 92, 246, 0.45);
}
.generate-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.gen-tip {
  margin-top: 12px;
  padding: 10px 14px;
  background: rgba(139, 92, 246, 0.06);
  border-left: 3px solid var(--ai-primary);
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.6;
}
.gen-tip a {
  color: var(--ai-primary);
  font-weight: 600;
}

/* 结果面板 */
.result-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 360px;
  color: var(--text-tertiary);
  text-align: center;
  font-size: 0.95rem;
  line-height: 1.8;
}
.empty-icon {
  position: relative;
  width: 100px;
  height: 100px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: var(--ai-light);
}
.empty-ring {
  position: absolute;
  inset: 0;
  border: 2px dashed var(--ai-light);
  border-radius: 50%;
  opacity: 0.5;
  animation: spin 20s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}

.result-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 360px;
  text-align: center;
}
.loading-orb {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  color: var(--ai-primary);
  margin-bottom: 24px;
}
.orb-ring {
  position: absolute;
  inset: 0;
  border: 2px solid transparent;
  border-top-color: var(--ai-primary);
  border-right-color: var(--ai-primary);
  border-radius: 50%;
  animation: spin 1.5s linear infinite;
}
.orb-ring:nth-child(2) {
  inset: 12px;
  border-top-color: var(--ai-accent);
  border-right-color: var(--ai-accent);
  animation-duration: 2s;
  animation-direction: reverse;
}
.orb-ring:nth-child(3) {
  inset: 24px;
  border-top-color: var(--ai-light);
  border-right-color: var(--ai-light);
  animation-duration: 2.5s;
}
.loading-status {
  color: var(--text-primary);
  font-weight: 500;
  margin-bottom: 16px;
}
.loading-progress {
  width: 80%;
  max-width: 320px;
  height: 6px;
  background: var(--bg-tertiary);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 16px;
}
.loading-progress .progress-bar {
  height: 100%;
  background: var(--ai-gradient);
  border-radius: 3px;
  transition: width 0.4s ease;
}
.loading-tip {
  color: var(--text-tertiary);
  font-size: 0.85rem;
}

/* 结果内容 */
.result-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.result-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.meta-tag {
  padding: 4px 12px;
  background: var(--ai-soft);
  color: var(--ai-dark);
  border-radius: 999px;
  font-size: 0.82rem;
  font-weight: 500;
}

.audio-player {
  display: flex;
  gap: 20px;
  padding: 20px;
  background: var(--ai-soft-gradient);
  border-radius: 16px;
  border: 1px solid rgba(139, 92, 246, 0.15);
}
.player-cover {
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  border-radius: 12px;
  overflow: hidden;
  background: var(--ai-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 2.5rem;
}
.player-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.player-cover.placeholder .spinning {
  animation: spin 4s linear infinite;
}
.player-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.player-info h4 {
  font-size: 1.1rem;
  color: var(--text-primary);
  margin-bottom: 4px;
}
.player-meta {
  color: var(--text-tertiary);
  font-size: 0.85rem;
  margin-bottom: 8px;
}
.audio-el {
  width: 100%;
  height: 36px;
}

.result-lyrics {
  background: var(--bg-secondary);
  border-radius: 12px;
  padding: 16px 20px;
}
.result-lyrics h5 {
  font-size: 0.92rem;
  color: var(--ai-dark);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
}
.result-lyrics pre {
  white-space: pre-wrap;
  word-break: break-word;
  font-family: 'Noto Sans SC', sans-serif;
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.7;
}

.result-tips {
  padding: 12px 16px;
  background: rgba(245, 158, 11, 0.08);
  border-left: 3px solid #f59e0b;
  border-radius: 6px;
  font-size: 0.85rem;
  color: var(--text-secondary);
  display: flex;
  align-items: flex-start;
  gap: 10px;
}
.result-tips i {
  color: #f59e0b;
  flex-shrink: 0;
  margin-top: 2px;
}

/* ===== 教学应用 ===== */
.apply-section {
  padding: 70px 0;
}
.apply-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
  margin-top: 40px;
}
.apply-card {
  background: var(--surface);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
  transition: var(--transition);
  box-shadow: var(--box-shadow);
}
.apply-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--box-shadow-hover);
  border-color: rgba(139, 92, 246, 0.3);
}
.apply-card i {
  font-size: 2.5rem;
  color: var(--ai-primary);
  margin-bottom: 16px;
  display: inline-block;
  width: 64px;
  height: 64px;
  line-height: 64px;
  border-radius: 50%;
  background: var(--ai-soft);
}
.apply-card h3 {
  font-size: 1.15rem;
  color: var(--text-primary);
  margin-bottom: 12px;
}
.apply-card p {
  color: var(--text-secondary);
  line-height: 1.7;
  font-size: 0.92rem;
}

/* ===== 灵感库 ===== */
.inspire-section {
  padding: 70px 0 90px;
  background: var(--bg-secondary);
}
.inspire-intro {
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 40px;
}
.inspire-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}
.inspire-card {
  background: var(--surface);
  border: 1px solid var(--border-color);
  border-radius: 16px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 18px;
  cursor: pointer;
  transition: var(--transition);
  box-shadow: var(--box-shadow);
}
.inspire-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--box-shadow-hover);
  border-color: rgba(139, 92, 246, 0.4);
}
.inspire-thumb {
  flex-shrink: 0;
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: var(--ai-gradient);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
}
.inspire-info {
  flex: 1;
  min-width: 0;
}
.inspire-info h4 {
  font-size: 1.05rem;
  color: var(--text-primary);
  margin-bottom: 4px;
}
.inspire-info p {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 8px;
}
.inspire-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.inspire-tag {
  font-size: 0.72rem;
  padding: 2px 8px;
  background: var(--ai-soft);
  color: var(--ai-dark);
  border-radius: 999px;
}
.inspire-arrow {
  color: var(--ai-primary);
  font-size: 1rem;
  transition: transform 0.2s;
}
.inspire-card:hover .inspire-arrow {
  transform: translateX(4px);
}

/* ===== 设置弹窗 ===== */
.modal {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(8px);
  z-index: 2000;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
.modal.active {
  display: flex;
}
.settings-modal {
  background: var(--surface);
  border-radius: 20px;
  max-width: 520px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.25);
  animation: modalIn 0.25s ease;
}
@keyframes modalIn {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.settings-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-color);
}
.settings-header h3 {
  font-size: 1.15rem;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 8px;
}
.settings-header h3 i {
  color: var(--ai-primary);
}
.close-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: var(--text-tertiary);
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: var(--transition-fast);
}
.close-btn:hover {
  background: var(--bg-tertiary);
  color: var(--text-primary);
}
.settings-body {
  padding: 24px;
}
.setting-group {
  margin-bottom: 18px;
}
.setting-group label {
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 6px;
}
.setting-group input {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-size: 0.9rem;
  font-family: monospace;
}
.setting-group input:focus {
  outline: none;
  border-color: var(--ai-primary);
  box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.15);
}
.setting-help {
  margin-top: 20px;
  padding: 14px 16px;
  background: var(--bg-secondary);
  border-radius: 10px;
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.8;
}
.setting-help p:first-child {
  color: var(--ai-dark);
  font-weight: 600;
  margin-bottom: 6px;
}
.setting-help a {
  color: var(--ai-primary);
  text-decoration: underline;
}
.settings-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 16px 24px;
  border-top: 1px solid var(--border-color);
}
.btn-primary,
.btn-secondary {
  padding: 10px 20px;
  border-radius: 8px;
  font-size: 0.92rem;
  font-weight: 500;
  cursor: pointer;
  border: none;
  transition: var(--transition-fast);
}
.btn-primary {
  background: var(--ai-gradient);
  color: #fff;
  box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);
}
.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(139, 92, 246, 0.4);
}
.btn-secondary {
  background: var(--bg-tertiary);
  color: var(--text-secondary);
}
.btn-secondary:hover {
  background: var(--border-color);
}

/* ===== Toast ===== */
.toast {
  position: fixed;
  top: 100px;
  right: 30px;
  padding: 12px 20px;
  background: var(--surface);
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.15);
  z-index: 3000;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 0.92rem;
  font-weight: 500;
  border-left: 4px solid var(--ai-primary);
}
.toast.success {
  color: #10b981;
  border-left-color: #10b981;
}
.toast.error {
  color: #ef4444;
  border-left-color: #ef4444;
}
.toast.warning {
  color: #f59e0b;
  border-left-color: #f59e0b;
}
.toast.info {
  color: var(--ai-primary);
  border-left-color: var(--ai-primary);
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

/* ===== 响应式 ===== */
@media (max-width: 900px) {
  .intro-grid,
  .studio-grid {
    grid-template-columns: 1fr;
  }
  .intro-visual {
    order: -1;
  }
  .visual-card {
    width: 180px;
    height: 180px;
    font-size: 3.5rem;
  }
}
@media (max-width: 600px) {
  .option-grid,
  .instrument-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .params-panel,
  .result-panel {
    padding: 20px;
  }
  .audio-player {
    flex-direction: column;
  }
  .player-cover {
    width: 100%;
    height: 160px;
  }
}
</style>
