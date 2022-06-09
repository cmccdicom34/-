import VueRouter from 'vue-router'

import About from '../pages/About.vue'
import Home from '../pages/Home.vue'
import News from '../pages/News.vue'
import Message from '../pages/Message.vue'
import Detail from '../pages/Detail.vue'


const router =  new VueRouter({
    mode:'history',
    routes:[
        {
            name:'guanyu',
            path:'/about',
            component:About,
            meta:{isAuth:true,title:'关于'},
        },
        {
            name:'zhuye',
            path:'/home',
            component:Home,
            meta:{title:'主页'},
            children:[
                {
                    name:'xinwen',
                    path:'news',
                    component:News,
                    meta:{isAuth:true,title:'新闻'},
                   /*  beforeEnter:(to,from,next) => {
                        console.log('独享路由守卫',to,from);
                        if(to.meta.isAuth){
                            if(localStorage.getItem('school')==='atguigu'){
                                next()
                            }else{
                                alert('学校名不对,无权限查看!')
                            }
                           }else{
                               next()
                           }
                    } */
                },
                {
                    name:'xiaoxi',
                    path:'message',
                    component:Message,
                    meta:{isAuth:true,title:'消息'},
                    children:[
                        {
                            name:'xiangqing',
                            path:'detail',
                            component:Detail, 
                            meta:{isAuth:true,title:'详情'},
                            // props:{a:1,b:'hello'},
                            //props:true
                            /* props({query:{id,title}}){
                                return {id,title}
                            } */
                            props($route){
                                return {id:$route.query.id,
                                    title:$route.query.title,
                                }
                            }
                        }
                    ]
                },
            ]
        }
    ]
})

/* router.beforeEach((to,from,next)=>{
    console.log('前置路由守卫',to,from);
   
   if(to.meta.isAuth){
    if(localStorage.getItem('school')==='atguigu'){
        next()
    }else{
        alert('学校名不对,无权限查看!')
    }
   }else{
       next()
   }
}) */

router.afterEach((to,from)=>{
    console.log('后置路由守卫',to,from);
    document.title = to.meta.title || '硅谷系统'
}) 

export default router