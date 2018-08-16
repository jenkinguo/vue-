// 入口文件
import Vue from 'vue'

//导入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//注册vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// 设置本地存储 每次进网站先读取购物车的数据
var car = JSON.parse(localStorage.getItem('car') || '[]');

var store = new Vuex.Store({
   state: { // this.$store.state.xxx
      car: car //将购物车的商品数据 用一个数组存起来 
              // { id: 商品id, count: 购买数量, price: 单价, selected: false}
   },
   mutations: { // this.$store.commit("方法名称", "唯一参数")
      addToCar(state, goodsinfo) {
         // 点击加入购物车
         // 1.如果已经有了 就只更新数量
         // 2.没有 就push到car里去
         
         //假设没找到同样商品
         var flag = false;

         state.car.some(item => {
            if (item.id == goodsinfo.id) {
               item.count += parseInt(goodsinfo.count);
               flag = true;
               return true;
            }
         });

         //最终 如果循环后flag还是false 就加到car中
         if (!flag) {
            state.car.push(goodsinfo)
         }
         //将数据保存到本地存储中
         localStorage.setItem('car', JSON.stringify(state.car));
      },
      updateGoodsInfo(state, goodsinfo) {
         //修改购物车中商品的数量值
         state.car.some(item => {
            if (item.id == goodsinfo.id) {
               item.count = parseInt(goodsinfo.count);
               return true;
            }
         });
         //当修改完商品的数量， 把最新的购物车数据保存到本地存储中
         localStorage.setItem('car', JSON.stringify(state.car));
      },
      removeFormCar(state, id) {
         //根据id 从store中的购物车删除对应商品
         state.car.forEach((item, i) => {
            if (item.id == id) {
               state.car.splice(i, 1);
               return true;
            }
         });

         localStorage.setItem('car', JSON.stringify(state.car));
      },
      updateGoodsSelected(state, info) {
         state.car.some(item => {
            if (item.id == info.id) {
               item.selected = info.selected;
               return true;
            }
         });

         localStorage.setItem('car', JSON.stringify(state.car));
      }
   },
   getters: { //this.$store.getters.xxxx
      getAllCount(state) {
         var c = 0;
         state.car.forEach(item => {
            c += item.count;
         });
         return c;
      },
      getGoodsCount(state) { //获取每个商品的购买数
         var o = {};
         state.car.forEach(item => {
            o[item.id] = item.count;
         });
         return o;
      },
      getGoodsSelected(state) { // 购物车的选择按钮状态
         var o = {};
         state.car.forEach(item => {
            o[item.id] = item.selected;
         });
         return o;
      },
      getGoodsCountAndAmount(state) {
         var o = { count: 0, amount: 0 };
         state.car.forEach(item => {
            if (item.selected) {
               o.count += item.count;
               o.amount += item.price * item.count;
            }
         });
         return o;
      }
   }
});

//导入时间格式化插件
import moment from 'moment'

//定义全局过滤器
Vue.filter('dateFormat', function(dateStr, pattern = "YYYY-MM-DD HH:mm:ss") {
   return moment(dateStr).format(pattern);
})

//导入 vue-resource
import VueResource from 'vue-resource'
Vue.use(VueResource)

//设置请求根路径
Vue.http.options.root = 'http://vue.studyit.io'
Vue.http.options.emulateJSON = true

//导入MUI样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'


//按需导入Mint-UI
/*import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui'
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.use(Lazyload);*/
import MintUI from 'mint-ui'   
Vue.use(MintUI)
import 'mint-ui/lib/style.css' //图片懒加载 需要加载全部组件和css

//安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

//导入路由对象
import router from './router.js'

//导入App根组件
import app from './App.vue'

var vm = new Vue({
   el: '#app',
   data: {},
   methods: {},
   render: c => c(app),
   router,  //挂载router 
   store   //挂载store 
})