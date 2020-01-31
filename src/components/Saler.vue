<template>
  <div class="seller" ref="seller">
    <div class="inner">
      <div class="seller-header">
        <div class="top">
          <div class="info-wrap">
            <div class="seller-name">{{ seller.name }}</div>
            <div class="seller-score">
              <v-star :classType="36" :score="seller.score"></v-star>
              <span class="num">({{ seller.ratingCount }})</span>
              <span class="num">月售{{ seller.sellCount }}单</span>
            </div>
          </div>
          <div class="collect">
            <span class="icon-favorite"></span>
            <span class="collec-txt">收藏</span>
          </div>
        </div>
        <div class="bottom">
          <div class="item">
            <div class="title">起送价</div>
            <div class="content">
              <span>{{ seller.minPrice }}</span>
              <span>元</span>
            </div>
          </div>
          <div class="item">
            <div class="title">商家配送</div>
            <div class="content">
              <span>{{ seller.deliveryPrice }}</span>
              <span>元</span>
            </div>
          </div>
          <div class="item">
            <div class="title">平均送达时间</div>
            <div class="content">
              <span>{{ seller.deliveryTime }}</span>
              <span>分钟</span>
            </div>
          </div>
        </div>
      </div>
      <v-split></v-split>
      <div class="seller-board">
        <div class="board-wrap">
          <div class="board">公告与活动</div>
          <div class="bulletin">{{ seller.bulletin }}</div>
        </div>
        <ul class="activity-list">
          <li
            class="activity-li"
            v-for="item in seller.supports"
            :key="item.type"
          >
            <v-brand
              :brandType="item.type"
              :brandSize="16"
              :isHollow="false"
            ></v-brand>
            <span class="description">{{ item.description }}</span>
          </li>
        </ul>
      </div>
      <v-split></v-split>
      <div class="seller-pics">
        <div class="pics-info">商家实景</div>
        <div class="pics-wrap" ref="picWrap">
          <ul class="pics">
            <li class="pic" v-for="picUrl in seller.pics" :key="picUrl">
              <img :src="picUrl" />
            </li>
          </ul>
        </div>
      </div>
      <v-split></v-split>
      <div class="seller-info-wrap">
        <div class="seller-info">商家信息</div>
        <ul class="infos">
          <li class="info" v-for="info in seller.infos" :key="info">
            {{ info }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import BetterScroll from "better-scroll";
import Split from "./Split.vue";
import Star from "./Star.vue";
import ActivityBrand from "./ActivityBrand.vue";
export default {
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    "v-split": Split,
    "v-star": Star,
    "v-brand": ActivityBrand
  },
  created: function() {
    this.$nextTick(() => {
      this._initSellerScroll();
      this._initPicsScroll();
    });
  },
  methods: {
    _initSellerScroll: function() {
      if (!this.sellerScroll) {
        this.sellerScroll = new BetterScroll(this.$refs.seller, {
          click: true
        });
      } else {
        this.sellerScroll.refresh();
      }
    },
    _initPicsScroll: function() {
      if (!this.picScroll) {
        this.picScroll = new BetterScroll(this.$refs.picWrap, {
          click: true,
          scrollX: true
        });
      } else {
        this.picScroll.refresh();
      }
      console.log("scroll--->", this.picScroll);
    }
  }
};
</script>

<style lang="less">
@import "../assets/global.less";
.seller {
  position: absolute;
  width: 100%;
  left: 0;
  top: 174px;
  bottom: 0;
  overflow: hidden;

  .inner {
    .seller-header {
      box-sizing: border-box;
      .top {
        .flex();
        width: 100%;
        justify-content: space-between;
        padding: 18px;
        position: relative;
        box-sizing: border-box;
        &::after {
          width: calc(100% - 36px);
          height: 1px;
          position: absolute;
          display: block;
          content: "";
          background-color: rgba(7, 17, 27, 0.1);
          left: 50%;
          transform: translateX(-50%);
          bottom: 0;
        }
        .info-wrap {
          .seller-name {
            font-size: 14px;
            color: rgb(7, 17, 27);
            .h-lh(14px);
          }
          .seller-score {
            margin-top: 8px;
            display: flex;
            .num {
              margin-left: 8px;
              color: rgb(77, 85, 93);
              font-size: 10px;
            }
          }
        }
        .collect {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          .icon-favorite {
            font-size: 24px;
            .h-lh(24px);
            &.active {
              color: rgb(240, 20, 20);
            }
          }
          .collec-txt {
            font-size: 10px;
            color: rgb(77, 85, 93);
            .h-lh(10px);
          }
        }
      }
      .bottom {
        padding: 18px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        .flex();
        justify-content: space-between;
        padding-left: 36px;
        .item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          padding-right: 36px;

          &:last-child {
            &::after {
              display: none;
            }
          }

          &::after {
            position: absolute;
            display: block;
            content: "";
            width: 1px;
            height: 100%;
            top: 50%;
            transform: translateY(-50%);
            right: 0;
            background-color: rgba(7, 17, 27, 0.1);
          }

          .title {
            font-size: 10px;
            color: rgb(147, 153, 157);
            text-align: center;
          }

          .content {
            margin-top: 4px;
            color: rgb(7, 17, 27);

            > span:first-child {
              font-size: 24px;
              .h-lh(24px);
            }

            > span:last-child {
              font-size: 10px;
            }
          }
        }
      }
    }

    .seller-board {
      padding: 16px 16px 0 16px;
      .board-wrap {
        .board {
          font-size: 14px;
          color: rgb(7, 17, 27);
          .h-lh(14px);
        }
        .bulletin {
          margin-top: 8px;
          font-size: 12px;
          color: rgb(240, 20, 20);
          font-weight: 200;
          line-height: 24px;
          padding-left: 12px;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        }
      }

      .activity-list {
        padding-left: 12px;

        .activity-li {
          padding: 16px 0;
          border-bottom: 1px solid rgba(7, 17, 27, 0.1);

          &:last-child {
            border: none;
          }
          .description {
            margin-left: 6px;
            font-size: 12px;
            font-weight: 200;
            color: rgb(7, 17, 27);
            .h-lh(16px);
          }
        }
      }
    }

    .seller-pics {
      padding: 0 18px;
      box-sizing: border-box;
      .pics-info {
        padding-top: 18px;
        font-size: 14px;
        color: rgb(7, 17, 27);
        .h-lh(14px);
      }
      .pics-wrap {
        width: 100%;
        overflow: hidden;
        .pics {
          margin-top: 12px;
          padding-bottom: 18px;
          display: flex;
          flex-wrap: nowrap;

          .pic {
            margin-right: 6px;
            display: inline-block;
            &:last-child {
              margin: 0;
            }
            > img {
              .size(120px, 90px);
            }
          }
        }
      }
    }

    .seller-info-wrap {
      padding: 18px;
      .seller-info {
        font-size: 14px;
        color: rgb(7, 17, 27);
        .h-lh(14px);
        padding-bottom: 12px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      }
      .infos {
        .info {
          padding: 16px;
          font-size: 12px;
          font-weight: 200;
          color: rgb(7, 17, 27);
          .h-lh(16px);
          border-bottom: 1px solid rgba(7, 17, 27, 0.1);

          &:last-child {
            border: none;
          }
        }
      }
    }
  }
}
</style>
