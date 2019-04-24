<template>
  <div class="depositAccount">
    <myHeader title="转到定存账户"/>
    <div class="main">
      <div class="user_box">

        <div class="user_icon">
          <img src="@/assets/user_icon.png" alt=""/>
        </div>

        <div class="user_name">
          <p>定存餘額：19254623005</p>
          <p>真实姓名：_依依</p>
        </div>
      </div>

      <div class="account">預計到賬：--</div>


      <div class="accounts_number">
        <p>转入数量 <span>（余额：00000）</span></p>
        <p><input type="text" maxlength="15" placeholder="请输入转账数量">BCB</p>
        <p>* 您當前剩餘可轉入額度為：100BCB </p>
      </div>

      <p class="come_time">本期到账时间：2018-06-25 23_59_59前 </p>

      <div class="next">下一步</div>
    </div>
  </div>
</template>

<script>
  import myHeader from '@/common/myHeader.vue'

  export default {
    name: "depositAccount",
    components: {
      myHeader,
    },
  }
</script>

<style lang="less" scoped>
  .main {
    background-color: #161c29;
    .user_box {
      height: 13rem;
      padding: 4rem;
      box-sizing: border-box;
      display: flex;
      > div {
        flex: 1;
      }
      > .user_icon {
        max-width: 5rem;
        height: 5rem;
        background-color: #91b6c4;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        > img {
          border-radius: 50%;
          max-width: 80%;
          max-height: 80%;
        }
      }
      > .user_name {
        height: 100%;
        padding: .5rem;
        box-sizing: border-box;
        width: calc(~'100% - 5rem');
        >p{
          line-height: 2rem;
          color: #c9ced8;
          font-size: 1.1rem;
          overflow-x: scroll;
          white-space: nowrap;
        }
      }
    }
    >.account{
      height: 2rem;
      line-height: 2rem;
      padding: 0 1rem;
      color: #c9ced8;
      font-size: 1.2rem;
    }
    >.accounts_number{
      height: 10rem;
      background-color: #1f2733;
      padding: 1rem;
      >p:nth-child(1){
        height: 2.5rem;
        line-height: 2rem;
        font-size: 1.2rem;
        color: #c9ced8;
        >span{
          display: inline-block;
          float: right;
        }
      }
      >p:nth-child(2){
        height: 5rem;
        display: flex;
        align-items: center;
        font-size: 1.2rem;
        color: #9ca1ac;
        font-weight: bolder;
        >input{
          height: 2.5rem;
          background: none;
          border: none;
          color: #c9ced8;
          line-height: 3rem;
          font-size: 1.5rem;
        }
      }
      >p:nth-child(3){
        line-height: 3rem;
        color: #c3382d;
        font-size: 1.2rem;
      }
    }
    .come_time{
      color: #6a7587;
      height: 2rem;
      line-height: 2rem;
      padding: 0 1rem;
      margin-top: 3rem;
    }

    .next{
      height: 4rem;
      margin: 1rem;
      background: linear-gradient(to right, #146c93, #344b9b);
      text-align: center;
      line-height: 4rem;
      font-size: 1.4rem;
      color: #fff;
      &:active{
        opacity: .8;
      }
    }
  }
</style>
