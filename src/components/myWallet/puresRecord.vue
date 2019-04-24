<template>
  <ul class="item_box" v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loadBol"
      infinite-scroll-distance="0">
    <li class="record_products" v-for="(item , index) in showData" :key="index">
      <div class="icon">
        <span class="yellow" v-if="item.type == 1">{{dateType.typeon}}</span>
        <span class="green" v-if="item.type == 2">{{dateType.typeto}}</span>
        <span class="blur" v-if="item.type == 3">{{dateType.typest}}</span>
        <span class="orange" v-if="item.type == 4">{{dateType.typefo}}</span>
        <span class="violet" v-if="item.type == 5">{{dateType.typefi}}</span>
        <span class="cyan" v-if="item.type == 6">{{dateType.typesi}}</span>
        <span class="purple" v-if="item.type == 7">{{dateType.typese}}</span>
        <span class="red" v-if="item.type == 8">{{dateType.typeei}}</span>
        <span class="ni" v-if="item.type == 9">{{dateType.typeni}}</span>
        <span class="te" v-if="item.type == 10">{{dateType.typete}}</span>
        <span class="el" v-if="item.type == 11">{{dateType.typeel}}</span>
        <span class="tw" v-if="item.type == 12">{{dateType.typetw}}</span>
        <span class="th" v-if="item.type == 13">{{dateType.typeth}}</span>
        <span class="ft" v-if="item.type == 14">{{dateType.typeft}}</span>
        <span class="fit" v-if="item.type == 15">{{dateType.typefit}}</span>
        <span class="sit" v-if="item.type == 16">{{dateType.typesit}}</span>
        <span class="set" v-if="item.type == 17">{{dateType.typeset}}</span>
        <span class="eit" v-if="item.type == 18">{{dateType.typeeit}}</span>
        <span class="nit" v-if="item.type == 19">{{dateType.typenit}}</span>
        <span class="twt" v-if="item.type == 20">{{dateType.typetwt}}</span>
      </div>
      <div class="record_products_center">
        <div class="record_products_center_left">
          <p class="yellow" v-if="item.type == 1">{{dateType.typeonText}}</p>
          <p class="green" v-if="item.type == 2">{{dateType.typetoText}}</p>
          <p class="blur" v-if="item.type == 3 ">{{dateType.typestText}}</p>
          <p class="orange" v-if="item.type == 4 ">{{dateType.typefoText}}</p>
          <p class="violet" v-if="item.type == 5">{{dateType.typefiText}}</p>
          <p class="cyan" v-if="item.type == 6 ">{{dateType.typesiText}}</p>
          <p class="purple" v-if="item.type == 7">{{dateType.typeseText}}</p>
          <p class="red" v-if="item.type == 8 ">{{dateType.typeeiText}}</p>
          <p class="ni" v-if="item.type == 9 ">{{dateType.typeniText}}</p>
          <p class="te" v-if="item.type == 10">{{dateType.typeteText}}</p>
          <p class="el" v-if="item.type == 11 ">{{dateType.typeelText}}</p>
          <p class="tw" v-if="item.type == 12 ">{{dateType.typetwText}}</p>
          <p class="th" v-if="item.type == 13 ">对方账号：{{item.other_mobile}}</p>
          <p class="ft" v-if="item.type == 14 ">{{dateType.typeftText}}</p>
          <p class="fit" v-if="item.type == 15 ">{{dateType.typefitText}}</p>
          <p class="sit" v-if="item.type == 16 ">{{dateType.typesitText}}</p>
          <p class="set" v-if="item.type == 17 ">{{dateType.typesetText}}</p>
          <p class="eit" v-if="item.type == 18 ">{{dateType.typeeitText}}</p>
          <p class="nit" v-if="item.type == 19">{{dateType.typenitText}}</p>
          <p class="twt" v-if="item.type == 20 ">{{dateType.typetwtText}}</p>

          <p></p>
          <p>燃烧：<span>{{item.fee_value}}</span></p>
        </div>
        <div class="record_products_center_right">
          <p class="" v-if="moneyType === false" :class="{yellow : item.type == 1 ,green :item.type == 2 ,blur :item.type == 3 ,
          orange : item.type == 4 ,violet : item.type ==5, cyan : item.type == 6,
                                    purple : item.type ==7 ,red : item.type == 8,
                                     ni : item.type == 9,te : item.type ==10 ,el : item.type == 11 ,
                                     tw :item.type == 12 ,th : item.type ==13 ,ft : item.type ==14 ,
                                     fit : item.type==15, sit : item.type==16, set : item.type==17,
                                     eit : item.type==18 , nit : item.type==19 , twt : item.type==20 ,
                                     }">
            {{item.actual_money}} LTCC</p>
          <p class="" v-else :class="{yellow : item.type == 1 ,green :item.type == 2 ,blur :item.type == 3 ,
          orange : item.type == 4 ,violet : item.type ==5, cyan : item.type == 6,
                                    purple : item.type ==7 ,red : item.type == 8,
                                     ni : item.type == 9,te : item.type ==10 ,el : item.type == 11 ,
                                     tw :item.type == 12 ,th : item.type ==13 ,ft : item.type==14,
                                     fit : item.type==15  , sit : item.type==16 ,set : item.type==17 ,eit : item.type==18 ,
                                     nit : item.type==19 , twt : item.type==20 ,
                                     }">
            {{item.integral_money}}</p>
          <p :class="{yellow : item.type == 1 ,green :item.type == 2 ,blur :item.type == 3 ,
                      orange : item.type == 4 ,violet : item.type ==5, cyan : item.type == 6,
                      purple : item.type ==7 ,red : item.type == 8,
                      ni : item.type == 9,te : item.type ==10 ,el : item.type == 11 ,
                      tw :item.type == 12 ,th : item.type ==13 ,ft : item.type ==14 ,fit : item.type==15 ,
                      sit : item.type==16 ,set : item.type==17 ,eit : item.type==18 ,nit : item.type==19 , twt : item.type==20 ,
                      }">
            <span v-if="item.other_mobile&&item.other_mobile != ''">对方账号：</span><span>{{item.other_mobile}}</span></p>
          <p>{{item.time}}</p>
        </div>
      </div>
    </li>
  </ul>

