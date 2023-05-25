<template>
  <b-container class="boarddetail mb-5">
    <b-row>
      <b-col align="left">
        <div class="line justify-content-center sujectline"></div>
        <div class="article" id="subject">{{ article.subject }}</div>
        <b-icon icon="person-fill"></b-icon>&nbsp;
        <span class="article" id="userId">{{ article.userId }} &nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <span class="article" id="registerTime">{{ article.registerTime }}&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <b-icon icon="eye-fill"></b-icon>&nbsp;&nbsp;
        <span class="article" id="registerTime">{{ article.hit }}</span>
        <div class="line justify-content-center"></div>
        <div class="article" id="content">{{ article.content }}</div>
        <div class="line justify-content-center"></div>
        <div>댓글입니다.</div>
        <textarea></textarea>
        <div>
          <b-button
            type="button"
            class="btn-hover wbtn review color-3 m-4"
            @click="removeArticle(article.articleNo)"
          >댓글 달기</b-button>
        </div>
      </b-col>
    </b-row>
    <div v-if="this.userInfo.userId == this.article.userId || this.userInfo.userId ==`admin`">
      <div class="line justify-content-center"></div>
      <b-button
        type="button"
        class="btn-hover wbtn color-3 m-4"
        @click="removeArticle(article.articleNo)"
      >글 삭제하기</b-button>
      <b-button
        type="button"
        class="btn-hover wbtn m-4"
        @click="moveModify(article.articleNo)"
      >글 수정하기</b-button>
    </div>
  </b-container>
  <!-- <div class="hello">
    <b-table id="book-detail">
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
  </b-table>-->

  <!-- </div> -->
</template>

<script>
import { mapState } from "vuex";
import http from "@/api/http.js";
const userStore = "userStore";
export default {
  name: "TripInfoBoardDetail",
  data() {
    return {
      article: {},
      checkWriter: Boolean,
    };
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
  },
  created() {
    let no = this.$route.params.articleNo;
    this.boarddetail(no);
    if (
      this.userInfo.userId == this.article.userId &&
      this.userInfo.userId == "admin"
    ) {
      this.checkWriter = true;
    }
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

<style scoped>
@font-face {
  font-family: "omyu_pretty";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-01@1.0/omyu_pretty.woff2")
    format("woff2");
  font-weight: normal;
  font-style: normal;
}
.line {
  border-top: 1px solid #acacac;
  width: 100%;
  margin-top: 50px;
  margin-bottom: 50px;
}
.sujectline {
  border-top: 2px solid #616161 !important;
  width: 100%;
  margin-top: 50px;
  margin-bottom: 50px;
}
.boarddetail {
  font-family: omyu_pretty;
  width: 40%;

  /* font-size: 22px; */
}
#subject {
  font-size: 30px;
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
.review {
  margin: 0px !important;
  display: flex;
  float: right;
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
#content {
  font-weight: 300;
}
</style>