<template>
  <div class="tripinfopage">
    <h1 id="title">🛫 여행 정보 공유 🛬</h1>
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

<style>
.tripinfopage {
  margin-top: 100px;
  font-weight: 600;
}
.navitem {
  color: #2790f9 !important;
}
#title {
  font-family: KCC-Jeongbeom;
  color: #2790f9;
  width: 600px;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 20px;
}
</style>
