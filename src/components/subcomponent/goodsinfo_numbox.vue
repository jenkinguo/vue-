<template>
   <!-- 因为是异步请求 所以max不知道什么时候才拿到 -->
   <!-- 可以用watch来监听 父组件传递过来的max值 -->
   <div class="mui-numbox" data-numbox-min='1'>
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input id="test" class="mui-input-numbox" type="number" value="1" @change="countChanged" ref="numbox" />
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
   </div>

</template>

<script>
   import mui from '../../lib/mui/js/mui.min.js'

   export default {
      mounted() {
         //初始化数字选择框组件
         mui('.mui-numbox').numbox()
      },
      methods: {
         countChanged() {
            //每当文本框的数据被修改的时候 立即把最新的数据通过事件调用传给父
            this.$emit('getCount', parseInt(this.$refs.numbox.value));
         }
      },
      props: ["max"],
      watch: {
         //属性监听
         max: function (newVal, oldVal) {
            //使用mui JS API 设置 numbox的最大值
            mui('.mui-numbox').numbox().setOption("max", newVal);
         }
      }
   }
</script>

<style>
   
</style>