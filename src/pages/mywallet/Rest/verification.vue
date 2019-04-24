<template>
    <div class="verification">
      <myHeader title="验证结果">
        <span class="right_icon">完成</span>
      </myHeader>
      <div class="main">
        <div class="result_box">
          <div class="result_box_icon"></div>
          <p class="result_state">验证成功</p>
          <p class="explain">您本次转入冻结账户操作成功 </p>
        </div>
      </div>
    </div>
</template>

<script>
  import myHeader from '@/common/myHeader.vue'

    export default {
        name: "verification",
          components: {
            myHeader,
          },
    }
</script>

<style lang="less" scoped>
  .main{
    background-color: #0e1520;
  }
  .result_box{
    position: absolute;
    top: 10%;
    height: 12rem;
    width: 100%;
    padding: 1rem;
    box-sizing: border-box;
    text-align: center;
    >.result_box_icon{
      width: 5rem;
      height: 5rem;
      margin: auto;
      border-radius: 50%;
      background: url("imgs/fabu_icon_succ.png") no-repeat center;
      background-size: 100%;
    }
    >.result_state{
      height: 3rem;
      line-height: 3rem;
      color: #839cc5;
      font-weight: bolder;
    }
    >.explain{
      color: #647693;
      line-height: 2rem;
    }
  }
</style>
