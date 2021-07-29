<template>
  <div>
      <van-sticky :offset-top="0">
      <div class="header">
         <input type="text" name="" id="search" placeholder="请输入查询的店家或商品">
      </div>
      </van-sticky>
        <catergroy></catergroy>
        <div class="fujinsanjia">附近的商家</div>
        <shoplist></shoplist>
  </div>
</template>

<script>

import catergroy from './catergroy.vue'
import shoplist from './list.vue'
export default {
  components: {
     catergroy,
     shoplist
   },
   
}
</script>

<style>
.header{
    background-color: black;
    padding: 0.2rem;
}
.header #search{
    width: 100%;
    border: 0;
    border-radius: 10px;
    height: 0.6rem;
    line-height: 0.6rem;
    font-size: 12px;
    padding: 3px 5px;
    box-sizing: border-box;
}
.fujinsanjia::before{
  content: "";
  height: 1px;
  transform: scaleY(0.5);
  width: 30px;
  vertical-align: middle;
  margin-right: 2px;
  background-color: black;
  display: inline-block;
  
}
.fujinsanjia{
  text-align: center;
  margin: 0.3rem 0 0.1rem 0;
  font-size: 14px;
  font-weight: 700;
  height: 0.46rem;
  line-height: 0.46rem;
}
.fujinsanjia::after{
   content: "";
  height: 1px;
  transform: scaleY(0.5);
  width: 30px;
   vertical-align: middle;
  
  background-color: black;
  display: inline-block;
}
</style>