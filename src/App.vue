<template>
  <div id="app">
    <v-header></v-header>
    <ul class="tab-bar">
      <router-link to="/goods">商品</router-link>
      <router-link to="/ratings">评价</router-link>
      <router-link to="/saler">商家</router-link>
    </ul>
    <router-view />
  </div>
</template>

<script>
import Header from "./components/Header";
export default {
  name: "App",
  components: {
    "v-header": Header
  },
  data: function() {
    return {};
  }
};
</script>

<style lang="less">
@import "./assets/global.less";
.tab-bar {
  .flex();
  height: 40px;
  .border(#333);
  > a {
    flex: 1;
    .cursor();
    .flex();
    justify-content: center;
    align-items: center;
    color: rgb(77, 85, 93);
    font-size: 14px;
    .h-lh(14px);

    &.router-active {
      color: rgb(240, 20, 20);
    }
  }
}
</style>
