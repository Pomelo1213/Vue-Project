<template>
  <div class="food-detail" ref="foodDetail">
    <div class="inner">
      <span class="icon-arrow_lift" @click="handleReturnClick"></span>
      <img class="food-image" :src="food.icon" />
      <div class="detail-header">
        <div class="name">{{ food.name }}</div>
        <div class="info">
          <span>月售{{ food.sellCount }}份</span>
          <span>好评率{{ food.rating }}%</span>
        </div>
        <div class="price">
          <span class="new">¥{{ food.price }}</span>
          <span v-if="food.oldPrice" class="old">¥{{ food.oldPrice }}</span>
        </div>
        <div class="add-btn-wrap">
          <div v-if="showCartControl && this.food.count > 0">
            <v-cart-control :food="food"></v-cart-control>
          </div>
          <div class="add-btn" v-else @click="handleAddCartClick">
            加入购物车
          </div>
        </div>
      </div>
      <v-split></v-split>
      <div class="detail-middle">
        <p>商品介绍</p>
        <p class="food-info">{{ food.info }}</p>
      </div>
      <v-split></v-split>
      <div class="food-content">
        <div class="rate-text">评价</div>
        <v-rating-select
          :recText="'推荐'"
          :disText="'吐槽'"
          :ratings="food.ratings"
          v-on:select="handleSelectClick"
        ></v-rating-select>
      </div>
      <ul class="rating-list">
        <li
          class="rating-li"
          v-for="rating in selectRatings"
          :key="rating.rateTime"
        >
          <div class="rating-header-wrap">
            <div class="time">{{ rating.rateTime }}</div>
            <div class="info-wrap">
              <span>{{ rating.username }}</span>
              <img class="user-avatar" :src="rating.avatar" />
            </div>
          </div>
          <div class="rating-text-wrap">
            <span class="icon-thumb_up" v-if="rating.rateType === 0"></span>
            <span
              class="icon-thumb_down"
              v-else-if="rating.rateType === 1"
            ></span>
            <span class="rating-text">{{ rating.text }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BetterScroll from "better-scroll";
import CartControl from "./CartControl.vue";
import Split from "./Split.vue";
import RatingSelect from "./RatingSelect.vue";
export default {
  props: {
    food: {
      type: Object
    }
  },
  data: function() {
    return {
      showCartControl: false,
      selectRatings: []
    };
  },
  components: {
    "v-cart-control": CartControl,
    "v-split": Split,
    "v-rating-select": RatingSelect
  },
  mounted: function() {
    this.$nextTick(() => {
      this._initFoodDetailScroll();
    });
  },
  methods: {
    handleSelectClick: function(ratings) {
      this.selectRatings = ratings;
    },
    _initFoodDetailScroll: function() {
      if (!this.foodDetailScroll) {
        this.foodDetailScroll = new BetterScroll(this.$refs.foodDetail, {
          click: true
        });
      } else {
        this.foodDetailScroll.refresh();
      }
    },
    handleReturnClick: function() {
      this.$emit("close");
    },
    handleAddCartClick: function() {
      this.showCartControl = true;
      if (this.food.count) {
        this.foodCount++;
      } else {
        this.$set(this.food, "count", 1);
      }
    }
  }
};
</script>

<style lang="less">
@import "../assets/global.less";
.food-detail {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  bottom: 46px;
  z-index: 5;
  box-sizing: border-box;
  font-size: 0;
  background: @whiteColor;
  overflow: hidden;

  .inner {
    width: 100%;
    position: relative;

    .icon-arrow_lift {
      position: absolute;
      left: 18px;
      top: 15px;
      z-index: 10;
      font-size: 16px;
      color: @whiteColor;
    }

    .food-image {
      width: 100%;
    }
    > .detail-header {
      padding: 18px;
      position: relative;
      .name {
        font-size: 14px;
        font-weight: 700;
        .h-lh(14px);
      }
      .info {
        margin-top: 8px;
        font-size: 10px;
        color: rgb(147, 153, 159);

        > span:first-child {
          margin-right: 12px;
        }
      }

      .price {
        font-weight: 700;
        margin-top: 18px;
        .new {
          font-size: 14px;
          color: rgb(240, 20, 20);
          margin-right: 12px;
        }

        .old {
          font-size: 10px;
          color: rgb(147, 153, 159);
          text-decoration: line-through;
        }
      }

      .add-btn-wrap {
        position: absolute;
        right: 18px;
        bottom: 12px;

        .add-btn {
          border-radius: 16px;
          border: 1px solid;
          color: @whiteColor;
          background: rgb(0, 160, 220);
          font-size: 10px;
          padding: 6px 12px;
          text-align: center;
        }
      }
    }

    > .detail-middle {
      width: 100%;
      padding: 18px;
      box-sizing: border-box;

      > p:first-child {
        margin-bottom: 6px;
        color: rgb(7, 17, 27);
        font-size: 14px;
      }

      > p:last-child {
        color: rgb(77, 85, 93);
        font-size: 12px;
        font-weight: 200;
        line-height: 24px;
      }
    }

    .food-content {
      .rate-text {
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
    }

    .rating-list {
      font-size: 10px;

      .rating-li {
        padding: 18px 16px;
        .rating-header-wrap {
          .flex();
          justify-content: space-between;
          .time {
            color: rgb(147, 153, 159);
            .h-lh(12px);
          }
          .info-wrap {
            .flex();
            > span {
              color: rgb(147, 153, 159);
              .h-lh(12px);
            }
            > img {
              .size(12px);
              border-radius: 50%;
              margin-left: 6px;
            }
          }
        }

        .rating-text-wrap {
          font-size: 12px;
          margin-top: 6px;
          .icon-thumb_up {
            color: rgb(0, 160, 220);
            .h-lh(24px);
          }
          .icon-thumb_down {
            color: rgb(147, 153, 159);
            .h-lh(24px);
          }
          .rating-text {
            color: rgb(7, 17, 27);
            margin-left: 4px;
            .h-lh(16px);
          }
        }
      }
    }
  }
}
</style>
