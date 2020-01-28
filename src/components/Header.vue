<template>
  <div class="header">
    <img :src="seller.avatar" class="header-bg" />
    <section class="top-part">
      <img class="seller-avatar" width="64" height="64" :src="seller.avatar" />
      <div class="seller-info">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">
          {{ seller.description }} / {{ seller.deliveryTime }}分钟送达
        </div>
        <div class="cheap" v-if="seller.supports">
          <!-- <span
            class="activity-brand"
            :class="activityClassMp[seller.supports[0].type]"
          ></span> -->
          <v-brand
            :brandType="seller.supports[0].type"
            :brandSize="12"
          ></v-brand>
          <span class="cheap-name">
            {{ seller.supports[0].description }}
          </span>
        </div>
      </div>
      <div
        class="detail-btn"
        v-if="seller.supports"
        @click="handleCheckSellerDetailClick"
      >
        <span class="length">{{ seller.supports.length }}个</span>
        <span class="arrow icon-keyboard_arrow_right"></span>
      </div>
    </section>
    <section class="bottom-part" @click="handleCheckSellerDetailClick">
      <span class="bulletin-brand"></span>
      <p class="bulletin">
        {{ seller.bulletin }}
      </p>
      <span class="arrow icon-keyboard_arrow_right"></span>
    </section>
    <transition name="fade">
      <section class="seller-detail-info" v-if="showSellerInfo">
        <div class="info-wrap">
          <p class="title">{{ seller.name }}</p>
          <div class="star-view-wrap">
            <v-star :classType="48" :score="seller.score"></v-star>
          </div>
          <div class="part part-1">
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="content ul-content" v-if="seller.supports">
              <li
                class="li-content"
                v-for="(item, index) in seller.supports"
                :key="index"
              >
                <v-brand
                  :brandType="seller.supports[index].type"
                  :brandSize="16"
                ></v-brand>
                <span class="description">{{
                  seller.supports[index].description
                }}</span>
              </li>
            </ul>
          </div>
          <div class="part part-2">
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="content bulletin">{{ seller.bulletin }}</div>
          </div>
        </div>
        <div class="close-wrap">
          <span
            class="close-btn icon-close"
            @click="handleCloseBtnClick"
          ></span>
        </div>
      </section>
    </transition>
  </div>
</template>

<script>
import Star from "./Star.vue";
import ActivityBrand from "./ActivityBrand.vue";
export default {
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    "v-star": Star,
    "v-brand": ActivityBrand
  },
  created: function() {
    this.activityClassMp = [
      "decrease",
      "discount",
      "special",
      "invoice",
      "guarantee"
    ];
  },
  data: function() {
    return {
      showSellerInfo: false
    };
  },
  methods: {
    handleCheckSellerDetailClick: function() {
      this.showSellerInfo = true;
    },
    handleCloseBtnClick: function() {
      this.showSellerInfo = false;
    }
  }
};
</script>

<style lang="less">
@import "../assets/global.less";
.header {
  position: relative;
  background-color: rgba(7, 17, 27, 0.5);
  overflow: hidden;

  .header-bg {
    .size(100%);
    filter: blur(10px);
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
  }

  .top-part {
    .flex();
    padding: 24px 12px 18px 24px;
    position: relative;

    .seller-avatar {
      margin-right: 16px;
      border-radius: 2px;
    }

    .seller-info {
      .title {
        font-size: 0;
        color: @whiteColor;
        font-weight: bold;
        .h-lh(18px);

        .brand {
          display: inline-block;
          .size(30px, 18px);
          .bg-image("../res/header/brand");
          background-size: 30px 18px;
          vertical-align: top;
          margin-right: 6px;
        }

        .name {
          font-size: 16px;
        }
      }
      .description {
        margin-top: 8px;
        margin-bottom: 10px;
        font-size: 12px;
        color: @whiteColor;
        .h-lh(12px);
      }
      .cheap {
        color: @whiteColor;
        .h-lh(12px);
        font-size: 0;

        .activity-brand {
          margin-right: 4px;
        }

        .cheap-name {
          font-size: 10px;
        }
      }
    }

    .detail-btn {
      position: absolute;
      right: 12px;
      bottom: 11px;
      background-color: rgba(0, 0, 0, 0.2);
      padding: 7px 8px;
      padding-left: 16px;
      border-radius: 16px;
      outline: none;

      .length {
        font-size: 10px;
        color: @whiteColor;
        .h-lh(12px);
      }

      .arrow {
        .size(20px);
        color: @whiteColor;
      }
    }
  }

  .bottom-part {
    height: 28px;
    padding-left: 12px;
    padding-right: 12px;
    background-color: rgba(7, 17, 27, 0.2);
    padding-right: 12px;
    position: relative;
    .flex();

    .bulletin-brand {
      display: inline-block;
      .size(22px, 12px);
      .bg-image("../res/header/bulletin");
      vertical-align: top;
      background-size: 22px 12px;
      margin-right: 4px;
    }

    .bulletin {
      flex: 1;
      color: @whiteColor;
      font-size: 10px;
      .h-lh(28px);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .arrow {
      position: absolute;
      color: @whiteColor;
      font-size: 12px;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .seller-detail-info {
    position: fixed;
    left: 0;
    top: 0;
    .size(100%);
    padding-top: 64px;
    padding-bottom: 64px;
    box-sizing: border-box;
    background: rgba(139, 151, 163, 0.8);
    transition: opacity 0.5s;

    &.fade-enter-active,
    &.fade-leave-active {
      opacity: 1;
      background: rgba(7, 17, 27, 0.8);
    }
    &.fade-enter, &.fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
      background: rgba(7, 17, 27, 0);
    }

    .info-wrap {
      .title {
        color: @whiteColor;
        text-align: center;
        font-size: 16px;
        font-weight: 700;
        .h-lh(16px);
      }

      .star-view-wrap {
        .flex();
        justify-content: center;
        margin-top: 16px;
      }

      .part {
        .title {
          width: 80%;
          margin: auto;
          margin-top: 28px;
          margin-bottom: 24px;
          display: flex;
          .line {
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            flex: 1;
            position: relative;
            top: -7px;
          }
          .text {
            color: @whiteColor;
            padding: 0 12px;
          }
        }
        .content {
          padding-left: 48px;
          padding-right: 48px;
          color: @whiteColor;

          .li-content {
            font-size: 0;
            .flex();
            margin-bottom: 12px;

            .activity-brand {
              margin-right: 12px;
            }

            .description {
              font-size: 12px;
              color: @whiteColor;
              .h-lh(12px);
            }
          }

          &.bulletin {
            font-size: 12px;
            .h-lh(24px);
          }
        }
      }
    }

    .close-wrap {
      .size(100%, 64px);
      position: absolute;
      left: 0;
      bottom: 0;
      .flex();
      justify-content: center;
      align-items: flex-start;

      .close-btn {
        color: @whiteColor;
        font-size: 32px;
        z-index: 1;
      }
    }
  }
}
</style>
