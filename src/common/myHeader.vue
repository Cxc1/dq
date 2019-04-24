<template>
  <header>
    <span class="back" v-show="gobackShowBol" @click="goback"></span>
    <h2>{{title}}</h2>
    <slot></slot>
  </header>
</template>
<script>
  import {hidebottom, exitpage, showbottom, getCookie} from "@/utils/tool";

  export default {
    name: "myHeader",
    //标题
    props: ['title'],
    data() {
      return {
        gobackShowBol: true
      }
    },
    methods: {
      //返回方法
      goback() {
        if (this.$route.name === 'other_kline') {
          let client = getCookie('odrplatform');//客户端
          if (client === 'ios') {
            //ios端退出页面
            window.webkit.messageHandlers.iosAction.postMessage("exit");
          } else {
            this.$router.push({path: '/mywallet', query: {tabIndex: this.$route.query.tabIndex}})
          }
        } else if (this.$route.name === 'chargeMoney' ||
          this.$route.name === 'withdrawMoney' ||
          this.$route.name === 'Supernode' ||
          this.$route.name === 'K-line' ||
          this.$route.name === 'hierarchicalNode'
        ) {

          this.$router.push({path: '/mywallet', query: {tabIndex: this.$route.query.tabIndex}})
        } else if (this.$route.name === 'accountBook') {
          if (this.$route.query.tabIndex >= 0) {
            this.$router.push({path: '/mywallet', query: {tabIndex: this.$route.query.tabIndex}})
          } else {
            this.$router.go(-1)
          }
        } else {
          this.$router.go(-1)
        }
      },
      //隐藏底部
      hidebottom() {
        hidebottom()
      },
      //显示底部
      showbottom() {
        showbottom()
      }
    },
    created() {
      window.goback = this.goback;
      const router_name = this.$route.name;
      this.hidebottom();

      if (
        router_name === 'wallet' ||
        router_name === 'foundWalletSuc' ||
        router_name === 'foundWallet') {
        this.gobackShowBol = false
      } else {
        this.gobackShowBol = true
      }
    }
  };
</script>

<style lang="less" scoped>
  header {
    height: 46px;
    width: 100%;
    background-color: #000;
    position: fixed;
    top: 0;
    display: flex;
    align-content: center;
    justify-content: center;
    color: #fff;
    line-height: 46px;

  }

  header > h2 {
    line-height: 46px;
    font-size: 16px;
    font-weight: 600;
  }

  .add_icon {
    display: inline-block;
    width: 2rem;
    background: url("../assets/add_icon.png") no-repeat center;
    margin: .5rem;
    box-sizing: border-box;
    position: absolute;
    right: .5rem;
    top: 0;
    bottom: 0;
  }

  .back {
    position: absolute;
    left: .5rem;
    width: 3rem;
    height: 100%;
    background: url("../assets/back_icon.png") no-repeat center;
    background-size: 60%;
  }
</style>
