<template>
   <div class="shopcar-container">
      
      <div class="goods-list">
         
         <!-- 商品列表区域 -->
         <div class="mui-card" v-for="(item, i) in goodslist" :key="item.id">
            <div class="mui-card-content">
               <div class="mui-card-content-inner">
                  
                  <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChange(item.id, $store.getters.getGoodsSelected[item.id])"></mt-switch>
                  <img :src="item.thumb_path" alt="">
                  <div class="info">
                     <h1>{{ item.title }}</h1>
                     <p>
                        <span class="price">&yen;{{ item.sell_price }}</span>
                        <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                        <a href="#" @click.prevent="remove(item.id, i)">删除</a>
                     </p>
                  </div>

               </div>
            </div>
         </div>

      </div>

      <!-- 结算区域 -->
      <div class="mui-card">
         <div class="mui-card-content">
            <div class="mui-card-content-inner jiesuan">
               <div class="left">
                  <p>总计(不含运费)</p>
                  <p>已选商品 <span class="red">{{ $store.getters.getGoodsCountAndAmount.count }}</span> 件,总价<span class="red">&yen;{{ $store.getters.getGoodsCountAndAmount.amount }}</span></p>
               </div>
               <mt-button type="danger">去结算</mt-button>
            </div>
         </div>
      </div>

   </div>
</template>

<script>
   import numbox from '../subcomponent/shopcar_numbox.vue'

   export default {
      data() {
         return {
            goodslist: []
         }
      },
      created() {
         this.getshopcarlist();
      },
      methods: {
         getGoodsList() {
            //1.获取store中所有商品的Id 用，拼接成字符串
            var idArr = [];
            this.$store.state.car.forEach(item => idArr.push(item.id));
            //如果购物车没有商品 则返回 否则会报错
            if (idArr.length <= 0) return; 
            //获取购物车商品列表
            this.$http.get('api/goods/getshopcarlist' + idArr.join(",")).then(result => {
               if (result.body.status === 0) {
                  this.goodslist = result.body.message;
               }
            })
         },
         remove(id, index) {
            //点击删除，把商品从 store 中根据id删除  把当前组件中goodslist根据索引i 删除对应的商品
            this.goodslist.splice(index, 1);
            this.$store.commit("removeFormCar", id);
         },
         selectedChange(id ,val) {
            this.$store.commit('updateGoodsSelected', { id, selected: val });
         }
      },
      components: {
         numbox
      }
   }
</script>

<style lang="scss" scoped>
   .shopcar-container {
      background-color: #eee;
      overflow: hidden;
      .goods-list {
         .mui-card-content-inner {
            display: flex;
            align-items: center;
         }
         img {
            width: 60px;
            height: 60px;
         }
         h1 {
            font-size: 13px;
            margin-bottom: 15px;
         }
         .info {
            .price {
               color: red;
               font-weight: bold;
            }
         }
      }
      .jiesuan {
         display: flex;
         justify-content: space-between;
         align-items: center;
         .red {
            color: red;
            font-weight: bold;
            font-size: 16px;
         }
      }
   }
</style>