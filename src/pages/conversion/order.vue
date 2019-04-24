<template>
 <transition enter-active-class="slideInRight">
  <div class="order" >
    <header class="header">
           <span class="back" @click="exitp"></span>
            <h2>我的订单</h2>
    </header>
        <div class="tabbar">
            <tab  active-color='#c29d4d' default-color='#c3cdd9' v-model="index">
                <tab-item selected  active-color  @on-item-click="tabbtn(index)">全部</tab-item>
                <tab-item @on-item-click="tabbtn(index)">队列中</tab-item>
                <tab-item @on-item-click="tabbtn(index)">已完成</tab-item>
            </tab>
        </div>
        <!-- 订单列表 -->
        <transition enter-active-class="slideInRight">
       <div class="swiperbox" v-infinite-scroll="requestorderall"
                        infinite-scroll-disabled="loading"
                        infinite-scroll-distance="20"
                        ref="cntbox"
                        v-show="flag3"
                        >
                  <swipeout>
                        <swipeout-item @on-close="handleEvents('on-close')" @on-open="handleEvents('on-open')" transition-mode="follow" v-for="(item,index) in list1" :key="index" :disabled="item.status!=1">
                            <div slot="right-menu">
                            <swipeout-button @click.native="onButtonClick(index)" type="warn" v-if="1==1">撤销</swipeout-button>
                             <!-- <swipeout-button @click.native="onButtonClick('delete')" type="warn" v-if="1==0">撤销</swipeout-button> -->
                            </div>
                            <div slot="content" class="list" @click="alertorderdetail(index)">
                                <p>
                                    <span>类型： {{item.currency_name_left}} TO {{item.currency_name_right}}</span>
                                    <span v-if="item.status==1" style="color:#d05e1f">队列中</span>
                                    <span v-if="item.status==2"> 已完成</span>
                                    <span v-if="item.status==3" style="color:#75767a"> 已撤销</span>
                                </p>
                                <p>
                                    <span v-if="item.status==1">-{{item.number}}{{item.currency_name_left}}</span>
                                    <span v-if="item.status==2">+{{item.exchange_number}}{{item.currency_name_right}}</span>
                                    <span v-if="item.status==3">*******</span>
                                    <span v-if="item.status==1">发起时间：{{item.create_time}}</span>
                                    <span v-if="item.status==2">完成时间：{{item.admin_time}}</span>
                                    <span v-if="item.status==3">撤销时间：{{item.admin_time}}</span>
                                </p>
                            </div>
                        </swipeout-item>
                </swipeout>
         <div class="nodata" v-show="!flag">
             <span class="md">已经到最底部了...</span>
         </div>
       </div>
       </transition>

       <!-- 查看列表详情 -->
       <div id="mask" v-show="flag1"></div>
       <div id="orderdetailwrap" v-show="flag1" @click.prevent.stop="colseorderdetail">
           <div class="orderdetail">
                <div class="orderdetailtop">
                        <p>
                            <span>{{orderdetail.user_mobile}}</span>
                            <span v-if="orderdetail.status==1" style="color:#d05e1f">队列中</span>
                            <span v-if="orderdetail.status==2"> 已完成</span>
                            <span v-if="orderdetail.status==3" style="color:#75767a"> 已撤销</span>
                        </p>
                        <p>
                            <span>发起时间:{{orderdetail.create_time}}</span>
                            <span v-if="orderdetail.status!=1">完成时间:{{orderdetail.admin_time}}</span>
                        </p>
                        <p v-if="orderdetail.status==1">-{{orderdetail.number}}{{orderdetail.currency_name_left}}</p>
                        <p v-if="orderdetail.status==2">-{{orderdetail.number}}{{orderdetail.currency_name_left}}</p>
                        <p v-if="orderdetail.status==3">-{{orderdetail.number}}{{orderdetail.currency_name_left}}</p>
                        <p v-if="orderdetail.status==1">预计兑换：{{orderdetail.exchange_number}}{{orderdetail.currency_name_right}}</p>
                        <p v-if="orderdetail.status==2">实际兑换：{{orderdetail.exchange_number}}{{orderdetail.currency_name_right}}</p>
                        <p v-if="orderdetail.status==3">预计兑换：******</p>
                        <P>
                            <span>估值：{{orderdetail.cny_number}}CNY</span>
                            <span>注：实际兑换数量以审核时币值为准</span>
                        </P>
                    </div>
                    <div class="orderdetailbottom" >
                        <div v-if="orderdetail.status!=3">
                            <p>{{orderdetail.currency_name_left}}/CNY</p>
                            <P>{{orderdetail.price_left}}</P>
                        </div>
                        <div v-if="orderdetail.status!=3">
                            <p>{{orderdetail.currency_name_right}}/CNY</p>
                            <P>{{orderdetail.price_right}}</P>
                        </div>
                        <div v-if="orderdetail.status==3" style="background:#494b57">
                            <p>{{orderdetail.currency_name_left}}/CNY</p>
                            <P>{{orderdetail.price_left}}</P>
                        </div>
                        <div v-if="orderdetail.status==3" style="background:#494b57">
                            <p>{{orderdetail.currency_name_right}}/CNY</p>
                            <P>{{orderdetail.price_right}}</P>
                        </div>
                    </div>
           </div>
       </div>
  </div>
   </transition>
