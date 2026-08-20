<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-col">
          <h3>关于我们</h3>
          <p>
            乐脉工坊成立于2025年,是专注于音乐教育的大学生创业平台,以"科技赋能教育、数字激活经典"为核心,致力于为各个年龄段的音乐爱好者提供高质量的音乐教育服务。
          </p>
          <div class="social-links">
            <a href="#"><i class="fab fa-weixin"></i></a>
            <a href="#"><i class="fab fa-weibo"></i></a>
            <a href="#"><i class="fab fa-qq"></i></a>
            <a href="#"><i class="fab fa-tiktok"></i></a>
          </div>
        </div>
        <div class="footer-col">
          <h3>快速链接</h3>
          <ul>
            <li><router-link to="/">首页</router-link></li>
            <li><router-link to="/about">关于我们</router-link></li>
            <li><router-link to="/categories">课程介绍</router-link></li>
            <li><router-link to="/techniques">教学方法</router-link></li>
            <li><router-link to="/resources">教学保障</router-link></li>
          </ul>
        </div>
        <div class="footer-col">
          <h3>资源</h3>
          <ul>
            <li><a href="#">学习资料</a></li>
            <li><a href="#">教学视频</a></li>
            <li><a href="#">音乐欣赏</a></li>
            <li><a href="#">比赛信息</a></li>
            <li><a href="#">学员作品</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h3>联系我们</h3>
          <p><i class="fas fa-map-marker-alt"></i> 大连市沙河口区尖山街217号</p>
          <p><i class="fas fa-phone"></i> 18640903868</p>
          <p><i class="fas fa-envelope"></i> 1808832146@qq.com</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2026 乐脉工坊. 保留所有权利.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter'
}
</script>
