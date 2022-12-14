// import Vue from 'vue'
// import VueRouter from 'vue-router'
import Home from '@/Home'
import UserHome from '@/views/person/UserHome'
/*import Index from '@/views/Index'
import Login from '@/views/Login'
import Register from '@/views/Register'
import Log from '@/views/Log'
import MessageBoard from '@/views/MessageBoard'
import BlogWrite from '@/views/blog/BlogWrite'
import BlogView from '@/views/blog/BlogView'
import BlogAllCategoryTag from '@/views/blog/BlogAllCategoryTag'
import BlogCategoryTag from '@/views/blog/BlogCategoryTag'*/

// import {Message} from 'element-ui';


import store from '@/store'

import {getToken} from '@/request/token'

// Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/write/:id?',
      component: r => require.ensure([], () => r(require('@/views/blog/BlogWrite')), 'blogwrite'),
      meta: {
        requireLogin: true
      },
    },
    {
      path: '',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/',
          component: r => require.ensure([], () => r(require('@/views/Index')), 'index')
        },
       
        {
          path: '/log',
          component: r => require.ensure([], () => r(require('@/views/Log')), 'log')
        },
        {
          path: '/archives/:year?/:month?',
          component: r => require.ensure([], () => r(require('@/views/blog/BlogArchive')), 'archives')
        },
        {
          path: '/messageBoard',
          component: r => require.ensure([], () => r(require('@/views/MessageBoard')), 'messageboard')
        },
        {
          path: '/view/:id',
          component: r => require.ensure([], () => r(require('@/views/blog/BlogView')), 'blogview')
        },
        {
          path: '/:type/all',
          component: r => require.ensure([], () => r(require('@/views/blog/BlogAllCategoryTag')), 'blogallcategorytag')
        },
        {
          path: '/:type/:id',
          component: r => require.ensure([], () => r(require('@/views/blog/BlogCategoryTag')), 'blogcategorytag')
        },
        {
          path: '/program/source/code',
          meta: {
            isLogin: false
          },
          component: r => require.ensure([], () => r(require('@/views/common/SourceCode')), 'SourceCode')
        },
      ]
    },
    {
      path: '/login',
      component: r => require.ensure([], () => r(require('@/views/Login')), 'login')
    },
    {
      path: '/register',
      component: r => require.ensure([], () => r(require('@/views/Register')), 'register')
    },
    {
      path: '/404',
      meta: {
        title: '??????????????????',
        isLogin: false
      },
      component: r => require.ensure([], () => r(require('@/views/common/404')), '404')
    },
   
    {
      path: '/newsuser',
      name: 'UserHome',
      component: UserHome,
      children: [
        
        {
          path: `/newsuser/user/:id`,
          name: 'userInfo',
          component: r => require.ensure([], () => r(require('@/views/person/UserInfo')), 'userInfo')
        },
        {
          path: '/newsuser/personal/:id',
        component: r => require.ensure([], () => r(require('@/views/person/Personal')), 'personal'),
        meta: {
          requireLogin: true
        },
        children: [
          
          {
            // path: '/personal/info/:id',
            path: '/newsuser/personal/info/:id',
            name:'info',
            component: r => require.ensure([], () => r(require('@/views/person/Info')), 'info')
          },
          {
            
            path: '/newsuser/personal/message/:id',
            name:'messages',
            component: r => require.ensure([], () => r(require('@/views/person/Messages')), 'messages')
          },
          {
            path:'/newsuser/personal/myarticle/:id',
            name:'myarticle',
            component: r => require.ensure([], () => r(require('@/views/person/MyArticle')), 'myarticle')
          },
          {
            path:'/newsuser/personal/mycollect/:id',
            name:'mycollect',
            component: r => require.ensure([], () => r(require('@/views/person/MyCollect')), 'mycollect')
          },
          {
            path:'/newsuser/personal/myfan/:id',
            name:'myfan',
            component: r => require.ensure([], () => r(require('@/views/person/MyFanAndFollow')), 'myfan')
          },
          {
            path:'/newsuser/personal/myfollow/:id',
            name:'myfollow',
            component: r => require.ensure([], () => r(require('@/views/person/MyFanAndFollow')), 'myfollow')
          }
          ]
        },
        
    ],
    
    },
    // ??????????????????????????????????????????404????????????????????????
    {
    path: '*',
    redirect: '/404'
    }

  ],
  scrollBehavior(to, from, savedPosition) {
    return {x: 0, y: 0}
  }
})

router.beforeEach((to, from, next) => {

  if (getToken()) {

    if (to.path === '/login') {
      next({path: '/'})
    } else {
      if (store.state.account.length === 0) {
        store.dispatch('getUserInfo').then(data => { //??????????????????
            next()
        }).catch(() => {
          this.$message({
            type: 'warning',
            showClose: true,
            message: '???????????????'
          })
          next({path: '/'})
        })
      } else {

        next()
      }
    }
  } else {
    if (to.matched.some(r => r.meta.requireLogin)) {
      this.$message({
        type: 'warning',
        showClose: true,
        message: '???????????????'
      })

    }
    else {
      next();
    }
  }
})


export default router
