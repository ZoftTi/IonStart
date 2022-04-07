<template>
  <div class="footer">
    <div class="copyrightBox">
      © {{ new Date().getFullYear() }} 柒橙 & 极染
      <span v-if="!store.state.setting.mini_footer_info">
        <a href="https://beian.miit.gov.cn/">｜粤ICP备2021151070号</a>
        <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44170202000312"> | 粤公网安备 44170202000312号 </a>
      </span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue"
import { useStore } from "vuex"
export default defineComponent({
  name: "Footer",
  setup() {
    const store = useStore()
    return {
      store
    }
  },
})
</script>

<style lang="less" scoped>
.dark .footer .copyrightBox {
  background-color: rgba(29, 29, 29, 0.1);
}

.footer {
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);

  .copyrightBox {
    color: white;
    font-size: 12px;
    padding: 5px 10px;

    background-color: rgba(220, 220, 228, 0.05);
    backdrop-filter: blur(30px);
    transition: background-color 0.4s ease;
    -webkit-transition: background-color 0.4s ease;

    opacity: 0.7;
    border-radius: 8px;

    a {
      text-decoration: none;

      &:link,
      &:visited {
        color: white;
      }
    }
  }
}
</style>
