<template>
  <div class="ifn_wrap">
    <div class="ifn_content">
      <h2>邀约码</h2>
      <p>{{invite_code}}</p>
      <p>注册时请填写上面邀约码。</p>
      <p>
        <input type="text" v-model="message" readonly="readonly">
        <span
          v-clipboard:copy="message"
          v-clipboard:success="onCopy"
          v-clipboard:error="onError">复制链接</span>
      </p>
      <p>
        <span> 我是"</span>
        <span>{{user_nickname}}</span>
        <span> "地球村第</span>
        <span>{{user_id}}</span>
        <span>位居民</span>
      </p>
      <p>我在地球村等你，不见不散。</p>
      <p>注册就送1000枚棒棒糖</p>
      <p>免费挖宝，免费兑换</p>
      <p>
        <span></span>
        <span></span>
        <span></span>
      </p>
      <img src="https://diqiucun.oss-cn-shanghai.aliyuncs.com/app/qrcode.png">
      <p>请在浏览器中扫描下载地球村APP</p>
      <P>基于区块链生态价值平台</P>
    </div>
  </div>
</template>
<script>
  import {getuserinfo} from '@/services/mining.js'

  export default {
    name: 'ifn-contest',
    data() {
      return {
        message: '亲爱的朋友，恭喜您即将成为地球村的一员！请主动向我获取邀请码免费注册成为村民，' +
         '村长送您1000枚棒棒糖（LTCY）。邀请您更多好友免费注册成为地球村民也将会获得更多的棒棒糖(LTCY)。' +
          '未来万一1000枚棒棒糖（LTCY）值10万、100万呢？' +
        '下载地址：'+ 'http://www.aiaseis.com/qe/',//链接
        user_nickname: '',//用户昵称
        user_id: '',//用户id 排名
        invite_code: '',

      }
    },
    methods: {
      //复制的方法
      onCopy: function (e) {
        this.$vux.toast.show({
          text: '复制成功',
          width: '9.5rem',
          type: 'success',
        })
      },
      onError: function (e) {
        this.$vux.toast.show({
          text: '复制失败',
          type: 'cancel',

        })
      },
      //获取用户信息
      requestuserinfo() {
        getuserinfo({
          mark: this.$mark,
          token: this.$token,
        })
          .then(result => {
            if (result.data.code == 10000) {
              // this.message= result.data.result.user_id;
              this.invite_code = result.data.result.invite_code;
              this.user_id = result.data.result.user_id;
              this.user_nickname = result.data.result.user_nickname;
            }

          })
      }
    },
    mounted() {
      this.requestuserinfo();
    }

  }
</script>
<style lang="less" scoped>
  @import url("../../styles/var.less");

  .ifn_wrap {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url(imgs/bg.jpg) no-repeat;
    background-size: 100% 100%;
  }

  .ifn_content {
    width: 86%;
    background: white;
    margin: 0 auto;
    margin-top: 16rem;
    border-radius: 8px;
    padding-top: 1rem;
    padding-bottom: 1rem;
    color: #dbba54;
    text-align: center;
    h2 {
      height: 2rem;
      width: 100%;
      line-height: 2rem;
      background: url('imgs/header_t.png') no-repeat;
      background-size: 100% 100%;
    }
    :nth-child(2) {
      width: 100%;
      height: 3rem;
      line-height: 3rem;
      font-size: 1.2rem;
      font-weight: 900;

    }
    :nth-child(3) {
      width: 100%;
      height: 2rem;
      line-height: 2rem;
      font-size: 1.2rem;
    }
    :nth-child(4) {
      padding: 0 15%;
      height: 1.5rem;
      input {
        border: none;
        height: 1.5rem;
        float: left;
        width: 67%;
        padding-left: 0.5rem;
        border: 1px solid #bbbaba;
        box-sizing: border-box;
        color: #bbbaba;
        font-size: 1rem;
        border-radius: 5px 0 0 5px;
      }
      span {
        width: 33%;
        float: left;
        background: #dbba54;
        color: white;
        font-size: 1rem;
        display: inline-block;
        height: 1.5rem;
        padding: 0 0;
        line-height: 1.5rem;
        border-radius: 0 5px 5px 0;
      }
    }

    :nth-child(5) {
      height: 2.5rem;
      line-height: 2.5rem;
      color: #848484;
      font-size: 1rem;
      span {
        font-size: 1rem;
        padding: 0;
      }
    }
    :nth-child(6) {
      height: 2.5rem;
      line-height: 2.5rem;
      color: #848484;
      font-size: 1rem;
      margin-top: 0.5rem;
    }
    :nth-child(7) {
      height: 2.5rem;
      line-height: 2.5rem;
      color: #ca5454;
      font-size: 1rem;

    }
    :nth-child(8) {
      height: 1.5rem;
      line-height: 1.5rem;
      color: #ca5454;
      font-size: 1rem;

    }
    :nth-child(9) {
      height: 1.5rem;
      line-height: 1.5rem;
      position: relative;
      span:nth-child(1) {
        position: absolute;
        left: -0.8rem;
        display: inline-block;
        width: 1.5rem;
        height: 1.5rem;
        background: black;
        border-radius: 1.5rem;
      }
      span:nth-child(2) {
        display: inline-block;
        width: 80%;
        height: 0;
        border: 1px dashed #dbba54;
        margin-top: 0.1rem;

      }
      span:nth-child(3) {
        display: inline-block;
        width: 1.5rem;
        height: 1.5rem;
        background: black;
        border-radius: 1.5rem;
        padding: 0;
        position: absolute;
        right: -0.8rem;
      }
    }
    :nth-child(10) {
      margin-top: 1rem;
      width: 9rem;
      height: 9rem;
    }
    :nth-child(11) {
      font-size: 0.8rem;
      margin-top: 1rem;
      color: #848484;
    }
    :nth-child(12) {
      font-size: 0.8rem;
    }
  }

</style>

