<template>
  <div class="recordOfLife">
    <myHeader title="记录"/>
    <div class="main">
      <h3 class="nav">
        <p v-for="(item , index) in classification" :key="index">
          <span @click="changeNavIndex(index)" :class="{active:index == tabIndex}">{{item}}</span>
        </p>
      </h3>
      <div class="swiper">
        <Swiper :show-dots="false" height='100%'  v-model="tabIndex">
          <SwiperItem v-for="(item , index) in classification" :key="index" height='100%'>
            <liveRecord/>
          </SwiperItem>
        </Swiper>
      </div>
    </div>
  </div>
</template>

<script>
  import myHeader from '@/common/myHeader.vue'
  import liveRecord from '@/components/myWallet/liveRecord.vue'
  import transactionRecord from '@/components/myWallet/transactionRecord.vue'
  import {Swiper, SwiperItem} from 'vux'

  export default {
    name: "LockIncome",
    components: {
      myHeader,
      liveRecord,
      transactionRecord,
      Swiper,
      SwiperItem
    },
    data() {
      return {
        loading: false,
        active: '1',
        tabIndex: 0,
        classification: ['全部', '受理中', '生息中', '已生息'],
      }
    },
    methods: {
      changeNavIndex(index) {
        this.tabIndex = index

      },
      changeIndex(index) {
        this.tabIndex = index
      }
    },

    watch: {
      tabIndex: function (value) {
        this.tabIndex = value
      }
    }
  }
</script>

<style lang="less" scoped>

  .swiper {
    height: calc(~'100% - 4rem');
  }

  .vux-slider, .vux-swiper {
    height: 100%;
  }


  .main {
    background-color: #0e1520;
  }

  /*数据*/
  .transaction_record_box {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 4rem;
    overflow-y: scroll;
    color: #fff;
    > .record_products {
      height: 9rem;
      padding: .5rem 1rem;
      background-color: #1f2733;
      box-sizing: border-box;
      > div {
        height: 2rem;
        line-height: 2rem;
        color: #ccc;
        display: flex;
        &:nth-child(1) {
          > p:nth-child(2) {
            max-width: 30%;
            font-size: 1.2rem;
            &.green {
              color: #33de60;
            }
          }
        }
        &:nth-child(2), &:nth-child(3) {
          > p:nth-child(1) {
            font-size: 1.1rem;
            > span {
              font-size: 1.2rem;
              &.green {
                color: #33de60;
              }
            }
          }
        }
        &:nth-child(3) {
          border-bottom: 1px solid #333;
        }
        &:nth-child(4) {
          > p {
            width: 100%;
          }
        }
        > p {
          display: inline-block;
          flex: 1;
          overflow-x: scroll;
          white-space: nowrap;
          padding: 0 .5rem;
          /*text-overflow: ellipsis;*/
          &:nth-child(2) {
            text-align: right;
            max-width: 45%;
          }
        }
      }
    }
  }

  .nav {
    height: 4rem;
    width: 100%;
    display: flex;
    font-size: 1.2rem;
    padding: 0 1rem;
    box-sizing: border-box;
    > p {
      flex: 1;
      line-height: 4rem;
      color: #9fa1b0;
      text-align: center;
      > span {
        display: inline-block;
        height: calc(~'100% - 2px');
        &.active {
          border-bottom: 2px solid #4c9ee4;
          color: #4c9ee4;
          font-size: 1.3rem;
        }
      }
    }
  }

</style>
