<template>
  <div class="board">
    <h1>🙋‍♂️ 사용자 관리페이지 🙋‍♀️</h1>
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
h1 {
  margin: 30px;
}
</style>