</template>

<script>
import { Tab, Confirm,TabItem, Swiper, SwiperItem, LoadMore,Swipeout, SwipeoutItem, SwipeoutButton } from 'vux'
import {getdata} from '@/services/mining.js'
import {getCookie,exitpage,gotopromote} from '@/utils/tool.js'
  export default {
    name:'convs',
    components:{
         Tab,
         TabItem,
         Swiper,
         SwiperItem,
         LoadMore,
         Swipeout,
         SwipeoutItem,
         SwipeoutButton,
         Confirm,

     },
   data () {
    return {
      index:0,
      showList1: true,
      flag:true,
      flag1:false,
      flag2:true,//订单全部的盒子
      flag3:false,
      listt:[],
      list1:[],//存储全部
      num1:1,
      num2:1,
      num3:1,
      list2:[],//存审核中
      list3:[],//存已审核
      loading:false,
      exchange_status:0,
      orderdetail:{},
    }
  },
  created(){


  },
  mounted () {

  },
  methods: {
       //退出页面
        exitp(){
             exitpage();
        },
       requestorderall(){
            this.loading=true;
                 if(this.flag){
                  this.$vux.loading.show({
                    text: '正在加载'
                  })
                 }
              getdata('/Exchange/getExchangeOrder',{
                  token:this.$token,
                  mark:this.$mark,
                  p:this.num1,
                  pagesize:10,
                  exchange_status:this.exchange_status
              }).then(result=>{
                  if(result.data.code==10000){
                      for(var i=0;i<result.data.result.length;i++){
                          this.list1.push(result.data.result[i])
                      }
                            this.num1++;
                    }
                  this.loading=false;
                  if(result.data.result.length<10){
                            this.loading=true;
                            this.flag=false;
                            }
                  this.$vux.loading.hide()
                  this.flag3=true;
              })
          },
    tabbtn(i){
          this.flag3=false;
          this.list1=[];//存储全部
          this.num1=1;
          this.exchange_status=i;
          this.flag=true;
          this.requestorderall();

      },
      //撤销订单
    onButtonClick (i) {
        let _this=this;
        this.$vux.confirm.show({
        content: '确定要撤销订单么？',
        onShow () {
        },
        onHide () {
        },
        onCancel () {
         // console.log('plugin cancel')
        },
        onConfirm () {
      //   console.log(_this.list1[i].exchange_id);

          getdata('/Exchange/cancelExchangeOrder',{
                  token:_this.$token,
                  mark:_this.$mark,
                  exchange_id:_this.list1[i].exchange_id,
              }).then(result=>{
                  if(result.data.code==10000){
                      _this.num1=1;
                      _this.list1=[];
                      _this.requestorderall()
                      _this.$vux.toast.show({
                        text: '撤销成功',
                        width:'9.5rem',
                        type:'success',
                    })
                    }

              })

        }
      })
    },
    handleEvents (type) {
    // console.log('event: ', type)
    },
    // 点击弹出订单详情
    alertorderdetail(i){
       this.flag1=true;
       this.orderdetail=this.list1[i];
    },
    colseorderdetail(){
       this.flag1=false;
    }
  }



  }
