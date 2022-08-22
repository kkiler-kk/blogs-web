<template>
  <el-card>
    <div class="card">
      <div>
        <img :src="avatar" @click="viewInfo" :title="nikeName" />
      </div>
      <p>{{ nikeName }}</p>
      <p>{{ signature }}</p>
    </div>
  </el-card>

</template>

<script>
import { getUserInfo } from '@/api/user'
export default {
  name: 'CardMe',
  created() {
    this.load()
  },
  data() {
    return {
      avatar: '@/assets/img/iamge.png',
      nikeName: 'KK',
      signature: '散落的星骸',
    }
  },
  methods: {
    load() {
      let followId = this.$route.params.id
      let userId = this.$store.state.id
      if (followId == undefined && userId > 0) {
        this.avatar = this.$store.state.avatar
        this.nikeName = this.$store.state.name
        this.signature = this.$store.state.signature
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
      }
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
    }
  }
}
</script>

<style scoped>
.card {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* margin: 0 20px;
  padding: 20px; */
  background: #fff;
  /* box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); */
}

.card img {

  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-size: cover;
  background-position: center;
  margin: 20px 0;
}

.social i {
  color: lightgray;
  padding: 0 10px;
}
</style>
