<template>
  <div class="register">
    <header class="page-header">
      <div class="page-header-overlay"></div>
      <div class="page-header-content container">
        <div>
          <h1>学员注册</h1>
          <div class="breadcrumb">
            <router-link to="/">首页</router-link>
            <span>/</span>
            <router-link to="/register">学员注册</router-link>
          </div>
        </div>
      </div>
    </header>

    <section class="register-section">
      <div class="container">
        <div class="register-container">
          <h2 class="section-title">学员注册</h2>
          <p class="register-intro">注册成为学员,开启您的音乐学习之旅</p>

          <!-- 步骤条 -->
          <div class="register-steps">
            <div class="step" :class="{ active: step >= 1 }">
              <div class="step-number">1</div>
              <div class="step-text">填写信息</div>
            </div>
            <div class="step" :class="{ active: step >= 2 }">
              <div class="step-number">2</div>
              <div class="step-text">验证信息</div>
            </div>
            <div class="step" :class="{ active: step >= 3 }">
              <div class="step-number">3</div>
              <div class="step-text">完成注册</div>
            </div>
          </div>

          <!-- 步骤1:填写信息 -->
          <form v-if="step === 1" @submit.prevent="goToStep2">
            <div class="form-group">
              <label for="username">用户名</label>
              <div class="input-with-icon">
                <input
                  type="text"
                  id="username"
                  v-model="form.username"
                  class="form-control"
                  placeholder="请输入4-16位字母、数字或下划线"
                  pattern="[a-zA-Z0-9_]{4,16}"
                  required
                />
                <i class="fas fa-user"></i>
              </div>
            </div>

            <div class="form-group">
              <label for="password">密码</label>
              <div class="input-with-icon">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  v-model="form.password"
                  class="form-control"
                  placeholder="请输入6-20位密码"
                  pattern=".{6,20}"
                  required
                />
                <i
                  :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
                  @click="showPassword = !showPassword"
                  style="cursor: pointer;"
                ></i>
              </div>
            </div>

            <div class="form-group">
              <label for="confirmPassword">确认密码</label>
              <div class="input-with-icon">
                <input
                  type="password"
                  id="confirmPassword"
                  v-model="form.confirmPassword"
                  class="form-control"
                  placeholder="请再次输入密码"
                  required
                />
                <i class="fas fa-lock"></i>
              </div>
              <p v-if="form.confirmPassword && form.password !== form.confirmPassword" class="field-error">
                两次输入的密码不一致
              </p>
            </div>

            <div class="form-group">
              <label for="email">电子邮箱</label>
              <div class="input-with-icon">
                <input
                  type="email"
                  id="email"
                  v-model="form.email"
                  class="form-control"
                  placeholder="请输入您的电子邮箱"
                  required
                />
                <i class="fas fa-envelope"></i>
              </div>
            </div>

            <div class="form-group">
              <label for="phone">手机号码</label>
              <div class="sms-group">
                <div class="sms-input">
                  <input
                    type="tel"
                    id="phone"
                    v-model="form.phone"
                    class="form-control"
                    placeholder="请输入您的手机号码"
                    pattern="1[3-9]\d{9}"
                    required
                  />
                </div>
                <button
                  type="button"
                  class="btn btn-sms"
                  :disabled="smsCounting > 0"
                  @click="sendSms"
                >
                  {{ smsCounting > 0 ? `${smsCounting}s后重试` : '获取验证码' }}
                </button>
              </div>
            </div>

            <button type="submit" class="btn btn-primary btn-next">下一步</button>
          </form>

          <!-- 步骤2:验证信息 -->
          <form v-else-if="step === 2" @submit.prevent="goToStep3">
            <div class="form-group">
              <label for="smsCode">短信验证码</label>
              <input
                type="text"
                id="smsCode"
                v-model="form.smsCode"
                class="form-control"
                placeholder="请输入短信验证码"
                required
              />
            </div>

            <div class="form-group">
              <label for="captcha">图形验证码</label>
              <div class="captcha-group">
                <input
                  type="text"
                  id="captcha"
                  v-model="form.captcha"
                  class="form-control"
                  placeholder="请输入图形验证码"
                  required
                />
                <div class="captcha-img" @click="refreshCaptcha">
                  {{ captchaText }}
                </div>
              </div>
            </div>

            <div class="form-group">
              <label>
                <input type="checkbox" v-model="form.agree" required />
                我已阅读并同意<a href="#">《用户协议》</a>和<a href="#">《隐私政策》</a>
              </label>
            </div>

            <div class="step-buttons">
              <button type="button" class="btn btn-outline" @click="step = 1">上一步</button>
              <button type="submit" class="btn btn-primary">提交注册</button>
            </div>
          </form>

          <!-- 步骤3:完成 -->
          <div v-else class="register-success">
            <i class="fas fa-check-circle success-icon"></i>
            <h3>注册成功!</h3>
            <p>欢迎加入乐脉工坊,开启您的音乐学习之旅</p>
            <div class="success-actions">
              <router-link to="/login" class="btn btn-primary">立即登录</router-link>
              <router-link to="/" class="btn btn-outline">返回首页</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'RegisterView',
  data() {
    return {
      step: 1,
      showPassword: false,
      smsCounting: 0,
      captchaText: '',
      form: {
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        phone: '',
        smsCode: '',
        captcha: '',
        agree: false
      }
    }
  },
  mounted() {
    this.refreshCaptcha()
  },
  methods: {
    goToStep2() {
      if (this.form.password !== this.form.confirmPassword) {
        alert('两次输入的密码不一致')
        return
      }
      this.step = 2
    },
    goToStep3() {
      if (!this.form.agree) {
        alert('请阅读并同意用户协议')
        return
      }
      this.step = 3
    },
    sendSms() {
      if (!/^1[3-9]\d{9}$/.test(this.form.phone)) {
        alert('请输入正确的手机号码')
        return
      }
      this.smsCounting = 60
      const timer = setInterval(() => {
        this.smsCounting--
        if (this.smsCounting <= 0) {
          clearInterval(timer)
        }
      }, 1000)
      alert('验证码已发送(模拟)')
    },
    refreshCaptcha() {
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
      this.captchaText = Array.from(
        { length: 4 },
        () => chars[Math.floor(Math.random() * chars.length)]
      ).join('')
    }
  }
}
</script>

