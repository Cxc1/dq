<template>
  <div class="K-line">
    <myHeader title="LTCC价格走势">
    </myHeader>
    <!-- <div class="main">
     <div class="kline_top">
     <div>
     <p>今日价格：</p>
     <p>{{price.today_price}}</p>
     </div>
     <div>
     <p>昨日价格：</p>
     <p>{{price.yesterday_price}}</p>
     </div>
     </div>
     <div class="kline_title">
     <div>价格走势图</div>
     <div>
     <span :class="{myActive : trend_type == 1}" @click="TrendTypeOne">近一周</span>
     <span :class="{myActive : trend_type == 2}" @click="TrendTypeTow">近一个月</span>
     </div>
     </div>
     <div class="kline">
     <ve-line :data="chartData"
     :legend-visible="false"
     :data-empty="dataEmpty"
     height="350px">

     </ve-line>
     </div>
     </div>-->
    <div class="main">
      <div class="other_kline_top">
        <div>
          <p>当前价：<span class="color" :class="{green : colorBol}">{{price.now}}</span>CNY</p>
          <p>开盘价：{{price.open}}<span>CNY</span></p>
        </div>
        <div>
          <p>高 <span>{{price.high}}</span></p>
          <p>低 <span>{{price.low}}</span></p>
        </div>
      </div>
      <div class="other_kline_kline">
        <ve-candle :data="chartData"
                   height="450px"
                   :settings="chartSettings"
        >
        </ve-candle>
        <!--<ve-line :data="chartData" height="30rem" :settings="chartSettings"></ve-line>-->
      </div>
    </div>
  </div>
</template>

<script>
  import myHeader from '@/common/myHeader.vue'
  import {getdata} from "@/services/mining";
  import 'v-charts/lib/style.css'
  export default {
    name: "K-line",
    components: {
      myHeader,
    },
    data() {
      this.chartSettings = {
        showMA: true,
        MA: [1]
      };
      // this.chartSettings = {
      //   stack: {'用户': ['访问用户']},
      //   // area: true
      // }
      return {
        colorBol: false,
        dataEmpty: false,
        chartData: {
          // columns: ['date','price'],
          columns: ['date', 'open', 'close', 'low', 'high', 'vol'],
          rows: []
        },
        // chartData: {
        //   columns: ['date', 'open'],
        //   rows: [
        //     {'日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32},
        //     {'日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26},
        //     {'日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76},
        //     {'日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49},
        //     {'日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323},
        //     {'日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78}
        //   ]
        // },
        trend_type: 2,
        price: '',
      }
    },
    created() {
      // this.$vux.loading.show();
      this.getShowdate()
    },
    mounted() {
    },
    destroyed() {
    },
    methods: {



      timestampToTime(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() + ' ';
        var h = date.getHours() + ':';
        var m = date.getMinutes() + ':';
        var s = date.getSeconds();
        return Y + M + D + h + m + s;
      },
      getShowdate() {
        // this.$http.get(`http://api.coindog.com/api/v1/klines/BITFINEX:BTCUSD/D1`)
        //   .then(res => {
        //
        //     this.$vux.loading.hide();
        //     for (let i = 0; i < res.data.length; i++) {
        //       // this.chartData.rows[i].dateTime = ''
        //       res.data[i].dateTime = this.timestampToTime(res.data[i].dateTime)
        //     }
        //     // res.data.length = 10;
        //     console.log(res.data);
        //     this.chartData.rows = res.data.reverse();
        //
        //   })
        getdata('/Exchange/getTrend', {
          token: this.$token,
          mark: this.$mark,
          trend_type: this.trend_type,
        }).then(res => {
          this.$vux.loading.hide();
          if (res.data.code == 10000) {
            this.chartData.rows = res.data.result.trends;
            this.price = res.data.result.price;
            // for (let i = 0; i < this.chartData.rows.length; i++) {
            //   this.chartData.rows[i].date = ''
            // }
            if (Number(this.price.now) >= Number(this.price.open)) {
              this.colorBol = true
            }
            if (this.chartData.rows.length <= 0) {
              this.dataEmpty = true
            }
          }
        })
      },
      //切换数据类型
      TrendTypeOne() {
        this.trend_type = 1;
        this.getShowdate()
      },
      TrendTypeTow() {
        this.trend_type = 2;
        this.getShowdate()
      },
    },
  }