</template>

<script>
  export default {
    name: "puresRecord",
    props: ['showData', 'loadBol', 'dateType'],
    data() {
      return {
        moneyType: false
      }
    },
    methods: {
      //上拉加载更多数据
      loadMore() {
        if (this.showData.length >= 12) {
          this.$emit('addData');
        }
      }
    },
    mounted() {
    },
    created() {
      if (this.$route.name === 'integralPures' || this.$route.query.purse === 'integralPures') {
        this.moneyType = true;
      }
    }
  }
</script>

<style lang="less" scoped>
  @import url("../../styles/walletRecord.less");

  .icon {
    > span {
      border-radius: 50%;
      &.green {

        border: 1px solid #15d17f;
        color: #15d17f;
      }
      &.orange {
        border: 1px solid #e95521;
        color: #e95521;
      }
      &.yellow {
        border: 1px solid #bdbb23;
        color: #bdbb23;
      }
      &.blur {
        border: 1px solid #2ed0ed;
        color: #2ed0ed;
      }
      &.violet {
        border: 1px solid #3e84f5;
        color: #3e84f5;
      }
      &.cyan {
        border: 1px solid #09f1e9;
        color: #09f1e9;
      }
      &.purple {
        border: 1px solid #dbba53;
        color: #dbba53;
      }
      &.red {
        border: 1px solid #fff;
        color: #fff;
      }
      &.ni {
        border: 1px solid #0bb20c;
        color: #0bb20c;
      }
      &.te {
        border: 1px solid #fef5a8;
        color: #fef5a8;
      }
      &.el {
        border: 1px solid #13c4ed;
        color: #13c4ed;
      }
      &.tw {
        border: 1px solid #35808e;
        color: #35808e;
      }
      &.th {
        border: 1px solid #ff4949;
        color: #ff4949;
      }
      &.ft {
        border: 1px solid bisque;
        color: bisque;
      }
      &.fit {
        color: #C5C1AA;
        border: 1px solid #C5C1AA;
      }
      &.sit {
        color: #CD00CD;
        border: 1px solid #CD00CD;
      }
      &.set {
        color: #8DB6CD;
        border: 1px solid #8DB6CD;
      }
      &.eit {
        color: #00FF7F;
        border: 1px solid #00FF7F;
      }
      &.nit {
        color: #FF83FA;
        border: 1px solid #FF83FA;
      }
      &.twt {
        color: #E6E6FA;
        border: 1px solid #E6E6FA;
      }
    }
  }

  .item_box {
    height: 100%;
    width: 100%;
    overflow-y: scroll;
  }

  .record_products_center {
    > div {

      &.record_products_center_left {
        &.green {
          color: #15d17f;
        }
        &.orange {
          color: #e95521;
        }
        &.yellow {
          color: #bdbb23;
        }
        &.blur {
          color: #2ed0ed;
        }
        &.violet {
          color: #3e84f5;
        }
        &.cyan {
          color: #09f1e9;
        }
        &.purple {
          color: #dbba53;
        }
        &.red {
          color: #fff;
        }
        &.ni {
          color: #0bb20c;
        }
        &.te {
          color: #fef5a8;
        }
        &.el {
          color: #13c4ed;
        }
        &.tw {
          color: #35808e;
        }
        &.th {
          color: #ff4949;
        }
        &.ft {
          color: bisque;
        }
        &.fit {
          color: #C5C1AA;
        }
        &.sit {
          color: #CD00CD;
        }
        &.set {
          color: #8DB6CD;
        }
        &.eit {
          color: #00FF7F;
        }
        &.nit {
          color: #FF83FA;
        }
        &.twt {
          color: #E6E6FA;
        }
        > p {
          &.active {
            line-height: 3.4rem;
            height: 3.4rem;
          }

        }
      }
      > p {
        &.green {
          color: #15d17f;
        }
        &.orange {
          color: #e95521;
        }
        &.yellow {
          color: #bdbb23;
        }
        &.blur {
          color: #2ed0ed;
        }
        &.violet {
          color: #3e84f5;
        }
        &.cyan {
          color: #09f1e9;
        }
        &.purple {
          color: #dbba53;
        }
        &.red {
          color: #fff;
        }
        &.ni {
          color: #0bb20c;
        }
        &.te {
          color: #fef5a8;
        }
        &.el {
          color: #13c4ed;
        }
        &.tw {
          color: #35808e;
        }
        &.th {
          color: #ff4949;
        }
        &.ft {
          color: bisque;
        }
        &.fit {
          color: #C5C1AA;
        }
        &.sit {
          color: #CD00CD;
        }
        &.set {
          color: #8DB6CD;
        }
        &.eit {
          color: #00FF7F;
        }
        &.nit {
          color: #FF83FA;
        }
        &.twt {
          color: #E6E6FA;
        }
      }
    }
  }

</style>
