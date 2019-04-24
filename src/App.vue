<template>
  <div id="app">
    <!--<transition enter-active-class="slideInRight" leave-active-class="fadeOut">-->
    <router-view/>
    <!--</transition>-->
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="less" scoped>
  .slideInRight, .slideOutRight {
    animation-duration: 500ms;
  }


</style>
