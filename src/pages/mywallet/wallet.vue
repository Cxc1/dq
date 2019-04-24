<template>
  <div class="wallet" v-if="foundWalletBol">
    <myHeader title="钱包">
    </myHeader>
    <div class="main">
      <div class="wallet_center">
        <div class="wallet_center_icon"></div>
      </div>
      <div class="btnBox">
        <router-link tag="div" :to="{
      path : '/foundWallet' ,
      query:{ wc_id : wcid  , wc_name :selectItem ,tabIndex : tabIndex}
      }" class="btn">创建钱包
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import myHeader from '@/common/myHeader.vue'
  import {getdata} from "@/services/mining";

  export default {
    name: "wallet",
    components: {
      myHeader,
    },
    data() {
      return {
        wcid: this.$route.query.wc_id,
        selectItem: this.$route.query.wc_name,
        tabIndex: this.$route.query.tabIndex,
        foundWalletBol: false
      }
    },
    methods: {},
    created() {
      if (!this.$route.query.wc_id) {
        this.$router.push('/mywallet');
      } else {
        this.foundWalletBol = true;
      }
      /*  //判断是否需要创建钱包地址
        getdata('/Wallet/iscreatewallet', {
          token: this.$token,
          mark: this.$mark
        }).then(res => {
          if (res.data.code == 10000) {
            this.$router.push('/mywallet');
          } else {
            this.$vux.toast.text(res.data.message);
            this.foundWalletBol = true;
          }
        })*/
    }
  }
</script>

<style lang="less" scoped>
  .main {

    > .wallet_center {
      height: 70%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      > .wallet_center_icon {
        width: 10rem;
        height: 10rem;
        background: url("imgs/icon-wallet.png") no-repeat center;
        background-size: 100%;
      }
    }
    > .btnBox {
      height: 4rem;
      > .btn {
        height: 100%;
        width: 70%;
        margin: auto;
        border-radius: 2rem;
        background-color: #dbba54;
        color: #fff;
        line-height: 4rem;
        text-align: center;
        font-size: 1.4rem;
      }
    }

  }


</style>
