<template>
  <div class="other_kline">
    <myHeader :title="title">
    </myHeader>
    <div class="main">
      <div class="other_kline_top">
        <div>
          <p :class="{green : colorBol}">{{klinetickData.close}}</p>
          <p>{{cny}} <span :class="{green : colorBol}">{{klinetickData.degree}}</span></p>
        </div>
        <div>
          <p>高 <span>{{klinetickData.high}}</span></p>
          <p>低 <span>{{klinetickData.low}}</span></p>
          <p>成交量 <span>{{klinetickData.vol}}</span></p>
        </div>
      </div>
      <div class="other_kline_time">
        <p><span>分时</span></p>
        <p><span :class="{myActive : period ==='M15'}" @click="period='M15'">15分钟</span></p>
        <p><span :class="{myActive : period ==='H1'}" @click="period='H1'">1小时</span></p>
        <p><span :class="{myActive : period ==='H4'}" @click="period='H4'">4小时</span></p>
        <p><span :class="{myActive : period ==='D1'}" @click="period='D1'">1天</span></p>
        <p>
          <span @click="seleShowBol = !seleShowBol">更多</span>
          <span @click="seleShowBol = !seleShowBol" class="slelect" :class="{Active : seleShowBol}">
            <span :class="{myActive : period ==='W1'}" @click="period='W1'">1周</span>
            <span :class="{myActive : period ==='MONTH'}" @click="period='MONTH'">1月</span>
          </span>
        </p>
      </div>
      <div class="other_kline_kline">
        <ve-candle :data="chartData"
                   height="450px"
                   :settings="chartSettings">

        </ve-candle>
      </div>
    </div>
  </div>
</template>

<script>
  import myHeader from '@/common/myHeader.vue'

  export default {
    name: "other_kline",
    components: {
      myHeader,

    },
    data() {

      this.chartSettings = {
        showMA: true,
        showVol: true
      };
      return {
        websocket: null,
        chartData: {
          columns: ['dateTime', 'open', 'close', 'low', 'high', 'vol'],
          rows: []
        },
        klinetickData: '',
        cny: '',
        name: this.$route.query.name,
        title: this.$route.query.name + '/USDT',
        period: 'M15',
        colorBol: '',
        seleShowBol: false,
      }
    },
    created() {
      this.$vux.loading.show();
      //页面刚进入时开启长连接
      this.initWebSocket()

    },
    destroyed() {
      //页面销毁时关闭长连接
      this.websocketclose();


    },
    methods: {

      getDate(date) {
        let t = new Date(date).toLocaleString();
        return t;
      },
      //获取火币网k线图数据
      getKlines() {
        this.$http.get(`http://api.coindog.com/api/v1/klines/BITFINEX:${this.name}USD/${this.period}`)
          .then(res => {
            this.chartData.rows = res.data.reverse();
            this.$vux.loading.hide();
            for (let i = 0; i < this.chartData.rows.length; i++) {
              this.chartData.rows[i].dateTime = ''
            }
          })
      },
      //获取倍率信息
      getTick() {
        this.$http.get(`http://api.coindog.com/api/v1/tick/BITFINEX:${this.name}USD?unit=usd`)
          .then(res => {
            this.klinetickData = res.data;

            this.klinetickData.degree = this.klinetickData.degree.toFixed(2);
            if (this.klinetickData.degree > 0) {
              this.colorBol = true;
            } else {
              this.colorBol = false;
            }
            this.klinetickData.degree = this.klinetickData.degree + '%';

            this.klinetickData.vol = this.klinetickData.vol.toFixed(2);

          });
        this.$http.get(`http://api.coindog.com/api/v1/tick/BITFINEX:${this.name}USD?unit=CNY`)
          .then(res => {
            this.cny = '≈' + res.data.close.toFixed(2) + 'CNY';
          })
      },
      initWebSocket() { //初始化weosocket

        const wsuri = "wss://api.hadax.com/ws";//ws地址
        this.websocket = new WebSocket(wsuri);
        this.websocket.onopen = this.websocketonopen;

        this.websocket.onerror = this.websocketonerror;

        this.websocket.onmessage = this.websocketonmessage;
        this.websocket.onclose = this.websocketclose;
      },

      websocketonopen() {
        console.log("WebSocket连接成功");
        this.getKlines();
        this.getTick();
      },
      websocketonerror(e) { //错误
        console.log("WebSocket连接发生错误");
      },
      websocketonmessage(e) { //数据接收
        // console.log(e.data);
        const redata = this.$qs.stringify(e.data);
        //注意：长连接我们是后台直接1秒推送一条数据，
        //但是点击某个列表时，会发送给后台一个标识，后台根据此标识返回相对应的数据，
        //这个时候数据就只能从一个出口出，所以让后台加了一个键，例如键为1时，
        // 是每隔1秒推送的数据，为2时是发送标识后再推送的数据，以作区分
        this.websocketsend(e.data.size);

        // console.log(redata.value);
        this.getKlines();
        this.getTick();
      },

      websocketsend(agentData) {//数据发送
        this.websocket.send(agentData);
        // this.websocket.send({
        //   "sub": "market.btcusdt.kline.1min",
        //   "id": "id1"
        // });


      },

      websocketclose(e) { //关闭
        this.$router.go(0);
      },

    },
    watch: {
      period: function (value) {
        this.$vux.loading.show();
      }
    }
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
              color: #ff4500;
              &.green {
                color: green;
              }
            }
            &:nth-child(1) {
              font-size: 1.6rem;
              color: #ff4500;
              &.green {
                color: green;
              }
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
      bottom: 0;
      left: 0;
      right: 0;
    }
  }


</style>
