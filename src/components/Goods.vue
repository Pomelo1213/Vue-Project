<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul class="menu-wrap" v-if="goodsData">
        <li
          class="menu-li"
          v-for="(good, index) in goodsData"
          :class="currentIndex === index ? 'active' : ''"
          :key="`menu-${good.name}`"
          @click="handleMenuClick(index)"
        >
          <v-brand
            :brandType="good.type"
            :brandSize="12"
            :isHollow="false"
          ></v-brand>
          <span class="name">{{ good.name }}</span>
        </li>
      </ul>
    </div>
    <div class="goods-wrapper" ref="goodsWrapper">
      <ul class="goods-wrap" v-if="goodsData">
        <li
          class="goods-li calc-height-class"
          v-for="good in goodsData"
          :key="`good-${good.name}`"
        >
          <div class="title">{{ good.name }}</div>
          <ul class="food-list">
            <li
              class="food-li"
              v-for="food in good.foods"
              :key="`food-${food.name}`"
              @click="handleFoodClick(food)"
            >
              <img class="food-image" :src="food.image" />
              <div class="info">
                <div class="name">{{ food.name }}</div>
                <div class="description">{{ food.description }}</div>
                <div class="sell-info">
                  <span>月售{{ food.sellCount }}份</span>
                  <span>好评率{{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span class="new">¥{{ food.price }}</span>
                  <span class="old" v-if="food.oldPrice"
                    >¥{{ food.oldPrice }}</span
                  >
                </div>
              </div>
              <v-cart-control :food="food"></v-cart-control>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <v-shop-cart
      :goods="goodsData"
      :minPrice="seller.minPrice"
      :deliveryPrice="seller.deliveryPrice"
    ></v-shop-cart>
    <div v-if="showFoodDetail">
      <v-food-detail :food="selectFood"></v-food-detail>
    </div>
  </div>
</template>

<script>
import BetterScroll from "better-scroll";
import ActivityBrand from "./ActivityBrand.vue";
import ShopCart from "./ShopCart.vue";
import CartControl from "./CartControl.vue";
import FoodDetail from "./FoodDetail.vue";

export default {
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    "v-brand": ActivityBrand,
    "v-shop-cart": ShopCart,
    "v-cart-control": CartControl,
    "v-food-detail": FoodDetail
  },
  data: function() {
    return {
      goodsData: [],
      scrollTopList: [],
      scrollY: 0,
      showFoodDetail: false,
      selectFood: {}
    };
  },
  computed: {
    currentIndex: function() {
      for (let index = 0; index < this.scrollTopList.length - 1; index++) {
        const startHeight = this.scrollTopList[index];
        const endHeight = this.scrollTopList[index + 1];
        if (this.scrollY >= startHeight && this.scrollY < endHeight) {
          return index;
        }
      }
      return 0;
    }
  },
  created: function() {
    this.$http.get("/api/goods").then(res => {
      const goodsData = res.body.goods;
      this.goodsData = goodsData;
      this.$nextTick(() => {
        this.initScroll();
        this.calcListHeight();
      });
    });
  },
  methods: {
    initScroll: function() {
      this.menuScroll = new BetterScroll(this.$refs.menuWrapper, {
        probeType: 3,
        click: true
      });
      this.goodsScroll = new BetterScroll(this.$refs.goodsWrapper, {
        probeType: 3,
        click: true
      });
      this.goodsScroll.on("scroll", ({ y }) => {
        const height = Math.abs(parseInt(y));
        this.scrollY = height;
      });
    },
    calcListHeight: function() {
      const scrollTopList = [0];
      let height = 0;
      const listEls = this.$refs.goodsWrapper.getElementsByClassName(
        "calc-height-class"
      );
      Array.from(listEls).forEach(el => {
        height += el.clientHeight;
        scrollTopList.push(height);
      });
      this.scrollTopList = scrollTopList;
    },
    handleMenuClick: function(index) {
      const listEls = this.$refs.goodsWrapper.getElementsByClassName(
        "calc-height-class"
      );
      const currentEl = listEls[index];
      this.goodsScroll.scrollToElement(currentEl, 300);
    },
    handleFoodClick: function(food) {
      this.showFoodDetail = true;
      this.selectFood = food;
    }
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

  .menu-wrapper {
    width: 80px;
    height: 100%;
    background-color: #f3f5f7;
    overflow: hidden;

    .menu-wrap {
      width: 100%;
      .menu-li {
        font-size: 0;
        padding: 21px 12px 21px 12px;
        position: relative;

        &.active {
          background-color: #fff;
          .name {
            font-weight: 700;
          }

          &::after {
            display: none;
          }
        }

        &::after {
          position: absolute;
          display: block;
          .size(56px, 1px);
          content: "";
          left: 50%;
          transform: translateX(-50%);
          bottom: 0;
          background-color: rgba(7, 17, 27, 0.1);
        }

        &:last-child {
          &::after {
            display: none;
          }
        }

        .activity-brand {
          margin-right: 2px;
          vertical-align: bottom;
        }

        .name {
          font-size: 12px;
          color: rgb(9, 17, 26);
          .h-lh(14px);
          font-weight: 200;
        }
      }
    }
  }

  .goods-wrapper {
    flex: 1;
    overflow: hidden;
    .goods-wrap {
      .goods-li {
        width: 100%;

        .title {
          position: relative;
          color: rgb(156, 161, 165);
          background-color: #f3f5f7;
          padding: 8px 0 8px 14px;

          &::before {
            position: absolute;
            display: block;
            content: "";
            background-color: #d9dde1;
            .size(2px, 100%);
            left: 0;
            top: 0;
          }
        }
        .food-list {
          width: 100%;

          .food-li {
            display: flex;
            padding: 18px 0 18px 16px;
            background-color: @whiteColor;
            position: relative;

            &::after {
              position: absolute;
              display: block;
              content: "";
              width: calc(100% - 32px);
              height: 1px;
              bottom: 0;
              left: 50%;
              transform: translateX(-50%);
              background-color: rgba(7, 17, 27, 0.1);
            }

            .food-image {
              .size(58px);
              margin-right: 10px;
              border-radius: 2px;
            }

            .info {
              .name {
                font-size: 14px;
                color: rgba(7, 17, 27);
                .h-lh(14px);
                font-weight: 700;
              }
              .description,
              .sell-info {
                font-size: 10px;
                color: rgb(156, 161, 165);
              }
              .description {
                margin-top: 8px;
                line-height: 14px;
              }
              .sell-info {
                margin-top: 8px;
                line-height: 10px;
                > span:last-child {
                  margin-left: 12px;
                }
              }
              .price {
                margin-top: 8px;
                display: flex;

                .new {
                  font-size: 12px;
                  .h-lh(12px);
                  font-weight: 700;
                  color: #dd3023;
                  margin-right: 5px;
                }
                .old {
                  font-size: 10px;
                  .h-lh(10px);
                  font-weight: 700px;
                  color: rgb(133, 139, 146);
                  text-decoration: line-through;
                }
              }
            }

            .cart-control {
              position: absolute;
              right: 16px;
              bottom: 9px;
            }
          }
        }
      }
    }
  }
}
</style>
