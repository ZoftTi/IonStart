export default {
  state: {
    // 设置属性
    background_url: "/images/default_img_5.jpg",
    default_background: [
      {
        url: "/images/default_img_5.jpg",
        title: '默认图片7',
      },
      {
        url: "/images/default_img_6.jpg",
        title: '默认图片8',
      },
      {
        url: "/images/default_img_7.jpg",
        title: '默认图片9',
      },
      {
        url: "/images/default_img_8.jpg",
        title: '默认图片2',
      },
      {
        url: '/images/default_img_1.png',
        title: '默认图片1',
      },
      {
        url: '/images/default_img_2.jpeg',
        title: '默认图片3',
      },
      {
        url: '/images/default_img_3.jpg',
        title: '默认图片4',
      },
      {
        url: "/images/default_img_4.png",
        title: '默认图片6',
      }
    ]
  },
  mutations: {
    UPDATE_BACKGROUND_ATTRIBUTE: (state, beforeData) => {
      if (beforeData.changeKey.itemKey) {
        state[beforeData.changeKey.dataKey][beforeData.changeKey.itemKey] = beforeData.beforeData
      } else {
        state[beforeData.changeKey] = beforeData.beforeData
      }
    },
  },
}
