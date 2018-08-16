<template>
   <div class="newsinfo-container">
      <h3 class="title">{{ newsinfo.title }}</h3>
      <p class="subtitle">
         <span>{{ newsinfo.add_time | dataFormat }}</span>
         <span>点击: {{ newsinfo.click }}次</span>
      </p>

      <hr>

      <div class="content" v-html="newsinfo.content"></div>
      <!-- 评论子组件 -->
      <comment-box :id="this.id"></comment-box>

   </div>
</template>

<script>
   import { Toast } from 'mint-ui';

   //导入子组件
   import comment from '../subcomponent/comment.vue';

   export default {
      data() {
         return {
            id: this.$router.params.id, //将url地址中传过来的Id值挂载到data上
            newsinfo: {}
         }
      },
      created() {
         this.getNewsInfo();
      },
      methods: {
         getNewsInfo() {
            this.$http.get('api/getnew/' + this.id).then(result => {
               if (result.body.status === 0) {
                  this.newsinfo = result.body.message[0]; //message是数组但只有1个对象所以直接用对象取
               } else {
                  Toast('获取新闻失败');
               }
            })
         }
      },
      components: {
         'comment-box': comment
      }
   }
</script>

<style lang="scss">
   .newsinfo-container{
      padding: 0 4px;
      .title {
         font-size: 16px;
         text-align: center;
         margin: 15px 0;
         color: red;
      }
      .subtitle {
         font-size: 13px;
         color: #226aff;
         display: flex;
         justify-content: space-between;
      }
      .content {
         img {
            width: 100%;
         }
      }
   }
</style>