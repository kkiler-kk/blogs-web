<template>
  <el-card class="me-area" :body-style="{ padding: '16px' }">
    <div class="me-article-header">
      <a @click="view(id)" class="me-article-title">{{ title }}</a>
      <el-button v-if="weight > 0" class="iconfont icon-zhiding" type="text">置顶</el-button>

      <span class="me-pull-right me-article-count">
        <i class="el-icon-view"></i>&nbsp;{{ viewCount }}
      </span>
      <span class="me-pull-right me-article-count">
        <i class="iconfont icon-shouye"></i>&nbsp;{{ commentCounts }}
      </span>
      <span class="me-pull-right me-article-count">
        <i class="iconfont icon-icon"></i>&nbsp;{{ likeCount }}
      </span>
    </div>

    <div class="me-artile-description">
      {{ summary }}
    </div>
    <div class="me-article-footer">
      <span class="me-article-author">
        <i class="me-icon-author"></i>&nbsp;{{ author }}
      </span>

      <el-tag v-for="t in tags" :key="t.tagName" size="mini" type="success">{{ t.tagName }}</el-tag>

      <span class="me-pull-right me-article-count">
        <i class="el-icon-time"></i>&nbsp;{{ createDate }}
      </span>

    </div>
  </el-card>
</template>

<script>
import { string } from "bfj-node4/src/events";
import { formatTime } from "../../utils/time";

export default {
  name: 'ArticleItem',
  props: {
    id: String,
    weight: Number,
    title: String,
    commentCounts: Number,
    viewCount: Number,
    likeCount: Number,
    summary: String,
    author: String,
    tags: Array,
    createDate: Number
  },
  data() {
    return {}
  },
  mounted() {
    console.log(formatTime(this.createDate))
  },
  methods: {
    view(id) {
      this.$router.push({ path: `/view/${id}` })
    }
  }
}
</script>

<style scoped>
.me-article-header {
  /*padding: 10px 18px;*/
  padding-bottom: 10px;
}

.me-article-title {
  font-weight: 600;
}

.me-article-icon {
  padding: 3px 8px;
}

.me-article-count {
  color: #a6a6a6;
  padding-left: 14px;
  font-size: 13px;
}

.me-pull-right {
  float: right;
}

.me-artile-description {
  font-size: 13px;
  line-height: 24px;
  margin-bottom: 10px;
  width: 30rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.me-article-author {
  color: #a6a6a6;
  padding-right: 18px;
  font-size: 13px;
}

.el-tag {
  margin-left: 6px;
}
</style>
