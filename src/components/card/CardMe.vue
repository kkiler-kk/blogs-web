<template>
  <el-card class="box-card">
    <div class="profile-card">
      <div class="card-header">
        <div class="pic">
          <img @click="viewInfo" :src="avatar" alt="">
        </div>
        <div class="name">{{ nikeName }}</div>
        <div class="desc">{{ signature }}</div>
        <div class="sm">
          <a href="#" class="fab fa-facebook-f"></a>
          <a href="#" class="fab fa-twitter"></a>
          <a href="#" class="fab fa-github"></a>
          <a href="#" class="fab fa-youtube"></a>
        </div>
        <el-popconfirm title="这是一段内容确定删除吗？">
          <a href="#" class="contact-btn" @click="addFollow" v-if="isfollow">关注</a>
          <a href="#" class="contact-btn" @click="removeFollow" slot="reference" v-else>已关注</a>
        </el-popconfirm>
      </div>
      <div class="card-footer">
        <div class="numbers">
          <div class="item">
            <span>{{ fansCount }}</span>
            粉丝
          </div>
          <div class="border"></div>
          <div class="item">
            <span>{{ followCount }}</span>
            关注
          </div>
          <div class="border"></div>
          <div class="item">
            <span>{{ articlesCount }}</span>
            发帖数
          </div>
        </div>
      </div>
    </div>
  </el-card>

</template>

<script>
import { getUserInfo } from '@/api/user'
import { getUserFollow, isFollow, addFollow, removeFollow } from '@/api/follow'
import { userInfo } from '../../api/user'
export default {
  name: 'CardMe',
  created() {

  },
  data() {
    return {
      avatar: '@/assets/img/iamge.png',
      nikeName: 'KK',
      signature: '散落的星骸',
      followCount: 0,
      fansCount: 0,
      articlesCount: 0,
      isfollow: false
    }
  },
  mounted() {
    this.load()
  },
  methods: {
    async load() {
      this.isfollow = false
      let followId = this.$route.params.id
      let userId = this.$store.state.id
      let id = 0
      if (followId == undefined && userId > 0) {
        this.avatar = this.$store.state.avatar
        this.nikeName = this.$store.state.name
        this.signature = this.$store.state.signature
        id = userId
      } else {
        getUserInfo(followId).then(data => {
          if (data.success) {
            this.avatar = data.data.avatar
            this.nikeName = data.data.nikeName
            this.signature = data.data.signature
          } else {
            this.$message({ type: 'error', message: '稍后重试', showClose: true })
          }
        })
        let data = { "FollowId": parseInt(followId), "fansId": parseInt(userId) }
        await isFollow(data).then(data => {
          if (data.success) {
            this.isfollow = !data.data
          } else {
            this.$message({ type: 'error', message: '稍后重试', showClose: true })
          }
        })
        id = followId
      }
      getUserFollow(id).then(data => {
        if (data.success) {
          this.followCount = data.data.followCount
          this.fansCount = data.data.fansCount
          this.articlesCount = data.data.articlesCount
        } else {
          this.$message({ type: 'error', message: '稍后重试', showClose: true })
        }
      })

    },
    viewInfo() {
      let followId = this.$route.params.id
      let userId = this.$store.state.id
      if (followId == undefined && userId > 0) {
        this.$router.push({ path: '/newsuser/personal/info/' + this.$store.state.id })
      } else {
        this.$router.push({ path: '/newsuser/user/' + followId })
      }
    },
    showTool(tool) {
      this.$message({
        duration: 0,
        showClose: true,
        dangerouslyUseHTMLString: true,
        message: '<strong>' + tool.message + '</strong>'
      });
    },
    addFollow() {
      addFollow(this.$store.state.token, this.$route.params.id).then(data => {
        if (data.success) {
          this.isfollow = false
          this.$message({ type: 'success', message: '关注成功', showClose: true })
        } else {
          this.$message({ type: 'error', message: '添加失败', showClose: true })
        }
      })
    },
    removeFollow() {
      let followId = this.$route.params.id
      let userId = this.$store.state.id
      if ((followId == undefined && userId > 0) || (followId == userId)) {
        this.$message({ type: 'error', message: '自己取关自己?', showClose: true })
        return
      }
      setTimeout(() => {
        this.$confirm('确定要取消关注吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          removeFollow(this.$store.state.token, this.$route.params.id).then(data => {
            if (data.success) {
              this.isfollow = true
              this.$message({ type: 'success', message: '已取消关注', showClose: true })
            } else {
              this.$message({ type: 'error', message: '取消失败', showClose: true })
            }
          })
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });
        });
      }, 200)
    }
  },
  watch: {
    isfollow: {
      handler(newVal, oldVal) {
        console.log(this.isfollow)
        console.log(newVal)
        this.isfollow = newVal
      },
      immediate: true,
    }
  }
}
</script>

<style scoped>
.profile-card {
  width: 100%;
  text-align: center;
  border-radius: 8px;
  overflow: hidden;
}

.card-header {
  background: #2c3a47;
  padding: 60px 40px;
}

.pic {
  display: inline-block;
  padding: 8px;
  background: linear-gradient(130deg, #74b9ff, #e66767);
  margin: auto;
  border-radius: 50%;
  background-size: 200% 200%;
  animation: animated-gradient 2s linear infinite;
}

@keyframes animated-gradient {
  25% {
    background-position: left bottom;
  }

  50% {
    background-position: right bottom;
  }

  75% {
    background-position: right top;
  }

  100% {
    background-position: left top;
  }
}

.pic img {
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.name {
  color: #f2f2f2;
  font-size: 28px;
  font-weight: 600;
  margin: 10px 0;
}

.desc {
  font-size: 18px;
  color: #e66767;
}

.sm {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.sm a {
  color: #f2f2f2;
  width: 56px;
  font-size: 22px;
  transition: .3s linear;
}

.sm a:hover {
  color: #e66767;
}

.contact-btn {
  display: inline-block;
  padding: 12px 50px;
  color: #e66767;
  border: 2px solid #e66767;
  border-radius: 6px;
  margin-top: 16px;
  transition: .3s linear;
}

.contact-btn:hover {
  background: #e66767;
  color: #f2f2f2;
}

.card-footer {
  background: #f4f4f4;
  padding: 60px 10px;
}

.numbers {
  display: flex;
  align-items: center;
}

.item {
  flex: 1;
  text-transform: uppercase;
  font-size: 13px;
  color: #e66767;
}

.item span {
  display: block;
  color: #2c3a47;
  font-size: 30px;
}

.border {
  width: 1px;
  height: 30px;
  background: #bbb;
}
</style>
