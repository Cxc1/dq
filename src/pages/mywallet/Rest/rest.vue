<template>
  <div class="rest">
    <myHeader title="持币生息">
      <router-link tag="span" to="/recordOfLife" class="right_icon">记录</router-link>
    </myHeader>
    <div class="main">
      <div class="rest_top_banner">
        <div class="rest_top_banner_small">
          <div class="rest_top_banner_small_left">
            <p>+12.00<span>%</span></p>
            <p>预期年增长率 <span></span></p>
          </div>
          <div class="rest_top_banner_small_right">
            <p>管理期限<span>14</span><span>天</span></p>
            <p>较低风险</p>
          </div>
        </div>
      </div>
      <div class="add_time">加入时间 <span>{{dateTime}}</span></div>
      <div class="end_time">到账时间 <span @click="endOpenPicker">{{endDateTime}}</span></div>
      <div class="management">
        <p>
          <span>加入时间</span>
          <span>管理期</span>
          <span>到账时间</span>
        </p>
        <p>
          <span>07/06</span>
          <span>07/06-07/20</span>
          <span>07/20 23:59前</span>
        </p>
      </div>

      <div class="features">产品特点 <span>量化自動交易、風險低</span></div>
      <div class="details">产品详情 <span></span></div>

      <router-link tag="div" to="/depositAccount" class="shiftTo">转入定存账户</router-link>

      <mt-datetime-picker
        ref="picker"
        type="date"
        year-format="{value}年"
        month-format="{value}月"
        date-format="{value}日"
        :startDate="startDate"
        @confirm="handleConfirm"

      >
      </mt-datetime-picker>
    </div>

  </div>
</template>

<script>
  import myHeader from '@/common/myHeader.vue'
  import {DatetimePicker} from 'mint-ui';
  import moment from 'moment'

  export default {
    name: "rest",
    data() {
      return {
        dateTime: moment(new Date()).format('YYYY/MM/DD'),
        // endDateTime: moment(new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 14)).format('YYYY/MM/DD'),
        endDateTime: '  年/  月/  日',
        startDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000 * 14),
      }
    },
    components: {
      myHeader,
    },
    methods: {
      endOpenPicker() {
        this.$refs.picker.open();
      },
      handleConfirm(data) {
        let date = moment(data).format('YYYY/MM/DD');
        this.endDateTime = date
      },
    }
  }
</script>

<style lang="less" scoped>
  .rest {
    > .main {
      background-color: #161c29;
      overflow-x: hidden;
      /*头部背景部分*/
      > .rest_top_banner {
        height: 12rem;
        padding: 1rem 2rem 2rem;
        background: url("imgs/rest_top_banner.png");
        box-sizing: border-box;
        > .rest_top_banner_small {
          height: 100%;
          text-align: center;
          > div {
            width: calc(~'50% - 2px');
            float: left;
            height: 100%;
            background: url("imgs/banner_small.png") no-repeat center;
            background-size: 100%;
            padding: 2rem 0 1rem;
            box-sizing: border-box;
            > p {
              &:nth-child(1) {
                line-height: 3.5rem;
              }
              &:nth-child(2) {
                color: #828d9e;
              }
            }
            &.rest_top_banner_small_left {
              margin-right: 2px;
              > p {
                &:nth-child(1) {
                  font-size: 2.1rem;
                  color: #db1414;
                  span {
                    font-size: 1rem;
                  }
                }
                &:nth-child(2) {
                  span {
                    background: url("imgs/chibi_img_wenh.png");
                  }
                }
              }
            }
            &.rest_top_banner_small_right {
              > p {
                &:nth-child(1) {
                  font-size: 1.1rem;
                  color: #2676a2;
                  > span {
                    color: #db1414;
                    &:nth-child(1) {
                      font-size: 2.1rem;
                      background-color: #dcdcdf;
                      margin: 0 .1rem;
                      padding: .3rem;
                      box-sizing: border-box;
                    }
                  }
                }
              }
            }
          }
        }
      }
      /*加入和结束时间*/
      > .add_time, .end_time, .features, .details {
        background-color: #1f2733;
        height: 4rem;
        color: #bcc6d5;
        font-size: 1.2rem;
        line-height: 2rem;
        padding: 1rem;
        box-sizing: border-box;
        margin-bottom: 1px;
        > span {
          display: inline-block;
          float: right;
        }
      }

      /*管理时间*/
      .management {
        height: 4.2rem;
        padding: 1rem;
        > p {
          height: 2rem;
          line-height: 2rem;
          width: 100%;
          display: flex;
          color: #e0e1e2;
          text-align: center;
          position: relative;
          > span {
            display: inline-block;
            flex: 1;

          }
          &:nth-child(1) {
            height: 2.2rem;
            &:after {
              content: '';
              display: block;
              background: linear-gradient(to right, #1b314d, #35808e, #1b314d);
              height: .2rem;
              width: 100%;
              position: absolute;
              bottom: 0;
              left: 0;
            }
            > span {
              position: relative;
              &:nth-child(1):before, &:nth-child(2):before {
                content: '';
                display: block;
                position: absolute;
                width: .6rem;
                height: .6rem;
                background-color: #2e6c7d;
                bottom: -.2rem;
                right: 0;
                z-index: 99;
                border-radius: 50%;
              }
            }
          }
          &:nth-child(2) {
            color: #88909f
          }
        }
      }

      .features, .details {
        font-weight: bolder;
        > span {
          font-weight: 500;
        }
      }

      .details {
        > span {
          width: 2rem;
          height: 2rem;
          background: url("imgs/user_icon_getin.png") no-repeat right;
          background-size: 40%;
        }
      }
      .shiftTo {
        position: absolute;
        bottom: 0;
        height: 4rem;
        width: 100%;
        background: linear-gradient(to right, #11c6ed, #4e73fb);
        font-size: 1.4rem;
        color: #fff;
        text-align: center;
        line-height: 4rem;
        &:active {
          opacity: .8;
        }
      }

      .mint-popup-bottom {
        padding-bottom: 50px;
      }

    }
  }

</style>
