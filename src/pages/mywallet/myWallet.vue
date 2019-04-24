<template>
  <div class="myWalletBox">
    <my-wallet-header @fillInput="fillInput"
                      :currencylist="currencylist"
                      :wc_id="wcid"
                      :selectIndex="selectIndex"
                      :selectItem="selectItem">
    </my-wallet-header>
    <h2 class="tabIndex">
      <p v-for="(item,index) in currencylist" :key="index" @click="changeItem(index,item)">
        <span :class="{myActive : index == tabIndex}">
          {{item.wc_name}}
        </span>
      </p>

    </h2>

    <div class="swiper">
      <Swiper :show-dots="true" height='100%' :threshold="200" v-model="tabIndex">
        <SwiperItem v-for="(item , index) in currencylist" :key="index" height='100%' style="overflow-y: auto">
          <account :productor="item"
                   @showKnowledge="showKnowledge"
                   :audit="audit"
                   :tabIndex="tabIndex"/>
          <other_kline v-if="selectItem == 'BTC'||selectItem =='ETH'"
                       :other_k_loading="other_k_loading"
                       :other_trend_type="other_trend_type"
                       @changeoOtherTrend_type="changeoOtherTrend_type"
                       :otherRows="otherRows"
                       :price="otherPrice"
                       :selectItem='selectItem'
                       :colorBol="colorBol"

          />
          <kline v-if="selectItem == 'LTCC'||selectItem == 'LTCY'||selectItem == 'UUC'"
                 :Ltcc_k_loading="Ltcc_k_loading"
                 :trend_type="trend_type"
                 @changeTrend_type="changeTrend_type"
                 :selectItem='selectItem'
                 :rows="rows"
                 :price="price"
          />
          <transactionRecord :transferlist="transferlist" :tabIndex="tabIndex"/>
        </SwiperItem>
      </Swiper>
    </div>
    <div class="ct_tabar">
      <p @click="isToChargeMoney">
        充币
      </p>
      <p @click="isToWithdrawMoney">
        提币
      </p>
    </div>
    <knowledge :knowledgeShow="knowledgeShow" @hideKnowledge="hideKnowledge" @toNode="toNode"/>
    <randomKeyboard :KeyBoardBol="KeyBoardBol"
                    :typeBol="typeBol"
                    @comfirmSubmit="comfirmSubmit"
                    @hide="KeyBoardHied"
    />
  </div>
</template>

