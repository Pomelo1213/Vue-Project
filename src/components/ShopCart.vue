<template>
  <div class="shop-cart">
    <div class="icon-wrap">
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
    <div class="purchase-btn" :class="totalMoney >= minPrice ? 'purchase' : ''">
      <span v-if="totalMoney === 0">¥{{ minPrice }}元起送</span>
      <span v-else-if="totalMoney > 0 && totalMoney < minPrice"
        >还差¥{{ minPrice - totalMoney }}元起送</span
      >
      <span v-else>立即结算</span>
    </div>
  </div>
</template>

<script>
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
  data: function() {
    return {};
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
  z-index: 2;
  background-color: #141d27;
  .flex();

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
}
</style>
