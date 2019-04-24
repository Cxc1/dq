<template>
  <div class="ltccToUuc">
    <myHeader title="兑换">
      <router-link to="/ceRecord" tag="span" class="right_icon">
        兑换记录
      </router-link>
    </myHeader>
    <!--主体部分开始-->
    <div class="main">
      <div class="ltccToUuc_top" id="captcha">
        <p>出账钱包 : </p>
        <div class="ltccToUuc_top_select">
          <p @click="out_slt_show">
            {{sel_wc.c_name}}{{sel_wc.money_type_name}}
            <span></span>
          </p>
          <ul class="ltccToUuc_top_select_item">
            <li :class="{myActive : sltShow ,select_wc : index === select_wc_index}" v-for="(item , index) in wc_type"
                @click="select_wc(item , index)" :key="index">
              <span>{{item.c_name}}{{item.money_type_name}}</span><span>可用数量 : {{item.c_money}}</span>
            </li>
          </ul>
        </div>
        <p>发送数量 : </p>
        <div class="ltccToUuc_top_number">
          <input type="text" maxlength="11" v-model="ltcc_number">
          <div class="orange">
            <span>燃烧 : {{(ltcc_number * (in_sel_wc.c_fee/100)).toFixed(6)}}</span>
            <span>最大可兑换 : {{in_sel_wc.max_number}}</span>
          </div>

        </div>
      </div>
      <div class="rate" v-if="rate_show">
        <h5>实时汇率 : </h5>
        <div class="rate_btn">
          <div>
            <p>{{sel_wc.c_name}}/CNY</p>
            <p>{{sel_wc.c_price}}</p>
          </div>
          <div>
            <p>{{in_sel_wc.c_name}}/CNY</p>
            <p>{{in_sel_wc.c_price}}</p>
          </div>
        </div>
      </div>
      <div class="ltccToUuc_bottom">
        <h5 class="red">预计兑换 : 1 {{sel_wc.c_name}} = {{subscription_ratio}}
          {{in_sel_wc.c_name}}</h5>
        <p>入账币种 : </p>
        <div class="ltccToUuc_top_select">
          <p @click="in_slt_show">
            {{in_sel_wc.c_name}}
            <span></span>
          </p>
          <ul class="ltccToUuc_top_select_item">
            <li :class="{myActive : btmSltShow ,select_wc : index === btm_select_wc_index}"
                v-for="(item , index) in in_wc_type"
                @click="btm_select_wc(item , index)" :key="index">
              <span>{{item.c_name}}</span><span v-if="item.c_name !=='UUC'">当前价格 : {{item.c_price}}/CNY</span>
            </li>
          </ul>
        </div>
        <p>接收数量 : </p>
        <div class="ltccToUuc_top_number">
          <input type="text" maxlength="11" disabled="disabled" v-model="uuc_number">
        </div>
      </div>
      <div class="ltccToUuc_btn" id="ltccToUuc_btn">提 交</div>
    </div>

    <!--主体部分结束-->
  </div>
</template>

