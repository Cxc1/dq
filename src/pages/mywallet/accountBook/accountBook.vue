<template>
  <div class="accountBook">
    <myHeader title="账本"/>
    <div class="main">
      <ul class="transaction_record_box" v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loadBol"
          infinite-scroll-distance="0">
        <li class="record_products" v-for="(item,index) in transferlist" :key="index">
          <div class="icon">
            <span :class="{
            green:item.wt_status ==1,
            yellow:item.wt_status ==2,
            orange:item.wt_status ==3,
            blur:item.wt_status ==4,}">
          {{item.circle}}
          </span>
          </div>
          <div class="record_products_center">
            <p :class="{
              green:item.wt_status ==1,
              yellow:item.wt_status ==2,
              orange:item.wt_status ==3,
              blur:item.wt_status ==4,}">
              <span>{{item.title}}</span>
              <span>数量：{{item.wt_money}}</span>
            </p>
            <p>
              <span>地址：{{item.address}}</span>
              <span>实际扣除：{{item.total}}</span>
            </p>
            <p>
              <span>地址标签：{{item.tag}}</span>
              <span>燃烧：{{item.wt_fees}}</span>
            </p>
            <p :class="{
                 yellow : item.wt_status ==1,
                 orange: item.wt_status ==2,
                 blur  : item.wt_status ==3,
                 green : item.wt_status ==4,}">
              <span>{{item.foot}}</span>
              <span>{{item.wt_start_time}}</span>
            </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import myHeader from '@/common/myHeader.vue'
  import {getdataBz} from "@/services/mining";

  export default {
    components: {
      myHeader
    },
    data() {
      return {
        //默认第一页
        page: 1,

        //默认每页8条数据
        pageDatas: 8,

        //初始化列表数据
        transferlist: [],

        //币种id
        wcid: this.$route.query.wc_id,

        //控制上拉加载的布尔值
        loadBol: true,
      }
    },


    methods: {

      //获取列表数据接口
      gettransferlist() {
        this.loadBol = true;
        getdataBz('/Wallet/transferlist', {
          token: this.$token,
          mark: this.$mark,
          wcid: this.wcid,
          page: this.page,
          rows: this.pageDatas
        }).then(res => {
          this.$vux.loading.hide();
          if (res.data.code == 10000) {
            if (res.data.result.length > 0) {
              this.transferlist = this.transferlist.concat(res.data.result);
              if (res.data.result.length >= 8) {
                this.$vux.toast.text(res.data.message);
                this.loadBol = false;
              } else {
                this.$vux.toast.text('所有数据加载完成');
              }
            }
          } else {
            this.$vux.toast.text(res.data.message)
          }
        })
      },


      //上拉加载
      loadMore() {
        this.$vux.loading.show({
          text: '数据加载中'
        });
        this.page += 1;
        let setId = setTimeout(() => {
          this.gettransferlist();
          clearTimeout(setId)
        }, 1000)
      },
    },


    created() {
      this.$vux.loading.show({
        text: '数据加载中'
      });
      this.gettransferlist()
    }
  }
</script>
<style lang="less" scoped>
  @import url("../../../styles/record.less");

  .main {
    -webkit-overflow-scrolling: touch;
    background-color: #0e1520;
  }

  .transaction_record_box {
    width: 100%;
    .record_products {
      .icon {
        span {
          &.green {
            color: #15d171;
            border: 1px solid #15d171;
          }
          &.yellow {
            color: #dbba54;
            border: 1px solid #dbba54;
          }
          &.orange {
            color: #e95521;
            border: 1px solid #e95521;
          }
          &.blur {
            color: #2ed0ed;
            border: 1px solid #2ed0ed;
          }
        }
      }
      .green {
        color: #15d171;
      }
      .yellow {
        color: #dbba54;
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
