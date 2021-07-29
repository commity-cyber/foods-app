<template>
    <div class="add-cart">
        <span class="iconfont icon-jianhao" v-if="product.count" @click="subaddCart()"></span>
        <span class="num" v-if="product.count">{{product.count}}</span>
        <span class="iconfont icon-jiahao" @click="addCart($event)"></span>
    </div>
</template>

<script>
    export default {
        //接收order父组件传来的type，index两个参数
        props:['type','index'],
        computed:{
            product(){
                return this.$store.state.product.productlist[this.type].content[this.index]
            }
        },
        methods:{
            addCart(e){
               
                //点击加号按钮触发事件修改商品数量，到vuex中的mutation里面修改
                //触发vuex里面的mutation中的addCart方法，并且同时将参数type，index传给addCart
                this.$store.commit('product/addCart',{type:this.type,index:this.index});
                this.$store.commit('ball/show',e.target)
                // console.log(e)
                
            },
            subaddCart(){
                this.$store.commit('product/subCart',{type:this.type,index:this.index})
            }
        }
    }
</script>

<style scoped>
.add-cart .iconfont{
    font-size: 0.48rem;
    padding: 0.18rem;
    vertical-align: middle;
}
.add-cart  .icon-jianhao{
    color: #ccc;

}
.iconfont .num{
    vertical-align: middle;
}
.add-cart  .icon-jiahao{
    color: #ffc134;
    margin-right: -0.18rem;
}
</style>