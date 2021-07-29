<template>
<div class="scrollBox">
    <div>
       <self-header :seller="seller"></self-header>
       <van-tabs v-model="active" animated sticky>
            <van-tab title="商品">
                <order></order>
            </van-tab>
            <van-tab title="评价">
                <commpemts></commpemts>
            </van-tab>
            <van-tab title="商家">
                <selleer :seller="seller"></selleer>
            </van-tab>
        </van-tabs>
    </div>
    <cart v-if="active == 0" :seller="seller"></cart>
</div>
    
    
</template>

<script>
//头部组件
import selfHeader from './self-header'
import order from './order'
import  cart from  './cart'
import commpemts from '../commpemts/index'
import selleer from '../seller/index'
//接口数据获取
import {getStoreById} from '../../API/index'
//滚动组件引入
import BScroll from "better-scroll";


export default {
    data(){
        return {
          seller:[],
          active:0,
          scrollBox:null
        }
    },
    components:{
      
       selfHeader,
       order,
       cart,
       commpemts ,
       selleer    
    },
methods:{
    //获取商家商品详情页的数据方法
    getMsg(){
        getStoreById({id:this.$route.query.id}).then(res=>{
            this.seller = res.data
        })
    },
    
    
   
},
created(){
    this.getMsg()
},
//页面渲染完成后才能使用，因此须在mounted里面进行滚动的操作
mounted(){
    this.$nextTick(()=>{
    ////., drW$$$$$$    //滑动效果的实现
    this.scrollBox = new BScroll(".scrollBox",{
        bounce:false,
        click:true
    })

    console.log("11111111111111",this.scrollBox);
    })
}

}
</script>

<style>
.scrollBox{
    height: 100vh;
    overflow: hidden;
}
</style>