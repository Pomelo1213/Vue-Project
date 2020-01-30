<template>
  <div class="ratings">
    <div class="inner">
      <div class="ratings-header"></div>
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
import Star from "./Star.vue";
import RatingSelect from "./RatingSelect.vue";
import Split from "./Split.vue";
export default {
  props: {},
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
    });
  },
  methods: {
    handleSelectClick: function(ratings) {
      console.log("ratings-->", ratings);
      this.selectRatings = ratings;
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
  .inner {
    .rating-header {
    }

    .rating-list {
      font-size: 10px;

      .rating-li {
        width: 100%;
        padding: 18px;
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
