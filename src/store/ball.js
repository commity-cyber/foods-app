import Vue from "vue"

const ball = {
    namespaced:true,
    state:{
        ballList:[{
            show:false
        },
        {
            show:false
        },
        {
            show:false
        },
        {
            show:false
        },
        {
            show:false
        },
        {
            show:false
        },],
        runList:[]
    },
    mutations:{
        show(state,el){
            for(var i=0;i<state.ballList.length;i++){
                let ball = state.ballList[i]
                if(!ball.show){
                    Vue.set(ball,'show',true)
                    Vue.set(ball,'el',el)
                    // console.log(el)
                    state.runList.push(ball)
                    //找到一个ball就停止一下
                    break;
                }
            }
        },
        remove(state){
            let ball = state.runList.shift()
            if(ball){
                Vue.set(ball,'show',false)
            }
        }
    }
}
export default ball