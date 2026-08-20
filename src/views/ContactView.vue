<template>
  <div class="contact">
    <PageHeader title="联系我们" />

    <section class="contact-section">
      <div class="container">
        <h2 class="section-title" v-scroll-animation>联系方式</h2>
        <div class="contact-container">
          <!-- 联系信息 -->
          <div class="contact-info" v-scroll-animation>
            <h3>联系方式</h3>

            <div class="contact-item">
              <div class="contact-icon">
                <i class="fas fa-map-marker-alt"></i>
              </div>
              <div class="contact-text">
                <h4>地址</h4>
                <p>大连市沙河口区尖山街217号</p>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-icon">
                <i class="fas fa-phone-alt"></i>
              </div>
              <div class="contact-text">
                <h4>电话</h4>
                <p>18640903868 (咨询热线)</p>
                <p>010-12345678 (办公室)</p>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-icon">
                <i class="fas fa-envelope"></i>
              </div>
              <div class="contact-text">
                <h4>电子邮箱</h4>
                <p>1808832146@qq.com</p>
              </div>
            </div>

            <div class="contact-item">
              <div class="contact-icon">
                <i class="fas fa-clock"></i>
              </div>
              <div class="contact-text">
                <h4>营业时间</h4>
                <p>周一至周五: 9:00 - 21:00</p>
                <p>周六日: 9:00 - 18:00</p>
                <p>法定节假日另行通知</p>
              </div>
            </div>

            <h3 style="margin-top: 30px;">关注我们</h3>
            <div class="social-media">
              <a href="#"><i class="fab fa-weixin"></i></a>
              <a href="#"><i class="fab fa-weibo"></i></a>
              <a href="#"><i class="fab fa-qq"></i></a>
              <a href="#"><i class="fab fa-tiktok"></i></a>
              <a href="#"><i class="fab fa-youtube"></i></a>
            </div>
          </div>

          <!-- 在线表单 -->
          <div class="contact-form" v-scroll-animation>
            <h3>在线咨询</h3>
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <label for="name">姓名</label>
                <input
                  type="text"
                  id="name"
                  v-model="form.name"
                  class="form-control"
                  placeholder="请输入您的姓名"
                  required
                />
              </div>
              <div class="form-group">
                <label for="email">电子邮箱</label>
                <input
                  type="email"
                  id="email"
                  v-model="form.email"
                  class="form-control"
                  placeholder="请输入您的电子邮箱"
                  required
                />
              </div>
              <div class="form-group">
                <label for="phone">联系电话</label>
                <input
                  type="tel"
                  id="phone"
                  v-model="form.phone"
                  class="form-control"
                  placeholder="请输入您的联系电话"
                />
              </div>
              <div class="form-group">
                <label for="subject">咨询课程</label>
                <input
                  type="text"
                  id="subject"
                  v-model="form.subject"
                  class="form-control"
                  placeholder="请输入您感兴趣的课程"
                  required
                />
              </div>
              <div class="form-group">
                <label for="message">留言内容</label>
                <textarea
                  id="message"
                  v-model="form.message"
                  class="form-control"
                  placeholder="请输入您的留言内容"
                  rows="5"
                  required
                ></textarea>
              </div>
              <button type="submit" class="btn btn-primary form-submit">提交咨询</button>
              <p v-if="submitted" class="success-message">
                <i class="fas fa-check-circle"></i> 提交成功!我们会尽快与您联系。
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue'

export default {
  name: 'ContactView',
  components: { PageHeader },
  data() {
    return {
      submitted: false,
      form: {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      }
    }
  },
  methods: {
    handleSubmit() {
      // 模拟提交
      this.submitted = true
      setTimeout(() => {
        this.submitted = false
        this.resetForm()
      }, 3000)
    },
    resetForm() {
      this.form = {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      }
    }
  }
}
</script>

<style scoped>
.contact-section {
  padding: 80px 0;
}

.contact-container {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 40px;
  margin-top: 40px;
}

.contact-info {
  background-color: var(--white-color);
  padding: 35px;
  border-radius: 8px;
  box-shadow: var(--box-shadow);
}

.contact-info h3 {
  font-size: 1.4rem;
  margin-bottom: 20px;
  color: var(--secondary-color);
}

.contact-item {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
}

.contact-icon {
  width: 45px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: 50%;
  flex-shrink: 0;
}

.contact-icon i {
  color: var(--white-color);
  font-size: 1.1rem;
}

.contact-text h4 {
  font-size: 1rem;
  margin-bottom: 5px;
  color: var(--dark-color);
}

.contact-text p {
  color: var(--gray-color);
  font-size: 0.95rem;
  margin-bottom: 3px;
}

.social-media {
  display: flex;
  gap: 12px;
}

.social-media a {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #333;
  color: var(--white-color);
  border-radius: 50%;
  transition: var(--transition);
}

.social-media a:hover {
  background-color: var(--primary-color);
  transform: translateY(-5px);
}

/* 表单 */
.contact-form {
  background-color: var(--white-color);
  padding: 35px;
  border-radius: 8px;
  box-shadow: var(--box-shadow);
}

.contact-form h3 {
  font-size: 1.4rem;
  margin-bottom: 25px;
  color: var(--secondary-color);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--dark-color);
}

.form-control {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
  transition: var(--transition);
  background-color: var(--white-color);
  color: var(--dark-color);
}

.form-control:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(21, 120, 138, 0.1);
}

textarea.form-control {
  resize: vertical;
}

.form-submit {
  width: 100%;
  padding: 14px;
  font-size: 1.1rem;
}

.success-message {
  margin-top: 15px;
  padding: 12px;
  background-color: rgba(40, 167, 69, 0.1);
  color: #28a745;
  border-radius: 4px;
  text-align: center;
}

@media (max-width: 768px) {
  .contact-container {
    grid-template-columns: 1fr;
  }
}
</style>
