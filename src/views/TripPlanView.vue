<template>
  <div id="container">
    <h1 id="title">여행 계획</h1>
    <router-view></router-view>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
@font-face {
  font-family: "KCC-Jeongbeom";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2202@1.0/KCC-Jeongbeom.woff") format("woff");
  font-weight: normal;
  font-style: normal;
}

#container {
  padding: 20px;
}

#title {
  font-family: KCC-Jeongbeom;
  color: #ff9900;
  width: 450px;
  text-align: center;
  margin: 0 auto;
}
</style>