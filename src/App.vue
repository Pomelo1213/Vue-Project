<template>
  <div id="app">
    <v-header :seller="sellerData"></v-header>
    <ul class="tab-bar">
      <router-link to="/goods">商品</router-link>
      <router-link to="/ratings">评价</router-link>
      <router-link to="/saler">商家</router-link>
    </ul>
    <router-view :seller="sellerData" />
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
    return {
      sellerData: {}
    };
  },
  created: function() {
    this.$http.get("/api/seller").then(res => {
      const sellerData = res.body.seller;
      console.log("seller-->", sellerData);
      this.sellerData = sellerData;
    });
  }
};
</script>

<style lang="less">
@import "./assets/global.less";
.tab-bar {
  .flex();
  position: relative;
  z-index: 2;
  height: 40px;
  border-bottom: 1px solid rgba(7, 17, 27, 0.1);

  > a {
    flex: 1;
    .flex();
    justify-content: center;
    align-items: center;
    color: rgb(77, 85, 93);
    font-size: 14px;
    .h-lh(40px);

    &.link-active {
      color: rgb(240, 20, 20);
    }
  }
}
</style>
