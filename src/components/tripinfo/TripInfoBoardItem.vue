<template>
  <tr class="table-striped" @click="showArticle(article.articleNo)">
    <td>{{ index + 1 }}</td>
    <td class="subject" v-if="index < 5">
      {{ article.subject }} <b-button id="new" disabled>new</b-button>
    </td>
    <td class="subject" v-else>
      {{ article.subject }}
    </td>
    <td>{{ article.userId }}</td>
    <td>{{ article.registerTime }}</td>
    <td>{{ article.hit }}</td>
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
      this.$router.push(`/tripinfo/infodetail/${no}`);
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
#new {
  background-color: red;
  font-size: 60%;
  border: none;
  padding: 0.8px;
  margin-left: 8px;
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
</style>
