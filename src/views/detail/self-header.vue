<template>
 <div class="toubu">
     <div class="header-one" @click="$router.push('/')">
         <span class="iconfont icon-fanhui"></span>
     </div>
     <div class="seller-box">
         <div class="seller-img">
             <img :src="seller.img" alt="">
         </div>
         <div class="seller-info">
             <div class="seller-time">{{seller.minute}}分钟  {{seller.distance}}m</div>
             <div class="seller-notice">{{seller.notice}}</div>
             <div class="seller-sale">{{seller.full}}</div>
         </div>
     </div>
 </div>
</template>

<script>
export default {
    props:["seller"]
}
</script>

<style scpoed>
/* 头部中返回按钮的样式 */
.toubu{
    background-color: #2e2f3b;
}
.toubu .header-one{
   height: 1rem;
    color: #fff;
    line-height: 1rem;
    padding-left: 0.2rem;
   
}
/* 头部中左侧图片和右侧文字说明的样式 */
.toubu .seller-box{
display: flex;
padding: 0.1rem 0.2rem 0.2rem;
}
/* 头部左侧图片的样式书写 */
.toubu .seller-box .seller-img{
    width: 1.7rem;
    flex: 0 0 1.7rem;
    margin-right: 0.2rem;
}
.toubu .seller-box .seller-img img{
    width: 100%;
}
/* 头部右侧的商家配送信息的样式 */
.toubu .seller-box .seller-info{
    flex: 1;
    color: #fff;
    font-size: 12px;
    width: 0;
}
.toubu .seller-box .seller-info .seller-time{
    height: 0.32rem;
    line-height: 0.32rem;
    margin-bottom: 0.1rem;
}
.toubu .seller-box .seller-info .seller-notice{
    height: 0.32rem;
    line-height: 0.32rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 0.2rem;
}

</style>