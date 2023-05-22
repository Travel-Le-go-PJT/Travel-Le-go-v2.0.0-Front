<template>
  <div>

    <table id="book-detail">
      <tr>
        <th>제목</th>
        <td><input type="text" v-model="article.subject" id="subject" ref="subject" /></td>
      </tr>
      <tr>
        <th>내용</th>
        <td><textarea rows="5" cols="50" v-model="article.content" id="content" ref="content"></textarea></td>
      </tr>
    </table>
    <b-row>
      <b-col></b-col>
      <b-col cols="3" id="myPlan"><plan-area v-on:delete="deleteItem" :selected="selected"></plan-area></b-col>
      <b-col cols="7">
        <map-search-bar v-on:search="search"></map-search-bar>
        <b-row>
          <b-col cols="7" align="left">
            <map-component :lists="results" :level="10" :selected="selected" />
          </b-col>
          <b-col cols="5">
            <map-list v-on:select="select" :lists="results" />
          </b-col>
        </b-row>
      </b-col>
      <b-col></b-col>
    </b-row>
    <div class="m-4">
      <b-button type="button" variant="primary" class="btn-hover color-3" @click="modify">수정 완료</b-button>
      <b-button type="button" variant="secondary" class="btn-hover color-3"
        @click="getArticle(article.articleNo)">초기화</b-button>
      <b-button type="button" variant="danger" class="btn-hover color-3" @click="cancel">취소</b-button>
    </div>
  </div>
</template>
  
<script>
import http from "@/api/http";
import MapSearchBar from "@/components/map/MapSearchBar.vue";
import MapComponent from "@/components/map/MapComponent.vue";
import MapList from '@/components/map/MapListForPlan.vue';
import PlanArea from '@/components/tripplan/PlanArea.vue';
export default {
  name: "TripPlanModify",
  components: {
    MapComponent,
    MapList,
    MapSearchBar,
    PlanArea
  },
  data() {
    return {
      results: [],
      selected: [],
      planNums: [],
      article: {}
    }
  },
  created() {
    let no = this.$route.params.articleNo;
    this.getArticle(no);
  },
  methods: {
    getArticle(no) {
      http
        .get(`/tripPlanBoard/${no}`)
        .then(({ data }) => {
          this.article = data;
          this.planNums = this.article.plan;
          this.selected = [];
          this.getArticleInfos();
        })
        .catch(() => {
        });
    },
    getArticleInfos() {

      const promises = this.planNums.map((p) => {
        return http.get(`/attraction/${p}`)
          .then(({ data }) => data)
          .catch(() => null);
      });


      Promise.all(promises)
        .then((results) => {
          results.forEach((data) => {
            this.selected.push(data);
          });
        })
        .catch(() => {
        });
    },
    search(searchData) {
      http.post("/attraction/search", searchData)
        .then(({ data, status }) => {
          if (status == 204) {
            this.results = [];
          } else {
            this.results = data;
          }
        })
        .catch(() => {

        })
    },
    select(attraction) {
      this.selected.push(attraction);
    },
    deleteItem(selected) {
      this.selected = selected;
    },
    modify() {
      let err = true;
      let msg = "";
      if (!this.article.subject && err) {
        msg = "제목을 입력해주세요";
        err = false;
        this.$refs.article.subject.focus();
      } else if (!this.article.content && err) {
        msg = "내용을 입력해주세요";
        err = false;
        this.$refs.article.content.focus();
      } else if (this.selected.length == 0 && err) {
        msg = "여행할 관광지를 하나 이상 추가해주세요";
        err = false;
      }
      if (!err) alert(msg);
      else {
        let p = [];
        this.selected.forEach((s) => {
          p.push(s.contentId);
        });
        this.article.plan = p;
        let myData = this.article;
        http.put(`/tripPlanBoard/`, myData).then(({ data }) => {
          if (data != null) {
            alert("글 수정 성공");
            this.$router.push(`/tripplan/plandetail/${this.article.articleNo}`);
          }
        });
      }
    },
    cancel() {
      this.$router.push(`/tripplan/plandetail/${this.article.articleNo}`);
    }
  }
}
</script>
  
<style scoped>
#myPlan {
  max-height: 700px;
  overflow-y: auto
}

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
  background-image: linear-gradient(to right,
      #f3f04f,
      #ffb34f,
      #b6d66b,
      #bad737);
  box-shadow: 0 4px 15px 0 rgba(145, 79, 68, 0.75);
}
</style>