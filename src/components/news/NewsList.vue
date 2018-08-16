<template>
   <div>
      <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media">
               <a href="javascript:;">
                  <img class="mui-media-object mui-pull-left" src="../../images/menu1.png">
                  <div class="mui-media-body">
                     <h1>幸福</h1>
                     <p class="mui-ellipsis">
                        <span>发表时间: 2017-08-11 10:21:11</span>
                        <span>点击: 3次</span>
                     </p>
                  </div>
               </a>
            </li>

            <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
               <router-link :to="'/home/newsinfo/' + item.id">
                  <img class="mui-media-object mui-pull-left" :src="item.img">
                  <div class="mui-media-body">
                     <h1>{{ item.title }}</h1>
                     <p class="mui-ellipsis">
                        <span>发表时间: {{ item.add_time | dateFormat }}</span>
                        <span>点击: {{ item.click }}次</span>
                     </p>
                  </div>
               </router-link>
            </li>

         </ul>
   </div>
</template>

<script>
   import { Toast } from 'mint-ui'

   export default {
      data() {
         return {
            newslist: []
         }
      },
      created() {
         this.getNewsList();
      },
      methods: {
         getNewsList() {
            this.$http.get('api/getnewslist').then(result => {
               if (result.body.status === 0) {
                  this.newslist = result.body.message;
               } else {
                  Toast('获取新闻数据失败');
               }
            })
         }
      }
   }
</script>

<style lang="scss" scoped>
   .mui-table-view {
      li {
         h1 {
            font-size: 14px;
         }
         .mui-ellipsis {
            font-size: 12px;
            color: #226aff;
            display: flex;
            justify-content: space-between;
         }
      }
   }
</style>