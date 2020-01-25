<template>
  <div class="header">
    <section class="top-part">
      <img class="seller-avatar" width="64" height="64" :src="seller.avatar" />
      <div class="seller-info">
        <div class="brand-wrap">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">
          {{ seller.description }} / {{ seller.deliveryTime }}分钟送达
        </div>
        <div class="cheap">
          <span class="decrease-brand"></span>
          <div v-if="seller.supports">{{ seller.supports[0].description }}</div>
        </div>
      </div>
    </section>
    <section class="bottom-part">
      <span></span>
      <div class="bulletin">
        {{ seller.bulletin }}
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: {
    seller: {
      type: Object
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/global.less";
.header {
  border: 1px solid;
  .top-part {
    .flex();
    background: #000;
    padding: 24px 0 18px 24px;

    .seller-avatar {
      margin-right: 16px;
    }

    .seller-info {
      .brand-wrap {
        font-size: 16px;
        color: @whiteColor;
        font-weight: bold;
        .h-lh(18px);
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
        font-size: 10px;
        .h-lh(12px);
      }
    }
  }

  .bottom-part {
    background-color: rgba(7, 17, 27, 0.2);
    padding-right: 12px;

    .bulletin {
      color: @whiteColor;
      font-size: 10px;
      .h-lh(28px);
    }
  }
}
</style>
