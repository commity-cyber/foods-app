<template>
    <div class="scroe-box">
        <div class="scroe-left">
            <div class="seller-fenshu">{{score}}</div>
            <div class="seller-name">商家评分</div>
        </div>
        <div class="scroe-center">
            <div class="item">
                <span>口味</span>
                <star :score="flavor"></star>
                <span>{{flavor}}</span>
            </div>
            <div class="item">
                <span>包装</span>
                <star :score="packing"></star>
                <span>{{packing}}</span>
            </div>
        </div>
        <div class="scroe-right">
            <div class="seller-fenshu">{{delivery}}</div>
            <div class="seller-name">配送评分</div>
        </div>
    </div>
</template>

<script>
import star from '../../components/star/star'

    export default {
        components:{
            star
     
               },
               props:["delivery","score","packing","flavor"]
               //通过父组件里面传入四个评分的数据
    }
</script>

<style scoped>
.scroe-box{
    display: flex;
    background-color: #fff;
    padding: 0.3rem;
}
.scroe-box .scroe-left,
.scroe-box .scroe-right{
width: 1.86rem;
flex: 0 0 1.86rem;
text-align: center;
color:#ccc;
}
.scroe-box .scroe-center{
    flex: 1;
    font-size: 0.26rem;
    color: #666;
}
.scroe-box .scroe-center .item{
    margin: 0.06rem 0 0.06rem;
}
.scroe-box .scroe-left .seller-fenshu{
    font-size: 0.54rem;
    height: 0.6rem;
    line-height: 0.6rem;
    font-weight: 600;
    color: #ffb000;
}
.scroe-box .scroe-right{
    border-left: 1px solid #ccc;
}
.scroe-box .scroe-right .seller-fenshu{
     font-size: 0.54rem;
    height: 0.6rem;
    line-height: 0.6rem;
    font-weight: 600;
    color: #999;
}
</style>