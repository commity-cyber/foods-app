<template>
  <div>
      <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="getData"
>
      <ul class="all-box">
          <li class="shop-box" v-for="item in list" :key="item.id" @click="getdetail(item.id)">
              <div class="img-box">
                  <img :src="item.img" alt="">
              </div>
              <div class="infi-box">
                  <div class="tittle">{{item.name}}</div>
                  <div class="rate-box">
                      <div>
                          <star :score="item.score"></star>
                          <span class="rate">{{item.flavor_score}}分</span>
                          <span>月销{{item.num}}</span>
                      </div>
                      <div>
                          <span>{{item.minute}}分钟</span>
                          <span class="send">{{item.distance}}</span>
                      </div>
                  </div>
                  <div class="distrbution-box">
                      <span>起送￥{{item.price}}</span>
                      <span class="send">配送￥{{item.fee}}</span>
                      <span class="send">人均￥{{item.per_capita}}</span>
                  </div>
              </div>
          </li>
      </ul>
      </van-list>
  </div>
</template>

<script>
import {getStore} from '../../API'

import star from '../../components/star/star.vue'
export default {
    data(){
        return{
            current:0,
            size:10,
            list:[],
            loading: false,
             finished: false,
             total:0
        }
    },
    components:{
       
        star
    },
    methods:{
        //获取商品列表的数据
        getData(){
            getStore({
                current:this.current,
                size:this.size,
                
            }).then(res=>{
                this.list= this.list.concat(res.data.list)//拼接数据
                this.loading = false,// 加载状态结束
                this.current++,//页面+1
                this.total = res.data.total//后台告诉我们总的页数
                if(this.list.length >=this.total){//判断数据是否全部加载完后，把finished改为true，加载完成后不再触发load事件
                    this.finished = true
                }
                
            })
        },
        getdetail(id){
            this.$router.push({path:'/detail',query:{id}})
        }
    //      onLoad() {
    //   // 异步更新数据
    //   // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   setTimeout(() => {
    //     for (let i = 0; i < 10; i++) {
    //       this.list.push(this.list.length + 1);
    //     }

    //     // 加载状态结束
    //     this.loading = false;

    //     // 数据全部加载完成
    //     if (this.list.length >= 40) {
    //       this.finished = true;
    //     }
    //   }, 1000);
    // },
  
    },
    //created生命周期调用getdata方法，获取到商品列表的数据
    // created(){
    //     this.getData()
    // }
}
</script>

<style>
.all-box{
    padding: 0 0.2rem;

}
.all-box .shop-box{
    margin: 0.2rem 0 0.5rem 0;
    display: flex;
}
.all-box .shop-box .img-box{
    width: 1.52rem;
    height: 1.14rem;
}
.all-box .shop-box .img-box img{
    width: 100%;
    height: 100%;
}
.all-box .shop-box .infi-box{
    flex: 1;
     margin-left: 2px; 
}
.all-box .shop-box .infi-box .tittle{
    font-size: 8px;
    color: #333;
    line-height: 1.4;
      font-weight: 600;
}
.rate-box{
    display:flex;
    justify-content: space-between;
     color: #333;
      font-size: 11px;
      margin: 3px 0;
      
}
.rate-box .rate{
    margin-right: 5px;
}
.distrbution-box{
    color: #333;
      font-size: 11px;
}
 .send::before{
    content: "";
    width: 1px;
    height: 6px;
    background-color: #ccc;
    display: inline-block;
    margin: 0 3px;
}
</style>