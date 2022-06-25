export default [
  {
    path: '/releaseLive',
    name: 'releaseLive',
    meta:{
      name:'发布直播信息'
    },
    component: () => import('@/views/education/releaseLive/ReleaseLiveBroadcast'),
  }
]
