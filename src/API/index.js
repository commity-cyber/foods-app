import request from '@/until/index'

export  function getCatergroy(data){
    return request({
        url:'/get_type',
        data
    })
}
export  function getStore(data){
    return request({
        url:'/get_store',
        data
    })
}

//详情页的数据获取
export  function getStoreById(data){
    return request({
        url:'/get_store_id',
        data
    })
}

//点餐页面的接口
export  function getProdById(data){
    return request({
        url:'/get_nav',
        data
        
    })
}

//评论页面数据的接口
export  function getComment(data){
    return request({
        url:'/get_info',
        data
        
    })
}