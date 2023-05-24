<template>
  <div class="boardGallery">
    <div id="header">
      <h6>가고 싶은 여행지를 검색해보세요!</h6>
      <div id="searchBox">
        <b-form-input
          style="border-color: #2790f9;margin-right: 2px;"
          v-model="keyword"
          type="text"
          ref="keyword"
          placeholder="검색어를 입력해주세요"
          required
        >
        </b-form-input>
        <b-button variant="primary"><b-icon-search></b-icon-search></b-button>
      </div>
      <div class="board row mt-4 mb-3">
        <div class="col-3"></div>
        <div class="col-6 list-button" >
          <b-button @click="getAllPlans" class="mr-2" :class="[btnClass[1]]"
            >전체 목록</b-button
          >
          <b-button @click="getMyPlans" class="mr-2" :class="[btnClass[2]]"
            >내 여행 보기</b-button
          >
          <b-button
            @click="getFavoritePlans"   :class="[btnClass[3]]"
      
            >내가 찜한 여행</b-button
          >
        </div>
        <div class="col-3 write-button">
          <b-button style="margin-left:160px" class="wbtn"
              @click="write"
              >글쓰기</b-button
            >
          </div>
     
      </div>
    </div>
    <div class="row pt-2 board">
      <template v-for="article in articles">
        <trip-plan-item
          :article="article"
          :key="article.articleNo"
          :articleKey="getArticleKey(article)"
        ></trip-plan-item>
      </template>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import http from "@/api/http.js";
import TripPlanItem from "@/components/tripplan/TripPlanItem.vue";
export default {
  name: "TripPlanList",
  components: {
    TripPlanItem,
  },
  data() {
    return {
      articles: [],
      btnNum : 1,
      btnClass:{
        1:'lbtn', 
        2:'lbtn', 
        3:'lbtn'
      }
    };
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
  },
  created() {
    this.getAllPlans();
  },
  mounted() {
    this.getAllPlans();
  },
  methods: {
    write() {
      this.$router.push("/tripplan/planwrite");
    },
    getAllPlans() {
      this.makeBtnSelected(1);
      http
        .get("/tripPlanBoard/")
        .then(({ data }) => {
          this.articles = data;
          console.log(this.articles);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getMyPlans() {
      this.makeBtnSelected(2);
      let myData = {
        key: "trip_plan_user_id",
        word: this.userInfo.userId,
      };
      http
        .get("/tripPlanBoard/", {
          params: myData,
        })
        .then(({ data }) => {
          this.articles = data;
          console.log(this.articles);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getFavoritePlans() {
      this.makeBtnSelected(3);
      http
        .get(`/tripPlanBoard/favoriteArticles/${this.userInfo.userId}`)
        .then(({ data }) => {
          this.articles = data;
          console.log(this.articles);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getArticleKey(article) {
      const currentTime = new Date().getTime();
      return {
        value: article.articleNo,
        time: currentTime + article.articleNo,
      };
    },
    makeBtnSelected(bNum){
      for(let i = 1;i<=3;i++){
        if(i == bNum){
          this.btnClass[i] = 'lbtnS'
        }else{
          this.btnClass[i] = 'lbtn'
        }
      }
    }
  },
};
</script>

<style scoped>
@font-face {
  font-family: "KCC-Jeongbeom";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2202@1.0/KCC-Jeongbeom.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: "omyu_pretty";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-01@1.0/omyu_pretty.woff2")
    format("woff2");
  font-weight: normal;
  font-style: normal;
}

#header{
  font-size: 20px;
}
.boardGallery{
  font-family: omyu_pretty;
}
.board {
  width: 70vw;
  margin: 0 auto;
}

.list-button{
  display: flex;
  justify-content: center;
}


#searchBox {
  margin: 0 auto;
  display: flex;
  width: 250px;
}


.lbtn{
  background-color: #2790f9;
  color: #fcfcfd;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}
.lbtnS{
  background-color: #042c61;
  color: #fcfcfd;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 0 5px 0 rgba(76, 74, 77, 0.8);
}
.lbtn:hover{
    background-position: 100% 0;
    moz-transition: all 0.4s ease-in-out;
    -o-transition: all 0.4s ease-in-out;
    -webkit-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out;
}
.wbtn{
  background-color: #fff;
  border-color: #2790f9;
  color: #2790f9;
}
.wbtn:hover{
  background-color: #2790f9;
  border-color: #2790f9;
  color: #fff;
}
</style>
