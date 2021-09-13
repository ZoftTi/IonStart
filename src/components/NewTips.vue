<template>
  <transition name="fade-out">
    <div class="new_tips flex-center" v-if="container">
      <transition name="stretch">
        <div class="new_tips_content" v-if="store.state.newTips">
          <div class="header">
            <div class="header_title">
              迭代日志
              <span class="operation_new_tips">
                「
                <span @click="switchNewTips(newTipsArray.length - 1)"
                  >最新</span
                >
                <span
                  v-if="newTipsArray.length > 1 && newTipsIndex > 0"
                  @click="switchNewTips(newTipsIndex - 1)"
                >
                  | 前</span
                >
                <span
                  v-if="
                    newTipsArray.length > 1 &&
                    newTipsIndex < newTipsArray.length - 1
                  "
                  @click="switchNewTips(newTipsIndex + 1)"
                >
                  | 后</span
                >
                」
              </span>
            </div>
            <div class="line"></div>
            <div class="tags_group">
              <div class="tags" v-for="item in newTipsArray[newTipsIndex].tags">
                {{ item }}
              </div>
            </div>
          </div>
          <div class="content">
            <p v-for="item in newTipsArray[newTipsIndex].text">{{ item }}</p>
          </div>
          <div class="footer">
            <input type="button" value="不再显示" @click="closeNewTips()" />
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import { defineComponent, onMounted, reactive, ref, toRef } from "vue"
import { useStore } from "vuex"
export default defineComponent({
  name: "App",
  setup() {
    const store = useStore()
    const container = ref(store.state.newTips)

    const closeNewTips = () => {
      store.commit("TOGGLE_NEWTIPS")
      setTimeout(() => {
        container.value = false
      }, 500)
    }

    const newTipsArray = reactive([
      {
        tags: ["Vue", "重构", "更新", "Vuex", "Axios"],
        time: "2021.09.09",
        version: "1.1",
        text: [
          "2021.09.09 上线",
          "新版使用 Vue 重构",
          "历时两个月",
          "增加了设置、背景设置两个默认应用",
          "增加了各种属性的自定义数值",
          "增加了从本地选取自定义背景图片功能",
          "本次更新无法保存上一版的的数据 「 重要 」",
        ],
      },
      {
        tags: ["Vue", "新功能", "更新", "修Bug"],
        time: "2021.09.10",
        version: "1.2",
        text: [
          "2021.09.10 上线",
          "修复了背景设置应用点击导致位置错误的问题",
          "修复了某些情况下毛玻璃特效不显示的问题",
          "修改了开关(Switch)的样式",
          "修改了滑条(Range)的样式",
          "修改了设置和背景设置两个应用的样式",
          "增加了深色模式 && 自动深色模式( 跟随系统 )",
          "增加了收藏网址栏拖拽排序功能",
        ],
      },
    ])

    const newTipsIndex = ref(newTipsArray.length - 1)

    const switchNewTips = (index) => {
      if (index >= 0 && index < newTipsArray.length) {
        newTipsIndex.value = index
      }
    }

    onMounted(() => {
      const version = ref(window.localStorage.getItem("version"))
      
      if (version.value === null || version.value < newTipsArray[newTipsArray.length - 1].version) {
        window.localStorage.setItem(
          "version",
          newTipsArray[newTipsArray.length - 1].version
        )
        store.commit("TOGGLE_NEWTIPS", true)
        window.location.reload()
      }
    })

    return {
      store,
      closeNewTips,
      container,
      newTipsArray,
      newTipsIndex,
      switchNewTips,
    }
  },
})
</script>

<style lang="less">
.stretch-leave-active {
  animation: stretch-out 0.6s;
}
@keyframes stretch-out {
  0% {
    width: 740px;
    opacity: 1;
    transform: scale(1);
  }
  100% {
    width: 0;
    opacity: 0;
    transform: scale(0.6);
    color: rgba(0, 0, 0, 0);
  }
}

.fade-out-leave-active {
  animation: fade-out 0.6s;
}
@keyframes fade-out {
  0% {
    background-color: rgba(0, 0, 0, 0.4);
  }
  100% {
    background-color: rgba(0, 0, 0, 0);
  }
}

.new_tips {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);

  .new_tips_content {
    width: 750px;
    height: 520px;
    border-radius: 10px;
    position: relative;
    overflow: hidden;

    background-color: var(--custom-fill-color);
    -webkit-backdrop-filter: blur(25px);
    backdrop-filter: blur(25px);

    color: var(--primary-text-color);
    transition: color 0.4s ease, background-color 0.4s ease;
    -webkit-transition: color 0.4s ease, background-color 0.4s ease;

    .header {
      width: 100%;
      height: 115px;
      padding: 0 40px;
      text-align: center;
      margin-bottom: 20px;

      .header_title {
        font-size: 20px;
        font-weight: bold;
        margin-top: 35px;
        margin-bottom: 20px;

        .operation_new_tips {
          font-size: 14px;
          cursor: pointer;

          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }
      }

      .line {
        width: 70px;
        height: 4px;
        margin: 0 auto;

        background-color: var(--theme-color);
        transition: background-color 0.4s ease;
        -webkit-transition: background-color 0.4s ease;
      }

      .tags_group {
        margin-top: 25px;

        .tags {
          display: inline-block;
          width: 50px;
          height: 30px;
          font-size: 13px;
          line-height: 30px;
          border-radius: 4px;
          margin: 0 4px;

          background-color: var(--tertiary-background-color);
          transition: background-color 0.4s ease;
          -webkit-transition: background-color 0.4s ease;
        }
      }
    }

    .content {
      margin: 20px auto;
      text-align: center;

      p {
        font-size: 14px;
        line-height: 19px;
        display: block;
      }
    }

    .footer {
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;

      text-align: center;

      input {
        border: 0;
        outline: 0;

        width: 80px;
        height: 30px;

        border-radius: 4px;
        color: white;
        background-color: var(--theme-color);
        transition: background-color 0.4s ease;
        -webkit-transition: background-color 0.4s ease;

        cursor: pointer;
      }
    }
  }
}
</style>
