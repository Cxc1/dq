<template>
  <ul class="transaction_record_box_enter" v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loadBol"
      infinite-scroll-distance="0">
    <li class="record_products" v-for="(item,index) in showData" :key="index">
      <div class="icon">
        <span class="green" v-if="item.type == 1">释</span>
        <span class="orange" v-else>收</span>
      </div>
      <div class="record_products_center">
        <p>
          <span class="green" v-if="item.type == 1">每日释放</span>
          <span class="orange" v-else>每日收益</span>
          <span></span>
        </p>
        <p>
          <span>{{recordText}}：{{item.rate}}‰</span>
          <span>当日收益：{{item.money}} LTCC</span>
        </p>
        <p>
          <span>燃烧：{{item.fee_value}}</span>
          <span>燃烧率：{{item.fee_rate}}%</span>
        </p>
        <p class="yellow">
          <span class="blod green" v-if="item.type == 1">释放数量：{{item.money}}</span>
          <span class="blod orange" v-else>收益数量：{{item.money}}</span>
          <span class="">{{item.time}}</span>
        </p>
      </div>
    </li>
  </ul>
</template>

<script>
  export default {
    name: "revenueRecord",
    props: ['showData', 'loadBol','recordText'],
    data() {
      return {}
    },
    methods: {

      //上拉加载更多数据
      loadMore() {
        if (this.showData.length >= 8) {
          this.$emit('addData');
        }
      }

    }

  }
</script>

<style lang="less" scoped>
  @import url("../../styles/record.less");

  .transaction_record_box_enter {
     position: absolute;
     bottom: 0;
     left: 0;
     right: 0;
     top: 0;
     overflow-y: scroll;
     .record_products {
       .icon {
         span {
           &.green {
             color: #15d171;
             border: 1px solid #15d171;
           }
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
</style>
