<template>
  <div id="modify-container">
    <b-row>
      <b-col cols="3" id="selectedList">
        <form class="modify-form" ref="writeForm" @submit.prevent="write">
          <b-form-group label="여행 제목" label-for="subject" invalid-feedback="제목을 입력해주세요.">
            <b-form-input id="subject" v-model="article.subject" ref="subject" required></b-form-input>
          </b-form-group>
          <b-form-group label="설명" label-for="content" invalid-feedback="내용을 입력해주세요.">
            <b-form-textarea rows="5" id="content" v-model="article.content" ref="content"
              required></b-form-textarea>
          </b-form-group>
        </form>
        <plan-area v-on:delete="deleteItem" v-on:reorder="reorder" :selected="selected"
        ></plan-area>
      </b-col>
      <b-col cols="9">
        <map-search-bar v-on:search="search"></map-search-bar>
        <b-row>
          <b-col cols="7" align="left" id="map">
            <map-component :lists="results" :level="level" :selected="selected" :center="center" />
          </b-col>
          <b-col cols="5" id="searchedList">
            <map-list v-on:select="select" v-on:showCenter="showCenter" :lists="results" />
          </b-col>
        </b-row>
      </b-col>
      <b-col></b-col>
    </b-row>
    <div class="m-4">
      <b-button type="button" variant="primary" class="mr-2" @click="modify">수정 완료</b-button>
      <b-button type="button" variant="outline-danger" class="mr-2" style="box-shadow: none; "
        @click="getArticle(article.articleNo)">초기화</b-button>
      <b-button type="button" variant="danger" class="" @click="cancel">취소</b-button>
    </div>
  </div>
</template>
  
<script>
import http from "@/api/http";
import MapSearchBar from "@/components/map/MapSearchBar.vue";
import MapComponent from "@/components/map/MapComponent.vue";
import MapList from '@/components/map/MapList.vue';
import PlanArea from '@/components/tripplan/PlanArea.vue';
import { mapState } from "vuex";
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
      article: {},
      center: null,
      level:10
    }
  },
  created() {
    let no = this.$route.params.articleNo;
    this.getArticle(no);
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
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
      console.log("QDWDA");
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
            this.level=10;
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
      if (this.article.userId != this.userInfo.userId || this.userInfo.userId==null) {
        alert("권한이 없습니다..");
        this.$router.push("/");
        return;
      } else if (!this.article.subject && err) {
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
    },
    showCenter(attraction) {
      this.level=5;
      this.center = attraction;
    },
    reorder(newSelected) {
      this.selected = newSelected;
    }
  }
}
</script>
  
<style scoped>

#modify-container{
  font-family:omyu_pretty;
  font-size:20px;
}
#myPlan {
  max-height: 700px;
  overflow-y: auto
}

#map {
  height: 70vh;
}

#searchedList {
  height: 70vh;
}

#selectedList {
  height: 75.6vh;
  overflow-y: auto;
}

.modify-form{
  border-radius: 10px;
    background-color: #f5f5f5;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 10px;
}
</style>