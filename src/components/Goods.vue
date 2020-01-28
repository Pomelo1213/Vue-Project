<template>
  <div class="goods">
    <ul class="menu-wrap">
      <li v-for="good in goodsData" :key="`menu-${good.name}`">
        {{ good.name }}
      </li>
    </ul>
    <div class="goods-wrap"></div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      goodsData: []
    };
  },
  created: function() {
    this.$http.get("/api/goods").then(res => {
      const goodsData = res.body.goods;
      this.goodsData = goodsData;
    });
  }
};
</script>

<style lang="less">
@import "../assets/global.less";
.goods {
  position: absolute;
  width: 100%;
  top: 174px;
  bottom: 46px;
  display: flex;

  .menu-wrap {
    width: 80px;
  }
  .goods-wrap {
    flex: 1;
  }
}
</style>
