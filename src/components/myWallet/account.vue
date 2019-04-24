<template>
  <div class="account">
    <div class="account_header">
      <p class="account_header_left"><span><img :src="productor.wc_logo" alt=""></span>{{productor.wc_name}}</p>
      <p class="account_header_right" @click="$emit('showKnowledge')" v-show="productor.wc_name =='LTCC'">
        高级节点
      </p>
      <router-link tag="p"  to="/ltccToUuc" class="account_header_right" v-show="productor.wc_name =='LTCC'">
        兑换
      </router-link>
      <router-link tag="p" :to="{path : '/accountBook' ,query:{ wc_id : productor.wc_id , tabIndex : tabIndex}}"
                   class="account_header_right">账本
      </router-link>
    </div>
    <div class="account_centre">
      <div class="account_centre_count">
        <p>{{productor.money}}</p>
        <p>{{productor.freeze}}</p>
      </div>
      <div class="account_centre_state">
        <p>可用</p>
        <p>冻结</p>
      </div>
      <p class="Audit" v-show="audit > 0">审核中：<span>{{audit}}</span></p>
    </div>
  </div>
</template>

<script>
  import {getdataBz} from "@/services/mining";

  export default {
    name: "account",
    //接收父组件传值
    props: ['productor', 'audit','tabIndex'],
    data() {
      return {
        //节点布尔值
        supNodebol: true,
        //控制超级节点等的显示
        nodeBol: false,
        //审核数据的显示
        auditShowBol: false,
        node: {
          'leader_node': 0,
          'better_node': 0,
          'super_node': 0,
        },
      }
    },
    created() {
      // //节点列表
      // getdataBz('/Supernode/getMoneyNodeStatus', {
      //   token: this.$token,
      //   mark: this.$mark
      // }).then(res => {
      //   if (res.data.code == 10000) {
      //     this.node = res.data.result;
      //     if (this.productor.wc_name === 'LTCC') {
      //       //当三个节点中有一个不为零时，显示
      //       if (this.node.leader_node != 0 ||
      //         this.node.better_node != 0 ||
      //         this.node.super_node != 0) {
      //         this.nodeBol = true;
      //       }
      //     }
      //   }
      // }).catch(error => {
      //   this.$vux.toast.text('数据加载失败,请检查网络是否正常');
      // });
      //返回值大于0时，显示
      // if (this.audit > 0) {
      //   this.auditShowBol = true
      // }
    },
    methods: {},
    watch: {}
  }
</script>

<style lang="less" scoped>
  .account {
    width: 100%;
    height: 10rem;
    background-color: #2e3743;
    margin-bottom: .5rem;
    position: relative;
  }

  .account_header {
    width: 100%;
    height: 4rem;
    display: flex;
    align-items: center;
  }

  .account_header > p {
    flex: 1;
    height: 3rem;
    font-size: 1.2rem;
    margin: 0 1rem;
    line-height: 3rem;
    text-align: center;
  }

  .account_header_left {
    color: #9fabbc;
    display: flex;
  }

  .account_header_left > span {
    display: inline-block;
    height: 100%;
    width: 3rem;
    margin-right: .5rem;
    > img {
      max-width: 100%;
    }
  }

  .account_header_right {
    color: #11b1ed;
    text-align: right;

  }

  .account_centre {
    height: 4rem;
    color: #bac4d2;
    text-align: center;
  }

  .account_centre_count {
    height: 2.5rem;
    line-height: 2.5rem;
    font-size: 1.4rem;
    display: flex;

  }

  .account_centre_count > p, .account_centre_state > p {
    flex: 1;
  }

  .account_centre_state > p:nth-child(2) {
    color: #848d9a;
  }

  .account_centre_state {
    height: 1.5rem;
    line-height: 1.5rem;
    font-size: 1rem;
    display: flex;
  }

  .node {
    height: 3rem;
    width: 100%;
    display: flex;
    overflow-y: hidden;
    > p {
      flex: 1;
      line-height: 3rem;
      max-width: 33%;
      color: #11b1ed;
      > span {
        display: inline-block;
      }
    }
  }

  .Audit {
    text-align: left;
    text-indent: 2rem;
    position: absolute;
    bottom: .5rem;
    color: #e18b2f;
    > span {
      color: #f44336;
    }
  }
</style>
