<template>
  <transition name="appear">
    <Tab :tabAttribute="tabAttribute" v-if="background_setting.isShow">
      <div class="content">
        <div class="row custom">
          <p>自定义「 {{ fileTips }} 」</p>
          <div
            class="custom-background"
            @click="switchBackground(background_setting.custim_background)"
          >
            <img :src="background_setting.custim_background" alt="" />
            <div class="custom-img-select flex-center" v-if="isShowCustom">
              <i class="iconfont icon-check"></i>
            </div>

            <transition name="fade">
              <div class="custom-option" v-if="isShowCustom">
                <h4>将你本地的图片设置为背景</h4>
                <span>建议尺寸:1920 x 1080或更高</span>
                <div class="input-wrap flex-center">
                  <div class="input-content">
                    <span>浏览图片</span>
                    <input
                      type="file"
                      ref="file"
                      @change="changeCustomImages()"
                    />
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>
        <div class="row default">
          <p>默认背景图片</p>
          <div class="default-background">
            <div
              class="default-img-wrap"
              v-for="(item, index) in background_setting.default_background"
              :class="{
                select: item.url === background_setting.background_url,
              }"
              @click="switchBackground(item.url)"
            >
              <img :src="item.url" alt="" :key="index" />
              <div class="default-img-select flex-center">
                <i class="iconfont icon-check"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Tab>
  </transition>
</template>

<script>
import { computed, defineComponent, onMounted, reactive, ref } from "vue"
import { useStore } from "vuex"
import Tab from "./common/Tab_Container.vue"
export default defineComponent({
  components: {
    Tab,
  },
  setup() {
    const tabAttribute = reactive({
      style: {
        width: "320px",
        height: "480px",
      },
      title: "Background_Setting",
      subTitle: '背景设置'
    })

    const store = useStore()

    const background_setting = computed(() => store.state.background_setting)

    const isShowCustom = computed(() => {
      const bgSetting = background_setting.value
      return bgSetting.custim_background === bgSetting.background_url
    })

    const switchBackground = (item) => {
      if (!(item === background_setting.value.background_url)) {
        store.commit("UPDATE_BACKGROUND_ATTRIBUTE", {
          changeKey: "background_url",
          beforeData: item,
        })
      }
    }

    const file = ref(null)
    const fileTips = ref("浏览图片")

    const changeCustomImages = () => {
      if (!/image\/\w+/.test(file.value.files[0].type)) {
        //判断获取的是否为图片文件
        fileTips.value = "类型错误"
        return false
      } else {
        const reader = new FileReader()
        reader.readAsDataURL(file.value.files[0])
        reader.onload = function () {
          store.commit("UPDATE_BACKGROUND_ATTRIBUTE", {
            changeKey: "custim_background",
            beforeData: this.result,
          })
          switchBackground(this.result)
        }
      }
    }

    return {
      tabAttribute,
      background_setting,
      switchBackground,
      isShowCustom,
      file,
      fileTips,
      changeCustomImages,
    }
  },
})
</script>

<style lang="less" scoped>
.row {
  p {
    font-size: 14px;
    color: var(--secondary-text-color);
    margin: 16px 0 8px;
  }
}

.custom {
  p {
    margin-top: 0;
  }

  .custom-background {
    display: flex;
    flex-wrap: wrap;
    border-radius: 6px;
    overflow: hidden;
    cursor: pointer;
    position: relative;

    img {
      overflow: hidden;
      width: 100%;
      object-fit: cover;
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transition: background-color 0.3s;
    }

    &:hover {
      .custom-option {
        opacity: 1;
      }

      .custom-img-select {
        opacity: 0;
      }

      &::before {
        background-color: rgba(0, 0, 0, 0.2);
      }
    }

    .custom-img-select {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;

      background-color: rgba(0, 0, 0, 0.5);
      transition: opacity 0.2s ease-in;

      i {
        font-size: 40px;
        color: white;
        font-weight: bold;
      }
    }

    .custom-option {
      position: absolute;
      height: 100%;
      width: 100%;

      text-align: center;

      color: white;
      background: rgba(0, 0, 0, 0.4);

      transition: opacity 0.2s ease-in;

      opacity: 0;

      h4 {
        margin: 35px 0 0;
      }

      span {
        display: block;
        margin-top: 10px;
        font-size: 12px;
      }

      .input-wrap {
        margin-top: 20px;
        cursor: pointer;
        width: 100%;

        .input-content {
          width: 70px;
          height: 35px;
          padding: 0 8px;
          border-radius: 4px;
          color: white;
          background-color: var(--theme-color);
          overflow: hidden;
          position: relative;

          span {
            font-size: 13px;
            line-height: 35px;
            margin: 0;
          }

          input {
            position: absolute;
            border: none;
            outline: none;
            opacity: 0;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            font-size: 100px;
          }
        }
      }
    }
  }
}

.default {
  .default-background {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .default-img-wrap {
      border-radius: 4px;
      overflow: hidden;
      width: calc(96% / 2);
      height: 90px;
      cursor: pointer;
      margin-bottom: 12px;
      position: relative;

      .default-img-select {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: background-color 0.3s;

        i {
          color: white;
          font-size: 30px;
          font-weight: bold;
          display: none;
        }
      }

      &:hover {
        & img {
          transform: scale(1.1);
        }

        & .default-img-select {
          background-color: rgba(0, 0, 0, 0.2);
        }
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s;
      }
    }

    .select {
      .default-img-select {
        background-color: rgba(0, 0, 0, 0.5) !important;

        i {
          display: block;
        }
      }

      img {
        transform: scale(1.1);
      }
    }
  }
}
</style>
