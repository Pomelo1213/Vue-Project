<template>
  <div class="shop-cart">
    <div class="shop-cart-inner">
      <div class="icon-wrap" @click="handleShopCartClick">
        <span
          class="icon-shopping_cart"
          :class="totalCount > 0 ? 'active' : ''"
        ></span>
        <span class="goods-count" v-if="totalCount > 0">{{
          totalCount > 99 ? 99 : totalCount
        }}</span>
      </div>
      <div class="price-wrap">
        <div class="total-money">
          <span v-if="totalMoney === 0">¥0</span>
          <span v-else class="money">¥{{ totalMoney }}</span>
        </div>
        <div class="delivery-money">另需配送费¥{{ deliveryPrice }}元</div>
      </div>
      <div
        class="purchase-btn"
        :class="totalMoney >= minPrice ? 'purchase' : ''"
      >
        <span v-if="totalMoney === 0">¥{{ minPrice }}元起送</span>
        <span v-else-if="totalMoney > 0 && totalMoney < minPrice"
          >还差¥{{ minPrice - totalMoney }}元起送</span
        >
        <span v-else>立即结算</span>
      </div>
      <div v-if="showCartCard" class="shop-cart-card">
        <div class="inner">
          <div class="cart-header">
            <span class="cart">购物车</span>
            <span class="clear" @click="handleClearBtnClick">清空</span>
          </div>
          <div class="cart-content-wrap" ref="cartContent">
            <ul class="cart-content">
              <li
                class="cart-li"
                v-for="food in shopCartFoods"
                :key="food.name"
              >
                <div class="food-name">{{ food.name }}</div>
                <div class="control-wrap">
                  <span class="food-price">{{ food.price }}</span>
                  <v-cart-control :food="food"></v-cart-control>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BetterScroll from "better-scroll";
import CartControl from "./CartControl.vue";
export default {
  props: {
    deliveryPrice: {
      type: Number
    },
    minPrice: {
      type: Number
    },
    goods: {
      type: Array
    }
  },
  components: {
    "v-cart-control": CartControl
  },
  data: function() {
    return {
      showCartCard: false
    };
  },
  mounted: function() {
    this.$watch("showCartCard", () => {
      this.$nextTick(() => {
        this._initScroll();
      });
    });
  },
  computed: {
    totalCount: function() {
      const totalCount = this.goods.reduce((prev, cur) => {
        const eachCount = cur.foods.reduce((r, c) => {
          return c.count ? r + c.count : r;
        }, 0);
        return prev + eachCount;
      }, 0);
      return totalCount;
    },
    totalMoney: function() {
      const totalMoney = this.goods.reduce((prev, cur) => {
        const eachPrice = cur.foods.reduce((r, c) => {
          return c.count ? r + c.count * c.price : r;
        }, 0);
        return prev + eachPrice;
      }, 0);
      return totalMoney;
    },
    shopCartFoods: function() {
      const foods = [];
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count && food.count > 0) {
            foods.push(food);
          }
        });
      });
      return foods;
    }
  },
  methods: {
    handleShopCartClick: function() {
      this.showCartCard = !this.showCartCard;
    },
    handleClearBtnClick: function() {
      this.goods.forEach(good => {
        good.foods.forEach(food => {
          if (food.count) {
            food.count = 0;
          }
        });
      });
    },
    // 下划线代表 private 方法，（编写规范而已）
    _initScroll: function() {
      if (this.cartContentScroll) {
        this.cartContentScroll.refresh();
      } else {
        this.cartContentScroll = new BetterScroll(this.$refs.cartContent, {
          click: true
        });
      }
    }
  }
};
</script>

<style lang="less">
@import "../assets/global.less";
.shop-cart {
  position: absolute;
  .size(100%, 46px);
  bottom: -47px;
  left: 0;
  right: 0;
  z-index: 10;

  .shop-cart-inner {
    .size(100%, 100%);
    .flex();
    background-color: #141d27;
  }

  .icon-wrap {
    border-radius: 50%;
    background-color: #141d27;
    padding: 12px 6px;
    position: relative;
    top: -6px;
    margin-left: 18px;

    .icon-shopping_cart {
      padding: 6px;
      font-size: 24px;
      border-radius: 50%;
      background-color: #2d343b;
      color: #818589;

      &.active {
        color: @whiteColor;
        background-color: #449fd7;
      }
    }
    .goods-count {
      position: absolute;
      right: 0;
      top: 0;
      text-align: center;
      font-size: 9px;
      color: @whiteColor;
      padding: 1px 6px;
      min-width: 9px;
      background-color: rgb(240, 20, 20);
      border-radius: 10px;
    }
  }

  .price-wrap {
    flex: 1;
    padding-left: 18px;
    padding-right: 12px;
    height: 100%;
    background-color: #141d27;
    .flex();

    .total-money {
      font-size: 16px;
      font-weight: 700;
      padding-right: 12px;
      color: #949698;
      height: 100%;
      .flex();
      position: relative;

      &::after {
        position: absolute;
        display: block;
        content: "";
        .size(1px, 50%);
        background-color: rgb(149, 150, 152, 0.4);
        top: 50%;
        transform: translateY(-50%);
        right: 0;
      }

      &.money {
        color: @whiteColor;
      }
    }
    .delivery-money {
      padding-left: 12px;
      color: #949698;
      height: 100%;
      .flex();
    }
  }

  .purchase-btn {
    .size(105px, 100%);
    background-color: #2c333a;
    .flex-center();
    color: #949698;
    font-weight: 700;
    font-size: 12px;

    &.purchase {
      color: @whiteColor;
      background-color: #24be48;
    }
  }

  .shop-cart-card {
    position: fixed;
    .size(100%, 100%);
    top: 0;
    left: 0;
    z-index: -10;
    background-color: rgba(7, 17, 27, 0.6);

    .inner {
      padding-bottom: 52px;
      position: absolute;
      width: 100%;
      height: 305px;
      bottom: 0;
      left: 0;
      background: @whiteColor;
      z-index: 1;
      display: flex;
      flex-direction: column;

      .cart-header {
        padding: 0 18px;
        font-size: 14px;
        font-weight: 200;
        .h-lh(40px);
        .flex();
        justify-content: space-between;
        background-color: #f3f5f7;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);

        .clear {
          font-size: 12px;
          color: rgb(0, 160, 220);
        }
      }

      .cart-content-wrap {
        flex: 1;
        overflow: hidden;
        .cart-content {
          padding: 0 18px;

          .cart-li {
            .flex();
            justify-content: space-between;
            padding: 12px 0;
            border-bottom: 1px solid rgba(7, 17, 27, 0.1);
            .food-name {
              font-size: 14px;
              color: rgb(7, 17, 27);
              .h-lh(24px);
            }

            .control-wrap {
              .flex();

              > .food-price {
                margin-right: 12px;
                font-size: 14px;
                color: rgb(240, 20, 20);
                .h-lh(24px);
                font-weight: 700;
              }
            }
          }
        }
      }
    }
  }
}
</style>
