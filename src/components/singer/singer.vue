<template>
  <div class="singer">
    <listView :data="singers"></listView>
  </div>
</template>

<script type="text/ecmascript-6">
import {getSingerList} from "../../api/singer.js"
import { ERR_OK } from "../../api/config.js";
import Singer from "common/js/singer";
import listView from "../../base/listview/listview"
  const HOT_NAME = '热门'
  const HOT_SINGER_LEN= 10
  export default {
    data(){
      return{
        singers:[]
      }  
    },
    created(){
      this._getsingerList();
    },
    methods: {
      _getsingerList() {
        getSingerList().then(res => {
          if (res.code === ERR_OK) {
            this.singers = this._nomalizeSinger(res.data.list);
          }
        });
      },
      _nomalizeSinger(list) {
        let map ={
          hot: {
            title:HOT_NAME,
            items:[]
          }
        }
        list.forEach((item,index) => {
          if(index<HOT_SINGER_LEN){
            map.hot.items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name, 
            }))
          }
          const key = item.Findex
          if(!map[key]){
            map[key] ={
              title:key,
              items:[]
            }
          }
          map[key].items.push(new Singer({
              id: item.Fsinger_mid,
              name: item.Fsinger_name, 
            }))
        
        });
        //为了得到有序列表，处理map
        let hot=[]
        let ret=[]
        for(let key in map){
          let val = map[key]
          if(val.title.match(/[a-zA-Z]/)){
            ret.push(val)
          }else if(val.title==='HOT_NAME'){
            hot.push(val)
          }
        }
        ret.sort((a,b)=>{
          return a.title.charCodeAt(0)-b.title.charCodeAt(0)
        })
        return hot.concat(ret)
      }
    },
    components:{
      listView
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .singer
    position:fixed
    top:88px
    bottom:0
    width:100%
</style>