</script>

<style lang="less" scoped>
  .main {

    background-color: #0b1418;
    > .other_kline_top {
      height: 8rem;
      box-sizing: border-box;
      padding: 1rem;
      display: flex;
      > div {
        flex: 1;
        font-size: 1.2rem;
        &:nth-child(2) {
          max-width: 35%;
          > p {
            height: 3rem;
            line-height: 3rem;
            > span {
              float: right;
              color: #6e86a8;
              max-width: 60%;
              white-space: nowrap;
              overflow-x: scroll;
            }
          }
        }
        &:nth-child(1) {
          > p {
            height: 3rem;
            line-height: 3rem;

            > span {

              padding: 0 .5rem;
              &.color {
                color: red;
              }
              &.green {
                color: green;
              }
            }
            &:nth-child(1) {
              font-size: 1.4rem;

            }
          }
        }
        > p {
          height: 2rem;
          line-height: 2rem;
          color: #8b939f;

        }
      }
    }
    > .other_kline_time {
      height: 3rem;
      line-height: 3rem;
      text-align: center;
      color: #6e86a8;
      display: flex;
      > p {
        flex: 1;
        > span {
          display: inline-block;
          &.myActive {
            color: #5085d3;
            border-bottom: 1px solid #5085d3;
            box-sizing: border-box;
          }
        }
        &:nth-last-child(1) {
          position: relative;
          > .slelect {
            position: absolute;
            z-index: 99;
            top: 3rem;
            width: 100%;
            left: 0;
            height: 0;
            overflow-y: hidden;
            transition: height .1s;
            &.Active {
              border-top: 1px solid #222;
              height: 6rem;
            }
            > span {
              display: block;
              background-color: #0b1418;
              &.myActive {
                color: #5085d3;
                border-bottom: 1px solid #5085d3;
                box-sizing: border-box;
              }
            }
          }
        }
      }
    }
    > .other_kline_kline {
      position: absolute;
      top: 11rem;
      bottom: 25rem;
      left: 0;
      right: 0;
    }
  }

  /* .main {
   background-color: #0b1418;
   > .kline_top {
   height: 12rem;
   padding: 2rem;
   box-sizing: border-box;
   text-align: center;
   color: #fff;
   > div {
   height: 4rem;
   line-height: 3rem;
   display: flex;
   align-items: center;
   > p {
   flex: 1;
   height: 3rem;
   text-align: left;
   font-size: 1.4rem;
   &:nth-child(1) {
   max-width: 35%;
   text-align: center;
   background-color: #3e84f5;
   color: #fff;
   }
   &:nth-child(2) {
   text-indent: .5rem;
   }
   }
   &:nth-child(2) {
   > p:nth-child(1) {
   background-color: #d52e0f;
   }
   }
   }
   }

   > .kline_title {
   height: 4rem;
   padding: .5rem 2rem;
   box-sizing: border-box;
   display: flex;
   > div {
   flex: 1;
   line-height: 3rem;
   color: #3e84f5;
   &:nth-child(1) {
   font-size: 1.4rem;
   font-weight: bolder;
   }
   &:nth-child(2) {
   max-width: 40%;
   display: flex;
   > span {
   display: inline-block;
   flex: 1;
   text-align: center;
   color: #aaa;
   &.myActive {
   color: #3e84f5;
   }
   }
   }
   }
   }
   > .kline {

   }
   }
 */

</style>
