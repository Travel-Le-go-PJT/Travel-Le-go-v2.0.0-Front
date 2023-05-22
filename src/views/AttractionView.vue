<template>
    <div id="container">
      <div>
        <h1 id="title">어디로 떠나시나요?</h1>
      </div>
      <div id="header">
      <h6>가고 싶은 여행지를 검색해보세요!</h6>
      <div id="searchBox">
        <b-form-input v-model="keyword"  type="text" ref="keyword" placeholder="검색어를 입력해주세요"
          required>
        </b-form-input>
        <b-button variant="primary"><b-icon-search></b-icon-search></b-button>
      </div>
       </div>
    <div class="row" id="board">
      <template v-for="(location, index) in locations">
        <location-item :location="location" :key="index"></location-item>
      </template>
    </div>
    </div>
  </template>
  
  <script>
  import http from "@/api/http.js";
  import { mapState } from "vuex";
  import LocationItem from "@/components/attraction/LocationItem.vue"
  export default {
    name: "AttractionView",
  components: {
    LocationItem
  },
  data() {
    return {
        locations: [],
    }
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
  },
  created() {
    http.get("/attraction/sido")
    .then(({data})=>{
        this.locations = data;
    })
  },
  mounted(){
  },
  methods: {
  }
}
  </script>
  
  <style scoped>
  @font-face {
    font-family: "KCC-Jeongbeom";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2202@1.0/KCC-Jeongbeom.woff") format("woff");
    font-weight: normal;
    font-style: normal;
  }
  
  #container {
    padding: 20px;
  }
  
  #title {
    font-family: KCC-Jeongbeom;
    color: #ff9900;
    width: 600px;
    text-align: center;
    margin: 0 auto;
  }
  #board{
  width: 70vw;
  margin: 0 auto;
}

#searchBox{
  margin: 0 auto;
  display: flex;
  width:300px
}

#title {
  font-family: KCC-Jeongbeom;
  color: #ff9900;
  width: 450px;
  text-align: center;
  margin: 0 auto;
}
  </style>