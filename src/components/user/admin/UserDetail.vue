<template>
  <div class="hello">
    <table id="book-detail">
      <tr>
        <th>번호</th>
        <td v-text="article.articleNo"></td>
      </tr>
      <tr>
        <th>작성자</th>
        <td v-text="article.userId"></td>
      </tr>
      <tr>
        <th>제목</th>
        <td v-text="article.subject"></td>
      </tr>
      <tr>
        <th>등록일</th>
        <td>{{ article.registerTime | showTime }}</td>
      </tr>
      <tr>
        <th>조회수</th>
        <td v-text="article.hit"></td>
      </tr>
      <tr>
        <th>내용</th>
        <td>
          <textarea rows="10" cols="50" v-text="article.content" readonly></textarea>
        </td>
      </tr>
    </table>

    <button type="button" class="btn-hover color-3" @click="removeArticle(article.articleNo)">글 삭제하기</button>
    <button type="button" class="btn-hover color-3" @click="moveModify(article.articleNo)">글 수정하기</button>
  </div>
</template>

<script>
import http from "@/api/http.js";
export default {
  name: "UserDetail",
  data() {
    return {
      article: {},
    };
  },
  created() {
    let no = this.$route.params.articleNo;
    this.boarddetail(no);
  },
  methods: {
    boarddetail(no) {
      http
        .get(`/tripInfoBoard/${no}`)
        .then(({ data }) => {
          console.log("[보드 디테일]=================================");
          console.log(data);
          this.article = data;
          console.log(this.article);
        })
        .catch((error) => {
          console.log("[보드 디테일 에러]");
          console.log(error);
        });
    },
    removeArticle(no) {
      http.delete(`/tripInfoBoard/${no}`).then(({ data }) => {
        if (data != null) {
          alert("글 삭제 성공");
          this.moveList();
        }
      });
    },
    moveList() {
      this.$router.push(`/tripinfo/infolist`);
    },
    moveModify(no) {
      this.$router.push(`/tripinfo/infomodify/${no}`);
    },
  },
  filters: {
    showTime(value) {
      return (value + "").substring(0, 10) + " ";
    },
  },
};
</script>

<style scope>
@font-face {
  font-family: "omyu_pretty";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-01@1.0/omyu_pretty.woff2")
    format("woff2");
  font-weight: normal;
  font-style: normal;
}
.hello {
  font-family: omyu_pretty;
  font-size: 22px;
}
#book-detail {
  margin: auto;
  width: 70%;
  border-collapse: collapse;
}
#book-detail tr th {
  border-top: none;
  background: #ff9f20;
  color: #fff;
}

#book-detail tr {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  background-color: #fffeed;
}

#book-detail tr:nth-child(odd):not(:first-child) {
  background-color: #fffeed;
}

#book-detail td:first-child {
  margin-top: 0.5em;
}
#book-detail td:last-child {
  margin-bottom: 0.5em;
}

#book-detail td:before {
  font-weight: bold;
  width: 120px;
  display: inline-block;
  color: #000;
}

#book-detail th,
#book-detail td {
  text-align: center;
}

#book-detail {
  color: #333;
  border-radius: 0.4em;
  overflow: hidden;
}
#book-detail tr {
  border-color: #bfbfbf;
}

#book-detail th,
#book-detail td {
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
  font-size: 20px;
  resize: both;
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
  background-image: linear-gradient(
    to right,
    #f3f04f,
    #fca533,
    #7dd66b,
    #bad737
  );
  box-shadow: 0 4px 15px 0 rgba(145, 79, 68, 0.75);
}
</style>