<template>
 <transition enter-active-class="slideInRight">
    <div>
        <header class="header">
            <router-link to="/ifd" slot="right">
                 <span class="back"></span>
             </router-link>
            <h2>邀请卡</h2>
        </header>
       <ifn-contest></ifn-contest>
   </div>
 </transition>
</template>
<script>
import Ifn_contest from '@/components/mining/ifn_contest';
export default {
    name:'ifn_num',
    components:{
      [Ifn_contest.name]:Ifn_contest,
    },
    data(){
        return{
            headerData: {
				isShow: true,
				title: '邀请码'
			}
        }
    }
}
</script>

<style lang='less'  scoped>
     @import url("../../styles/record.less");

</style>
