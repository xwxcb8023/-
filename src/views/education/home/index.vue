<template>
   <div>
      <Top/>
      <Banner/>
      <Title/>
      <TablePage/>
   </div>
</template>
<script>
import Top from "@/components/public/topComponent"
import Banner from "@/components/public/indexBanner"
import Title from "@/components/public/indexTitle"
import TablePage from "@/components/public/tablePage"

export default {
  components:{
    Top,
    Banner,
    Title,
    TablePage
  },
  name: "index.vue",
  data(){
    return {
      title:'首页'
    }
  },
  mounted() {
    document.title = this.title
  },
}
</script>
<style scoped>

</style>
