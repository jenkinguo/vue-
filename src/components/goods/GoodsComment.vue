<template>
   <div>
      <cmtbox :id="$route.params.id"></cmtbox>
   </div>
</template>

<script>
   import cmtbox from '../subcomponent/comment.vue'

   export default {
      component: {
         cmtbox
      }
   }
</script>

<style>
   
</style>