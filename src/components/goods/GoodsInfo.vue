<template>
   <div class="goodsinfo-container">
      
      <!-- 半场动画 -->
      <transition
         @before-enter="beforeEnter"
         @enter="enter"
         @after-enter="afterEnter">
         <div class="ball" v-show="ballFlag" ref="ball"></div>
      </transition>
      
      <!-- 商品轮播区域 -->
      <div class="mui-card">
         <div class="mui-card-content">
            <div class="mui-card-content-inner">
               <swipe :lunbotuList="lunbotu" :isfull="false"></swipe>
            </div>
         </div>
      </div>

      <!-- 商品购买区域 -->
      <div class="mui-card">
         <div class="mui-card-header">{{ goodsinfo.title }}</div>
         <div class="mui-card-content">
            <div class="mui-card-content-inner">
               <p class="price">
                  市场价: <del>&yen;{{ goodsinfo.market_price }}</del>&nbsp;&nbsp;销售价: <span class="now_price">&yen;{{ goodsinfo.sell_price }}</span>   
               </p>
               <p>购买数量:<numbox @getCount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox></p>
               <p>
                  <mt-button type="primary" size="small">立即购买</mt-button>
                  <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
               </p>
            </div>
         </div>
      </div>

      <!-- 商品参数区域 -->
      <div class="mui-card">
         <div class="mui-card-header">商品参数</div>
         <div class="mui-card-content">
            <div class="mui-card-content-inner">
               <p>商品货号:{{ goodsinfo.goods_no }}</p>
               <p>库存情况:{{ goodsinfo.stock_quantity }}件</p>
               <p>上架时间:{{ goodsinfo.add_time | dateFormat }}</p>
            </div>
         </div>
         <div class="mui-card-footer">
            <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
            <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
         </div>
      </div>

   </div>
</template>

<script>
   import swipe from '../subcomponent/swipe.vue'
   //导入数字选择框组件
   import numbox from '../subcomponent/goodsinfo_numbox.vue'

   export default {
      data() {
         return {
            id: this.$route.params.id, //挂载路由参数的Id
            lunbotu: [],
            goodsinfo: {},
            ballFlag: false, //控制小球隐藏和显示的标识符
            selectedCount: 1  //用户要购买的数量 默认为1个
         }
      },
      created() {
         this.getLunbotu();
         this.getGoodsInfo();
      },
      methods: {
         getLunbotu() {
            //获取轮播图
            this.$http.get("api/getthumimages" + this.id).then(result => {
               if (result.body.status === 0) {
                  result.body.message.forEach(item => {
                     item.img = item.src;
                  });
                  this.lunbotu = result.body.message;
               }
            });
         },
         getGoodsInfo() {
            //获取商品信息
            this.$http.get("api/goods/getinfo/" + this.id).then(result => {
               if (result.body.status === 0) {
                  this.goodsinfo = result.body.message[0];
               }
            })
         },
         goDesc(id) {
            //点击跳到图文介绍
            this.$router.push({name: 'goodsdesc', path: { id } });
         },
         goComment(id) {
            //点击跳到评论区
            this.$router.push({name: 'goodscomment', path: { id } });
         },
         addToShopCar() {
            //添加到购物车
            this.ballFlag = !this.ballFlag;
            // { id: 商品id, count: 购买数量, price: 单价, selected: false}
            // 拼接出一个要保存到store car里的对象
            var goodsinfo = { id: this.id, count: this.selectedCount, price: this.goodsinfo.sell_price, selected: true };

            // 调用store中的mutations
            this.$store.commit('addToCar', goodsinfo);
         },
         beforeEnter(el) {
            el.style.transform = "translate(0, 0)";
         },
         enter(el, done) {
            el.offsetWidth;
            //获取小球的位置
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            //获取徽标的位置
            const badgePosition = document.getElementById('badge').getBoundingClientRect();
            //计算动态位置
            const xDist = badgePosition.left - ballPosition.left;
            const yDist = badgePosition.top - ballPosition.top;

            el.style.transform = `translate(${xDist}px, ${yDist}px)`;
            el.style.transition = "all 0.5s cubic-bezier(.4, -0.3, 1, .68)";
            done();
         },
         afterEnter(el) {
            this.ballFlag = !this.ballFlag;
         },
         getSelectedCount(count) {
            //当子组件调用父自己这个方法 把数量传过来保存
            this.selectedCount = count;
         }
      },
      components: {
         swipe,
         numbox
      }
   }
</script>

<style lang="scss" scoped>
   .goodsinfo-container {
      background-color: #eee;
      overflow: hidden;  /*解决margin塌陷问题*/

      .now_price {
         color: red;
         font-size: 16px;
         font-weight: bold;
      }

      .mui-card-footer {
         display: block;
         button {
            margin: 15px 0;
         }
      }

      .ball {
         width: 15px;
         height: 15px;
         border-radius: 50%;
         background-color: red;
         position: absolute;
         z-index: 99;
         top: 390px;
         left: 138px;
      }
   }
</style>