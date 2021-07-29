<template>
    <div class="commentsbox" ref="commentsbox">
        <div>
        <!-- 四个值接收请求到数据里面的四个评分值，在传入评分子组件中 -->
        <scroe :delivery="comment.delivery" :score="comment.score" :packing="comment.packing" :flavor="comment.flavor"></scroe>
        <div class="tag_container">
            <tag :tag="comment.label" :currType="type" @change="change"></tag>
        </div>
        
        <list :list="comment.rate"></list>
        </div>
        
    </div>
</template>

<script>
import scroe from './score'
import tag from './tag'
import list from './list'

//引入接口
import {getComment} from '../../API/index'
//滚动组件的引入
import BScroll from 'better-scroll'
    export default {
        data(){
            return{
                type:1,//代表的是全部评论，和后台约定好的
                comment:{},
                commentScroll:null,
                changevalue:null
              
            }
        },
        components:{
            scroe,
            tag,
            list
        },
        methods:{
            getDate(){
              return  new Promise(resove=>{
                getComment({
                    id:this.$route.query.id,
                    type:this.type//类别，好批，差评等不同评论的类型，
                //根据id获取到该商家的所有评论，在根据当前type的类型，激活状态，显示正确类型的评论内容
                }).then(res=>{
                    console.log(res)
                    this.comment =res.data
                    resove()
                })
                })
               
            },
            change(id){
                //获取到正确的type值
                console.log(id)
                this.type = id
                this.getDate()
            }
        },
        created(){
          
                  this.getDate().then(()=>{
                this.$nextTick(()=>{
                     this.commentScroll = new BScroll(this.$refs.commentsbox,{
                         bounce:false
                    })
                 })
             })
        },
        // mounted(){
        //     this.commentScroll = new BScroll('this.$refs.commentsbox',{
        //                  bounce:false
        //            })
        //     // setTimeout(()=>{
        //     //     this.changevalue = 1
        //     //     this.getDate().then(()=>{
        //     //     this.$nextTick(()=>{
        //     //         this.commentScroll = new BScroll('this.$refs.commentsbox',{
        //     //             bounce:false
        //     //         })
        //     //     })
        //     // })
        //     // },0)
        // }
    }
</script>

<style scoped>
.tag_container{
    border-top: 0.2rem solid #ccc;
}
.commentsbox{
    height: calc(100vh - 44px);
}
</style>