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
          <span
            class="activity-brand"
            :class="activityClassMp[seller.supports[0].type]"
          ></span>
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
    <section class="seller-detail-info" v-if="showSellerInfo">
      <div class="title">{{ seller.name }}</div>
      <v-star :classType="36" :score="2.6"></v-star>
      <span class="close-btn icon-close"></span>
    </section>
  </div>
</template>

<script>
import Star from "./Star.vue";
export default {
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    "v-star": Star
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
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/global.less";
.header {
  position: relative;
  background-color: rgba(7, 17, 27, 0.5);

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
          display: inline-block;
          .size(12px);
          background-size: 12px 12px;
          vertical-align: top;
          margin-right: 4px;

          &.decrease {
            .bg-image("../res/header/decrease_1");
          }
          &.discount {
            .bg-image("../res/header/discount_1");
          }
          &.guarantee {
            .bg-image("../res/header/guarantee_1");
          }
          &.invoice {
            .bg-image("../res/header/invoice_1");
          }
          &.special {
            .bg-image("../res/header/special_1");
          }
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
      .cursor();

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
    background: rgba(7, 17, 27, 0.8);
    padding-bottom: 64px;
    overflow: hidden;

    .title {
      color: @whiteColor;
    }

    .close-btn {
      color: @whiteColor;
      font-size: 32px;
      z-index: 1;
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
