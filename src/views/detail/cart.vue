<template>
<div>
    <div class="cart-content">
        <div class="cart-box" @click="isShow=!isShow">
            <div class="cart-icon " :class="{'active':total}">
               <span class="iconfont icon-gouwuchekong"></span>
               <span class="num" v-show="total">{{total}}</span>
            </div>
            <div class="cart-price" :class="{'actives':total}">
                <div class="price">￥{{totalPrice}}</div>
                <div class="deliver">另需配送费￥{{seller.fee}}</div>
            </div>
            <div class="cart-buy " :class="{'ative':totalPrice>seller.price}">
                {{buyPrice}}
            </div>
        </div>
        <div class="ball-box">
            <div v-for="(ball,index) in ballList" :key="index">
                <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
                    <div class="ball"  v-show="ball.show">
                    <div class="inner"></div>
                    </div>
                </transition>
                
            </div>
        </div>
        <transition name="fade">
             <div class="cart-list-box" v-show="isShow && total">
            <div class="tittless">
                <span @click="clearCart()">清空购物车</span>
            </div>
            <ul class="lists-box">
                <li class="lists" v-for="prod in selecList" :key="prod.id">
                    <span class="names">{{prod.name}}</span>
                    <span class="prices">￥{{prod.price}}</span>
                    <add-cart :type="prod.type" :index="prod.index"></add-cart>
                </li>
            </ul>
        </div>
        </transition>
       
    </div>
    <div class="mask" v-show="isShow && total" @click="isShow= !isShow"></div>
</div>
    
</template>

<script>
import { mapGetters ,mapState} from 'vuex'
import addCart from '../../components/star/add-cart/index'
    export default {
        data(){
            return{
                isShow:false
            }
        },
        components:{
            addCart
        },
        computed:{
            ...mapGetters('product',["totalPrice","total","selecList"]),
            ...mapState("ball",["ballList"]),
            //判断不同商品总价的是提示的文字
            //在 `` 中可以使用 ${} 直接把变量和字符串拼接起来
            buyPrice(){
                if(this.totalPrice == 0){
                    return `￥${this.seller.price}元起送`
                    
                }else if(this.totalPrice < this.seller.price){
                     
                    return `还差${this.seller.price-this.totalPrice}元起送`
                }else{
                    return '去结算'
                }
            }
        },
        props:["seller"],
        //在getStoreById中获取到商家规定的起送价格和配送费
        methods:{
            beforeEnter(el){
                // console.log(el)
                for(var i = 0;i<this.ballList.length;i++){
                    let ball = this.ballList[i]
                    if(ball.show){
                        //过去球dom元素的位置的方法
                        let pos = ball.el.getBoundingClientRect()
                        // console.log(pos.top)
                        //求球在加号到购物车之间的垂直距离
                        let y = window.innerHeight - pos.top - 23
                        console.log(y)
                        // console.log(window.innerHeight)
                        //求ball在加号按钮到购物车的水平距离
                        let x = pos.left - 30
                         console.log(x)
                        el.display = "";
                        //ball重购物车移动到加号按钮的移动过程
                        el.style.transfrom = `translate3d(0,${-y}px,0)`
                         console.log(el.style.transfrom)
                        let inner = el.getElementsByClassName('inner')[0]
                         console.log(inner)
                        //让inner又水平方向的位移
                        inner.style.transfrom = `translate3d(${x}px,0,0)`
                        console.log(inner.style.transfrom)
                    }
                }
            },
            enter(el,done){
                //重绘，重新获取el的宽度
                el.offsetWidth;
                console.log(el.offsetWidth)
                this.$nextTick(()=>{
                    //垂直移动到购物车的位置
                    el.style.transfrom =`translate3d(0,0,0)`
                    console.log(el.style.transfrom)
                    let inner = el.getElementsByClassName("inner")[0];
                     console.log(inner)
                    //水平移动到购物车的位置
                    inner.style.transform = `translate3d(0,0,0)`;
                    console.log(inner.style)
                    //执行结束进行done
                    el.addEventListener("transitionend",done);
                })
            },
            afterEnter(el){
                el.style.display="none"
                //释放小球
                this.$store.commit("ball/remove")
            },
            clearCart(){
                this.$store.commit('product/clearCart')
            }
        }
    }
</script>

<style scoped>
.cart-content{
    z-index: 100;
    position: fixed;
    left: 0;
    bottom: 0;
    height: 50px;
    width: 100%;
    background-color: #3b3b3c;
}
.cart-content .cart-box{
    display: flex;
     background-color: #3b3b3c;
}

.cart-content .cart-box .cart-icon{
    width: 50px;
    height: 50px;
    position: absolute;
    left: 10px;
    top:-10px;
    background-color: #656565;
    border-radius: 50%;
    text-align: center;
    line-height: 50px;
}
.cart-content .cart-box .cart-icon .icon-gouwuchekong{
    font-size: 28px;
    color: #c4c4c4;
   
    
}
.cart-content .cart-box .active{
    background-color: yellow;

}
.cart-content .cart-box .active .icon-gouwuchekong{
    color: #333;
}
.cart-content .cart-box .cart-icon .num{
    position: absolute;
    right: 0;
    top: 0;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    color: #fff;
    background-color: red;
    border-radius: 50%;
    transform: scale(0.5) translate(50%,-50%);
}
.cart-content .cart-box .cart-price{
    padding-left: 70px;
    flex: 1;
    color: #999;
    background-color: #3b3b3c;
}
.cart-content .cart-box .cart-price .price{
    display: none;
}

.cart-content .cart-box .cart-price .deliver{
    line-height: 50px;
    font-size: 14px;
}
.cart-content .cart-box .actives .price{
    display: block;
    font-size: 20px;
    color: #fff;
    line-height: 33px;
}
.cart-content .cart-box .actives  .deliver{
    font-size: 11px;
    line-height: 16px;
    color: #999;
}
.cart-content .cart-box  .cart-buy{
    width: 108px;
    color: #999;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    line-height: 50px;
}
.cart-content .cart-box .ative{
    background-color: yellow;
    font-size: 18px;
    color: #333;
    font-weight: normal;
}

.cart-content .ball-box .ball{
    position: fixed;
    left: 30px;
    bottom: 23px;
    
    transition: all 1s linear;
}
.cart-content .ball .inner{
    width: 16px;
    height: 16px;
    background-color: #00a0dc;
    border-radius: 50%;
     transition: all 1s linear;
}
.cart-content .cart-list-box{
    position: absolute;
    left: 0;
    bottom: 50px;
    z-index: -1;
    width: 100%;
    background-color: #fff;
    border-top: 1px solid #e4e4e4;
}
.cart-content .cart-list-box .tittless{
    height: 30px;
    line-height: 30px;
    padding: 0 10px;
    text-align: right;
    font-size: 12px;
    background: #f4f4f4;
    color: #2c3e50;
}   
.cart-content .cart-list-box .lists-box{
    padding: 0 10px;
}
.cart-content .cart-list-box .lists{
    padding: 14px 0;
    border-bottom: 1px solid #e4e4e4;
    display: flex;

}
.cart-content .cart-list-box .lists .names{
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.cart-content .cart-list-box .lists .prices{
    color: #fb4e44;
    padding: 0 25px;
}
.fade-enter{
     transform: translateY(100%);
}
.fade-enter-active{
    transition: transform ease 200ms;
}
.fade-enter-to{
     transform: translateY(0);
  }
  .mask{
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      background: rgba(7, 17, 27, 0.6);
      backdrop-filter: blur(10px);
      z-index:50;
  }
</style>