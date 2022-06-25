export default [
  {
    path: '/',
    name: 'home',
    meta:{
      name:'首页'
    },
    component: () => import('@/views/education/home/index'),
  }

]
