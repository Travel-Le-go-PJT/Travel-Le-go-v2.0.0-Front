<template>
  <div class="cardbox col-md-4 pb-5">
    <div class="card">
      <img class="card-img-top" src="" alt="" />
      <div class="card-body">
        <h2 class="card-title">{{ article.subject }}</h2>
        <p class="card-text"><b-icon icon="person-fill"></b-icon><strong> {{ article.userId }}</strong></p>
        <p class="card-text"><b-icon icon="calendar2-date"></b-icon> {{article.registerTime | showTime}}</p>
        <p class="card-text"><b-icon icon="eye-fill"></b-icon>{{ "\t" + article.hit }}</p>
        <div class="row pt-3 d-flex justify-content-center align-items-center">
          <div class="col-6 ">
            <b-button class="card-button" variant="outline-info" @click="showArticle(article.articleNo)" >
              자세히보기
            </b-button>
          </div>
          <div class="col-6 ">
            <b-button class="card-button"  variant="outline-danger" @click="favorite(article.articleNo)">
              <b-icon :icon="favoriteIcon"></b-icon><span style="font-size: 20px; text-align: center;"> {{favoriteCount}}</span>
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import http from "@/api/http.js";
export default {
  name: "TripPlanItem",
  data() {
    return {
      favoriteIcon: "heart",
      isFavorite: false,
      favoriteCount: 0
    };
  },
  mounted() {
    if(this.userInfo != null){
      let myData = {
        articleNo: this.article.articleNo,
        userId: this.userInfo.userId,
      };
      http
        .get("/tripPlanBoard/favorite", {
          params: myData,
        })
        .then(({ data }) => {
          if (data) {
            this.isFavorite = true;
            this.favoriteIcon = "heart-fill";
          } else {
            this.isFavorite = false;
            this.favoriteIcon = "heart";
          }
        })
        .catch(() => { });
    }
      http.get(`/tripPlanBoard/favorite/${this.article.articleNo}`)
                .then(({ data }) => {
                    this.favoriteCount = data;
                }).catch(() => {

            });
  },
  props: {
    article: {},
    articleKey: {},
  },
  filters: {
    showTime(value) {
      return (value + "").substring(0, 10);
    },
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),

  },
  methods: {
    showArticle(no) {
      this.$router.push(`/tripplan/plandetail/${no}`);
    },
    favorite(no) {
      let myData = {
        articleNo: no,
        userId: this.userInfo.userId,
      };
      if (this.isFavorite) {
        http
          .delete("/tripPlanBoard/favorite", {
            params: myData,
          })
          .then(({ data }) => {
            if (data.result == "SUCCESS") {
              this.isFavorite = false;
              this.favoriteIcon = "heart";
              this.favoriteCount -= 1;
            }
          });
      } else {
        http.post("/tripPlanBoard/favorite", myData).then(({ data }) => {
          if (data.result == "SUCCESS") {
            this.isFavorite = true;
            this.favoriteIcon = "heart-fill";
            this.favoriteCount += 1;  
          }
        });
      }
    },
  },

};
</script>

<style scoped>
@font-face {
  font-family: "omyu_pretty";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-01@1.0/omyu_pretty.woff2") format("woff2");
  font-weight: normal;
  font-style: normal;
}

.cardbox{
  display: flex;
  justify-content: space-around;
}
.card {
  float: left;
}

.card-button{
  box-shadow: none; 
  width:140px;
  height:40px;
  font-size: 16px;
}


</style>
