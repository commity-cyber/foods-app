<template>
  <div class="star-box">
      <i v-for="i  in  5"  :key="i" :class="getclass(i)"></i>
  </div>
</template>

<script>
export default {
props:{
    score:{
        default:5
    }
},
methods:{
    getclass(i){
       if(this.score%1==0){
           return i<=this.score?"star-acive":"star"  //当分数是整数的时候i小于分数的情况下都是亮的心心，超过分数的心心则是不亮的
       }else{
           if(i<this.score){
               return "star-acive"//i是重1遍历到5 的，在i小于score的时候它的心心是亮的
           }else if(Math.ceil(this.score) == i){
               return "star-half"//如果score的分数向上取整后它的值等于i的值，则是这颗星星是一半的亮的状态
           }else if(i>this.score){
               return"star" //i的值大于sore的值，则这颗星星是暗的状态
           }
       }
    }
}
}
</script>

<style>
.star-box{
    display: inline-block;

}
.star-box i{
    width: 12px;
    height: 12px;
    display: inline-block;
    margin-right: 2px;
    background-size: 100%;
}
.star-acive{
    background-image: url(images/star-active.png);
}
.star-half{
    background-image: url(images/star-half.png);
}
.star{
    background-image: url(images/star.png);
}
</style>