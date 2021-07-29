import Vue from 'vue'
import {getProdById} from '../API/index'

const product = {
    namespaced:true,
    state: {
        productlist:[]
    },
    mutations: {
        //拿到actions中传来的数据，调用方法，修改或添加state中的原始数据
        saveProductList(state,arry){
              state.productlist=[...arry]  
        },
        //修改product list中对应商品的数量
        addCart(state,{type,index}){
            //通过接口提供的信息来看这是一个二维德数组
            //分类，索引
            //接收到传来的，在produtlist里面找到符合参数的值
            let prods = state.productlist[type].content[index]
            //找下接口里面又没有count属性，有的话当我们点击加号按钮的时候，它count就加1，如果没有的情况下第一次点击加号按钮的情况下就让count=1
            
            if(prods.count){
               
                 Vue.set(prods,'count',prods.count+1)
                // console.log(prods.count)
            }else{
                Vue.set(prods,'count',1)
                
            }
            console.log(prods)
            // if(prods.count){
            //     Vue.set(prods,'count',prods.count+1)
                
            // }else{
            //     Vue.set(prods,'count',1)
            //     console.log(prods.count)
                
            // }
          
           
        },
         subCart(state,{type,index}){
             let prods = state.productlist[type].content[index];
        
             if (prods.count) {
                Vue.set(prods, 'count', prods.count - 1)
               
            }
         },
         clearCart(state){
            state.productlist.forEach(item=>{
                item.content.forEach(prod=>{
                    if(prod.count){
                        prod.count = 0
                    }
                })
            })
         }
    },
    getters:{
        //查找商品中count的加入到新的素组
        selecList(state){
            let result = []
            //第一个foreach找到goods数组
            state.productlist.forEach(obj => {
                //遍历到goods数组中添加的count属性的值
                obj.content.forEach(prod=>{
                    //存在，就把他放入新的数组里里面
                    if(prod.count){
                        result.push(prod)
                    }
                })
            });
            return result
        },
        //计算总价
        totalPrice(state,getter){
            //reduce()方法接收一个函数作为累加器，reduce为数组中的每一个元素依次执行回调函数，接收四个参数：初始值（上一次回调返回的值），当前元素，当前索引，原数组。0代表初始值
            return getter.selecList.reduce((price,prods)=>{
                //price当前购物车上的价格
                //prods.count：商品的数量
                //prods.price；选中商品的价格
                return price+prods.count*prods.price
                // console.log(price),
                // console.log(prods.count),
                // console.log(prods.price)
            },0)
        },
        
        //购物车里面计算商品数量
        total(state,getter){
            return getter.selecList.reduce((total,prods)=>{
                //total目前购物车里面的数量
                return total + prods.count
                // console.log(total)
            },0)
        }
    },
    actions: {
        //请求商品列表
        getProductList({commit},id){
            return new Promise(resolve=>{
                //调用getprodbyid
            getProdById({id}).then(res=>{
                //设置type、index两个参数，获取到接口中对应的商品类型和索引
                let lust = res.data.goods
                lust.forEach((item,type)=>{
                     item.content.forEach((prod,index)=>{
                         //获取到商品的type类型和index详细商品的索引，这样传入addcart逐渐，就可以根据类型和索引来事项添加按钮添加购物车的功能实现
                         prod.type = type;
                          prod.index = index;
                     })
                })
                // console.log("1111111111111",res);
                //将拿到的数据提交到mutation的方法里面，调用mutation里的方法
                commit('saveProductList',lust)
                resolve()
            })
            })
            
        }
    },
}
export default product