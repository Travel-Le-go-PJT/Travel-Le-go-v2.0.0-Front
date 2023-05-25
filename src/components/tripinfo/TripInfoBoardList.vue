<template>
  <div class="boardList">
    <h1 id="title"></h1>
    <div id="header">
      <h6>다녀온 여행지에 대한 정보를 공유해보세요!</h6>
      <div id="searchBox">
        <b-form-input
          style="border-color: #2790f9; margin-right: 2px"
          v-model="keyword"
          type="text"
          ref="keyword"
          placeholder="검색어를 입력해주세요"
          required
        ></b-form-input>
        <b-button variant="primary">
          <b-icon-search></b-icon-search>
        </b-button>
      </div>
    </div>

    <div class="row" id="board"></div>
    <div>
      <b-button
        type="button"
        @click="writeArticle(article.articleNo)"
        class="btn-hover wbtn color-3 mt-4 mb-2 justify-content-right"
      >글 쓰기</b-button>
      <table id="book-list">
        <colgroup>
          <col style="width: 10%" />
          <col style="width: 23%" />
          <col style="width: 10%" />
          <col style="width: 13%" />
          <col style="width: 10%" />
        </colgroup>
        <thead>
          <tr>
            <th>글번호</th>
            <th class="subject">제목</th>
            <th>작성자</th>
            <th>작성일</th>
            <th>👍</th>
          </tr>
        </thead>
        <tbody id="item">
          <template v-for="(article, index) in paginatedArticles">
            <trip-info-board-item
              :article="article"
              :index="index"
              :key="article.articleNo"
              @deleteitem="deleteItem"
            ></trip-info-board-item>
          </template>
        </tbody>
      </table>
      <b-pagination
        pills
        size="sm"
        align="center"
        v-model="currentPage"
        :total-rows="articles.length"
        :per-page="perPage"
        aria-controls="item"
        class="mt-4"
      ></b-pagination>
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
      currentPage: 1,
      perPage: 10,
    };
  },
  computed: {
    paginatedArticles() {
      const startIndex = (this.currentPage - 1) * this.perPage;
      const endIndex = startIndex + this.perPage;
      return this.articles.slice(startIndex, endIndex);
    },
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
      this.$router.push(`/tripinfo/infowrite`);
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
  color: #2790f9;
  width: 800px;
  text-align: center;
  margin: 0 auto;
}
/* #item :hover {
  background: #ff9900;
} */

#board {
  width: 70vw;
  margin: 0 auto;
  border-radius: 0;
}

#searchBox {
  margin: 0 auto;
  display: flex;
  width: 250px;
}
#book-list tbody > tr {
  background: #ffffff;
  border-right: none;
  border-left: none;
}
.boardList {
  font-family: omyu_pretty;
  font-size: 20px;
}
#book-list {
  margin: auto;
  width: 50%;
  border-collapse: collapse;
}
#book-list thead > tr {
  /* border-top: ; */
  background: #ebf5ff;
  color: #303033;
  font-size: 20px;
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
  /* font-weight: bold; */
  width: 120px;
  display: inline-block;
  color: #000;
}

#book-list th,
#book-list td {
  text-align: center;

  font-weight: 400;
}

#book-list {
  color: #333;
  overflow: hidden;
}
#book-list tr {
  border-color: #bfbfbf;
}
.subject {
  float: left;
}
#book-list th,
#book-list td {
  padding: 0.5em 1em;
}
#recommend {
  margin: 5%;
  font-size: 50px;
}

.wbtn {
  background-color: #fff;
  border-color: #2790f9;
  color: #2790f9;
}
.wbtn:hover {
  background-color: #2790f9;
  border-color: #2790f9;
  color: #fff;
}
</style>
