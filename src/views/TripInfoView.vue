<template>
  <div class="board">
    <h1 id="board-list-title">🛫 여행 정보 🛬</h1>
    <!-- <nav>
      <router-link to="/tripinfo/list">글 목록 &nbsp; &nbsp;</router-link>|
      <router-link to="/board/write">&nbsp; &nbsp;글 쓰기 &nbsp; &nbsp;</router-link>|
      <router-link to="/board/gallery">&nbsp; &nbsp;갤러리</router-link>
    </nav>-->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "TripInfoView",
  components: {},
  data() {
    return {
      message: "",
    };
  },
  created() {},
  methods: {},
};
</script>

<style scoped>
h1 {
  margin: 30px;
}
</style>