</script>

<style lang='less' scope>
 @import url("../../styles/record.less");
 @import '~vux/src/styles/1px.less';
 @import '~vux/src/styles/center.less';
 .order{
     position: absolute;
     top: 0;
     left: 0;
     right: 0;
     bottom: 0;
     background: #090c11;

 }
 /*.swiperbox{*/
  /*// margin-top: 92px;*/
    /*// height: calc(~'100% - 84px');*/
    /*position: absolute;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 92px;*/
    /*bottom: 0;*/
    /*background: #090c11;*/
    /*color: white;*/

/*}*/
.slideInRight, .slideOutRight{
	animation-duration: 300ms;
}
// &.active{
//     color:#cbb351;
//     border-bottom:0.2rem solid #cbb351;
// }
.vux-tab .vux-tab-item {
    background: #13171e !important;
}
.tabbar{
    position: fixed;
    top: 44px;
    width: 100%;
    height: 44px;
    z-index: 299;
}
.list{
    width: 100%;
    height: 5rem;
    padding: 0.5rem 0;
    color: #bfc2d3;
    background: #13151f;
    margin-top:0.3rem;
    font-size: 1rem;
    p{
        display: flex;
        padding: 0 1.5rem;
        justify-content: space-between;
        height: 2.5rem;
        line-height: 2.5rem;
    }
    p:nth-child(1){

        span:nth-child(2){
            color: #10afdd;
        }
    }
    p:nth-child(2){
        span:nth-child(2){
            color: #7a808a;
        }
    }
}
   #mask{
      position: fixed;
       top: 0;
       bottom: 0;
       left: 0;
       right: 0;
       z-index: 98;
       background: black;
       opacity: 0.5;
   }
   #orderdetailwrap{
       position: fixed;
       top: 0;
       bottom: 0;
       left: 0;
       right: 0;
       z-index: 99;
       .orderdetail{
           position: absolute;
           margin: auto;
           width: 100%;
           height: 13rem;
           background: white;
           top: 0;
           bottom: 0;
           left: 0;
           right: 0;
       }
   }


   .orderdetailtop{
    padding: 1rem;
    padding-bottom: 0.5rem;
    font-size: 1.2rem;
    color: #323031;
        p:nth-child(1){
            display: flex;
            justify-content: space-between;
            height: 2rem;
            line-height: 2rem;
            span:nth-child(2){
                color: #10b0e2;
            }
        }
        p:nth-child(2){
            display: flex;
            justify-content: space-between;
            height: 2rem;
            line-height: 2rem;
            font-size: 0.83rem;
            color: #676767;
            border-bottom: 1px solid #2e353f;
        }
        p:nth-child(3){
            height: 2rem;
            line-height: 2rem;
        }
        p:nth-child(4){
            display: flex;
            justify-content: flex-end;
            height: 2rem;
            line-height: 2rem;
            font-size: 1rem;

       }
        p:nth-child(5){
            display: flex;
            justify-content: space-between;
            height: 2rem;
            line-height: 2rem;
            font-size: 0.83rem;

       }
    }
    .orderdetailbottom{
        height: 3.5rem;
        width: 100%;
        display: flex;
        color: white;
        font-size: 1rem;
        text-align: center;
        justify-content: space-between;
        >div{
            flex: 1;
            height: 100%;
            p:nth-child(1){
                height:2rem;
                line-height: 2rem;
                }
        }
        >div:nth-child(1){
            background: #e6913e;
        }
        >div:nth-child(2){
            background: #43b659;
        }
    }
    .nodata{
        height: 3rem;
        position: relative;
        span{
            text-align: center;
            display: inline-block;
            width: 70%;
            height: 3rem;
            line-height: 3rem;
            color: #9fa1b0;
        }
    }
     .slideInRight, .slideOutRight{
	    animation-duration: 500ms;
    }
</style>
