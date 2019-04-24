<template>
  <div class="chargeMoney">
    <myHeader title="充币">
      <span class="record" @click="showToOtherTran" v-show="false">从资产导入</span>
    </myHeader>
    <div class="main">
      <div class="address_box">
        <p>用户ID：{{user_id}}</p>
        <p>
          <img
            :src="`${api}/Wallet/walletqrcode?token=${this.$token}&mark=${this.$mark}&wcid=${this.$route.query.wc_id}`">
        </p>
        <p><span>{{addressUrl}}</span></p>
        <p>
          <button v-clipboard:copy="addressUrl"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError">
            复制钱包地址
          </button>
        </p>
      </div>
      <router-link tag="div" :to="{path : '/accountBook' ,query:{ wc_id : this.$route.query.wc_id}}"
                   class="accountBook">
        <span></span>
        <span>账本</span>
        <span>每笔交易都记录在这里</span>
        <span></span>
      </router-link>
      <div @click="toWithdrawMoney"
           :to="{path : '/withdrawMoney' ,query:{ wc_id : this.$route.query.wc_id}}"
           class="withdrawMoney">
        <span></span>
        <span>提币</span>
        <span>将{{this.$route.query.wc_name}}转出到其他地址 </span>
        <span></span>
      </div>
    </div>
    <leadingIn @hideToOtherTran="hideToOtherTran" :ToOtherTranShow="ToOtherTranShow"/>
  </div>
</template>

<script>
  import myHeader from '@/common/myHeader.vue'
  import {getdataBz} from "@/services/mining";
  import leadingIn from '@/components/myWallet/leadingIn'
  import API from '@/api'
  import {AlertModule} from 'vux'
  export default {
    name: "chargeMoney",
    components: {
      myHeader,
      leadingIn
    },
    data() {
      return {
        //钱包地址
        addressUrl: '',
        //二维码路径
        api: API.URL,
        //用户id
        user_id: '',
        //隐藏导入框
        ToOtherTranShow: false,
        //币种id
        wc_id: this.$route.query.wc_id,
        //币名
        wc_name: this.$route.query.wc_name,
      }
    },
    methods: {
      //复制的方法
      onCopy: function (e) {
        this.$vux.toast.show({
          text: '复制成功',
          width: '9.5rem',
          type: 'success',
        })
      },
      onError: function (e) {
        this.$vux.toast.show({
          text: '复制失败',
          width: '9.5rem',
          type: 'cancel',

        })
      },

      toWithdrawMoney() {
        if (this.wc_name == 'LTCC') {
          AlertModule.show({
            title: '友情提示',
            content: '提币通道暂时关闭',
            onHide() {

            }
          })
        } else {
          this.$router.push({
            path: '/withdrawMoney',
            query: {
              wc_id: this.wc_id
            }
          });
        }
      },

      //隐藏导入框
      hideToOtherTran() {
        this.ToOtherTranShow = false;
      },


      //显示导入框
      showToOtherTran() {
        this.ToOtherTranShow = true;
      }
    },
    created() {

      //获取页面数据
      getdataBz('/Wallet/getusersaddress', {
        token: this.$token,
        mark: this.$mark,
        wcid: this.wc_id,
      }).then(res => {
        if (res.data.code == 10000) {
          this.addressUrl = res.data.result.wa_address;
          this.user_id = res.data.result.wa_user_id
        } else {
          this.$vux.toast.text(res.data.message)
        }
      })
    }
  }
</script>

<style lang="less" scoped>
  .record {
    display: inline-block;
    box-sizing: border-box;
    position: absolute;
    padding: 0 1rem;
    right: 0;
    top: 0;
    bottom: 0;
    font-size: 14px;
  }

  .main {
    background-color: #161c29;
    > .address_box {
      height: 32rem;
      width: 25rem;
      background-color: #f4f4f4;
      margin: auto;
      margin-top: 5rem;
      margin-bottom: 2rem;
      padding: 1rem;
      box-sizing: border-box;
      text-align: center;
      > p {
        height: 2.5rem;
        line-height: 2.5rem;
        overflow-x: scroll;
        font-size: 1.4rem;
        &:nth-child(1) {
          color: #222;
        }
        &:nth-child(2) {
          height: 20rem;
          width: 20rem;
          margin: auto;
          > img {
            display: inline-block;
            width: 18rem;
            height: 18rem;
          }
        }
        &:nth-child(3) {
          height: 5rem;
          line-height: 2rem;
        }
        > span {
          border: none;
          background-color: #f4f4f4;
          color: #333;
          text-align: center;
          display: inline-block;
          font-size: 1rem;
          width: 80%;
          line-height: 1.5rem;
          word-break: break-all;
        }
        > button {
          width: 18rem;
          border: none;
          outline: none;
          height: 2.5rem;
          color: #fff;
          background: #4c9ee4;
          &:active {
            opacity: .8;
          }
        }
      }
    }
    > .accountBook, .withdrawMoney {
      height: 5rem;
      width: 100%;
      background-color: #1f2733;
      margin-bottom: .1rem;
      padding: 1rem;
      line-height: 3rem;
      box-sizing: border-box;
      > span {
        display: inline-block;
        float: left;
        &:nth-child(1) {
          width: 3rem;
          height: 100%;

          border-radius: 50%;
        }
        &:nth-child(2) {
          margin: 0 1rem;
          font-size: 1.3rem;
          color: #ddd;
        }
        &:nth-child(3) {
          color: #657081;
        }
        &:nth-child(4) {
          width: 3rem;
          height: 100%;
          float: right;
          background: url("imgs/user_icon_getin.png") no-repeat right;
          background-size: 30%;
        }
      }
    }
    .accountBook {
      > span:nth-child(1) {
        background: url("imgs/accountBook.png") no-repeat center;
        background-color: #f56939;
        background-size: 60%;
      }
    }
    .withdrawMoney {
      > span:nth-child(1) {
        background: url("imgs/withdrawMoney.png") no-repeat center;
        background-color: #2a8edb;
        background-size: 60%;
      }
    }
  }
</style>
