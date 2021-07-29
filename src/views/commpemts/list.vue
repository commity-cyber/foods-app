<template>
    <div class="list-box">
        <ul class="alllist">
            <li class="list" v-for="obj in list" :key="obj.id">
                <div class="imgbox">
                    <img :src="obj.portrait" alt="">
                </div>
                <div class="infobox">
                    <div class="basic">
                        <span class="username">{{obj.name}}</span>
                        <span class="time">{{obj.time}}</span>
                    </div>
                    <div class="timeout">
                       {{obj.duration}}分钟
                    </div>
                    <div class="notice">
                        {{obj.content}}
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props:["list"]
    }
</script>

<style scoped>
 .list-box{
     border-top: 1px  solid #e4e4e4 ;
 }
 .list-box .alllist{
     padding: 0 0.3rem;

 }
 .list-box .alllist .list{
     display: flex;
     padding: 0.3rem 0 0.2rem 0;
 }
.list-box .alllist .list .imgbox{
    width: 0.8rem;
    flex: 0 0 0.8rem;
    margin-right: 0.2rem;

}
.list-box .alllist .list .imgbox img{
    width: 100%;
    border-radius: 50%;
}
.list-box .alllist .list .infobox{
    flex: 1;
    min-width: 0;
}
.list-box .alllist .list .infobox .basic{
    color: #2f2f2f;
    font-size: 0.32rem;

}
.list-box .alllist .list .infobox .basic .time{
    color: #ccc;
    font-size:0.24rem;
    float: right;
}
.list-box .alllist .list .infobox .timeout{
    color: #666;
    font-size: 0.24rem;
    margin-top: 0.14rem;
}
.list-box .alllist .list .infobox .notice{
    line-height: 0.4rem;
    color: #2f2f2f;
    padding: 0.28rem 0 0.16rem 0;
}
</style>