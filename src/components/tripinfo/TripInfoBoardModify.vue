<template>
  <div class="hello">
    <form action="#none" method="post" id="_frmForm" name="frmForm" @submit.prevent="modifyArticle">
      <table id="book-detail">
        <tr>
          <th>작성자</th>
          <td>
            <input type="text" readonly v-model="article.userId" id="userId" ref="userId" />
          </td>
        </tr>
        <tr>
          <th>제목</th>
          <td>
            <input type="text" v-model="article.subject" id="subject" ref="subject" />
          </td>
        </tr>
        <tr>
          <th>내용</th>
          <td>
            <textarea rows="10" cols="50" v-model="article.content" id="content" ref="content"></textarea>
          </td>
        </tr>
      </table>
      <button type="button" class="btn-hover color-3" @click="getArticle(article.articleNo)">초기화</button>
      <button
        type="button"
        class="btn-hover color-3"
        @click="cancelModify(article.articleNo)"
      >수정 취소하기</button>
      <button type="submit" class="btn-hover color-3">수정 완료하기</button>
    </form>
  </div>
</template>

<script>
import http from "@/api/http";
export default {
  name: "TripInfoBoardModify",
  components: {},
  data() {
    return {
      article: {},
    };
  },
  created() {
    let no = this.$route.params.articleNo;
    console.log(no);
    this.getArticle(no);
  },
  methods: {
    getArticle(no) {
      http
        .get(`/tripInfoBoard/${no}`)
        .then(({ data }) => {
          console.log("[보드 수정 getArticle]");
          console.log(data);
          this.article = data;
          console.log(this.article);
        })
        .catch((error) => {
          console.log("[보드 수정 getArticle 에러]");
          console.log(error);
        });
    },
    modifyArticle() {
      let err = "true";
      let msg = "";
      if (!this.article.userId) {
        msg = "작성자를 입력해주세요";
        err = false;
        this.$refs.article.article.focuse();
      } else if (!this.article.content && err) {
        msg = "내용을 입력해주세요";
        err = false;
        this.$refs.article.content.focuse();
      } else if (!this.article.subject && err) {
        msg = "제목을 입력해주세요";
        err = false;
        this.$refs.article.subject.focuse();
      }
      if (!err) alert(msg);
      else {
        console.log("보드 수정하기 ");
        console.log(this.article);
        http.put(`/tripInfoBoard/`, this.article).then(({ data }) => {
          if (data != null) {
            alert("글 수정 성공");
            this.moveDetail(this.article.articleNo);
          }
        });
      }
    },
    moveDetail(no) {
      console.log(no);
      this.$router.push(`/tripinfo/detail/${no}`);
    },
    cancelModify(no) {
      if (confirm("수정을 취소하시겠습니까?")) {
        this.moveDetail(no);
      }
    },
  },
  filters: {},
};
</script>

<style scoped>
input {
  border: none;
  width: 100%;
  height: 20px;
}
.hello {
  font-family: Pretendard;
}
#book-detail {
  margin: auto;
  width: 70%;
  border-collapse: collapse;
}
#book-detail tr th {
  border-top: none;
  background: #fca118;
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
  font-family: Pretendard;
  width: 100%;
  height: 200px;
  padding: 10px;
  box-sizing: border-box;
  border: solid 2px #fffeed;
  border-radius: 5px;
  font-size: 16px;
  resize: both;
}

.btn-hover {
  width: 100px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
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
    #ffb34f,
    #b6d66b,
    #bad737
  );
  box-shadow: 0 4px 15px 0 rgba(145, 79, 68, 0.75);
}
</style>