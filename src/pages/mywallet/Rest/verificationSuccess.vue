<template>
  <div class="verificationSuccess">
    <myHeader title="验证结果">
      <router-link tag="span" to="/rest" class="right_icon">完成</router-link>
    </myHeader>
    <div class="main">
      <div class="verificationSuccess_top">
        <p>转入成功</p>
        <p>100 LTCC</p>
        <p>预计收益到账时间：2018-6-25 15_00_11</p>
      </div>

      <div class="verificationSuccess_bottom">
        <p>
          <span>年化收益率</span>
          <span>约12.00%</span>
        </p>
        <p>
          <span>管理期</span>
          <span>14</span>
        </p>
        <p>
          <span>加入时间</span>
          <span>2018-06-13  11_30_03</span>
        </p>
        <p>
          <span>預計到賬</span>
          <span>10000</span>BCB
        </p>

      </div>
    </div>
  </div>
</template>

<script>
  import myHeader from '@/common/myHeader.vue'

  export default {
    name: "verificationSuccess",
    components: {
      myHeader,
    },
  }
</script>

<style lang="less" scoped>
  .main {
    background-color: #0e1520;
    > .verificationSuccess_top {
      height: 10rem;
      background-color: #1f2733;
      padding: 1rem;
      text-align: center;
      > p:nth-child(1) {
        line-height: 2rem;
        color: #839cc5;
        margin-top: 1rem;
        font-size: 1.1rem;
      }
      > p:nth-child(2) {
        line-height: 4rem;
        color: #add1f3;
        font-size: 2rem;
      }
      > p:nth-child(3) {
        line-height: 2rem;
        color: #545e6c;
      }
    }
    > .verificationSuccess_bottom {
      height: 18rem;
      background-color: #1f2733;
      margin-top: 1rem;
      padding: 1rem;
      box-sizing: border-box;
      >p{
        line-height: 3rem;
        height: 3rem;
        display: flex;
        border-bottom: 1px solid #1c232c;
        font-size: 1.2rem;
        color: #a1abba;
        >span{
          display: inline-block;
          flex: 1;
          color: #88919e;
          max-width: 50%;
          overflow-x: scroll;
          white-space: nowrap;
          &:nth-child(2){
            text-align: right;
          }

        }
        &:nth-child(1){
          >span{
            color: #d52e0f;
          }
        }
        &:nth-child(4){
          >span{
            margin-right: .3rem;
          }
        }
      }
    }
  }
</style>
