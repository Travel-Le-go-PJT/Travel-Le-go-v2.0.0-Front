<template>
  <div class="userpage">
    <h1></h1>
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
.userpage {
  margin-top: 150px;
}
</style>
