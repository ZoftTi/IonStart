import store from "../../store"
// 鼠标拖动容器 自定义指令
export default (el, binding) => {
  let oDiv = el // 获取当前元素

  oDiv.onmousedown = (e) => {
    let disX, disY
    switch (binding.value.type) {
      case 'store':
        disX = e.clientX - oDiv.parentNode.offsetLeft
        disY = e.clientY - oDiv.parentNode.offsetTop
        
        oDiv.parentNode.classList.add("transition-none")
        document.onmousemove = (e) => {
          store.commit(binding.value.content, {
            left: e.clientX - disX + "px",
            top: e.clientY - disY + "px",
          })
        }
        break;
      case 'tab':
        disX = e.clientX - oDiv.closest('.tab').offsetLeft
        disY = e.clientY - oDiv.closest('.tab').offsetTop

        document.onmousemove = (e) => {
          oDiv.closest('.tab').style.left = e.clientX - disX + "px"
          oDiv.closest('.tab').style.top = e.clientY - disY + "px"
        }
        break;
    }

    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null
      oDiv.parentNode.classList.remove("transition-none")
    }
  }
}
