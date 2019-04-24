<template>
  <div class="rewardDetails">
    <my-header title="奖励明细"/>
    <div class="main">
      <ul class="item_box" v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loadBol"
          infinite-scroll-distance="0">
        <li class="record_products" v-for="(item , index) in MoneyLockRewardLog" :key="index">
          <div class="icon">
            <span class="blur">M{{grade}}</span>
          </div>
          <div class="record_products_center">
            <div class="record_products_center_left">
              <p>{{item.money}}</p>
              <p>收益比例：{{item.rate}}‰</p>
            </div>
            <div class="record_products_center_right">
              <p class=""> LTCC</p>
              <p>{{item.time}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import myHeader from '@/common/myHeader.vue'
  import {getdata} from "@/services/mining";

  export default {
    name: "rewardDetails",
    components: {
      myHeader
    },
    data() {
      return {
        //M级数
        grade: this.$route.query.index,

        //默认获取第一页数据
        page: 1,

        //每页数据15条
        pageDatas: 15,

        //列表数据
        MoneyLockRewardLog: [],

        //上拉加载布尔值
        loadBol: true,
      }
    },
    methods: {
      //上拉加载更多数据
      loadMore() {
        this.page += 1;
        this.$vux.loading.show({
          text: '数据加载中'
        });
        let setId = setTimeout(() => {
          this.getMoneyLockRewardLog();
          clearTimeout(setId);
        }, 1000)
      },


      //获取列表数据
      getMoneyLockRewardLog() {
        this.loadBol = true
        getdata('/Supernode/getMoneyLockRewardLog', {
          token: this.$token,
          mark: this.$mark,
          generation: this.grade,
          p: this.page,
          ps: this.pageDatas
        }).then(res => {
          if (res.data.code == 10000) {
            this.$vux.loading.hide();
            if (res.data.result.length > 0) {
              this.MoneyLockRewardLog = this.MoneyLockRewardLog.concat(res.data.result)
              this.$vux.toast.text(res.data.message)
              if (res.data.result.length >= 15) {
                this.loadBol = false
              }
            } else {
              this.$vux.toast.text('没有更多数据')
            }
          } else {
            this.$vux.toast.text(res.data.message)
          }
        })
      }
    },
    created() {
      this.$vux.loading.show({
        text: '数据加载中'
      });
      this.getMoneyLockRewardLog()
    }
  }
</script>

<style lang="less" scoped>
  @import url("../../../styles/walletRecord.less");

  .main {
    background-color: #0b1418;
  }

  .icon {
    > span {
      border-radius: 50%;

      &.blur {
        border: 1px solid #2ed0ed;
        color: #2ed0ed;
      }
    }
  }

  .item_box {
    height: 100%;
    width: 100%;
    overflow-y: scroll;
  }

  .record_products_center {
    > div {

      &.blur {
        color: #2ed0ed;
      }

      &.record_products_center_left {
        > p {
          &.active {
            line-height: 3.4rem;
            height: 3.4rem;
          }

        }
      }
      > p {

        &.blur {
          color: #2ed0ed;
        }

      }
    }
  }

</style>