<script>
  import myHeader from '@/common/myHeader.vue'
  import {getdata} from "@/services/mining";
  import {div, mul} from "@/utils/tool";

  export default {
    name: "ltccToUuc",
    components: {
      myHeader
    },
    data() {
      return {
        sltShow: false,
        btmSltShow: false,
        uucExchangeInit: '',
        proportion: '',
        uuc_number: '',
        ltcc_number: '',
        type: 1,
        wc_type: [],
        in_wc_type: [],
        sel_wc: "",
        in_sel_wc: '',
        select_wc_name: '请选择出账钱包',
        btm_select_wc_name: '请选择入账钱包',
        select_wc_index: 0,
        btm_select_wc_index: 0,
        rate_show: true,
        //兑换比例
        subscription_ratio: '',
      };
    },
    created() {
      this.getUucExchangeInit();

    },
    methods: {
      out_slt_show() {
        this.btmSltShow = false;
        this.sltShow = !this.sltShow
      },
      in_slt_show() {
        this.sltShow = false;
        this.btmSltShow = !this.btmSltShow
      },

      select_wc(item, index) {
        this.select_wc_name = item.c_name;
        this.select_wc_index = index;
        this.sel_wc = this.wc_type[index];
        this.in_wc_type = this.sel_wc.exchange_list;
        this.in_sel_wc = this.in_wc_type[0];
        this.btm_select_wc_index = 0;
        this.ltcc_number = '';
        this.sltShow = false
      },
      btm_select_wc(item, index) {
        this.btm_select_wc_name = item.c_name;
        if (this.btm_select_wc_index != index) {
          this.btm_select_wc_index = index;
          this.ltcc_number = '';
        }
        this.in_sel_wc = this.in_wc_type[index];
        this.btmSltShow = false
      },

      getUucExchangeInit() {
        getdata('/Exchange/exchangeInit', {
          mark: this.$mark,
          token: this.$token
        }).then(res => {
          if (res.data.code == 10000) {
            this.wc_type = res.data.result;
            this.sel_wc = res.data.result[0];
            this.in_wc_type = res.data.result[0].exchange_list;
            this.in_sel_wc = this.sel_wc.exchange_list[0];
          } else {
            this.$vux.toast.text(res.data.message);
          }
        })
      },


      validateLtccNum() {
        let money = this.ltcc_number;
        let max = this.in_sel_wc.max_number;
        if (isNaN(money)) {
          this.ltcc_number = money.substr(0, money.length - 1);
        } else {
          if (money != '') {
            if (Number(money) > Number(max)) {
              this.ltcc_number = money.substr(0, money.length - 1);
              this.$vux.toast.text('输入的金额过大');
            } else {
              let index = money.indexOf('.');
              if (index >= 0) {
                let floatNum = money.substr(index + 1, money.length);
                if (floatNum.length > 6) {
                  this.$vux.toast.text('只能输入小数点后六位');
                  this.ltcc_number = money.substr(0, money.length - 1);
                }
              } else {
                this.ltcc_number = money / 1 + ''
              }
            }
          }
        }
      },


    },
    watch: {
      ltcc_number(value) {
        this.validateLtccNum();
        if (value != '') {
          let proportion = this.in_sel_wc.c_name === 'UUC' ? this.subscription_ratio : this.sel_wc.c_price / this.in_sel_wc.c_price;
          this.uuc_number = mul(value, proportion).toFixed(6);
        } else {
          this.uuc_number = '';
        }
      },
      in_sel_wc(value){
        if(value.c_name ==='UUC'){
          this.rate_show = false;
          this.subscription_ratio = value.exchange_rate;
        }else {
          this.rate_show = true;
          this.subscription_ratio = (this.sel_wc.c_price / this.in_sel_wc.c_price).toFixed(6);
        }
      }
    },


    mounted() {
      //调易盾滑块验证
      var captchaIns;
      let self = this;
      initNECaptcha(
        {
          captchaId: "b0487c82b2de43558aac9d29bfbda686",
          element: "#captcha",
          mode: "popup",
          width: 260,
          onVerify(err, data) {
            if (!err) {
              captchaIns.refresh();
              self.$vux.loading.show();
              getdata('/Exchange/createExchangeNew', {
                token: self.$token,
                mark: self.$mark,
                validate: data.validate,
                number: self.ltcc_number,
                currency_keyword_left: self.sel_wc.c_keyword,
                currency_keyword_right: self.in_sel_wc.c_keyword,
                money_type: self.sel_wc.money_type
              }).then(res => {
                self.$vux.loading.hide();
                self.$vux.toast.text(res.data.message);
                if (res.data.code == 10000) {
                  self.getUucExchangeInit();
                  self.btm_select_wc_index = 0;
                  self.select_wc_index = 0;
                  self.ltcc_number = '';
                }
              })
            }
          }
        },
        function (instance) {
          // 初始化成功后，用户输入对应用户名和密码，以及完成验证后，直接点击登录按钮即可
          captchaIns = instance;
        },
        function (err) {
          // 验证码初始化失败处理逻辑，例如：提示用户点击按钮重新初始化
        },
        document.getElementById("ltccToUuc_btn").addEventListener("click", function () {
          if (self.ltcc_number != '') {
            captchaIns.popUp();
          } else {
            self.$vux.toast.text('请输入兑换数量');
          }
        })
      );
    },
  }
