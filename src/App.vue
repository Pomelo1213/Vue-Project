<template>
  <div id="app">
    <v-header></v-header>
    <ul class="content">
      <li v-for="content in contentItem" :key="`content-${content}`">
        {{ content }}
      </li>
    </ul>
    <div>test</div>
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
      contentItem: ["商品", "评价", "商家"]
    };
  }
};
</script>

<style lang="less">
@import "./assets/global.less";
.content {
  .flex();

  > li {
    flex: 1;
  }
}
</style>
