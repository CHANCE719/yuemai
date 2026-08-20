<template>
  <div class="login">
    <section class="login-section">
      <div class="container">
        <div class="login-container">
          <h2 class="login-title">欢迎回来</h2>
          <p class="login-subtitle">登录开启您的音乐学习之旅</p>
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="username">用户名</label>
              <div class="input-with-icon">
                <input
                  type="text"
                  id="username"
                  v-model="form.username"
                  class="form-control"
                  placeholder="请输入用户名或邮箱"
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
                  placeholder="请输入密码"
                  required
                />
                <i
                  :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-lock'"
                  @click="showPassword = !showPassword"
                  style="cursor: pointer;"
                ></i>
              </div>
            </div>
            <div class="remember-forgot">
              <div class="remember-me">
                <input type="checkbox" id="remember" v-model="form.remember" />
                <label for="remember">记住我</label>
              </div>
              <a href="#" class="forgot-password">忘记密码?</a>
            </div>
            <button type="submit" class="btn btn-primary btn-login-form">登录</button>
            <p v-if="error" class="error-message">{{ error }}</p>

            <div class="social-login">
              <p>或使用社交账号登录</p>
              <div class="social-login-buttons">
                <a href="#" class="social-btn btn-wechat"><i class="fab fa-weixin"></i></a>
                <a href="#" class="social-btn btn-weibo"><i class="fab fa-weibo"></i></a>
                <a href="#" class="social-btn btn-qq"><i class="fab fa-qq"></i></a>
              </div>
            </div>

            <div class="register-link">
              <span>还没有账号?</span> <router-link to="/register">立即注册</router-link>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      showPassword: false,
      error: '',
      form: {
        username: '',
        password: '',
        remember: false
      }
    }
  },
  methods: {
    handleSubmit() {
      if (!this.form.username || !this.form.password) {
        this.error = '请填写用户名和密码'
        return
      }
      // 模拟登录
      this.error = ''
      alert('登录成功!(模拟)')
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

.login-section {
  padding: 40px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 70px - 290px);
}

.login-section .container {
  width: 100%;
  max-width: 450px;
  padding: 0;
  display: flex;
  justify-content: center;
}

.login-container {
  max-width: 450px;
  width: 100%;
  background-color: var(--white-color);
  padding: 48px 40px;
  border-radius: 16px;
  box-shadow: var(--box-shadow);
  border: 1px solid var(--border-color);
}

.login-title {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 8px;
  color: var(--text-primary);
  font-weight: 700;
}

.login-subtitle {
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 32px;
  font-size: 0.95rem;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.input-with-icon {
  position: relative;
}

.input-with-icon input {
  width: 100%;
  padding: 12px 40px 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  transition: var(--transition);
}

.input-with-icon input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(21, 120, 138, 0.1);
}

.input-with-icon i {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--gray-color);
}

.remember-forgot {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
  font-size: 0.9rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 5px;
}

.forgot-password {
  color: var(--primary-color);
}

.btn-login-form {
  width: 100%;
  padding: 14px;
  font-size: 1.1rem;
}

.error-message {
  margin-top: 15px;
  padding: 10px;
  background-color: rgba(220, 53, 69, 0.1);
  color: #dc3545;
  border-radius: 4px;
  text-align: center;
}

.social-login {
  text-align: center;
  margin-top: 30px;
  padding-top: 25px;
  border-top: 1px solid #eee;
}

.social-login p {
  color: var(--gray-color);
  margin-bottom: 15px;
  font-size: 0.9rem;
}

.social-login-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
}

.social-btn {
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: var(--white-color);
  font-size: 1.2rem;
  transition: var(--transition);
}

.btn-wechat {
  background-color: #07c160;
}

.btn-weibo {
  background-color: #e6162d;
}

.btn-qq {
  background-color: #12b7f5;
}

.social-btn:hover {
  transform: translateY(-5px);
}

.register-link {
  text-align: center;
  margin-top: 20px;
  color: var(--gray-color);
}

.register-link a {
  color: var(--primary-color);
  font-weight: 500;
}
</style>
