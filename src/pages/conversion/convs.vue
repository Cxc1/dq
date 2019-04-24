<template>
  <div class="convs" @click="convsbtn">
      <!-- 头部 -->
    <header class="convs_header">
        <span class="back" @click="exitp"></span>
         <h2>
             <!-- <span  @click.prevent.stop="downimg">
                 {{checkcurrencyA}} <i><img src="../../assets/dom_icon.png" alt="" class="downimg" ref="downimg" ></i>
            </span> -->
            <span>兑换</span>
        </h2>
          <span class="addicon" @click.prevent.stop="linkbtn" ></span>

         <ul class="linkbtn" v-show="flag2" @click.stop.prevent>
            <li @click="tkshow" class="li1">发起兑换</li>
           <router-link to="/order1" >
                <li @click="hidebtm">我的订单</li>
           </router-link>
        </ul>
    </header>
     <ul class="moneytype">
        <li v-for="(item,i) in currencyA" :key="i" @click="checkedA(i)" :class="{convsactive:(item==checkcurrencyA)}">{{item}}</li>
    </ul>
    <div class="tabwrap">
        <ul class="tabbarbtn">
            <li :class="{con_active:checktabA}" @click.prevent.stop="tabbarbtnA">
                {{checkcurrencyA}} TO LTCC ( {{tabA_title}} )
                <i v-show="checktabA">
                     <img src="../../assets/down_hascolor.png"  width="16px" ref="downarrow1">
                </i>
           </li>
            <li :class="{con_active:checktabB}" @click.prevent.stop="tabbarbtnB">
                LTCC TO {{checkcurrencyA}} ( {{tabB_title}} )
                <i v-show="checktabB">
                     <img src="../../assets/down_hascolor.png"  width="16px" ref="downarrow2">
               </i>
            </li>
        </ul>
        <transition enter-active-class="fadeInDown" leave-active-class="fadeOut">
            <ul class="drop-down-menu1" v-show="flag5" >
                    <li v-for="(item,index) in menulist1" :key="index" @click="downmenulist1(index)">{{item}}</li>
            </ul>
        </transition>
        <transition enter-active-class="fadeInDown" leave-active-class="fadeOut">
            <ul class="drop-down-menu2" v-show="flag6" >
                    <li v-for="(item,index) in menulist2" :key="index" @click="downmenulist2(index)">{{item}}</li>

            </ul>
        </transition>
    </div>
    <div style="height:134px"></div>
                <transition enter-active-class="slideInRight" >
                     <ul class="convs_list"
                        v-infinite-scroll="requestconvslist"
                        infinite-scroll-disabled="loading"
                        infinite-scroll-distance="20"
                        ref="cntbox">
                        <li v-for="(item,index) in orderlist" :key="index" class="showlist">
                           <div class="showlisttop">
                                <p>
                                    <span>{{item.user_mobile}}</span>
                                    <span v-if="item.status==1" style="color:#f9383b">队列中</span>
                                    <span v-if="item.status==2" style="color:#32b1de">已完成</span>
                                </p>
                                <p>
                                    <span v-if="item.status==1">发起时间：{{item.create_time}}</span>
                                    <span v-if="item.status==1"></span>
                                    <span v-if="item.status==2">发起时间：{{item.create_time}}</span>
                                    <span v-if="item.status==2">完成时间：{{item.admin_time}}</span>
                                </p>
                                <p>{{item.number}}{{item.currency_name_left}}</p>
                                <p v-if="item.status==1">预计兑换：{{item.exchange_number}}{{item.currency_name_right}}</p>
                                <p v-if="item.status==2">实际兑换：{{item.exchange_number}}{{item.currency_name_right}}</p>
                                <P>
                                    <span>估值：{{item.cny_number}}CNY</span>
                                    <span>注：实际兑换数量以审核时币值为准</span>
                                </P>
                           </div>
                           <div class="showlistbottom">
                               <div>
                                   <p>{{item.currency_name_left}}/CNY</p>
                                   <P>{{item.price_left}}</P>
                               </div>
                               <div>
                                   <p>{{item.currency_name_right}}/CNY</p>
                                   <P>{{item.price_right}}</P>
                               </div>
                           </div>
                        </li>
                         <div class="nodata" v-show="!flag">
                            <span class="md" >已经到最底部了...</span>
                            <!-- <span class="md" v-if="this.exchange_status==1">已经到最底部了(只显示前20行)...</span>
                            <span class="md" v-if="this.exchange_status==0">已经到最底部了(已完成只显示20行)</span> -->
                        </div>
                     </ul>

                </transition>

         <!-- 兑换弹框组件 -->
       <convs-tk v-if="bool" :tkshow='flag3'
                 :userinfo='userdata'
        @tkisShow="getflag"></convs-tk>
  </div>
