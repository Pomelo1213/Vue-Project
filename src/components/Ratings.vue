<template>
  <div class="ratings" ref="ratings">
    <div class="inner">
      <div class="ratings-header">
        <div class="left-part">
          <div class="seller-score">{{ seller.score }}</div>
          <div class="graph">综合评分</div>
          <div class="rank-rate">高于周边商家{{ seller.rankRate }}%</div>
        </div>
        <div class="right-part">
          <div class="service-score">
            <span>服务态度</span>
            <v-star :classType="36" :score="seller.serviceScore"></v-star>
            <span>{{ seller.serviceScore }}</span>
          </div>
          <div class="food-score">
            <span>美味程度</span>
            <v-star :classType="36" :score="seller.foodScore"></v-star>
            <span>{{ seller.foodScore }}</span>
          </div>
          <div class="delivery-time">
            <span>送达时间</span>
            <span>{{ seller.deliveryTime }}分钟</span>
          </div>
        </div>
      </div>
      <v-split></v-split>
      <v-rating-select
        :recText="'满意'"
        :disText="'不满意'"
        :ratings="ratings"
        v-on:select="handleSelectClick"
      ></v-rating-select>

      <ul class="rating-list" v-if="selectRatings">
        <li
          class="rating-li"
          v-for="rating in selectRatings"
          :key="rating.rateTime"
        >
          <div class="user-info">
            <div class="info">
              <img :src="rating.avatar" />
              <div class="info-inner">
                <span class="username">{{ rating.username }}</span>
                <v-star :classType="24" :score="rating.score"></v-star>
              </div>
            </div>
            <div class="time">{{ rating.rateTime }}</div>
          </div>
          <div class="user-msg-wrap">
            <div class="user-msg">{{ rating.text }}</div>
            <div class="icon-wrap">
              <span class="icon-thumb_up" v-if="rating.rateType === 0"></span>
              <span
                class="icon-thumb_down"
                v-else-if="rating.rateType === 1"
              ></span>
              <ul class="recommend">
                <li v-for="r in rating.recommend" :key="r">{{ r }}</li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BetterScroll from "better-scroll";
import Star from "./Star.vue";
import RatingSelect from "./RatingSelect.vue";
import Split from "./Split.vue";
export default {
  props: {
    seller: {
      type: Object
    }
  },
  data: function() {
    return {
      ratings: [],
      selectRatings: []
    };
  },
  components: {
    "v-rating-select": RatingSelect,
    "v-split": Split,
    "v-star": Star
  },
  created: function() {
    this.$http.get("/api/ratings").then(res => {
      const ratingsData = res.body.ratings;
      this.ratings = ratingsData;
      this.$nextTick(() => {
        this._initScroll();
      });
    });
  },
  methods: {
    handleSelectClick: function(ratings) {
      this.selectRatings = ratings;
    },
    _initScroll: function() {
      if (!this.ratingScroll) {
        this.ratingScroll = new BetterScroll(this.$refs.ratings, {
          click: true
        });
      } else {
        this.ratingScroll.refresh();
      }
    }
  }
};
</script>

<style lang="less">
@import "../assets/global.less";
.ratings {
  position: absolute;
  width: 100%;
  left: 0;
  top: 174px;
  bottom: 0;
  overflow: hidden;
  .inner {
    .ratings-header {
      .flex();
      .left-part {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 18px 24px;
        position: relative;

        &::after {
          position: absolute;
          display: block;
          width: 1px;
          height: calc(100% - 36px);
          content: "";
          top: 50%;
          transform: translateY(-50%);
          right: 0;
          background-color: rgba(7, 17, 27, 0.1);
        }

        .seller-score {
          font-size: 24px;
          color: #f19d38;

          .h-lh(28px);
        }
        .graph {
          margin-top: 6px;
          font-size: 12px;
          color: rgb(7, 17, 27);
          .h-lh(12px);
        }
        .rank-rate {
          margin-top: 8px;
          font-size: 10px;
          color: rgba(7, 17, 27, 0.5);
          .h-lh(10px);
        }
      }
      .right-part {
        padding: 18px 24px;
        .service-score,
        .food-score,
        .delivery-time {
          .flex();

          > span:first-child {
            color: rgb(7, 17, 27);
            font-size: 12px;
            .h-lh(18px);
            margin-right: 6px;
          }
        }

        .service-score {
          > span:last-child {
            color: #f19d38;
            font-size: 12px;
            margin-left: 6px;
          }
        }

        .food-score {
          margin-top: 8px;
          > span:last-child {
            color: #f19d38;
            font-size: 12px;
            margin-left: 6px;
          }
        }

        .delivery-time {
          margin-top: 8px;

          > span:last-child {
            font-size: 12px;
            color: rgb(147, 153, 159);
            .h-lh(18px);
          }
        }
      }
    }

    .rating-list {
      font-size: 10px;

      .rating-li {
        width: 100%;
        padding: 18px;
        box-sizing: border-box;
        position: relative;

        &::after {
          position: absolute;
          width: calc(100% - 36px);
          height: 1px;
          background: rgba(7, 17, 27, 0.1);
          display: block;
          left: 50%;
          transform: translateX(-50%);
          bottom: 0;
        }

        .user-info {
          .flex();
          justify-content: space-between;

          .info {
            .flex();
            > img {
              .size(28px);
              border-radius: 50%;
              margin-right: 12px;
            }

            .info-inner {
              .username {
                font-size: 10px;
                .h-lh(12px);
                color: rgb(7, 17, 27);
              }
            }
          }

          .time {
            font-weight: 200;
            color: rgb(147, 153, 159);
            .h-lh(12px);
          }
        }

        .user-msg-wrap {
          padding-left: 40px;
          .user-msg {
            margin-top: 6px;
            font-size: 12px;
            line-height: 18px;
            color: rgb(7, 17, 27);
          }

          .icon-wrap {
            margin-top: 8px;
            display: flex;
            align-items: flex-start;

            .icon-thumb_down,
            .icon-thumb_up {
              font-size: 12px;
              margin-right: 8px;
              position: relative;
              top: 2px;
            }

            .icon-thumb_up {
              color: rgb(0, 160, 220);
            }
            .icon-thumb_down {
              color: rgb(183, 187, 191);
            }

            .recommend {
              .flex();
              flex-wrap: wrap;

              > li {
                padding: 0 6px;
                color: rgb(147, 153, 159);
                font-size: 9px;
                .h-lh(16px);
                border: 1px solid rgba(7, 17, 27, 0.1);
                border-radius: 1px;
                background-color: @whiteColor;
                margin-right: 8px;
                margin-bottom: 4px;
                max-width: 60px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
        }
      }
    }
  }
}
</style>
