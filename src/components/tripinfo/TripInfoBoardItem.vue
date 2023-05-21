<template>
  <tr striped hover>
    <td v-text="index+1" @click="showArticle(article.articleNo)"></td>
    <td v-text="article.subject" @click="showArticle(article.articleNo)"></td>
    <td v-text="article.userId" @click="showArticle(article.articleNo)"></td>
    <td @click="showArticle(article.articleNo)">{{ article.registerTime | showTime }}</td>
    <td @click="showArts(article.content)">미리보기</td>
    <td @click="addCount()">👍{{count}}</td>
    <td>
      <button type="submit" class="btn-hover color-3" @click="deleteitem(article.articleNo)">삭제</button>
    </td>
  </tr>
</template>

<script>
import http from "@/api/http.js";
import Vue from "vue";
Vue.prototype.$EventBus = new Vue();
export default {
  name: "TripInfoBoardItem",
  props: {
    article: {},
    index: Number,
  },
  data() {
    return { count: 0 };
  },
  methods: {
    showArticle(no) {
      console.log("---------------------->" + no);
      this.$router.push(`/tripinfo/detail/${no}`);
    },
    showArts(content) {
      console.log(content);
      this.$EventBus.$emit("showContent", content);
    },
    addCount() {
      this.count += 1;
      this.$emit("addtotcount");
    },
    deleteitem(no) {
      console.log(no);
      http.delete(`/tripInfoBoard/${no}`).then(({ data }) => {
        if (data != null) {
          alert("글 삭제 성공");
          this.$emit("deleteitem");
        }
      });
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
#title {
  color: #ff9900;
}
.boardList {
  font-family: Pretendard;
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
.btn-hover {
  width: 100px;
  font-family: omyu_pretty;
  font-size: 20px;
  font-weight: 600;
  color: #000000;
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
  /* box-shadow: 0 4px 15px 0 rgba(116, 79, 168, 0.75); */
}
</style>
