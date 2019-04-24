<template>
  <div class="hierarchicalNode">
    <myHeader :title="title"/>
    <div class="main">
      <div class="hierarchicalNode_top">
        <li>
          <div>
            <p>昨日收益<span>（LTCC）</span></p>
            <p>{{initMoneyNodeInfo.yesterday_money}}</p>
          </div>
          <div>
            <p>收益率 <span>（%）</span></p>
            <p>{{initMoneyNodeInfo.rate}}</p>
          </div>
        </li>
        <li>
          <div>
            <p>昨日业绩 <span>（LTCC）</span></p>
            <p>{{initMoneyNodeInfo.yesterday_total}}</p>
          </div>
          <div>
            <p>累计收益<span>（LTCC）</span></p>
            <p>{{initMoneyNodeInfo.total}}</p>
          </div>
        </li>
        <p class="yesterday_add">昨日新增业绩<span>(LTCC)</span>： <span>{{initMoneyNodeInfo.yesterday_add}}</span></p>
      </div>
      <div class="hierarchicalNode_pro">
        <ul class="transaction_record_box_enter" v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loadBol"
            infinite-scroll-distance="0">
          <li class="record_products" v-for="(item,index) in showData" :key="index">
            <div class="icon">
              <span class="orange">收</span>
            </div>
            <div class="record_products_center">
              <p>
                <span class="orange">获得收益</span>
                <span>收益比率：{{item.rate}}%</span>
              </p>
              <p>
                <span class="blur">收益金额：{{item.money}} LTCC</span>

              </p>
              <p>
                <span class="blur">新增业绩：{{item.add_total}} LTCC</span>
              </p>
              <p>
                <span></span>
                <span class="">{{item.time}}</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import myHeader from '@/common/myHeader.vue'
  import {getdata} from "@/services/mining";

  export default {
    name: "hierarchicalNode",
    components: {
      myHeader,
    },
    data() {

      return {
        //列表数据
        showData: [],

        page: 1,
        pageDatas: 5,
        //节点类型
        type: this.$route.query.type,
        //上拉加载
        loadBol: true,
        //初始化节点数据
        initMoneyNodeInfo: '',
        //头部标题
        title:this.$route.query.title
      }
    },
    methods: {
      //上拉加载更多数据
      loadMore() {
        this.$vux.loading.show({
          text: '数据加载中'
        });
        this.page += 1;
        let setId = setTimeout(() => {
          this.getMoneyNodeLog();
          clearTimeout(setId)
        }, 1000)
      },
      //获取初始化超级、卓越、领袖节点信息
      getInitMoneyNodeInfo() {

        getdata('/Supernode/initMoneyNodeInfo', {
          token: this.$token,
          mark: this.$mark,
          type: this.type,
        }).then(res => {
          if (res.data.code == 10000) {
            this.initMoneyNodeInfo = res.data.result
          }
        })

      },


      //获取获取超级、卓越、领袖节点记录
      getMoneyNodeLog() {
        getdata('/Supernode/getMoneyNodeLog', {
          token: this.$token,
          mark: this.$mark,
          p: this.page,
          ps: this.pageDatas,
          type: this.type,
        }).then(res => {
          this.loadBol = true;
          if (res.data.code == 10000) {
            this.$vux.loading.hide();
            if (res.data.result.length <= 0) {
              this.$vux.toast.text('没有更多数据')
            } else {
              this.showData = this.showData.concat(res.data.result);
              this.$vux.toast.text('数据加载成功');
              this.loadBol = false
            }
          } else {
            this.$vux.toast.text(res.data.message)
          }
        }).catch(error => {
          this.$vux.toast.text('数据加载失败');
          console.log(error)
        })
      },


    },
    created() {
      this.getMoneyNodeLog();
      this.getInitMoneyNodeInfo()
    }
  }
</script>

<style lang="less" scoped>
  @import url("../../styles/record.less");

  .main {
    background-color: #090c11;
    .hierarchicalNode_top {
      height: 14rem;
      background-color: #1d212d;
      padding: 2rem 1rem 0;
      box-sizing: border-box;
      > li {
        color: #9fa1b0;
        font-size: 1.2rem;
        height: 5rem;
        display: flex;
        > div {
          flex: 1;
          overflow: hidden;
          white-space: nowrap;
          &:nth-child(2) {
            text-indent: 1rem;
          }
          > p {
            height: 2.5rem;
            line-height: 2.5rem;
            &:nth-child(2) {
              line-height: 1.5rem;
              color: #dbba53;
            }
            > span {
              color: #dbba53;
            }
          }
        }
      }
      >.yesterday_add{
        color: #9fa1b0;
        font-size: 1.2rem;
        height: 2rem;
        >span{
         color: #dbba53;;
        }
      }
    }
    > .hierarchicalNode_pro {
      position: absolute;
      top: 14.5rem;
      bottom: 0;
      left: 0;
      right: 0;
      overflow-y: scroll;
      .transaction_record_box_enter {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        top: 0;
        overflow-y: scroll;
        .record_products {
          > .record_products_center {
            > p {
              &:nth-child(2), &:nth-child(3) {
                > span {
                  max-width: 100%;
                }
              }
            }
          }
          .icon {
            span {

              &.orange {
                color: #e95521;
                border: 1px solid #e95521;
              }
            }
          }
          .green {
            color: #15d171;
          }
          .orange {
            color: #e95521;
          }
          .blur {
            color: #2ed0ed;
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

    }
  }
</style>
