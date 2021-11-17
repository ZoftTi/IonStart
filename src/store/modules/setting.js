export default {
  state: {
    // 设置属性
    clearInput: false,
    focusInput: false,
    target_blank: false,
    dark_mode: false,
    auto_dark_mode: true,
    mini_footer_info: false,
    logo_attribute: {
      logo_hidden: false,
      logo_distance: 125,
      show_time: false,
      show_second: false
    },
    search_attribute: {
      search_hidden: false,
      search_distance: 275,
      search_radius: 10,
      search_list_hidden: false
    },
    stars_attribute: {
      stars_hidden: false,
      stars_distance: 475,
      stars_radius: 15,
      stars_scale: true,
      stars_target: false
    }
  },
  mutations: {
    UPDATE_SETTING_DATA: (state, beforeData) => {
      if (beforeData.changeKey.itemKey) {
        state[beforeData.changeKey.dataKey][beforeData.changeKey.itemKey] = beforeData.beforeData
      } else {
        state[beforeData.changeKey] = beforeData.beforeData
      }
    },
  },
}
