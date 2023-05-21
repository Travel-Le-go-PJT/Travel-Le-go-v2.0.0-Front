<template>
  <div class="boardList">
    <h1 id="title"></h1>
    <div>
      <button
        type="button"
        class="btn-hover color-3"
        @click="writeArticle(article.articleNo)"
      >
        글 쓰기
      </button>
    </div>
    <div>
      <table id="book-list">
        <colgroup>
          <col style="width: 10%" />
          <col style="width: 30%" />
          <col style="width: 10%" />
          <col style="width: 13%" />
          <col style="width: 20%" />
          <col style="width: 5%" />
          <col style="width: 5%" />
        </colgroup>
        <thead>
          <tr>
            <th>글번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>미리보기</th>
            <th>👍</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody id="item">
          <template v-for="(article, index) in articles">
            <trip-info-board-item
              :article="article"
              :index="index"
              :key="article.articleNo"
              @addtotcount="addTotalCount"
              @deleteitem="deleteItem"
            ></trip-info-board-item>
          </template>
        </tbody>
      </table>
    </div>
    <div>
      <span>내용 : {{ showContent }}</span>
    </div>
    <div id="recommend">
      <span>전체 추천 수 : {{ total }}</span>
    </div>
  </div>
</template>

<script>
import http from "@/api/http.js";
import TripInfoBoardItem from "@/components/tripinfo/TripInfoBoardItem.vue";
import Vue from "vue";
Vue.prototype.$EventBus = new Vue();
export default {
  name: "TripInfoBoardList",
  components: {
    TripInfoBoardItem,
  },
  data() {
    return {
      articles: [],
      showContent: "",
      total: 0,
      article: {},
    };
  },
  created() {
    this.$EventBus.$on("showContent", (val) => {
      this.showContent = val;
    });

    this.$EventBus.$on("preBoardDetail", (val) => {
      this.article = val;
    });
    this.boardList();
  },
  methods: {
    boardList() {
      http
        .get("/tripInfoBoard/")
        .then(({ data }) => {
          console.log("[여행정보]");
          console.log(data);
          this.articles = data;
        })
        .catch((error) => {
          console.log("[여행정보 에러]");
          console.log(error);
        });
    },
    addTotalCount() {
      this.total += 1;
    },
    deleteItem() {
      this.boardList();
    },
    writeArticle() {
      this.$router.push(`/tripinfo/write`);
    },
  },
};
</script>

<style scoped>
@font-face {
  font-family: "KCC-Jeongbeom";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2202@1.0/KCC-Jeongbeom.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "omyu_pretty";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-01@1.0/omyu_pretty.woff2")
    format("woff2");
  font-weight: normal;
  font-style: normal;
}

#title {
  font-family: KCC-Jeongbeom;
  color: #ff9900;
  width: 800px;
  text-align: center;
  margin: 0 auto;
}
/* #item :hover {
  background: #ff9900;
} */
#book-list tbody > tr {
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
#book-list thead > tr {
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
  background-image: linear-gradient(
    to right,
    #f3f04f,
    #ffb34f,
    #b6d66b,
    #bad737
  );
  box-shadow: 0 4px 15px 0 rgba(116, 79, 168, 0.75);
}
</style>