</template>

<script>
import { Tab, TabItem } from 'vux'
import Convs_tk from '@/components/conversion/convs_tk';
import {getdata} from '@/services/mining.js'
import {hidebottom,showbottom,webgotologin,exitpage} from '@/utils/tool.js'
  export default {
      name:'convs',
     components:{
         Tab,
         TabItem,
         [Convs_tk.name]:Convs_tk,
     },
      data(){

        return {
          flag:true,
          flag1:false,//A类型币种是否显示
          flag2:false,//+ 下拉菜单是否显示
          flag3:false,//接受兑换组件传的值
          flag5:false,
          flag6:false,
          listt:[],
          orderlist:[],
        //  请求兑换列表的参数
          num1:1,//页码
          exchange_status:'0',	//状态1队列中2已完成，不传全部
          exchange_statusA:'0',	//状态1队列中2已完成，不传全部
          exchange_statusB:'0',	//状态1队列中2已完成，不传全部
          currency_keyword:'',//币关键词
          exchange_type:'1',//类型



          checkcurrencyA:'',//选中的A类型币种
          currencyA:[],//A类型币种列表
          userdata:[],//获取到用户信息 传递到兑换组件
          bool:false,
          loading:true,

          checktabA:true,//选中时
          checktabB:false,

          menulist1:["全部","队列中","已完成"],
          menulist2:["全部","队列中","已完成"],

          tabA_title:"全部",
          tabB_title: "全部",
        }
      },
      methods:{
         //退出页面
            exitp(){
                exitpage();
            },
          //隐藏底部
          
          hidebtm(){
              hidebottom();
          },
          tabbarbtnA(){
               if(this.checktabA){
                 this.flag5=!this.flag5;
                 this.$refs.downarrow1.style.transform= !this.flag5?'rotate(360deg)':'rotate(180deg)';
               }else{
                    this.currency_keyword=this.checkcurrencyA;
                    this.num1=1;
                    this.orderlist=[];
                    this.exchange_type=1;
                    this.flag=true;
                    this.exchange_status=this.exchange_statusA;
                    this.requestconvslist();
               }
               this.checktabA=true;
               this.checktabB = false;
               this.flag1=false;
               this.flag2=false;
               this.flag3=false;
               this.flag6=false;
               this.$refs.downarrow2.style.transform='rotate(360deg)';

          },
           tabbarbtnB(){

               if(this.checktabB){
                  this.flag6=!this.flag6;
                  this.$refs.downarrow2.style.transform= !this.flag6?'rotate(360deg)':'rotate(180deg)';
               }else{
                    this.currency_keyword=this.checkcurrencyA;
                    this.num1=1;
                    this.orderlist=[];
                    this.exchange_type=2;
                    this.flag=true;
                    this.exchange_status=this.exchange_statusB;
                    this.requestconvslist();
               }
               this.checktabA=false;
               this.checktabB = true;
               this.flag1=false;
               this.flag2=false;
               this.flag3=false;
               this.flag5=false;
               this.$refs.downarrow1.style.transform='rotate(360deg)';
          },
          downmenulist1(j){
                this.currency_keyword=this.checkcurrencyA;
                this.num1=1;
                this.orderlist=[];
                this.exchange_type=1;
                this.flag=true;
                this.exchange_statusA=j
                this.exchange_status=this.exchange_statusA;
                this.tabA_title=this.menulist1[j]
                this.flag5=false;
                this.$refs.downarrow1.style.transform='rotate(360deg)';
                this.requestconvslist();
          },
          downmenulist2(i){
                this.currency_keyword=this.checkcurrencyA;
                this.num1=1;
                this.orderlist=[];
                this.exchange_type=2;
                this.flag=true;
                this.exchange_statusB=i;
                this.exchange_status= this.exchange_statusB;
                this.tabB_title=this.menulist2[i]
                this.flag6=false;
                this.$refs.downarrow2.style.transform='rotate(360deg)';
                this.requestconvslist();
          },
        //   选择币种
          downimg(){
              this.flag2=false;
              this.flag3=false;
              this.flag5=false;
              this.flag6=false;
              this.$refs.downarrow1.style.transform='rotate(360deg)';
              this.$refs.downarrow2.style.transform='rotate(360deg)';
              this.flag1=!this.flag1;
          },
          //点击+下拉菜单显示隐藏
          linkbtn(){

              this.flag2=!this.flag2;
              this.flag1=false;
              this.flag3=false;
              this.flag5=false;
              this.flag6=false;
              this.$refs.downarrow1.style.transform='rotate(360deg)';
              this.$refs.downarrow2.style.transform='rotate(360deg)';
          },
           //隐藏弹框 赋初始值
          convsbtn(){
              this.flag1=false;
              this.flag2=false;
              this.flag3=false;
              this.flag5=false;
              this.flag6=false;
              this.$refs.downarrow1.style.transform='rotate(360deg)';
              this.$refs.downarrow2.style.transform='rotate(360deg)';
          },
          //请求兑换队列
         requestconvslist(){
             //  this.exchange_type=this.currencyA[0];
            this.loading=true;
            if(this.flag){
                this.$vux.loading.show({
                text: '正在加载'
                })
            }
              getdata('/Exchange/getExchangeQueue',{
                  token:this.$token,
                  mark:this.$mark,
                  pagesize:10,
                  p:this.num1,
                  exchange_type:this.exchange_type,
                  exchange_status:this.exchange_status,
                  currency_keyword:this.currency_keyword,

              }).then(result=>{
                  this.$vux.loading.hide()
                  
                  if(result.data.code==10000){
                      for(var i=0;i<result.data.result.length;i++){
                          this.orderlist.push(result.data.result[i])
                      }
                            this.num1++;
                  }                 
                 else if(result.data.code==10100){
                      this.$vux.toast.text('登录过期');
                      webgotologin();
                 }
                   this.loading=false;
                  if(result.data.result.length<10){
                            this.loading=true;
                            this.flag=false;
                   }
                  
              })
         },
           tkshow(){
               this.flag2=false;
               this.flag3=true;
               this.bool = true;
           },
           //接收兑换组件传的值
           getflag({tkval}){
                this.flag3=tkval;
                this.bool = false;
           },

           //选择头部币种类型时
           checkedA(i){
               this.checkcurrencyA = this.currencyA[i];
               this.currency_keyword=this.currencyA[i]
               this.num1=1;
               this.orderlist=[];
               this.exchange_type=1;
               this.exchange_status=0;
               this.flag=true;
               this.checktabA=true,//选中时
               this.checktabB=false,
               this.$refs.downarrow1.style.transform='rotate(360deg)';
               this.$refs.downarrow2.style.transform='rotate(360deg)';
               this.requestconvslist();

              
           },

           //请求币种信息
          requestcurrencydata(){
            this.$vux.loading.show({
                 text: '正在加载中'
             })
              getdata('/Exchange/getWalletCurrency',{
                  token:this.$token,
                  mark:this.$mark,
              }).then(result=>{
                  this.$vux.loading.hide();
                  if(result.data.code==10000){
                     for(var i=0;i<result.data.result.length;i++){
                         //将A类型的币种存到数组
                         if(result.data.result[i].c_type=='a'){
                             this.currencyA.push(result.data.result[i].c_keyword)
                         }
                     }
                     //初始化头部币种
                     this.userdata=result.data.result;
                     this.checkcurrencyA=this.currencyA[0];
                     this.currency_keyword = this.currencyA[0];
                     this.loading=false;
                  }
                  else if(result.data.code==10100){
                      this.$vux.toast.text('登录过期');
                      webgotologin();
                  }
                  else{
                      this.$router.replace({
                            path:'/refushpage',
                            name:'refushpage',
                       })
                  }
                
              }).catch(err=>{
                   this.$vux.loading.hide();
                   this.$router.replace({
                            path:'/refushpage',
                            name:'refushpage',
                          })
              })
          },
      },
      mounted(){
          
      },
      created(){
            this.requestcurrencydata();
      },
  }
