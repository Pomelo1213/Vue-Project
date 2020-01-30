<template>
  <div class="cart-control">
    <span
      v-if="food.count > 0"
      class="icon-remove_circle_outline"
      @click="handleRemoveFoodClick"
    ></span>
    <span v-if="food.count > 0" class="total-count">{{ food.count }}</span>
    <span class="icon-add_circle" @click="handleAddFoodClick"></span>
  </div>
</template>

<script>
export default {
  props: {
    food: {
      type: Object
    }
  },
  data: function() {
    return {};
  },
  created: function() {
    // console.log("--->", this.food);
  },
  methods: {
    handleRemoveFoodClick: function() {
      this.food.count--;
    },
    handleAddFoodClick: function() {
      if (!this.food.count) {
        /**
         * NOTE:
         * vue1.x 使用 vue.set()
         * vue2.x 使用这种方式来手动响应式添加属性
         */
        this.$set(this.food, "count", 1);
        return;
      }
      this.food.count++;
    }
  }
};
</script>

<style lang="less">
@import "../assets/global.less";
.cart-control {
  .flex();

  .total-count {
    min-width: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147, 153, 157);
  }

  .icon-remove_circle_outline {
    font-size: 24px;
    color: rgb(68, 159, 215);
  }
  .icon-add_circle {
    font-size: 24px;
    color: rgb(68, 159, 215);
  }
}
</style>
