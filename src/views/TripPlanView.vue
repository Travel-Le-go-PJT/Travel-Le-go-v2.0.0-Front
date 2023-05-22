<template>
  <div id="container">
    <div>
      <h1 id="title">당신의 여행 계획을 공유해보세요!</h1>
    </div>
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
  width: 600px;
  text-align: center;
  margin: 0 auto;
}
</style>