</script>

<style lang='less' scope>
 @import url("../../styles/record.less");
 @import '~vux/src/styles/1px.less';
 @import '~vux/src/styles/center.less';
 .convs{
     position: absolute;
     top: 0;
     left: 0;
     right: 0;
     bottom: 0;
     background: #1a1d2c;

 }
.convs_header{
    width: 100%;
    height: 44px;
    position: fixed;
    z-index: 98;
    background: #1d202d;
    color: white;
    h2{
        width: 100%;
        height: 44px;
        line-height: 44px;
        text-align: center;
        font-size: 16px;
    }
}
.moneytype{
    position: fixed;
    width: 100%;
    top: 44px;
    display: flex;
    height: 44px;
    color: #c1cbd4;
    background: #13161f;
    li{
        flex: 1;
        height: 41px;
        line-height: 41px;
        text-align: center;
        font-size: 1.2rem;
        margin-bottom: 2px;
      
        &.convsactive{
            color: #c29d4d;
            border-bottom: 3px solid #c29d4d;
        }
    }
    li:last-child{
        margin: 0;
    }
}
.addicon{
    display: inline-block;
    position: absolute;
    width: 40px;
    height: 40px;
    background: url(../../assets/add_icon.png)  no-repeat  center;
    background-size:60%;
    right: 0;
    top: 0;
    z-index: 99;
}

