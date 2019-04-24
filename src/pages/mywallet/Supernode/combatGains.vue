<template>
  <div class="combatGains">
    <myHeader title="战绩收益"/>
    <div class="main">
      <div class="combatGains_top">
        <div class="combatGains_top_conten">
          <p>
            <span>累计收益 <span>(LTCC)</span></span>
            <span>今日收益 <span>(LTCC)</span></span>
          </p>
          <p>
            <span>{{initMoneyLockRecord.total_money}}</span>
            <span>{{initMoneyLockRecord.today_money}}</span>
          </p>
        </div>
        <h3 class="formHead">
          收益记录
        </h3>
        <div class="combatGains_top_btn"  v-if="false" :class="{active : btnBol}" @click="showToActive">{{btnHtml}}
          <span v-show="!btnBol"></span>
        </div>
      </div>
      <ul class="transaction_record_box">
        <revenueRecord :showData='showData'
         :recordText="recordText"
         :loadBol="loadBol" @addData="addData"/>
      </ul>
    </div>
    <toTem @hideToActive="hideToActive" :moneyNum="initMoneyLockRecord.today_money"
              :showBol="toActiveShowBol" :type="2"/>
  </div>
</template>
<script>
  import myHeader from '@/common/myHeader.vue'
  import revenueRecord from '@/components/myWallet/revenueRecord.vue'
  import {getdata} from "@/services/mining";
  import toActive from '@/components/myWallet/toActive.vue'
  import toTem from '@/components/myWallet/toTem.vue'

  export default {
    components: {
      myHeader,
      revenueRecord,
      toActive,
      toTem
    },
    data() {
      return {
        //列表数据
        showData: [],

        //控制上拉加载的bol值
        loadBol: true,

        //初始化加载数据为第一页
        page: 1,

        //每页数据为8条
        pageDatas: 8,

        //初始化列表数据
        initMoneyLockRecord: '',

        //按钮文字初始化
        btnHtml: '',

        //控制转入活动包按钮
        btnBol: false,

        //初始化转入活动钱包框为隐藏
        toActiveShowBol: false,

        //说明文字
        recordText: '战绩日化收益',
    }
    },
    methods: {


      //上拉加载数据
      addData() {
        this.$vux.loading.show({
          text: '数据加载中'
        });
        this.page += 1;
        let setId = setTimeout(() => {
          this.getShowData();
          clearTimeout(setId)
        }, 1000)
      },


      //隐藏转入活动钱包框
      hideToActive(bol) {
        this.toActiveShowBol = false
        if (bol) {
          this.getInitMoneyLockRecord();
          this.getShowData()
        }
      },


      //显示转入活动钱包框
      showToActive() {
        if (this.initMoneyLockRecord.status == 1) {
          this.toActiveShowBol = true
        }
      },


      //获取初始数据
      getInitMoneyLockRecord() {

        getdata('/Supernode/initMoneyLockRecord',
          {
            token: this.$token,
            mark: this.$mark,
          }).then(res => {
          if (res.data.code == 10000) {
            this.initMoneyLockRecord = res.data.result.userInfo;
            this.btnBol = false;
            if (res.data.result.userInfo.status == 1) {
              this.btnHtml = '战绩收益手动领取';
              this.btnBol = true
            } else if (res.data.result.userInfo.status == 2) {
              this.btnHtml = '已领取'
            } else {
              this.btnHtml = '无收益'
            }
          } else {
            this.$vux.toast.text(res.data.message)
          }
        }).catch(error => {
          this.$vux.toast.text('数据获取失败')
        })
      },


      //获取列表数据
      getShowData() {
        this.loadBol = true;
        getdata('/Supernode/getMoneyLockRecordLog',
          {
            token: this.$token,
            mark: this.$mark,
            p: this.page,
            ps: this.pageDatas,
          }).then(res => {
          this.$vux.loading.hide();
          if (res.data.code == 10000) {
            if (res.data.result.length > 0) {
              this.$vux.toast.text('数据加载成功');
              this.showData = this.showData.concat(res.data.result)
              this.loadBol = false
            } else {
              this.$vux.toast.text('没有更多数据');
            }
          } else {
            this.$vux.toast.text(res.data.message)
          }
        })
      }

    },


    created() {
      this.getInitMoneyLockRecord();
      this.getShowData()
    }
  }
</script>
<style lang="less" scoped>
  @import url("../../../styles/record.less");

  .main {
    -webkit-overflow-scrolling: touch;
    background-color: #090c11;
  }

  .combatGains_top {
    height: 8rem;
    /*border-bottom: .5rem solid #000;*/
    background-color: #0e1520;
    > .combatGains_top_conten {
      height: 8rem;
      padding: 1rem;
      box-sizing: border-box;
      > p {
        height: 3rem;
        line-height: 3rem;
        display: flex;
        color: #9fa1b0;
        text-align: center;
        font-size: 1.2rem;
        &:nth-child(2) {
          font-size: 1.5rem;
          color: #dbba53;
        }
        > span {
          display: inline-block;
          flex: 1;
          max-width: 50%;
          overflow-x: scroll;
          > span {
            color: #9a7e42;
          }

        }
      }

    }
    > .combatGains_top_btn {
      height: 4rem;
      color: #fff;
      background-color: #dbba53;
      line-height: 4rem;
      text-align: center;
      font-size: 1.4rem;
      position: relative;
      opacity: .7;
      &.active {
        opacity: 1;
      }
      > span {
        display: inline-block;
        height: 2.5rem;
        width: 2.5rem;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        background: url("imgs/off.png") no-repeat center;
        background-size: 100%;
        border-radius: 50%;
      }
    }

  }
  .formHead {
    color: #8b939f;
    font-size: 1.2rem;
    margin: .5rem 1rem;
    text-align: left;
  }
  .transaction_record_box {
    width: 100%;
    position: absolute;
    top: 10.5rem;
    bottom: 0;

    .record_products {
      .icon {
        span {
          &.green {
            color: #15d171;
            border: 1px solid #15d171;
          }
          &.blue {
            color: yellow;
            border: 1px solid yellow;
          }
        }
      }
      .green {
        color: #15d171;
      }
      .yellow {
        color: darkorange;
      }
      .record_products_center {
        p {
          span {
            &:nth-child(2) {
              float: right;
            }
            &.blod {
              font-weight: bolder;
            }
          }
          &:nth-child(3) {
            border-bottom: 1px solid #666;
          }
          &:nth-child(4) {
            span {
              &.yellow {
                color: #dbba54;
              }
            }
          }

        }
      }
    }
  }
</style>
