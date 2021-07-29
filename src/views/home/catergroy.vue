<template>
   <div >
          <ul class="cate-box">
              <li class="cate-list" v-for="obj in catlist" :key="obj.id">
                  <img class="cate-img" :src="obj.img" alt="">
                  <p class="cate-tittle">{{obj.name}}</p>
              </li>
          </ul>
      </div>
</template>

<script>

import {getCatergroy} from '../../API/index'
export default {
    data(){
        return{
            catlist:[]
        }
    },
   created(){
       getCatergroy().then((res)=>{
           this.catlist =res.data
       })
   }
}
</script>

<style>
.cate-box{
    display: flex;
    flex-wrap: wrap;
   
}
.cate-list{
    width: 20%;
    text-align: center;
    margin-bottom: 0.06rem;
     margin-top: 5px;
}
.cate-img{
    width: 0.88rem;
    height: 0.88rem;
}
.cate-tittle{
    padding-top: 0.06rem ;
    font-size: 11px;
}
</style>