/**
 * @copyright chuzhixin 1204505056@qq.com
 * @description all模式渲染后端返回路由
 * @param constantRoutes
 * @returns {*}
 */
export function filterAllRoutes(constantRoutes) {
  return constantRoutes.filter((route) => {
    if (route.component) {
      if (route.component === 'Layout') {
        route.component = (resolve) => require(['@/layout'], resolve)
      } else if (route.component === 'EmptyLayout') {
        route.component = (resolve) =>
          require(['@/layout/EmptyLayout'], resolve)
      } else {
        let path = 'views/' + route.component
        if (
          new RegExp('^/views/.*$').test(route.component) ||
          new RegExp('^views/.*$').test(route.component)
        ) {
          path = route.component
        } else if (new RegExp('^/.*$').test(route.component)) {
          path = 'views' + route.component
        } else if (new RegExp('^@views/.*$').test(route.component)) {
          path = route.component.str.slice(2)
        } else {
          path = 'views/' + route.component
        }

        route.component = (resolve) => require([`@/${path}.vue`], resolve)
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAllRoutes(route.children)
    }
    if (route.children && route.children.length === 0) {
      delete route.children
    }
    return true
  })
}

export function successMessage(_this, title, message, duration = 2000) {
  return _this.$notify({
    title: title,
    message: message,
    type: 'success',
    duration: duration
  })
}

export function errorMessage(_this, title, message, duration = 2000) {
  return _this.$notify({
    title: title,
    message: message,
    type: 'error',
    duration: duration
  })
}

export function errorTextMessage(_this, message) {
  return _this.$message.error(message)
}

export function confirmMessage(_this, message, title, options, doThen, doCatch) {
  return _this.$confirm(message, title, options)
    .then(doThen)
    .catch(doCatch)
}

export function deleteConfirmMessage(_this, message, doThen) {
  return _this.$confirm(message, 'Warning', { confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    type: 'warning'
  })
    .then(doThen)
    .catch(err => {
      console.error(err)
    })
}

export function getlang(_this, field) {
  return _this.$t('etpmls_admin.' + field)
}
