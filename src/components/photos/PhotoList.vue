<template>
   <div>
      <!-- 顶部滑动条区域 -->
      <div id="slider" class="mui-slider">
         <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
            <div class="mui-scroll">
               <a :class="['mui-control-item', item.id == 0 ? 'mui-active' : '']" v-for="item in cates" :key="item.id" @tap="getPhotoListByCateId(item.id)">
                  {{ item.title }}
               </a>
            </div>
         </div>
      </div>
      
      <!-- 图片列表区域 -->
      <ul class="photo-list">
         <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
            <img v-lazy="item.img_url">
            <div class="info">
               <h1 class="info-title">{{ item.title }}</h1>
               <div class="info-body">{{ item.zhaiyao }}</div>
            </div>
         </router-link>
      </ul>

   </div>
</template>

<script>
   import mui from '../../lib/mui/js/mui.min.js'  //topbar滚动
   

   export default {
      data() {
         return {
            cates: [], //分类列表数组
            list: []  //图片数组
         };
      },
      mounted() {
         //初始化滑动插件
         //当DOM结构被渲染好久执行这个函数
         //若要操作元素 最后在mounted里面 因为这个时候DOM元素最新
         mui('.mui-scroll-wrapper').scroll({
            deceleration: 0.0005 
         });
      },
      created() {
         this.getAllCategory();
         this.getPhotoListByCateId(0); //默认进入列表加载全部图片
      },
      methods: {
         getAllCategory() {
            //获取所以图片分类
            this.$http.get('api/getmycategory').then(result => {
               if (result.body.status === 0) {
                  //根据后端需要 手动拼接全部分类
                  result.body.message.unshift({ title: "全部", id: 0});
                  this.cates = result.body.message;
               }
            });
         },
         getPhotoListByCateId(cateId) {
            //根据分类Id 获取图片列表
            this.$http.get('api/getimages/' + cateId).then(result => {
               if (result.body.status === 0) {
                  this.list = result.body.message;
               }
            });
         }
      }
   }
</script>

<style lang="scss" scoped>
   * {
      touch-action: pan-y;  /*去掉Chrome滑动警告*/
   }
   
   .photo-list {
      list-style: none;
      margin: 0;
      padding: 10px;
      padding-bottom: 0;
      li {
         text-align: center;
         background-color: #ccc;
         margin-bottom: 10px;
         box-shadow: 0 0 9px #999;
         position: relative;
         img {
            width: 100%;
            vertical-align: middle;
         }
         img[lazy="loading"] {
            width: 40px;
            height: 300px;
            margin: auto;
         }
      }
   }

   .info {
      color: #fff;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 84px;
      .info-title {
         font-size: 14px;
      }
      .info-body {
         font-size: 13px;
      }
   }
   
</style>