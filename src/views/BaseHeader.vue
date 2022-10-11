<template>
  <el-header class="me-area">
    <el-row class="me-header">

      <el-col :span="2" class="me-header-left">
        <router-link to="/" class="me-title">
          <!-- <img src="../assets/img/logo.png" /> -->
        </router-link>
      </el-col>

      <el-col v-if="!simple" :span="12">
        <el-menu :router=true menu-trigger="click" active-text-color="#5FB878" :default-active="activeIndex"
          mode="horizontal">
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/category/all">文章分类</el-menu-item>
          <el-menu-item index="/tag/all">标签</el-menu-item>
          <el-menu-item index="/archives">文章归档</el-menu-item>
          <el-menu-item index="/chat">聊天室</el-menu-item>
          <el-menu-item index="/program/source/code"><i class="iconfont icon-HTMLyuanma" title="程序源码"></i>
          </el-menu-item>
          <el-col :span="3" :offset="3">
            <el-menu-item index="/write"><i class="el-icon-edit"></i>写文章</el-menu-item>
          </el-col>

        </el-menu>
      </el-col>

      <template v-else>
        <slot></slot>
      </template>


      <el-col :span="5">
        <el-menu mode="horizontal" active-text-color="#5FB878">
          <el-menu-item>
            <!-- <el-input placeholder="请输入搜索内容"  @keyup.enter.native="searchHandler" v-model="search"></el-input> -->

            <template>
              <el-autocomplete v-model="search" :fetch-suggestions="querySearchAsync" placeholder="请输入内容"
                @select="handleSelect"></el-autocomplete>
            </template>

          </el-menu-item>
        </el-menu>
      </el-col>

      <el-col :span="3">

        <el-menu :router=true menu-trigger="click" mode="horizontal" active-text-color="#5FB878">

          <template v-if="!user.login">

            <el-menu-item index="/login">
              <el-button type="text">登录</el-button>
            </el-menu-item>
            <el-menu-item index="/register">
              <el-button type="text">注册</el-button>
            </el-menu-item>
          </template>

          <template v-else>
            <el-submenu>
              <template slot="title">
                <img class="me-header-picture" @click="viewInfo" :src="user.avatar" :title="user.nikeName" />
              </template>
              <el-menu-item index @click="logout" style="min-width: 150px;"><i class="el-icon-back"></i>退出
              </el-menu-item>
            </el-submenu>
            <el-dropdown class="dropdown">
              <span class="el-dropdown-link">
                我的消息<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>回复我的</el-dropdown-item>
                <el-dropdown-item>收到的赞</el-dropdown-item>
                <el-dropdown-item>系统通知</el-dropdown-item>
                <el-dropdown-item disabled>我的消息</el-dropdown-item>
                <el-dropdown-item divided>消息设置</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <!-- <el-submenu>
              <template slot="title">
                <i class="iconfont icon-fasongxinxi"></i>
              </template>
              <el-menu-item index="u1" style="min-width: 150px;"></el-menu-item>
              <el-menu-item index="u2" style="min-width: 150px;"></el-menu-item>
              <el-menu-item index="u3" style="min-width: 150px;"></el-menu-item>
              <el-menu-item index="u4" style="min-width: 150px;"></el-menu-item>
              <el-menu-item index="u5" style="min-width: 150px;"></el-menu-item>
            </el-submenu> -->
          </template>
        </el-menu>
      </el-col>
    </el-row>
  </el-header>
</template>

<script>
import { searchArticle } from '@/api/article'
import { Message } from '@/store/message'
export default {
  name: 'BaseHeader',
  props: {
    activeIndex: String,
    simple: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      search: '',
      articles: [],
      path: "ws://127.0.0.1:8888/app/ws",
      socket: null,
    }
  },
  computed: {
    user() {
      let login = this.$store.state.account.length != 0
      let avatar = this.$store.state.avatar
      return {
        login, avatar
      }
    }
  },
  methods: {
    init() {
      if (this.$store.state.account.length == 0) {
        return
      }
      if (typeof (WebSocket) === "undefined") {
        alert("您的浏览器不支持socket")
      } else {
        // 实例化socket
        this.socket = new WebSocket(this.path)
        // 监听socket连接
        this.socket.onopen = this.open
        // 监听socket错误信息
        this.socket.onerror = this.error
        // 监听socket消息
        this.socket.onmessage = this.getMessage
      }
      console.log("Download the sub-item address");
      console.log("https://github.com/KKiller-op/java-chat-room");
    },
    send() {
      this.socket.send("Hello World")
    },
    open() {
      console.log("socket连接成功")
      let data = JSON.stringify({ userID: this.$store.state.id, type: 0 })
      this.socket.send(data)
      console.log("发送成功", data)
    },
    error() {
      console.log("连接错误")
    },
    getMessage(msg) {
      this.$notify.info({
        title: '消息',
        message: msg.data,
        offset: 100
      });
      console.log(msg)
    },
    logout() {
      let that = this
      this.$store.dispatch('logout').then(() => {
        this.$router.push({ path: '/' })
      }).catch((error) => {
        if (error !== 'error') {
          that.$message({ message: error, type: 'error', showClose: true });
        }
      })
    },
    querySearchAsync(queryString, cb) {
      searchArticle(this.search).then((res) => {
        if (res.success) {
          var results = [];
          for (const item of res.data) {
            results.push({
              id: item.id,
              value: item.title
            });
          }
          cb(results)
        }
      })

    },
    handleSelect(item) {
      this.$router.push({ path: '/view/' + item.id })
    },
    viewInfo() {
      this.$router.push({ path: '/newsuser/personal/info/' + this.$store.state.id })
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style>
.menu {
  width: 150px;
}

.dropdown {
  margin-top: 20px;
  color: #909399;
}

.el-header {
  position: fixed;
  z-index: 1024;
  min-width: 100%;
  box-shadow: 0 2px 3px hsla(0, 0%, 7%, .1), 0 0 0 1px hsla(0, 0%, 7%, .1);
}



.me-title {
  margin-top: 10px;
  font-size: 24px;
}

.me-header-left {
  margin-top: 10px;
}

.me-title img {
  max-height: 2.4rem;
  max-width: 100%;
}

.me-header-picture {
  width: 40px;
  height: 40px;
  border: 1px solid #ddd;
  border-radius: 50%;
  vertical-align: middle;
  background-color: #5fb878;
}
</style>
