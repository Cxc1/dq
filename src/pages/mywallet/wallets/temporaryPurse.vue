<template>
  <div class="temporaryPurse">
    <my-header title="临时钱包">
      <router-link tag="span" :to="{path:'/recordOfPurse',query:{purse:'temporaryPurse'}}" class="record">记录
      </router-link>
    </my-header>
    <div class="main">
      <ul class="temporaryPurse_top" v-if="false" v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
        <li class="temporaryPurse_productor" v-for="(item,index) in moneyTempList" :key="item.id">
          <div class="temporaryPurse_productor_top">
            <div class="temporaryPurse_productor_top_icon">
              <div class="orange" v-if="item.type==1">兑</div>
              <div class="orange" v-if="item.type==2">节</div>
              <div class="orange" v-if="item.type==3">入</div>
              <div>
                <p v-if="item.type==1">兑换记录</p>
                <p v-if="item.type==2">节点费</p>
                <p v-if="item.type==3">其他用户转入</p>
                <p>托管时间：{{item.time}}</p>
              </div>
            </div>
            <div class="temporaryPurse_productor_top_number">
              <p>{{item.money}}</p>
              <p v-if="item.second > 0">{{(item.second/3600).toFixed(1)}}H后将自动转入到资产包</p>
            </div>
          </div>
          <div class="move_link">
            <p @click="showtemToL(item , index)">转到资产包</p>
            <p @click="showtemToOther(item , index)">转到对方临时钱包</p>
          </div>
        </li>
      </ul>
      <div class="movablePurse_top">
        <p>临时钱包余额 (LTCC)</p>
        <p>{{initTempMoney}}</p>
      </div>
      <h3 class="formHead">
        最近记录
      </h3>
      <ul class="transaction_record_box">
        <puresRecord :showData="moneyTempList" :dateType="dateType"/>
      </ul>
      <div class="move_link">
        <p @click="showtemToL()">转到自己资产包</p>
        <p @click="showtemToOther()">转到对方临时钱包</p>
      </div>
    </div>
      <temToAnL @hideTemToL="hideTemToL" :initTempMoney="initTempMoney" :TemToLShowBol="temToAnLShowBol"/>
    <toOtherTran :showtemToOtherBol="showtemToOtherBol" :initTempMoney="initTempMoney"
                 @hideToOtherTran="hideToOtherTran"/>
  </div>
</template>

<script>
  import myHeader from '@/common/myHeader.vue'
  import temToAnL from '@/components/myWallet/temToAnL.vue'
  import toOtherTran from '@/components/myWallet/toOtherTran.vue'
  import puresRecord from '@/components/myWallet/puresRecord.vue'
  import {getdata} from "../../../services/mining";

  export default {
    name: "lockPurse",
    components: {
      myHeader,
      temToAnL,
      toOtherTran,
      puresRecord
    },
    data() {
      return {
        //列表数据显示的类型
        dateType: {
          typeon: '兑',
          typeto: '资',
          typest: '资',
          typefo: '活',
          typefi: '节',
          typesi: '出',
          typese: '入',
          typeei: '充',
          typeni: '超',
          typete: '卓',
          typeel: '领',
          typetw: '入',
          typeth: '入',
          typeft: '战',
          typefit: '扣',
          typesit: '出',
          typeset: '出',
          typeeit: '出',
          typenit: '兑',
          typetwt: '撤',

          typeonText: '兑换',
          typetoText: '手动转到资产包',
          typestText: '自动转到资产包',
          typefoText: '提取到活动钱包',
          typefiText: '节点费',
          typesiText: '转出其他用户',
          typeseText: '其他用户转入',
          typeeiText: '后台充值',
          typeniText: '超级节点服务',
          typeteText: '卓越节点服务',
          typeelText: '领袖节点服务',
          typetwText: '从资产包转入',
          typethText: '他人活动钱包转入',
          typeftText: '战绩收益',
          typefitText: '后台扣除',
          typesitText: '战绩钱包转出其他用户资产包',
          typesetText: '战绩钱包转出其他用户战绩钱包',
          typeeitText: '战绩钱包转自己资产包',
          typenitText: '兑换UUC',
          typetwtText: '兑换UUC撤销',

        },

        //转到资产包弹出框
        temToAnLShowBol: false,

        //转到其他用户临时包弹出框
        showtemToOtherBol: false,

        //最近交易记录数据
        showData: [],

        //上拉加载更多数据
        loading: false,

        //默认获取第1 页数据
        page: 1,

        //默认每页加载5 条数据
        pageDatas: 5,

        //列表数据
        moneyTempList: [],

        //删除的数据下标（弃）
        eleIndex: '',

        //
        initTempMoney: ''
      }
    },
    methods: {
      //隐藏转到资产包弹框
      hideTemToL(bol) {
        this.temToAnLShowBol = false;
        //操作数据时重新获取数据
        if (bol) {
          this.getInitTempMoney()
        }
      },


      //隐藏向其他人临时包转账弹框
      hideToOtherTran(bol) {
        this.showtemToOtherBol = false;
        //数据操作时，重新获取
        if (bol) {
          this.getInitTempMoney()
        }
      },


      //显示转账从临时钱包转到锁仓钱包框，并把对象传过去
      showtemToL() {
        this.temToAnLShowBol = true
      },


      //显示转账从临时钱包对方临时钱包框，并把对象传过去
      showtemToOther() {
        this.showtemToOtherBol = true
      },


// 获取页面初始数据
      getInitTempMoney() {
        getdata('/Supernode/initTempMoney', {
          token: this.$token,
          mark: this.$mark,
        }).then(res => {
          this.$vux.loading.hide();
          if (res.data.code == 10000) {
            this.initTempMoney = res.data.result.userInfo.temp_money;
            this.moneyTempList = res.data.result.logList;
          } else {
            this.$vux.toast.text(res.data.message)
          }
        })
      },
    },


    created() {
      this.$vux.loading.show({
        text: '数据加载中'
      });
      this.getInitTempMoney();
    }
  }
