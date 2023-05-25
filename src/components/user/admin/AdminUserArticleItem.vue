<template>
  <tr striped hover>
    <td v-text="category"></td>
    <td v-text="article.articleNo"></td>
    <td v-text="article.subject"></td>
    <td>
      <button
        type="submit"
        class="btn-hover wbtn color-3"
        @click="movepage(article.articleNo)"
      >자세히보기</button>
    </td>
  </tr>
</template>

<script>
export default {
  name: "AdminUserArticleItem",
  props: {
    article: {},
    category: String,
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    movepage(no) {
      if (this.category == "Plan") {
        this.movePlanDetailpage(no);
      } else {
        this.moveInfoDetailpage(no);
      }
    },
    movePlanDetailpage(no) {
      this.$router.push(`/tripplan/plandetail/${no}`);
    },
    moveInfoDetailpage(no) {
      this.$router.push(`/tripinfo/infodetail/${no}`);
    },
  },
};
</script>

<style scoped>
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
.subject {
  float: left;
}
#book-list td {
  text-align: center;
  font-size: 90%;
  color: #5e5e5e;
  font-weight: 100;
}

#book-list th,
#book-list td {
  padding: 0.5em 1em;
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
