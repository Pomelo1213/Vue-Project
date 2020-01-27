<template>
  <div class="star-wrap" :class="starClassType">
    <span
      class="star-item"
      v-for="(starClass, index) in starClasses"
      :class="starClass"
      :key="`${starClass}-${index}`"
    ></span>
  </div>
</template>

<script>
const STAR_LENGTH = 5;
export default {
  props: {
    classType: {
      type: Number
    },
    score: {
      type: Number
    }
  },
  computed: {
    starClassType: function() {
      return `star${this.classType}`;
    },
    starClasses: function() {
      const result = [];
      const onStarNum = parseInt(this.score);
      const hasHalfStar = this.score - onStarNum - 0.5 >= 0;
      for (let i = 1; i <= onStarNum; i++) {
        result.push("star-on");
      }
      if (hasHalfStar) {
        result.push("star-half");
      }
      while (result.length < STAR_LENGTH) {
        result.push("star-off");
      }
      return result;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/global.less";
.star-wrap {
  .star-item {
    display: inline-block;
    &:last-child {
      margin-right: 0;
    }
  }

  &.star24 {
    .star-item {
      margin-right: 3px;
    }
    .star-on {
      .size(10px);
      .bg-image("../res/star/star24_on");
      background-size: 10px 10px;
    }
    .star-half {
      .size(10px);
      .bg-image("../res/star/star24_half");
      background-size: 10px 10px;
    }
    .star-off {
      .size(10px);
      .bg-image("../res/star/star24_off");
      background-size: 10px 10px;
    }
  }
  &.star36 {
    .star-item {
      margin-right: 6px;
    }
    .star-on {
      .size(15px);
      .bg-image("../res/star/star36_on");
      background-size: 15px 15px;
    }
    .star-half {
      .size(15px);
      .bg-image("../res/star/star36_half");
      background-size: 15px 15px;
    }
    .star-off {
      .size(15px);
      .bg-image("../res/star/star36_off");
      background-size: 15px 15px;
    }
  }
  &.star48 {
    .star-item {
      margin-right: 22px;
    }
    .star-on {
      .size(20px);
      .bg-image("../res/star/star48_on");
      background-size: 20px 20px;
    }
    .star-half {
      .size(20px);
      .bg-image("../res/star/star48_half");
      background-size: 20px 20px;
    }
    .star-off {
      .size(20px);
      .bg-image("../res/star/star48_off");
      background-size: 20px 20px;
    }
  }
}
</style>