</script>

<style lang="less" scoped>
  @import url("../../../styles/walletRecord.less");

  /* .main {
     background-color: #090c11;
     > .temporaryPurse_top {
       width: 100%;
       height: 100%;
       overflow-y: scroll;
       > li {
         color: #9fa1b0;
         font-size: 1.2rem;
         height: 15rem;
         background-color: #1d212d;
         margin-bottom: .5rem;
         > .temporaryPurse_productor_top {
           height: 11rem;
           padding: 1rem;
           box-sizing: border-box;
           overflow: hidden;
           white-space: nowrap;

           > .temporaryPurse_productor_top_icon {
             height: 4rem;
             display: flex;
             > div {
               flex: 1;
             }
             > div:nth-child(1) {
               max-width: 4rem;
               height: 100%;
               line-height: 4rem;
               color: #5c6470;
               border-radius: 50%;
               text-align: center;
               font-size: 1.6rem;
               color: #fff;
               &.orange {
                 background-color: #dfb658;
               }
             }
             > div:nth-child(2) {
               padding-left: 1rem;
               > p {
                 line-height: 1.5rem;
                 height: 1.5rem;
                 font-size: 1rem;
                 &:nth-child(1) {
                   line-height: 2.5rem;
                   height: 2.5rem;
                   color: #d8bb54;
                   font-size: 1.2rem;
                 }
               }
             }
           }
           .temporaryPurse_productor_top_number {
             height: 5rem;
             text-align: center;
             > p {
               line-height: 2rem;
               height: 2rem;
               &:nth-child(1) {
                 line-height: 3rem;
                 height: 3rem;
                 color: #df0b3f;
                 font-size: 1.8rem;
               }
             }
           }
         }
       }
     }
   }*/
  .main {
    background-color: #090c11;
  }

  .movablePurse_top {
    box-sizing: border-box;
    height: 12rem;
    width: 100%;
    background-color: #1d212d;
    padding: 1rem;
    color: #9fa1b0;
    text-align: center;
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

  .move_link {
    position: absolute;
    height: 4rem;
    width: 100%;
    bottom: 0;
    background-color: #2baf76;
    line-height: 4rem;
    color: #fff;
    font-size: 1.2rem;
    display: flex;
    > p {
      flex: 1;
      background-color: #54aadb;
      text-align: center;
      &:nth-child(1) {
        background-color: #dbba54;
      }
    }
  }
</style>
