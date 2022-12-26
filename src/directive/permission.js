//权限
function checkArray(key) {
  // 获取用户权限
  let arr = [1,2,3,4]
  return arr.includes(key)
}
export default {
  permission: {
    inserted: function (el, binding) {
        let permission = binding.value
        if (permission) {
          let hasPermission = checkArray(permission)
          if (!hasPermission) {
            el.parentNode && el.parentNode.removeChild(el)
          }
        }
      }
  }
}
