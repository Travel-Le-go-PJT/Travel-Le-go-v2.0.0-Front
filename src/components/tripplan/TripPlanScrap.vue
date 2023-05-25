<template>
    <div id="scrap-container">
      <b-row>
        <b-col cols="3" id="selectedList">
          <form class="scrap-form" ref="writeForm" @submit.prevent="write">
            <b-form-group label="여행 제목" label-for="subject" invalid-feedback="제목을 입력해주세요.">
              <b-form-input id="subject" v-model="article.subject" ref="subject" required></b-form-input>
            </b-form-group>
            <b-form-group label="설명" label-for="content" invalid-feedback="내용을 입력해주세요.">
              <b-form-textarea rows="3" id="content" v-model="article.content" ref="content"
                required></b-form-textarea>
            </b-form-group>
          </form>
          <plan-area v-on:write="write" v-on:delete="deleteItem" v-on:reorder="reorder" :selected="selected"
          :isWrite="true"></plan-area>
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
    name: "TripPlanScrap",
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
            this.article.userId = this.userInfo.userId;
            this.article.subject="";
            this.article.content="";
            this.article.hit=0;
            this.article.registerTime=null;
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
      write() {
        let err = true;
        let msg = "";
        if (this.userInfo == null) {
            alert("로그인이 필요한 페이지입니다..");
            err = false;
            this.$router.push({ name: "login" });
            return;
        } else if (!this.article.subject.trim() && err) {
          msg = "제목을 입력해주세요";
          err = false;
          this.$refs.subject.focus();
        } else if (!this.article.content.trim() && err) {
          msg = "내용을 입력해주세요";
          err = false;
          this.$refs.content.focus();
        } 
        if (!err) alert(msg);
        else {
          let p = [];
          this.selected.forEach((s) => {
            p.push(s.contentId);
          });
          this.article.plan = p;
          let myData = this.article;
          http.post(`/tripPlanBoard/`, myData).then(({ data }) => {
            if (data.result == "SUCCESS") {
              this.$router.push("/tripplan/planlist");
            }
          });
        }
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