</script>

<style lang="less" scoped>
  .ltccToUuc {
    .red {
      color: #f1e1b0;
    }
    .orange {
      color: orangered;
    }
    > .main {
      background-color: #161c29
    }
    .ltccToUuc_top, .ltccToUuc_bottom {
      height: 16rem;
      width: 100%;
      padding: 1rem 2rem;
      box-sizing: border-box;
      color: #bac4d2;
      > p {
        height: 2rem;
        font-size: 1.3rem;
        line-height: 2rem;
      }
      > .ltccToUuc_top_select, .ltccToUuc_top_number {
        height: 4rem;
        width: 100%;
        padding: 0 1rem;
        box-sizing: border-box;
        margin-bottom: 1rem;
        position: relative;
        > .ltccToUuc_top_select_item {
          left: 1rem;
          right: 1rem;
          position: absolute;
          background-color: #fff;
          color: #090c11;
          top: 4rem;
          z-index: 999;
          overflow: hidden;
          > li {
            height: 0;
            line-height: 3rem;
            font-size: 1.3rem;
            display: flex;
            text-align: center;
            transition: height .1s;
            overflow: hidden;
            &.myActive {
              height: 3rem;
              border-bottom: 1px solid #eee;
              box-sizing: border-box;
            }
            &.select_wc {
              background-color: #8db6cd;

            }
            > span {
              flex: 1;
              &:nth-child(1) {
                max-width: 35%;
              }
              &:nth-child(2) {
                font-size: 1.2rem;
              }
            }
          }

        }
        > p {
          height: 4rem;
          line-height: 4rem;
          width: 100%;
          border: none;
          background-color: #161c29;
          color: #bac4d2;
          font-size: 1.8rem;
          font-weight: bolder;
          border-bottom: 1px solid #999;
          text-indent: .5rem;
          > span {
            display: inline-block;
            height: 4rem;
            width: 4rem;
            background: url("imgs/dom_icon.png") no-repeat center;
            float: right;
          }
        }
        > input {
          height: 2.5rem;
          width: 100%;
          background-color: #161c29;
          border: none;
          border-bottom: 1px solid #999;
          color: #bac4d2;
          font-size: 1.5rem;
          text-indent: .5rem;
          margin-bottom: .2rem;
        }
        > div {
          display: flex;
          height: 1.5rem;
          width: 100%;
          > span {
            flex: 1;
            overflow-x: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            height: 1.5rem;
            line-height: 1.5rem;
            &:nth-child(2) {
              min-width: 60%;
              text-align: right;

            }
          }
        }

      }

    }

    .rate {
      height: 6.5rem;
      color: #eee;

      > h5 {
        font-size: 1.2rem;
        height: 2rem;
        line-height: 2rem;
        text-indent: 2rem;
        background-color: #0d1111;
      }
      > .rate_btn {
        height: 4.5rem;
        display: flex;
        text-align: center;
        > div {
          flex: 1;
          background-color: #e3b423;
          &:nth-child(2) {
            background-color: #13c4ed;
          }
          > p {
            height: 1.5rem;
            line-height: 1.5rem;
            font-size: 1.2rem;
            &:nth-child(1) {
              height: 2.5rem;
              line-height: 2.5rem;
              font-size: 1.4rem;
              font-weight: bolder;
            }
          }
        }
      }
    }

    .ltccToUuc_bottom {
      height: 18rem;
      > h5 {
        height: 3rem;
        line-height: 3rem;
        font-size: 1.3rem;
      }
    }
    .ltccToUuc_btn {
      height: 4rem;
      width: 90%;
      line-height: 4rem;
      font-size: 1.4rem;
      color: #fff;
      text-align: center;
      background: linear-gradient(#3e84f5, #1075be);
      border-radius: 2rem;
      margin: 2rem auto;

    }
  }
</style>
