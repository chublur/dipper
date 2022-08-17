import Mock from 'mockjs'
export default {
  getMenu: config => {
    console.log(config);
    const { username, password } = JSON.parse(config.body)
    console.log(JSON.parse(config.body))
    // 先判断用户是否存在
    // 判断账号和密码是否对应
    if (username === 'admin' && password === 'admin') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: "/home",
              name: "home",
              label: "首页",
              icon: "el-icon-menu",
              url: "home/index",
            },
            {
              path: "/report",
              name: "report",
              label: "数据报表",
              icon: "el-icon-s-data",
              url: "report/index",
            },
            {
              path: "/map",
              name: "map",
              label: "地图",
              icon: "el-icon-location",
              url: "baidumap/index",
            },
            {
              label: "系统",
              icon: "el-icon-setting",
              children: [
                {
                  path: "/userinfo",
                  name: "userinfo",
                  label: "用户管理",
                  icon: "setting",
                  url: "others/userinfo.vue",
                },
                {
                  path: "/pageone",
                  name: "pageone",
                  label: "开发",
                  icon: "setting",
                  url: "other/pageone.vue",
                },
              ],
            },
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else if (username === 'beidouxing' && password === 'beidouxing') {
      return {
        code: 20000,
        data: {
          menu: [
            {
              path: '/',
              name: 'home',
              label: '首页',
              icon: 'el-icon-s-home',
              url: 'home/index'
            },
            {
              path: '/report',
              name: 'report',
              label: '数据报表',
              icon: 'el-icon-s-data',
              url: 'report/index'
            },
            {
              path: '/map',
              name: 'map',
              label: '地图',
              icon: 'el-icon-location',
              url: 'baidumap/index'
            },
          ],
          token: Mock.Random.guid(),
          message: '获取成功'
        }
      }
    } else {
      return {
        code: -999,
        data: {
          message: '密码错误'
        }
      }
    }

  }
}
