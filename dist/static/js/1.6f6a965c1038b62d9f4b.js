webpackJsonp([1],{"3nZr":function(o,t,a){"use strict";t.e=function(o){return o=parseInt(o),Object(s.a)({url:"/follow/follow/"+o,method:"post"})},t.a=function(o){return Object(s.a)({headers:{Authorization:o},url:"/users/info",method:"post"})},t.b=function(o){return Object(s.a)({headers:{Authorization:o},url:"/users/info",method:"post"})},t.c=function(o){return o=parseInt(o),Object(s.a)({url:"/follow/"+o,method:"post"})};var s=a("OOvn")},GCKn:function(o,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a("3nZr"),n={name:"MyFanAndFollow",inject:["reload"],data:function(){return{allData:[],isfollow:!0,followData:{fanId:"",followId:""},isfollowid:[]}},watch:{$route:function(o,t){var a=this;o.path=="/newsuser/personal/myfan/"+this.$route.params.id?Object(s.myFan)(this.$route.params.id).then(function(o){console.log(o),a.allData=o.data,Object(s.e)(a.$route.params.id).then(function(o){o.data.forEach(function(o){a.isfollowid.push(o.id)})})}).catch(function(o){console.log(o)}):Object(s.e)(this.$route.params.id).then(function(o){console.log(o),a.allData=o.data,o.data.forEach(function(o){a.isfollowid.push(o.id)})}).catch(function(o){console.log(o)})}},mounted:function(){this.load()},methods:{load:function(){var o=this;this.$route.path=="/newsuser/personal/myfan/"+this.$route.params.id?Object(s.myFan)(this.$route.params.id).then(function(t){console.log(t),o.allData=t.data,Object(s.e)(o.$route.params.id).then(function(t){t.data.forEach(function(t){o.isfollowid.push(t.id)})})}).catch(function(o){console.log(o)}):Object(s.e)(this.$route.params.id).then(function(t){console.log(t),o.allData=t.data,t.data.forEach(function(t){o.isfollowid.push(t.id)})}).catch(function(o){console.log(o)})},follow:function(o){var t=this;this.$store.state.id?this.$store.state.id==this.$route.params.id?(this.followData.followId=o,this.followData.fanId=this.$store.state.id,this.isfollowid.indexOf(this.followData.followId)>-1?this.isfollow=!0:this.isfollow=!1,this.isfollow?Object(s.b)(this.followData).then(function(o){console.log(o.data),t.isfollow=!1,t.$message({showClose:!0,message:"已取消关注",type:"success"}),t.reload()}).catch(function(o){console.log(o)}):this.isfollow||Object(s.a)(this.followData).then(function(o){console.log(o.data),t.isfollow=!0,t.$message({showClose:!0,message:"已成功关注",type:"success"}),t.reload()}).catch(function(o){console.log(o)})):this.$message({showClose:!0,message:"此页面不是你的个人中心哦",type:"warning"}):this.$message({showClose:!0,message:"请登录后再进行操作哦",type:"warning"})},personal:function(o){this.$router.push({path:"/newsuser/personal/"+o})}}},e={render:function(){var o=this,t=o.$createElement,a=o._self._c||t;return a("div",{staticClass:"fanorfollow_box"},[o._l(o.allData,function(t,s){return a("div",{staticClass:"fanorfollow"},[a("div",{staticClass:"fanorfollow_left"},[a("img",{directives:[{name:"image-preview",rawName:"v-image-preview"}],staticClass:"fanorfollow_img",attrs:{src:t.avatar}})]),o._v(" "),a("div",{staticClass:"fanorfollow_info"},[a("div",{staticClass:"fanorfollow_info_top"},[a("span",{staticStyle:{color:"#666","max-width":"180px"},on:{click:function(a){return o.personal(t.id)}}},[o._v(o._s(t.nickname))])]),o._v(" "),a("div",{staticClass:"fanorfollow_info_bottom"},[a("span",{on:{click:function(a){return o.personal(t.id)}}},[o._v(o._s(t.design))])])]),o._v(" "),a("div",{staticClass:"fanorfollow_botton"},[a("el-button",{attrs:{type:"primary",size:"small",round:"",icon:"el-icon-check"},domProps:{textContent:o._s(o.isfollowid.indexOf(t.id)>-1?"已关注":"关注")},on:{click:function(a){return o.follow(t.id)}}})],1)])}),o._v(" "),a("div",[0==o.allData.length?a("el-empty",{attrs:{"image-size":250,description:"这里什么都没有哟"}}):o._e()],1)],2)},staticRenderFns:[]};var i=a("VU/8")(n,e,!1,function(o){a("bXTn")},null,null);t.default=i.exports},bXTn:function(o,t){}});