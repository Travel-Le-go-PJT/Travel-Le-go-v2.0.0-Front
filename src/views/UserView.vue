<template>
  <div class="board">
    <h1>🙋‍♂️ User 🙋‍♀️</h1>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "UserView",
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
