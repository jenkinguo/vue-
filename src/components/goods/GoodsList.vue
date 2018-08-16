<template>
   <div class="goods-list">
      <!-- 网页中有2种跳转方式 -->
      <!-- 方式1：使用a 标签 叫标签跳转 -->
      <!-- 方式2：使用window.location.href 叫编程式导航 -->
      <div class="goods-item" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
         <img :src="item.img_url" alt="">
         <h1 class="title">{{item.title}}</h1>
         <div class="info">
            <p class="price">
               <span class="now">&yen;{{ item.sell_price }}</span>
               <span class="old">&yen;{{ item.market_price }}</span>
            </p>
            <p class="sell">
               <span>热卖中</span>
               <span>剩{{ item.quantity }}件</span>
            </p>
         </div>
      </div>
      
      <mt-button type="danger" size="large" @click="getMore">加载更多</mt-button>
   </div>
</template>

<script>
   export default {
      data() {
         //data 是在自己组建内部挂载一些私有数据
         return {
            pageindex: 1,
            goodslist: []
         }
      },
      created() {
         this.getGoodsList();
         this.getMore();
      },
      methods: {
         getGoodsList() {
            //获取商品列表
            this.$http.get("api/getgoods?pageindex=" + this.pageindex).then(result => {
               if( result.body.status === 0) {
                  this.goodslist = this.goodslist.concat(result.body.message);
               }
            })
         },
         getMore() {
            //获取更多
            this.pageindex++;
            this.getGoodsList();
         },
         goDetail(id) {
            //新的路由导航 不用router-link
            //this.$route 是路由的参数对象 params query
            //this.$router 是路由导航对象 方便地使用JS代码实现路由的导航
            // this.$router.push("/home/goodsinfo/" + id) ---1
            // this.$router.push({path: "/home/goodsinfo/" + id}) ---2
            // 传递命名路由
            // this.$router.go(n)  -1返回 1前进
            this.$router.push({name: 'goodsinfo', params: { id }});
         }
      }
   }
</script>

<style lang="scss" scoped>
   .goods-list {
      display: flex;
      flex-wrap: wrap;
      padding: 7px;
      justify-content: space-between;  /*CSS3的两列布局*/

      .goods-item {
         width: 49%;
         border: 1px solid #ccc;
         box-shadow: 0 0 8px #ccc;
         margin: 4px 0;
         padding: 2px;
         display: flex;
         flex-direction: column;
         justify-content: space-between; /*CSS3的纵向布局*/
         min-height: 293px;
         img {
            width: 100%;
         }
         .title {
            font-size: 14px;
         }

         .info {
            background-color: #eee;
            p {
               margin: 0;
               padding: 5px;
            }
            .price {
               .now {
                  color: red;
                  font-size: 16px;
                  font-weight: bold;
               }
               .old {
                  text-decoration: line-through;
                  font-size: 12px;
                  margin-left: 10px;
               }
            }

            .sell {
               display: flex;
               justify-content: space-between;
               font-size: 13px;
            }
         }
      }
   }
</style>