.slideInRight, .slideOutRight{
	animation-duration: 300ms;
}
.linkbtn{
    position: absolute;
    right: 0;
    width: 11rem;
    padding: 0 1rem;
    background: #353945;
    top: 54px;
    right: 5px;;
    li{
        color: #c9c9cb;
        height: 3rem;;
        line-height: 3rem;
        text-align: center;
    }
    .li1{
        border-bottom: 1px solid #454859;
    }
}
.linkbtn::before{
    content: '';
    position: absolute;
    bottom: 100%;
    right: 8px;
    width: 0;
    height: 0;
    border-width: 0.75rem;
    border-style: solid;
    border-color: transparent;
    margin-bottom: -2px;
    border-bottom-width: 1.16rem;
    border-bottom-color: currentColor;
    color: #353945;
}
.tabwrap{
    position: fixed;
    top: 88px;
    width: 100%;
    z-index: 9;
}
.tabbarbtn{
    width: 100%;
    height: 44px;
    background: #0d1111;
    margin-bottom: 0.3rem;
    li{
        display: inline-block;
        width: 50%;
        height: 44px;
        text-align: center;
        line-height: 44px;
        color: #c1cbd4;
         &.con_active{
        color: #cdb24b;
    }

    }
    li:nth-child(1){
        position: absolute;
        top:0;
        left: 0;
        i{
            position: absolute;
            top:4px;
            margin-left:2px;
        }
    }
    li:nth-child(2){
        position: absolute;
        top:0;
        right: 0;
         i{
            position: absolute;
            top:4px;
            margin-left:2px;
        }
    }
}
.drop-down-menu1::before,.drop-down-menu2::before{
    content: '';
    position: absolute;
    bottom: 100%;
    right: 18px;
    width: 0;
    height: 0;
    border-width: 0.75rem;
    border-style: solid;
    border-color: transparent;
    margin-bottom: -2px;
    border-bottom-width: 1.16rem;
    border-bottom-color: currentColor;
    color: #353945;
}
.drop-down-menu1{
     position: absolute;
     top: 54px;
    left: 10px;
    background: #353945;
    width: 40%;
    padding: 0 4% ;
    li{
        height: 3.5rem;
        line-height: 3.5rem;
        text-align: center;
        color: #aaabad;
        border-bottom: 1px solid #464958;

    }
}
.drop-down-menu2{
     position: absolute;
     top: 54px;
     right:10px;
     background: #353945;
     width: 40%;
     padding: 0 4% ;
    li{
        height: 3.5rem;
        line-height: 3.5rem;
        text-align: center;
        color: #aaabad;
        border-bottom: 1px solid #464958;

    }
}
.convs_list{
  
}
.showlist{
    background: #13161f;
    margin-top: 7px;
}
.showlisttop{
    padding: 0 1rem;
    font-size: 1rem;
    color: #dbdbdb;
        p{
            overflow: hidden;
        }
        p:nth-child(1){
            display: flex;
            justify-content: space-between;
            height: 2rem;
            line-height: 2rem;;
        }
        p:nth-child(2){
            display: flex;
            justify-content: space-between;
            height: 2rem;
            line-height: 2rem;
            font-size: 0.83rem;
            color: #aaabad;
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
            font-size: 0.83rem;
            color: #aaabad;

       }
        p:nth-child(5){
            display: flex;
            justify-content: space-between;
            height: 2rem;
            line-height: 2rem;
            font-size: 0.83rem;
            color: #aaabad;

       }
    }
    .showlistbottom{
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
            background: #e6913e;
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
    .fadeInUp, .zoomOutDown,.fadeInDown,.fadeIn,.fadeOut{
	    animation-duration: 700ms;
    }
     .nodata{
        height: 3rem;
        position: relative;
        margin-top: 7px;
        /*background: #13161f;*/
        span{
            text-align: center;
            display: inline-block;
            width: 70%;
            height: 3rem;
            line-height: 3rem;
            color: #9fa1b0;
        }
    }

</style>
