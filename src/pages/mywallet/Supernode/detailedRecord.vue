<template>
  <div class="detailedRecord">
    <my-header :title='title'>
      <router-link tag="span" :to="{path : '/rewardDetails' ,query : {index : generation}}" class="right_icon">
        奖励明细
      </router-link>
    </my-header>
    <div class="main">
      <div class="detailedRecord_top">
        <p>M{{generation}}好友邀请数：{{initData.fan_num}}</p>
        <p>当前资产包总能量（LTCC）</p>
        <p>{{initData.total_money}}</p>
      </div>
      <p class="cumulative">累计贡献收益：{{initData.total_income}} LTCC</p>
      <div class="recordUser">
        <h1>
          <p>账户</p>
          <p>资产包</p>
          <p>等级</p>
        </h1>
        <div class="recordUser_box">
          <ul class="recordUser_ul" v-infinite-scroll="loadMore"
              infinite-scroll-disabled="loading"
              infinite-scroll-distance="0">
            <li v-for="(item,index) in RecordDetail" :key="index">
              <p>{{item.user_mobile}}</p>
              <p>{{item.lock_money}}</p>
              <p>M{{generation}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import myHeader from '@/common/myHeader.vue'
  import {getdata} from "@/services/mining";

  export default {
    components: {
      myHeader
    },
    data() {
      return {

        //好友级数
        generation: this.$route.query.index,

        //初始化初始数据
        initData: '',

        //初始化列表数据
        RecordDetail: [],

        //初始化标题
        title: '',

        //上拉加载布尔值
        loading: true,

        //初始化默认获取第一页数据
        page: 1,

        //每页数据为15条数据
        pageDatas: 15,
      }
    },
    created() {
      this.$vux.loading.show({
        text: '数据加载中'
      });

      //标题Mx 级好友
      this.title = 'M' + this.generation + '级好友';

      //获取初始数据
      getdata('/Supernode/getMoneyLockRecordDetail', {
        token: this.$token,
        mark: this.$mark,
        generation: this.generation,
      }).then(res => {
        if (res.data.code == 10000) {
          this.initData = res.data.result
        } else {
          this.$vux.toast.text(res.data.message)
        }
      })

      //获取列表数据
      this.getUserCollectionList()

    },


    methods: {

      //获取用户Mx级列表数据
      getUserCollectionList() {
        getdata('/Supernode/getUserCollectionList', {
          token: this.$token,
          mark: this.$mark,
          generation: this.generation,
          p: this.page,
          ps: this.pageDatas
        }).then(res => {
          this.$vux.loading.hide();
          if (res.data.code == 10000) {
            this.loading = true;
            if (res.data.result.length > 0) {
              this.RecordDetail = this.RecordDetail.concat(res.data.result);
              this.$vux.toast.text('数据加载成功');
              if (res.data.result.length >= this.pageDatas) {
                this.loading = false
              }
            }
          } else {
            this.$vux.toast.text(res.data.message)
          }
        })
      },


      //上拉加载更多数据
      loadMore() {
        this.$vux.loading.show({
          text: '数据加载中'
        });
        this.page += 1;
        let setId = setTimeout(() => {
          this.getUserCollectionList();
          clearTimeout(setId)
        }, 1000)
      }
    },
  }
</script>

<style lang="less" scoped>
  .main {
    background-color: #090c11;
  }

  .right_icon {
    width: auto;
  }

  .detailedRecord_top {
    width: 100%;
    height: 11rem;
    background: linear-gradient(#c9c12c, #d3720b);
    padding: 1rem;
    box-sizing: border-box;
    text-align: center;
    color: #fef5a8;
    > p {
      line-height: 3rem;
      &:nth-child(1) {
        font-size: 1.2rem;
      }
      &:nth-child(2) {
        line-height: 2rem;
      }
      &:nth-child(3) {
        color: #fff;
        font-size: 2rem;
        line-height: 4rem;
      }
    }
  }

  .cumulative {
    height: 3rem;
    line-height: 3rem;
    background-color: #d18412;
    color: #f5daaf;
    padding-left: 1rem;

  }

  .recordUser {
    color: #b9c7d5;
    text-align: center;
    > h1 {
      display: flex;
      height: 4rem;
      line-height: 4rem;
      background-color: #191d29;
      font-size: 1.2rem;
      margin-bottom: .2rem;
      padding: 0 1rem;
      > p {
        flex: 1;
        &:nth-child(1) {
          text-align: left;
        }
        &:nth-child(3) {
          text-align: right;
        }
      }
    }
    .recordUser_box {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 17.2rem;

      > ul {
        height: 100%;
        width: 100%;
        overflow-y: scroll;
        > li {
          height: 3rem;
          background-color: #191d29;
          margin-bottom: .2rem;
          display: flex;
          line-height: 3rem;
          padding: 0 1rem;
          > p {
            flex: 1;
            overflow-x: scroll;
            &:nth-child(1) {
              text-align: left;
              padding: 0;
            }
            &:nth-child(2) {
              margin: 0 1rem;
            }
            &:nth-child(3) {
              text-align: right;
            }
          }
        }
      }

    }
  }
</style>