<style scoped>
.page-header {
  position: relative;
  padding: 140px 0 70px;
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 50%, #ecfeff 100%);
  margin-top: 70px;
  overflow: hidden;
}

.page-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(ellipse at top right, rgba(14, 165, 233, 0.15) 0%, transparent 60%),
    radial-gradient(ellipse at bottom left, rgba(139, 92, 246, 0.1) 0%, transparent 60%);
  pointer-events: none;
}

.page-header-overlay {
  display: none;
}

.page-header-content {
  position: relative;
  z-index: 2;
  color: var(--text-primary);
}

.page-header-content h1 {
  font-size: 2.5rem;
  margin-bottom: 10px;
  background: linear-gradient(135deg, var(--text-primary) 0%, var(--primary-color) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
}

.breadcrumb {
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 0.95rem;
}

.breadcrumb a {
  color: var(--text-secondary);
}

.breadcrumb a:hover {
  color: var(--primary-color);
}

.breadcrumb span {
  color: var(--text-tertiary);
}

.register-section {
  padding: 60px 0;
}

.register-container {
  max-width: 550px;
  margin: 0 auto;
  background-color: var(--white-color);
  padding: 40px;
  border-radius: 8px;
  box-shadow: var(--box-shadow);
}

.register-intro {
  text-align: center;
  margin-bottom: 30px;
  color: var(--gray-color);
}

/* 步骤条 */
.register-steps {
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  position: relative;
}

.register-steps::before {
  content: '';
  position: absolute;
  top: 20px;
  left: 10%;
  right: 10%;
  height: 2px;
  background-color: #ddd;
  z-index: 0;
}

.step {
  text-align: center;
  position: relative;
  z-index: 1;
  flex: 1;
}

.step-number {
  width: 40px;
  height: 40px;
  margin: 0 auto 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #eee;
  color: var(--gray-color);
  border-radius: 50%;
  font-weight: 600;
  border: 3px solid var(--white-color);
  transition: var(--transition);
}

.step.active .step-number {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: var(--white-color);
}

.step-text {
  font-size: 0.9rem;
  color: var(--gray-color);
}

.step.active .step-text {
  color: var(--secondary-color);
  font-weight: 500;
}

/* 表单 */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  transition: var(--transition);
}

.form-control:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(21, 120, 138, 0.1);
}

.input-with-icon {
  position: relative;
}

.input-with-icon input {
  padding-right: 40px;
}

.input-with-icon i {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--gray-color);
}

.field-error {
  color: #dc3545;
  font-size: 0.85rem;
  margin-top: 5px;
}

.sms-group {
  display: flex;
  gap: 10px;
}

.sms-input {
  flex: 1;
}

.btn-sms {
  white-space: nowrap;
  padding: 12px 20px;
  background-color: var(--surface-2, #f8f9fa);
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: var(--transition);
}

.btn-sms:hover:not(:disabled) {
  background-color: var(--primary-color);
  color: var(--white-color);
}

.btn-sms:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.captcha-group {
  display: flex;
  gap: 10px;
  align-items: center;
}

.captcha-group .form-control {
  flex: 1;
}

.captcha-img {
  width: 100px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1.3rem;
  font-weight: bold;
  letter-spacing: 3px;
  cursor: pointer;
  user-select: none;
  font-style: italic;
}

.btn-next,
.step-buttons .btn-primary {
  width: 100%;
  padding: 14px;
  font-size: 1.1rem;
  margin-top: 10px;
}

.step-buttons {
  display: flex;
  gap: 15px;
  margin-top: 10px;
}

.step-buttons .btn {
  flex: 1;
  padding: 14px;
  font-size: 1rem;
}

/* 成功页面 */
.register-success {
  text-align: center;
  padding: 30px 0;
}

.success-icon {
  font-size: 4rem;
  color: #28a745;
  margin-bottom: 20px;
}

.register-success h3 {
  font-size: 1.8rem;
  color: var(--secondary-color);
  margin-bottom: 10px;
}

.register-success p {
  color: var(--gray-color);
  margin-bottom: 30px;
}

.success-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.success-actions .btn {
  padding: 12px 30px;
}
</style>
