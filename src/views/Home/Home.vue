<template>
  <div>
    <!-- 三级组件已在全局引入   -->
<TypeNav/>
<ListContainer/>
<Recommend/>
<Rank/>
<Like/>
<Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"/>
<Brand/>
  </div>
</template>

<script>
import ListContainer from '@/views/Home/ListContainer/ListContainer.vue'  //引入组件
import Recommend from '@/views/Home/Recommend/Recommend.vue'
import Rank from '@/views/Home/Rank/Rank.vue'
import Like from '@/views/Home/Like/Like.vue'
import Floor from '@/views/Home/Floor/Floor.vue'
import Brand from '@/views/Home/Brand/Brand.vue'

import { mapState } from "vuex";

export default {
    name:'Home',
    components:{
      ListContainer,
      Recommend,
      Rank,
      Like,
      Floor,
      Brand
    },
    mounted() {
    this.$store.dispatch("getFloorList");
  },
    computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
 
}
</script>

<style>

</style>