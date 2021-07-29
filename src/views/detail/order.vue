<template>
  <div>
    <div class="order-box">
      <div class="menu-box" ref="menuBox">
        <ul >
          <li class="menu-list" v-for="(item,index) in productlist"
            :key="index" :class="{'active':currentIdenx == index}" @click="changeMenu(index)">{{item.name}}</li>
          
        </ul>
      </div>
      <div class="prod-box" ref="prodBox">
        <ul>
          <!-- 第一层循环德是商品的分类 -->
          <li class="cates-list" v-for="(item,typeindex) in productlist" :key="typeindex">
            <div class="cates-tittle">{{item.name}}</div>
            <ul>
              <!-- 第二层循环的是商品的列表 -->
              <li class="prods-list" v-for="(prod,index1) in item.content" :key="prod.id">
                 <div class="prods-img-box">
                    <img :src="prod.img" alt="">
                 </div>
                 <div class="prods-info">
                   <div class="name">{{prod.name}}</div>
                   <div class="sale">
                     <span class="num">月销{{prod.num}}</span>
                     <span>赞{{prod.up}}</span>
                   </div>
                   <div class="price">
                     ￥{{prod.price}}
                   </div>
                 </div>
                 <div class="add-cart-content">
                   <!-- :type传送的是分类的参数 ：index传送的参数是我哪个具体上商品的索引 -->
                   <add-cart :type="typeindex" :index="index1"></add-cart>
                 </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
//请求数据重vuex中
import {mapState} from 'vuex'
//使用scroll组件进行滚动和定位
 import BScroll from "better-scroll";
 //引入添加商品数量的组件
 import addCart from '../../components/star/add-cart/index'
// import{getProdById} from '../../API/index'
export default {
data(){
    return{
       currentIdenx:0 ,
       menuList:[],
       menuScroll:null,
       prodScroll:null,
       posY:[],
       scrollY:0
        

        

    }
},
components:{
      addCart
},
computed:{
  ...mapState("product",['productlist'])
},
created(){
  this.$store.dispatch("product/getProductList",this.$route.query.id).then(()=>{
    //初始化bscroll
    this.$nextTick(()=>{
      this.initScroll()
    })
  })
},
methods:{
  test(){
console.log(3);
  },
  changeMenu(index){
    console.log(9);
    let prodlist = this.$refs.prodBox.getElementsByClassName('cates-list')
     let el = prodlist[index]
     this.prodScroll.scrollToElement(el,300)
    this.currentIdenx = index
  },
  initScroll(){
    //初始化滚动
    this.menuScroll = new BScroll(".menu-box",{
      bounce:false,
      click:false
    })
    this.prodScroll = new BScroll(".prod-box",{
      bounce:false,
      click:false,
      probeType:3
    })
    //初始化getposy函数，获取高度
    this.getPosy()
    //获取到左侧的滚动
    this.menuList = this.$refs.menuBox.getElementsByClassName('menu-list')
    //使用后scroll中的on方法，获取到垂直的距离
    this.prodScroll.on('scroll',e=>{
      this.scrollY = Math.abs(Math.round(e.y))//prod商品页面的滚动时的坐标
      
    })
    
  },
  //获取到所有的商品的自身高度加上商品之间的高度
   getPosy(){
      let prodlist = this.$refs.prodBox.getElementsByClassName('cates-list')
      let y= 0
      for(var i = 0;i<prodlist.length;i++){
        if(i==0){
          this.posY.push(y)
        }else{
          let prevl = prodlist[i-1]
          y +=prevl.offsetHeight
          this.posY.push(y)
        }
        
      } 
   }
},
watch:{
  scrollY(val){
    for(var i = 0;i<this.posY.length;i++){
      let pos1=this.posY[i]
      let pos2 = this.posY[i+1]
      if(pos1<=val && pos2>val){
        //既是当前这个i就是我们需要的i的值，我们需要定位过去的位置
          let el =this.menuList[i]
          this.menuScroll.scrollToElement(el,300,0,-100)
          this.currentIdenx =i
          break
      }
    }
  }
}


}
</script>

<style>
.order-box{
  display: flex;
  height: calc(100vh - 44px);
  overflow: hidden;
}
/* 左侧列表的样式 */
.order-box .menu-box{
  width: 1.6rem;
  flex: 0 0 1.6rem;
  background-color: #f5f5f5;
  height: calc(100vh - 94px);
  overflow: hidden;

}
.order-box .menu-box .menu-list{
  color: #2c3e50;
  font-size: 0.26rem;
  padding: 0.18rem 0.24rem 0.44rem;
  line-height: 0.36rem;
}
.order-box .menu-box .active{
  color: red;
}
/* 右侧列表的样式 */
.order-box .prod-box{
  flex: 1;
  min-width: 0;
  background-color: #fff;
  height: calc(100vh - 94px);
  overflow: hidden;
}
.order-box .prod-box .cates-list{
  padding: 0 0.2rem;
  overflow: hidden;
}
.order-box .prod-box .cates-list .cates-tittle{
  height: 0.72rem;
  line-height: 0.72rem;
}
.order-box .prod-box .cates-list .prods-list{
  display: flex;
  margin-bottom: 0.4rem;
  position: relative;
}
.order-box .prod-box .cates-list .prods-list .prods-img-box{
  width: 1.5rem;
  flex: 0 0 1.5rem;
  margin-right: 0.15rem;
}
.order-box .prod-box .cates-list .prods-list .prods-img-box img{
  width: 100%;
}
.order-box .prod-box .cates-list .prods-info{
  flex: 1;
  min-width: 0;

}
.order-box .prod-box .cates-list .prods-info .name {
  font-size: 0.32rem;
  font-weight: bold;
  line-height: 0.45rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 0.04rem;
}
.order-box .prod-box .cates-list .prods-info .sale{
 color: #666;
 font-size: 11px;
 margin-bottom: 0.06rem;
}
.order-box .prod-box .cates-list .prods-info .sale .num{
  margin-right: 0.2rem;
}
.order-box .prod-box .cates-list .prods-info .price{
  color: #fb4e44;
  font-size: 0.36rem;
}
.add-cart-content{
  position: absolute;
  right: 0;
  bottom: 0;
}
</style>