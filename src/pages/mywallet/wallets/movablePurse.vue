<template>
  <div class="movablePurse">
    <my-header title="活动钱包" >
      <router-link tag="span" class="record" :to="{path:'/recordOfPurse',query:{purse:'movablePurse'}}">
        记录
      </router-link>
    </my-header>
    <div class="main">
      <div class="movablePurse_top">
        <p>活动钱包余额 (LTCC)</p>
        <p>{{initLockMoney.usable_money}}</p>
      </div>
      <h3 class="formHead">
        最近记录
      </h3>
      <ul class="transaction_record_box">
        <puresRecord :showData="showData" :dateType="dateType"/>
      </ul>
      <div class="transaction_record_box_btn" >
        <p @click="ActToLockObject.ActToLockShowBol=true" class="move_link">转到自己资产包</p>
        <p class="move_other" @click="showMovToOtherTran = true">转到其他人活动钱包</p>
      </div>
    </div>
    <actToLock @hideActToLock="hideActToLock" :showBol="ActToLockObject"/>
    <movToOtherTran :showMovToOtherTran="showMovToOtherTran" @hidemovToOtherTran="hidemovToOtherTran"/>
  </div>
</template>

<script>
  import myHeader from '@/common/myHeader.vue'
  import puresRecord from '@/components/myWallet/puresRecord.vue'
  import actToLock from '@/components/myWallet/actToLock.vue'
  import movToOtherTran from '@/components/myWallet/movToOtherTran.vue'

  import {getdata} from '@/services/mining.js'

  export default {
    name: "movablePurse",
    components: {
      myHeader,
      puresRecord,
      actToLock,
      movToOtherTran
    },
    data() {
      return {
        ActToLockObject: {
          'ActToLockShowBol': false,
          'money': '0'
        },

        //列表记录数据
        showData: [],

        //初始化用户数据
        initLockMoney: '',

        showMovToOtherTran : false,

        //数据表对应的状态说明
        dateType: {
          typeon: '入',
          typeto: '出',
          typest: '兑',
          typefo: '释',
          typefi: '战',
          typesi: '出',
          typese: '划',
          typeei: '出',
          typeni: '出',
          typete: '出',
          typeel: '战',
          typetw: '出',
          typeth: '入',
          // typeft: '战',
          // typefit: '扣',

          typeonText: '临时钱包转入',
          typetoText: '转出到资产包',
          typestText: '兑换LTCC',
          typefoText: '资产包收益释放',
          typefiText: '战绩收益',
          typesiText: '转到他人临时钱包',
          typeseText: '划转通证',
          typeeiText: '战绩钱包转出其他用户资产包',
          typeniText: '战绩钱包转出其他用户战绩钱包',
          typeteText: '战绩钱包转资产包',
          typeelText: '战绩钱包收益释放',
          typetwText: '转出其他用户',
          typethText: '其他用户转入',
          // typeftText: '战绩收益',
          // typefitText: '后台扣除',

        },
      }
    },
    methods: {
      //隐藏弹出框
      hideActToLock(bol) {
        this.ActToLockObject.ActToLockShowBol = false;
        //如有数据操作，更新页面数据
        if (bol) {
          this.getInitUsableMoney()
        }
      },

      hidemovToOtherTran(bol){
        this.showMovToOtherTran = false;
        this.getInitUsableMoney()

      },

      //获取初始数据
      getInitUsableMoney() {
        getdata('/Supernode/initUsableMoney', {
          token: this.$token,
          mark: this.$mark
        }).then(res => {
          this.$vux.loading.hide();
          if (res.data.code == 10000) {
            this.initLockMoney = res.data.result.userInfo;
            this.ActToLockObject.money = res.data.result.userInfo.usable_money;
            this.showData = res.data.result.logList;
            this.showData['typeOne'] = ['释', '入', '燃'];
          } else {
            this.$vux.toast.text(res.data.message)
          }
        }).catch(error => {
          console.log(error);
          this.$vux.loading.hide();
        })
      }
    },
    created() {
      this.$vux.loading.show({
        text: '数据加载中'
      });
      this.getInitUsableMoney()
    }
  }
</script>

<style lang="less" scoped>
  @import url("../../../styles/walletRecord.less");

  .main {
    text-align: center;
    background-color: #090c11;
  }

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

  .movablePurse_top {
    box-sizing: border-box;
    height: 12rem;
    width: 100%;
    background-color: #1d212d;
    padding: 1rem;
    color: #9fa1b0;

    > p {
      line-height: 4rem;
      overflow-x: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      &:nth-child(2) {
        font-size: 2.2rem;
        color: #dbba53;
      }
    }
  }

  .transaction_record_box {
    position: absolute;
    top: 15rem;
    left: 0;
    right: 0;
    bottom: 4rem;
    overflow-y: scroll;
  }

  .transaction_record_box_btn {
    position: absolute;
    height: 4rem;
    width: 100%;
    bottom: 0;
    background-color: #2baf76;
    line-height: 4rem;
    color: #fff;
    font-size: 1.2rem;
    display: flex;
    >p{
      flex: 1;
    }
    >.move_link{
      background-color: #13c4ed;
    }
  }
</style>
