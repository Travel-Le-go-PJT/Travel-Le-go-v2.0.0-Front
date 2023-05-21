<template>
  <div id="cardbox" class="col-md-3">
    <div id="card">
      <div class="card-header">{{ article.userId }}</div>
      <img class="card-img-top" src="" alt="">
      <div class="card-body">
        <h5 class="card-title">{{ article.subject }}</h5>
        <p class="card-text">{{ article.subject }}</p>
      </div>
      <div class="card-footer">
        <button type="button" @click="showArticle(article.articleNo)" class="btn-hover color-3">자세히보기</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TripPlanItem",
  props: {
    article: {},
  },
  filters: {
    showTime(value) {
      return (value + "").substring(0, 10);
    }
  },
  methods: {
    showArticle(no) {
      this.$router.push(`/tripplan/detail/${no}`);
    },
  }
}
</script>

<style scoped>
@font-face {
  font-family: "omyu_pretty";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-01@1.0/omyu_pretty.woff2") format("woff2");
  font-weight: normal;
  font-style: normal;
}

#cardbox {
  padding: 2px;
}

.card {
  float: left;
}

card-img-top {
  height: 800px;
}

.btn-hover {
  width: 100px;
  font-family: omyu_pretty;
  font-size: 21px;
  font-weight: 600;
  color: #ffffff;
  cursor: pointer;
  margin: 20px;
  height: max-content + 10px;
  text-align: center;
  border: none;
  background-size: 300% 100%;
  padding: 10px 0px;
  border-radius: 10px;
  moz-transition: all 0.4s ease-in-out;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
}

.btn-hover:hover {
  background-position: 100% 0;
  moz-transition: all 0.4s ease-in-out;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
}

.btn-hover:focus {
  outline: none;
}

.btn-hover.color-3 {
  background-image: linear-gradient(to right,
      #f3f04f,
      #fca533,
      #7dd66b,
      #bad737);
  box-shadow: 0 4px 15px 0 rgba(145, 79, 68, 0.75);
}
</style>
