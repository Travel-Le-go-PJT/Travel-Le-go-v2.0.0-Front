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
          @keydown.enter="search(btnNum)"
          placeholder="검색어를 입력해주세요"
          required
        >
        </b-form-input>
        <b-button variant="primary" style="margin-right: 3px;" @click="search(btnNum)"><b-icon-search></b-icon-search></b-button>
        <b-button variant="primary" @click="reset()"><b-icon-eraser-fill></b-icon-eraser-fill></b-button>
      </div>
      <div class="board row mt-4 mb-3">
        <div class="col-3"></div>
        <div class="col-6 list-button" >
          <b-button @click="search(1)" class="mr-2" :class="[btnClass[1]]"
            >전체 목록</b-button
          >
          <b-button @click="search(2)" class="mr-2" :class="[btnClass[2]]"
            >내 여행 보기</b-button
          >
          <b-button
            @click="search(3)"   :class="[btnClass[3]]"
      
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
      keyword:"",
      articles: [],
      allPlans:[],
      myPlans:[],
      favoritePlans:[],
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
    http
        .get("/tripPlanBoard/")
        .then(({ data }) => {
          this.articles = data;
          this.allPlans = data;
        })
        .catch((error) => {
          console.log(error);
        });
    this.getMyPlans();
    this.getFavoritePlans();
  },
  mounted() {
    this.search(1);
  },
  methods: {
    write() {
      this.$router.push("/tripplan/planwrite");
    },
    getAllPlans() {
      http
        .get("/tripPlanBoard/")
        .then(({ data }) => {
          this.allPlans = data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getMyPlans() {
      let myData = {
        key: "trip_plan_user_id",
        word: this.userInfo.userId,
      };
      http
        .get("/tripPlanBoard/", {
          params: myData,
        })
        .then(({ data }) => {
          this.myPlans = data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getFavoritePlans() {
      http
        .get(`/tripPlanBoard/favoriteArticles/${this.userInfo.userId}`)
        .then(({ data }) => {
          this.favoritePlans = data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    makeBtnSelected(bNum){
      for(let i = 1;i<=3;i++){
        if(i == bNum){
          this.btnClass[i] = 'lbtnS'
          this.btnNum = i;
        }else{
          this.btnClass[i] = 'lbtn'
        }
      }
    },
    search(btn){
      this.makeBtnSelected(btn);
      let myData = {
        keyword:this.keyword
      }
      http.get("/tripPlanBoard/search",{
        params: myData,
      }).then(({ data, status }) => {
        if(status == 200){
          let temp;
          if(btn == 1){
            temp = this.allPlans;
          }else if(btn == 2){
            temp = this.myPlans;
          }else{
            temp = this.favoritePlans;
          }
          this.articles = data.filter(el=>{
            return temp.some(el2 =>
              el.articleNo == el2.articleNo
            );
          })
        }else{
          this.articles = [];
        }
        
      });
    },
    reset(){
      this.keyword = "";
      this.search(this.btnNum);
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
