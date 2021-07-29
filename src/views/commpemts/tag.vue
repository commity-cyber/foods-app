<template>
    <div class="tag-box">
        <span class="tag-tittle " :class="{'active':currType==obj.id}" v-for="obj in tag" :key="obj.id" @click="changeTag(obj.id)">{{obj.name}} ({{obj.count}})</span>
        
    </div>
</template>

<script>
    export default {
        props:["tag","currType"],
        // 接收currtype查看当前我的type是否和该条数据的id是否一致，一致就处于激活的状态
        methods:{
            changeTag(id){
                this.$emit('change',id)
            }
        }
    }
</script>

<style scoped>
.tag-box{
    padding: 0.3rem 0.28rem 0.1rem;

}
.tag-box .tag-tittle{
    padding: 0 0.24rem;
    display: inline-block;
    height: 0.52rem;
    line-height: 0.52rem;
    text-align: center;
    font-size: 0.26rem;
    color: #666;
    margin:0 0.2rem 0.2rem 0;
    border: 1px solid #ccc;
    border-radius: 20px;
}
.tag-box .active{
    border: 1px solid #ffb000;
    background-color: #fffbf1;
    color:#ffb000 ;

}
</style>