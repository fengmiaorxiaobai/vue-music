<template>
  <div ref="wrapper" class="wrapper">
      <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props:{
      probeTy:{
          type:Number,
          default:1
      },
      click:{
          type:Boolean,
          default:true
      },
      data:{// 列表数据
          type:Array,
          default:null
      }
  },

  watch:{
      data(){ // 列表监听数据的变化
        setTimeout(()=>{
            this.refresh()
        },20)
      }
  },
  methods:{
      _initScroll(){
          if(!this.$refs.wrapper){
              return
          }
          this.scroll = new BScroll(this.$refs.wrapper,{
              probeTy:this.probeTy,
              click:this.click
          })
      },
      enable(){
          this.scroll && this.scroll.enable()
      },
      disable(){
          this.scroll && this.scroll.disable()
      },
      refresh(){
          this.scroll && this.scroll.refresh()
      }
  },
  mounted(){
    setTimeout(()=>{
        this._initScroll()
    },20)
  }
}
</script>
<style lang="stylus" scoped>
.wrapper{}
</style>