<script>
  import {Tab, TabItem} from 'vux'
  import myWalletHeader from '@/common/myWalletHeader.vue'
  import account from '@/components/myWallet/account.vue'
  import knowledge from '@/components/myWallet/knowledge.vue'
  import kline from '@/components/myWallet/kline.vue'
  import other_kline from '@/components/myWallet/other_kline.vue'
  import transactionRecord from '@/components/myWallet/transactionRecord.vue'
  import {getdataBz} from "@/services/mining";
  import randomKeyboard from '@/common/randomKeyboard.vue'
  // import {TabContainer, TabContainerItem} from 'mint-ui';
  import {Swiper, SwiperItem} from 'vux';
  import {AlertModule} from 'vux'
  import {getCookie} from "@/utils/tool";

  export default {
    name: "myWallet",
    components: {
      myWalletHeader,
      account,
      transactionRecord,
      kline,
      Swiper,
      SwiperItem,
      randomKeyboard,
      other_kline,
      knowledge,
      Tab,
      TabItem

    },
    data() {
      return {
        rows: [],

        otherRows: [],

        knowledgeShow: false,

        typeBol: false,
        //是否显示节点
        nodeBol: true,

        KeyBoardBol: false,
        //币种下标
        tabIndex: 0,

        colorBol: false,
        //币种列表
        currencylist: '',
        //当前选择的币种下标
        selectIndex: 0,
        //当前选择的币种对象
        selectItem: '',
        //币种id
        wcid: '',
        //交易列表数据
        transferlist: '',
        //获取第一页数据
        page: 1,
        //显示2条数据
        pageDatas: 2,
        //节点对象

        //审核中
        audit: '',
        //定时器id
        setId: '',
        //定时器id
        otherSetId: '',


        //ltcc uuc ltcy价格走势类型
        trend_type: '1',
        //usdt btc 价格走势类型
        other_trend_type: 'D1',

        //ltcc uuc ltcy币种价格参数
        price: '',

        //usdt btc价格参数
        otherPrice: '',


        //ltcc uuc ltcy走势图loading
        Ltcc_k_loading: true,

        // usdt btc走势图loading
        other_k_loading: true
      };
    },


    created() {
      // this.$vux.loading.show();
      let routeIndex = this.$route.query.tabIndex;
      if (routeIndex) {
        this.tabIndex = Number(routeIndex)
      }
      //获取币种列表
      this.getcurrencylist();

    },

    destroyed() {
      //组件关闭时清除定时器
      clearTimeout(this.setId);
      clearTimeout(this.otherSetId);
    },
    methods: {
      //获取btc usdt走势图数据
      getOtherKlines() {
        this.other_k_loading = true;
        getdataBz('/wallet/getDateByUrl', {
          url: "http://api.coindog.com/api/v1/klines/BITFINEX:" + this.selectItem + "USD/" + this.other_trend_type
        }).then(res => {
          if (res.status == 200) {
            for (let i = 0; i < res.data.length; i++) {
              res.data[i].dateTime = this.timestampToTime(res.data[i].dateTime)
            }
            this.otherRows = res.data.reverse();
            this.other_k_loading = false
          }
        })
      },
      //获取btc usdt价格数据
      getOtherTick() {
        getdataBz('/wallet/getDateByUrl', {
          url: `http://api.coindog.com/api/v1/tick/BITFINEX:${this.selectItem}USD?unit=cny`
        }).then(res => {
          if (res.status == 200) {
            res.data.degree = res.data.degree.toFixed(3);
            res.data.high = res.data.high.toFixed(6);
            res.data.low = res.data.low.toFixed(6);
            if (Number(res.data.degree) > 0) {
              this.colorBol = true
            } else {
              this.colorBol = false
            }
            res.data.close = res.data.close.toFixed(6);
            this.otherPrice = res.data;
          }
        })
      },
      //改变 ltcc天 周 月
      changeTrend_type(value) {
        this.trend_type = value;
        this.Ltcc_k_loading = true;
        this.getKlineData();
      },
      //改变 btc天 周 月
      changeoOtherTrend_type(value) {
        this.trend_type = value;
        this.other_k_loading = true;

        this.other_trend_type = value;
        this.getOtherKlines();
      },


      //每五秒更新一次ltcc 价格信息 setInterval
      getTrend() {
        this.setId = setTimeout(() => {

          this.getKlineData();
          clearTimeout(this.setId);
          this.getTrend()
        }, 300000);
      },


      //每五秒更新一次btc eth 价格信息
      getOtherPrice() {
        this.otherSetId = setTimeout(() => {
          clearTimeout(this.otherSetId);
          this.getOtherTick();
          this.getOtherPrice()
        }, 300000);
      },

      //获取ltcc ltcy uuc 走势图数据
      getKlineData() {
        getdataBz('/Exchange/getTrend2', {
          token: this.$token,
          mark: this.$mark,
          trend_type: this.trend_type,
          trend_name: this.selectItem,
        }).then(res => {
          this.Ltcc_k_loading = false;
          if (res.data.code == 10000) {
            this.rows = res.data.result.trends.reverse();
            this.price = res.data.result.price;
          } else {
            this.$vux.toast.text(res.data.message)
          }
        });
      },


      //限制提币功能
      isToWithdrawMoney() {
        if (this.selectItem === 'LTCY' || this.selectItem === 'UUC') {
          AlertModule.show({
            title: '友情提示',
            content: '暂未开放提币功能',
            onHide() {

            }
          })
        } else if (this.selectItem === 'LTCC') {
          AlertModule.show({
            title: '友情提示',
            content: '提币通道暂时关闭',
            onHide() {

            }
          })

        } else {
          this.$router.push({
            path: '/withdrawMoney',
            query: {wc_id: this.wcid, tabIndex: this.tabIndex}
          });
        }
      },

      //判断是否需要创建钱包地址
      /*
      *
      * */
      isToChargeMoney() {
        if (this.selectItem === 'BTC' || this.selectItem === 'ETH' || this.selectItem === 'LTCY' || this.selectItem === 'UUC') {
          // this.$vux.toast.text('');
          AlertModule.show({
            title: '友情提示',
            content: '请大家用USDT充数字资产。地球村永远是为村民利益发展而发展！',
            onHide() {

            }
          })
          //
        } else {
          this.$vux.loading.show();
          getdataBz('/Wallet/iscreatebywcid', {
            token: this.$token,
            mark: this.$mark,
            wcid: this.wcid,
          }).then(res => {
            this.$vux.loading.hide();
            if (res.data.code == 10000) {
              this.$router.push({
                path: '/chargeMoney',
                query: {wc_id: this.wcid, wc_name: this.selectItem, tabIndex: this.tabIndex}
              })
            } else {
              this.$router.push({
                path: '/wallet',
                query: {wc_id: this.wcid, wc_name: this.selectItem, tabIndex: this.tabIndex}
              })
            }
          })
        }
      },

      //隐藏键盘
      KeyBoardHied() {
        this.KeyBoardBol = false
      },

      //点击确定验证密码
      comfirmSubmit(passwad) {
        this.$vux.loading.show();
        getdataBz('/Supernode/checkPayPwd', {
          token: this.$token,
          mark: this.$mark,
          user_pay_pwd: passwad
        }).then(res => {
          this.$vux.loading.hide();
          if (res.data.code == 10000) {
            this.$router.push({
              path: '/supernode', query: {
                tabIndex: this.tabIndex
              }
            })
          } else {
            this.$vux.toast.text(res.data.message)
          }
        });
      },

      //用户须知
      showKnowledge() {
        getdataBz('/Supernode/getMoneyNodeStatus', {
          token: this.$token,
          mark: this.$mark
        }).then(res => {
          if (res.data.code == 10000) {
            if (res.data.result.prompt_status == 1) {
              this.knowledgeShow = true;
            } else {
              this.KeyBoardBol = true;
            }
          }
        });
        // this.knowledgeShow = true;
      },

      //隐藏用户须知
      hideKnowledge() {
        this.knowledgeShow = false;
      },

      //去节点
      toNode() {
        this.hideKnowledge();
        this.KeyBoardBol = true;
      },


      //跳转到k线图页面
      toKline() {
        if (this.selectItem == 'LTCC') {
          this.$router.push({
            path: '/K-line', query: {
              tabIndex: this.tabIndex
            }
          })
        } else {
          var client = getCookie('odrplatform');//客户端
          if (client == 'ios') {
            window.webkit.messageHandlers.iosAction.postMessage(`showKLine,/other_kline?name=${this.selectItem}`);
          } else {
            this.$router.push({
              path: '/other_kline',
              query: {
                name: this.selectItem,
                tabIndex: this.tabIndex
              }
            })
          }
        }
      },


      //扫码跳转到提币页面，并把获得的值填充到输入框中
      fillInput(name) {
        if (this.selectItem === 'LTCY' || this.selectItem === 'UUC') {
          AlertModule.show({
            title: '友情提示',
            content: '暂未开放提币功能',
            onHide() {

            }
          })
        } else if (this.selectItem === 'LTCC') {
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
              wc_id: this.wcid,
              address: name
            }
          })
        }
      },


      //执行子级定义的事件，切换币种
      changeItem(index, item) {
        this.tabIndex = index;
        this.selectIndex = index;
        this.selectItem = item.wc_name;
      },


      //获取初始数据
      getcurrencylist() {
        getdataBz('/Wallet/getcurrencylist', {
          token: this.$token,
          mark: this.$mark
        }).then(res => {
          if (res.data.code == 10000) {
            this.currencylist = res.data.result;
            this.selectItem = this.currencylist[this.tabIndex].wc_name;
            this.wcid = this.currencylist[this.tabIndex].wc_id;

            //判断当前的币种,请求走势图数据,当币种是btc eth 是才发送请求
            if (this.selectItem === 'BTC' || this.selectItem === 'ETH') {
              this.getOtherKlines();
              this.getOtherPrice();
              this.getOtherTick();
            } else if (this.selectItem === 'LTCC' || this.selectItem === 'LTCY' || this.selectItem === 'UUC') {
              this.getKlineData();
              this.getTrend();
            }

            //更新后台本地交易列表信息
            getdataBz('/Wallet/getblockchainlog ', {
              token: this.$token,
              mark: this.$mark,
              wcid: this.wcid,
            }).then(res => {
              this.audit = res.data.result
            });
            //获取交易列表
            this.gettransferlist();
          } else {
            this.$vux.toast.text(res.data.message)
          }
        }).catch(error => {

        });
      },


      //获取最近交易记录数据
      gettransferlist() {
        getdataBz('/Wallet/transferlist', {
          token: this.$token,
          mark: this.$mark,
          wcid: this.wcid,
          page: this.page,
          rows: this.pageDatas
        }).then(res => {
          this.$vux.loading.hide();
          if (res.data.code == 10000) {
            this.transferlist = res.data.result;
          } else {
            // this.$vux.toast.text(res.data.message);
          }
        }).catch(error => {
          this.$vux.toast.text('数据加载失败,请检查网络是否正常');
          this.$vux.loading.hide();
        })
      },


      //时间格式转换
      timestampToTime(timestamp) {
        let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes();
        let s = date.getSeconds();
        return Y + M + D + h + m;
      },
    },


    watch: {
      //币种页面切换执行操作，重新获取相应币种数据
      tabIndex: function (value) {
        clearTimeout(this.otherSetId);
        clearTimeout(this.setId);
        this.$vux.loading.show();
        this.audit = '';
        this.$route.query.tabIndex = value;
        this.tabIndex = value;
        this.selectIndex = value;

        if (this.currencylist) {
          this.selectItem = this.currencylist[value].wc_name;
        }

        this.transferlist = '';
        this.getcurrencylist();

      }
    }
  }
