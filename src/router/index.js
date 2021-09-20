import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/Home';
import CheckMore from '@/components/CheckMore';
import PayOrder from '@/components/PayOrder';
import CheckOut from '@/components/CheckOut';
Vue.use(Router);

export default new Router({
    routes:[
        { //避免用戶進到不存在的頁面
            path:'*',
            redirect:'/home',
        },
        { 
           path:'/home',
           name:'homepage',
           component:Home,
        },
        {
            path:'/checkmore/:productId',
            name:'CheckMore',
            component:CheckMore,   
        },
        {
            path:'/payorder',
            name:'PayOrder',
            component:PayOrder,
        },
        {
            path:'/customercheckout/:orderId',
            name:'checkout',
            component:CheckOut,
        }
    ]
})