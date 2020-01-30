<template>
  <div class="rating-select">
    <div class="tab-select">
      <div
        class="all"
        :class="currentType === 'all' ? 'active' : ''"
        @click="handleSelectAllClick"
      >
        <span>全部</span>
        <span>{{ ratings.length }}</span>
      </div>
      <div
        class="rec"
        :class="currentType === 'rec' ? 'active' : ''"
        @click="handleSelectRecClick"
      >
        <span>{{ recText }}</span>
        <span>{{ recRatingsNum }}</span>
      </div>
      <div
        class="dis"
        :class="currentType === 'dis' ? 'active' : ''"
        @click="handleSelectDisClick"
      >
        <span>{{ disText }}</span>
        <span>{{ disRatingsNum }}</span>
      </div>
    </div>
    <div class="check-select" @click="handleCheckClick">
      <span class="icon-check_circle" :class="isChecked ? 'active' : ''"></span>
      <span>只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
const SELECT_ALL = "all";
const SELECT_REC = "rec";
const SELECT_DIS = "dis";
export default {
  props: {
    recText: {
      type: String
    },
    disText: {
      type: String
    },
    ratings: {
      type: Array
    }
  },
  data: function() {
    return {
      isChecked: false,
      currentType: SELECT_ALL
    };
  },
  created: function() {
    // 默认选中
    this.$watch("ratings", () => {
      this.$emit("select", this.ratings);
    });
  },
  computed: {
    recRatingsNum: function() {
      return this.ratings.filter(r => r.rateType === 0).length;
    },
    disRatingsNum: function() {
      return this.ratings.filter(r => r.rateType === 1).length;
    }
  },
  methods: {
    handleSelectAllClick: function() {
      this.currentType = SELECT_ALL;
      const selectRatings = this._processRatingData();
      this.$emit("select", selectRatings);
    },
    handleSelectRecClick: function() {
      this.currentType = SELECT_REC;
      const selectRatings = this._processRatingData();
      this.$emit("select", selectRatings);
    },
    handleSelectDisClick: function() {
      this.currentType = SELECT_DIS;
      const selectRatings = this._processRatingData();
      this.$emit("select", selectRatings);
    },
    handleCheckClick: function() {
      this.isChecked = !this.isChecked;
      let selectRatings = this._processRatingData();
      if (this.isChecked) {
        selectRatings = selectRatings.filter(r => r.text !== "");
      }
      this.$emit("select", selectRatings);
    },
    _processRatingData: function() {
      const ruleMp = {
        all: r => r,
        rec: r => r.rateType === 0,
        dis: r => r.rateType === 1
      };
      const ratings = this.ratings.filter(ruleMp[this.currentType]);
      return ratings;
    }
  }
};
</script>

<style lang="less">
@import "../assets/global.less";
.rating-select {
  font-size: 12px;

  .tab-select {
    .flex();
    padding: 12px 18px 18px 18px;
    position: relative;

    &::after {
      display: block;
      content: "";
      width: calc(100% - 36px);
      height: 1px;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 0;
      background-color: rgba(7, 17, 27, 0.1);
    }

    .all,
    .rec {
      background-color: rgb(210, 235, 246);
      &.active {
        background-color: rgb(0, 160, 220);
      }
    }

    .dis {
      background-color: rgb(233, 235, 246);
      &.active {
        background-color: rgb(77, 85, 93);
      }
    }

    .all,
    .rec,
    .dis {
      padding: 8px 12px;
      color: rgb(77, 85, 93);
      > span:first-child {
        font-size: 12px;
      }
      > span:last-child {
        font-size: 8px;
      }

      margin-right: 8px;

      &.active {
        color: @whiteColor;
      }
    }
  }

  .check-select {
    padding: 12px 0 12px 18px;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    .flex();
    .icon-check_circle {
      font-size: 24px;
      color: rgb(147, 153, 159);
      margin-right: 4px;

      &.active {
        color: rgb(0, 160, 220);
      }

      & + span {
        font-size: 12px;
        color: rgb(147, 153, 159);
        .h-lh(24px);
      }
    }
  }
}
</style>
