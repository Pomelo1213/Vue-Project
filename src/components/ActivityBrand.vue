<template>
  <span
    class="activity-brand"
    :class="[`${currentType}`, `${currentSize}`]"
  ></span>
</template>

<script>
export default {
  props: {
    brandType: {
      type: Number
    },
    brandSize: {
      type: Number
    }
  },
  data: function() {
    return {
      brand: ["decrease", "discount", "special", "invoice", "guarantee"]
    };
  },
  computed: {
    currentType: function() {
      const currentType = this.brand[this.brandType];
      console.log("--->", currentType);
      return currentType;
    },
    currentSize: function() {
      return `size-${this.brandSize}`;
    }
  }
};
</script>

<style lang="less">
@import "../assets/global.less";
.activity-brand {
  display: inline-block;
  vertical-align: top;

  &.decrease {
    &.size-12 {
      .size(12px);
      background-size: 12px 12px;
    }
    &.size-16 {
      .size(16px);
      background-size: 16px 16px;
    }
    .bg-image("../res/header/decrease_1");
  }
  &.discount {
    &.size-12 {
      .size(12px);
      background-size: 12px 12px;
    }
    &.size-16 {
      .size(16px);
      background-size: 16px 16px;
    }
    .bg-image("../res/header/discount_1");
  }
  &.guarantee {
    &.size-12 {
      .size(12px);
      background-size: 12px 12px;
    }
    &.size-16 {
      .size(16px);
      background-size: 16px 16px;
    }
    .bg-image("../res/header/guarantee_1");
  }
  &.invoice {
    &.size-12 {
      .size(12px);
      background-size: 12px 12px;
    }
    &.size-16 {
      .size(16px);
      background-size: 16px 16px;
    }
    .bg-image("../res/header/invoice_1");
  }
  &.special {
    &.size-12 {
      .size(12px);
      background-size: 12px 12px;
    }
    &.size-16 {
      .size(16px);
      background-size: 16px 16px;
    }
    .bg-image("../res/header/special_1");
  }
}
</style>
