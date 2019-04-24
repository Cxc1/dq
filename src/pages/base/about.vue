<template>
    <div class="nwwest-roll" id="nwwest-roll">
                <ul id="roll-ul">
                    <li v-for="item in list" ref="rollul" :class="{anim:animate==true}" :key="item.id">
                        <span class="name">{{item.name}}</span>
                        <span class="site">{{item.site}}</span>
                        <span class="gsmc">{{item.gsmc}}</span>

                      </li>
                </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
        animate:true,
        list:[
            {"name":"于先生1","site":"北京门头沟区1","gsmc":"柠檬树装饰1"},
            {"name":"于先生2","site":"北京门头沟区2","gsmc":"柠檬树装饰2"},
            {"name":"于先生3","site":"北京门头沟区3","gsmc":"柠檬树装饰3"},
            {"name":"于先生4","site":"北京门头沟区4","gsmc":"柠檬树装饰4"},
            {"name":"于先生5","site":"北京门头沟区5","gsmc":"柠檬树装饰5"},
            {"name":"于先生6","site":"北京门头沟区6","gsmc":"柠檬树装饰6"},
            {"name":"于先生7","site":"北京门头沟区7","gsmc":"柠檬树装饰7"},
            {"name":"于先生8","site":"北京门头沟区8","gsmc":"柠檬树装饰8"},
            {"name":"于先生9","site":"北京门头沟区9","gsmc":"柠檬树装饰9"},
            {"name":"于先生10","site":"北京门头沟区10","gsmc":"柠檬树装饰10"},
            {"name":"于先生11","site":"北京门头沟区11","gsmc":"柠檬树装饰11"}
        ]
    };

  },
  created(){
       setInterval(this.scroll,2000) 
},
  methods: {
       scroll(){
        let con1 = this.$refs.rollul;
        con1[0].style.marginTop='30px';
        this.animate=!this.animate;
        var that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
        setTimeout(function(){
            that.list.push(that.list[0]);
            that.list.shift();
            con1[0].style.marginTop='0px';
            that.animate=!that.animate;  // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
        },0)
  }
}
}
</script>

<style>
  .newest-bill .nwwest-roll {
    padding-left: 15px;
    height: 210px;
    margin: 10px auto;
    overflow: hidden;
     transition: all 0.5s;
}
.newest-bill>.nwwest-roll>li{
  height: 35px;
  line-height: 35px;

}

.anim{
  transition: all 0.5s;

}
#roll-ul{
  height: 3rem;
  overflow: hidden;
}

</style>



