<template>
  <div id="cardbox" class="col-md-4 p-3">
    <div id="card">
      <div class="card-header">{{ article.userId }}</div>
      <img class="card-img-top" src="" alt="" />
      <div class="card-body">
        <h5 class="card-title">{{ article.subject }}</h5>
        <p class="card-text">{{ article.subject }}</p>

        <div class="row">
          <div class="col-6">
            <button
              type="button"
              @click="showArticle(article.articleNo)"
              class="btn-hover"
            >
              자세히보기
            </button>
          </div>
          <div class="col-6 d-flex justify-content-center align-items-center">
            <b-button
              variant="outline-danger"
              style="box-shadow: none; width:160px;height:40px"
              @click="favorite(article.articleNo)"
            >
              <b-icon :icon="favoriteIcon"></b-icon>
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
    };
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
            }
          });
      } else {
        http.post("/tripPlanBoard/favorite", myData).then(({ data }) => {
          if (data.result == "SUCCESS") {
            this.isFavorite = true;
            this.favoriteIcon = "heart-fill";
          }
        });
      }
    },
  },
  watch: {
    article() {

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
        .catch(() => {});
     
    },
    // articleKey: {
    //   handler(newVal) {
    //     console.log(newVal)
    //     let myData = {
    //       articleNo: newVal.value,
    //       userId: this.userInfo.userId,
    //     };
    //     http
    //       .get("/tripPlanBoard/favorite", {
    //         params: myData,
    //       })
    //       .then(({ data }) => {
    //         if (data) {
    //           this.isFavorite = true;
    //           this.favoriteIcon = "heart-fill";
    //         } else {
    //           this.isFavorite = false;
    //           this.favoriteIcon = "heart";
    //         }
    //       })
    //       .catch(() => {});
    //   },
    //   deep: true,
    //},
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

#cardbox {
  padding: 2px;
}

.card {
  float: left;
}

card-img-top {
  height: 800px;
}

.btn-hover {
  width: 80px;
  font-family: omyu_pretty;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin: 20px;
  height: max-content + 10px;
  text-align: center;
  border: none;
  background-color: #ffffff;
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
