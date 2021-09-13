import store from "../../store"
// 鼠标拖动容器 自定义指令
export default (el, binding) => {
  let oDiv = el // 获取当前元素

  oDiv.onmousedown = (e) => {
    // 算出鼠标相对元素的位置
    let disX, disY
    if (binding.value !== undefined) {
      disX = e.clientX - oDiv.parentNode.offsetLeft
      disY = e.clientY - oDiv.parentNode.offsetTop
    } else {
      disX = e.clientX - oDiv.parentNode.parentNode.parentNode.offsetLeft
      disY = e.clientY - oDiv.parentNode.parentNode.parentNode.offsetTop
    }

    // 清除过渡效果
    oDiv.parentNode.classList.add("transition-none")

    document.onmousemove = (e) => {
      // 用鼠标的位置减去鼠标相对元素的位置，得到元素的位置
      let left = e.clientX - disX
      let top = e.clientY - disY

      if (binding.value !== undefined) {
        store.commit(binding.value, {
          left: left + "px",
          top: top + "px",
        })

      } else {
        oDiv.parentNode.parentNode.parentNode.style.left = left + "px"
        oDiv.parentNode.parentNode.parentNode.style.top = top + "px"
      }
    }

    document.onmouseup = (e) => {
      document.onmousemove = null
      document.onmouseup = null
      // 还原过渡效果
      oDiv.parentNode.classList.remove("transition-none")
    }
  }
}
