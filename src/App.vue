<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>

    <!-- 在home，search显示，在登录注册隐藏 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from './components/Header/Header.vue'
import Footer from './components/Footer/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,Footer
  },
  mounted(){
    //通知VueX 发请求，获取数据，存储在state仓库中
    this.$store.dispatch("categoryList", "categoryList");
    //只挂载一次，用于过去列表数据
  }
}
</script>

<style>

</style>
