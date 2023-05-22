<template>
  <div class="boardGallery">
    <div id="header">
      <h6>가고 싶은 여행지를 검색해보세요!</h6>
      <div id="searchBox">
        <b-form-input v-model="keyword"  type="text" ref="keyword" placeholder="검색어를 입력해주세요"
          @keydown.enter="searchMap" required>
        </b-form-input>
        <b-button variant="primary"><b-icon-search></b-icon-search></b-button>
      </div>
      <b-button @click="write" class="btn-hover color-3 mt-4 mb-3">글쓰기</b-button>
    </div>
    <div class="row" id="board">
      <template v-for="(article, index) in articles">
        <trip-plan-item :article="article" :key="index"></trip-plan-item>
      </template>
    </div>
  </div>
</template>
<script>
import http from "@/api/http.js"
import TripPlanItem from "@/components/tripplan/TripPlanItem.vue"
export default {
  name: "TripPlanList",
  components: {
    TripPlanItem

  },
  data() {
    return {
      articles: [],
    }
  },
  created() {
    http.get('/tripPlanBoard/')
      .then(({ data }) => {
        this.articles = data;
      }).catch((error) => {
        console.log(error);
      });

  },
  methods: {
    write() {
      this.$router.push({ name: 'write', params: this.writeArticle });
    },
  }

}
</script>

<style scoped>
@font-face {
  font-family: "KCC-Jeongbeom";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2202@1.0/KCC-Jeongbeom.woff") format("woff");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "omyu_pretty";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-01@1.0/omyu_pretty.woff2") format("woff2");
  font-weight: normal;
  font-style: normal;
}
#board{
  width: 70vw;
  margin: 0 auto;
}

#searchBox{
  margin: 0 auto;
  display: flex;
  width:200px
}

#title {
  font-family: KCC-Jeongbeom;
  color: #ff9900;
  width: 450px;
  text-align: center;
  margin: 0 auto;
}

#item :hover {
  background: #ff9900;
}

#book-list tbody>tr {
  background: #fffeed;
}

.boardList {
  font-family: omyu_pretty;
  font-size: 20px;
}

#book-list {
  margin: auto;
  width: 70%;
  border-collapse: collapse;
}

#book-list thead>tr {
  border-top: none;
  background: #fca118;
  color: #fff;
  font-size: 25px;
}

#book-list tr {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  background-color: #fffeed;
}

/* #book-list tr:nth-child(odd):not(:first-child) {
  background-color: #fffeed;
} */

#book-list td:first-child {
  margin-top: 0.5em;
}

#book-list td:last-child {
  margin-bottom: 0.5em;
}

#book-list td:before {
  font-weight: bold;
  width: 120px;
  display: inline-block;
  color: #000;
}

#book-list th,
#book-list td {
  text-align: center;
}

#book-list {
  color: #333;
  border-radius: 0.4em;
  overflow: hidden;
}

#book-list tr {
  border-color: #bfbfbf;
}

#book-list th,
#book-list td {
  padding: 0.5em 1em;
}

#recommend {
  margin: 5%;
  font-size: 50px;
}

.btn-hover.color-3 {
  background-image: linear-gradient(to right,
      #f3f04f,
      #ffb34f,
      #b6d66b,
      #bad737);
  box-shadow: 0 4px 15px 0 rgba(116, 79, 168, 0.75);
}

/* #preShow {
  margin: auto;
  width: 70%;
  border-collapse: collapse;
}
#preShow tr th {
  border-top: none;
  background: #ff9f20;
  color: #fff;
}

#preShow tr {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  background-color: #fffeed;
}

#preShow tr:nth-child(odd):not(:first-child) {
  background-color: #fffeed;
}

#preShow td:first-child {
  margin-top: 0.5em;
}
#preShow td:last-child {
  margin-bottom: 0.5em;
}

#preShow td:before {
  font-weight: bold;
  width: 120px;
  display: inline-block;
  color: #000;
}

#preShow th,
#preShow td {
  text-align: center;
}

#preShow {
  color: #333;
  border-radius: 0.4em;
  overflow: hidden;
}
#preShow tr {
  border-color: #bfbfbf;
}

#preShow th,
#preShow td {
  padding: 0.5em 2em;
}
textarea {
  font-family: omyu_pretty;
  width: 100%;
  height: 200px;
  padding: 10px;
  box-sizing: border-box;
  border: solid 2px #f8f4fd;
  border-radius: 5px;
  font-size: 16px;
  resize: both;
} */</style>