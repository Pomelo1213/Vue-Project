<template>
  <div>i am Rating</div>
</template>

<script>
export default {
  created: function() {
    this.$http.get("/api/ratings").then(res => {
      const ratingsData = res.body.ratings;
      console.log("ratings-->", ratingsData);
    });
  }
};
</script>

<style></style>
