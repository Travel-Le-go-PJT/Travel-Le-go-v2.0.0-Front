<template>
  <div class="adminpage">
    <h1 id="title">🙋‍♂️ 사용자 관리페이지 🙋‍♀️</h1>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "AdminView",
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
.adminpage {
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
