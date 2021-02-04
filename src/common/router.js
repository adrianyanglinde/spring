const win = window;
function RouterManager(list, index) {
  if (!(this instanceof RouterManager)) {
      return new RouterManager(arguments)
  }
  this.list = {} || list
  this.index = index
  this.pre = null
  this.current = null

  win.addEventListener('hashchange', function (ev) {
      var pre = ev.oldURL.split('#')[1],
          cur = ev.newURL.split('#')[1],
          preR = this.getByUrlOrName(pre),
          curR = this.getByUrlOrName(cur)

      this.loadWithRouter(curR, preR)

  }.bind(this))
}

RouterManager.prototype = {
  add: function (router, callback) {
      if (typeof router === 'string') {
          router = {
              path: router,
              name: router,
              callback: callback
          }
      }
      this.list[router.name || router.path] = router
  },
  remove: function (name) {
      delete this.list[name]
  },
  get: function (name) {
      return this.getByUrlOrName(name)
  },
  load: function (name) {
      if (!name) {
          name = location.hash.slice(1)
      }
      var r = this.getByUrlOrName(name)
      this.loadWithRouter(r, null)
  },
  loadWithRouter(cur, pre) {
      if (cur && cur.callback) {
          this.pre = this.current || cur
          cur.callback(cur, pre)
          this.current = cur
      } else {
          this.NOTFOUND('未找到相关路由')
      }
  },
  getByUrlOrName: function (nameOrUrl) {
      var r = this.list[nameOrUrl]
      if (!r) {
          r = Object.values(this.list).find(rt => rt.name === nameOrUrl || rt.path === nameOrUrl)
      }
      return r
  },
  setIndex: function (nameOrUrl) {
      this.indexRouter = this.getByUrlOrName(nameOrUrl)
  },
  go: function (num) {
      win.history.go(num)
  },
  back: function () {
      win.history.back()
  },
  forward: function () {
      win.history.forward()
  },
  init: function () {
      // 直接输入是带hash的地址，还原
      if (win.location.hash) {
          /* 模拟事件
          var ev = document.createEvent('Event')
          ev.initEvent('hashchange', true, true)
          ev.oldURL = ev.newURL = location.href
          win.dispatchEvent(ev) */
          this.load()
      } else if (this.indexRouter) { // 是不带hash的地址，跳转到指定的首页
          if ('replaceState' in win.history) {
              // 替换地址
              win.history.replaceState(null, null, win.location.href + '#' + this.indexRouter.path)
          } else {
              win.location.hash = this.indexRouter.path
          }
      }
  }
}

RouterManager.prototype.use = RouterManager.prototype.add;
export default RouterManager;