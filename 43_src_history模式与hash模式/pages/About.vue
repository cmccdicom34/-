<template>
   <h2>我是About的内容</h2>
</template>

<script>
export default {
    name:'About',
    /*  beforeDestroy() {
        console.log('About组件即将被销毁');
    }, */
   /*  mounted() {
        console.log('About组件挂载完毕了',this);
    } */
    mounted () {
       // console.log('##',this.$router);
    },

    beforeRouteEnter(to,from,next) {
        console.log('About---beforeRouteEnter',to,from);
        if(to.meta.isAuth){
        if(localStorage.getItem('school')==='atguigu'){
            next()
        }else{
            alert('学校名不对,无权限查看!')
        }
        }else{
            next()
        }
        },

    beforeRouteLeave(to,from,next) {
        console.log('About---beforeRouteLeave',to,from);
        next()
    }
}
</script>
