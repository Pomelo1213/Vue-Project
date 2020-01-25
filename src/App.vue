<template>
  <div id="app">
    <v-header :seller="sellerData"></v-header>
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
    this.$http.get("/api/goods").then(res => {
      const goodsData = res.body.goods;
      console.log("good-->", goodsData);
    });
    this.$http.get("/api/ratings").then(res => {
      const ratingsData = res.body.ratings;
      console.log("ratings-->", ratingsData);
    });
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
    .h-lh(40px);

    &:hover {
      background: orange;
    }

    &.router-active {
      color: rgb(240, 20, 20);
    }
  }
}
</style>