</script>

<style lang="less" scoped>
  @import url("../../styles/record.less");

  .tabIndex {
    height: 4rem;
    top: 46px;
    width: 100%;
    position: fixed;
    background-color: #090c11;
    display: flex;
    > p {
      flex: 1;
      line-height: 3.6rem;
      height: 3.6rem;
      color: #fff;
      font-size: 1.36rem;
      display: flex;
      justify-content: center;
      background-color: #13161f;
      > span {
        display: inline-block;
        padding: 0 .2rem;
        &.myActive {
          border-bottom: 2px solid #119cd2;
          color: #119cd2;
        }
      }
    }
  }

  .swiper {
    position: fixed;
    top: calc(~'46px + 4rem');
    bottom: 0;
    right: 0;
    left: 0;
    background-color: #0e1520;
    overflow-y: auto;
  }

  .vux-slider, .vux-swiper {
    height: 100%;

  }

  .vux-slider > .vux-swiper {
    overflow-y: auto;
  }

  .ct_tabar {
    width: 100%;
    height: 4rem;
    display: flex;
    position: fixed;
    bottom: 0;
    font-size: 1.2rem;
    text-align: center;
    color: #2e85ca;
    line-height: 4rem;
    background-color: #272c33;
    > p {
      flex: 1;
      &:nth-child(2) {
        color: #e18b2f;
      }
    }
  }

</style>
