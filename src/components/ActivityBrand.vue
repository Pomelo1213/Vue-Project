<template>
  <span
    class="activity-brand"
    :class="[
      `${currentType}`,
      `${currentSize}`,
      `${isHollow ? 'hollow' : 'not-hollow'}`
    ]"
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
    },
    isHollow: {
      type: Boolean,
      default: true
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
      return currentType || "";
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
      &.hollow {
        .bg-image("../res/activity-brand/decrease_1");
      }
      &.not-hollow {
        .bg-image("../res/activity-brand/decrease_3");
      }
    }
    &.size-16 {
      .size(16px);
      background-size: 16px 16px;
      &.hollow {
        .bg-image("../res/activity-brand/decrease_2");
      }
      &.not-hollow {
        .bg-image("../res/activity-brand/decrease_4");
      }
    }
  }
  &.discount {
    &.size-12 {
      .size(12px);
      background-size: 12px 12px;
      &.hollow {
        .bg-image("../res/activity-brand/discount_1");
      }
      &.not-hollow {
        .bg-image("../res/activity-brand/discount_3");
      }
    }
    &.size-16 {
      .size(16px);
      background-size: 16px 16px;
      &.hollow {
        .bg-image("../res/activity-brand/discount_2");
      }
      &.not-hollow {
        .bg-image("../res/activity-brand/discount_4");
      }
    }
  }
  &.guarantee {
    &.size-12 {
      .size(12px);
      background-size: 12px 12px;
      &.hollow {
        .bg-image("../res/activity-brand/guarantee_1");
      }
      &.not-hollow {
        .bg-image("../res/activity-brand/guarantee_3");
      }
    }
    &.size-16 {
      .size(16px);
      background-size: 16px 16px;
      &.hollow {
        .bg-image("../res/activity-brand/guarantee_2");
      }
      &.not-hollow {
        .bg-image("../res/activity-brand/guarantee_4");
      }
    }
  }
  &.invoice {
    &.size-12 {
      .size(12px);
      background-size: 12px 12px;
      &.hollow {
        .bg-image("../res/activity-brand/invoice_1");
      }
      &.not-hollow {
        .bg-image("../res/activity-brand/invoice_3");
      }
    }
    &.size-16 {
      .size(16px);
      background-size: 16px 16px;
      &.hollow {
        .bg-image("../res/activity-brand/invoice_2");
      }
      &.not-hollow {
        .bg-image("../res/activity-brand/invoice_4");
      }
    }
  }
  &.special {
    &.size-12 {
      .size(12px);
      background-size: 12px 12px;
      &.hollow {
        .bg-image("../res/activity-brand/special_1");
      }
      &.not-hollow {
        .bg-image("../res/activity-brand/special_3");
      }
    }
    &.size-16 {
      .size(16px);
      background-size: 16px 16px;
      &.hollow {
        .bg-image("../res/activity-brand/special_2");
      }
      &.not-hollow {
        .bg-image("../res/activity-brand/special_4");
      }
    }
    .bg-image("../res/activity-brand/special_1");
  }
}
</style>
