<template>
  <div id="container">
    <div>
      <h1 id="title">어디로 떠나볼까요?</h1>
    </div>
    <div id="header">
      <h6>가고 싶은 여행지를 검색해보세요!</h6>
      <div id="searchBox">
        <b-form-input
          style="border-color: #2790f9; margin-right: 2px"
          v-model="keyword"
          type="text"
          ref="keyword"
          @keydown.enter="search"
          placeholder="검색어를 입력해주세요"
          required
        >
        </b-form-input>
        <b-button variant="primary" style="margin-right: 3px;" @click="search"><b-icon-search></b-icon-search></b-button>
        <b-button variant="primary" @click="reset()"><b-icon-eraser-fill></b-icon-eraser-fill></b-button>

      </div>
    </div>
    <div class="row" id="board">
      <div
        v-for="(location, index) in locations"
        :key="index"
        class="col-md-3 p-3"
        @click="openModal(location)"
      >
        <div class="card">
          <img :src="makeImageName(location.image)" class="card-img-top" :alt="location.title" />
          <div class="card-body">
            <h5 class="card-title">{{ location.sidoName }}</h5>
            <p class="card-text">{{ location.engName }}</p>
          </div>
        </div>
      </div>
    </div>
    <b-modal
      v-model="isModalOpen"
      hide-header
      hide-footer
      size="xl"
      body-class="p-0"
      dialog-class="modal-dialog-centered"
    >
      <template #default="{ cancel }">
        <div class="d-flex lmodal" style="top: 50%">
          <div class="modal-image-wrapper" style="flex: 4; padding: 0">
            <img
              :src="selectedLocation.image"
              class="modal-image"
              :alt="selectedLocation.sidoName"
            />
          </div>
          <div
            class="modal-content-wrapper p-4 d-flex flex-column justify-content-between"
            style="flex: 6"
          >
            <div>
              <h3>{{ selectedLocation.sidoName }}</h3>
              <h6>{{ selectedLocation.engName }}</h6>
            </div>
            <div v-html="selectedLocation.description"></div>
            <div>
              <b-button variant="primary" @click="makePlan" class="plan-button"
                >계획 만들기</b-button
              >
            </div>
          </div>
          <b-icon icon="x-lg" class="close-icon" @click="cancel"></b-icon>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import http from "@/api/http.js";
import { mapState } from "vuex";
export default {
  name: "AttractionView",
  components: {},
  data() {
    return {
      keyword:"",
      locations: [],
      selectedLocation: {},
      isModalOpen: false,
    };
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
  },
  created() {
    http.get("/attraction/sido").then(({ data }) => {
      this.locations = data;
    });
  },
  mounted() {},
  methods: {
    openModal(location) {
      this.selectedLocation = location;
      this.isModalOpen = true;
    },
    makeImageName(image) {
      return image;
    },
    makePlan() {
      let searchData = {
        sidoCode: this.selectedLocation.sidoCode,
        keyword : this.keyword
      };
      this.$router.push({ name: "planwrite", query: searchData });
    },
    search(){
      let myData = {
        keyword:this.keyword
      }
      http.get("/attraction/sido/search",{
        params: myData,
      }).then(({ data }) => {
        this.locations = data;
      });
    },
    
    reset(){
      this.keyword = "";
      this.search();
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

.card {
  cursor: pointer;
  box-shadow: 0 0 10px rgb(31, 38, 135, 0.2);
}

.card:hover {
  transform: scale(1.05);
  transition: transform 0.3s;
}

.card-img-top {
  object-fit: cover;
  height: 300px;
}

.modal-image {
  object-fit: fill;
  width: 420px;
  height: 420px;
}

.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: #000;
  font-size: 20px;
}

.plan-button {
  bottom: 10px;
}

#container {
  padding: 20px;
  font-family: omyu_pretty;
  font-size: 20px;
  margin-top: 30px;
}

.lmodal {
  font-family: omyu_pretty;
  font-size: 18px;
}

#title {
  font-family: KCC-Jeongbeom;
  color: #2790f9;
  width: 600px;
  text-align: center;
  margin: 0 auto;
  margin-bottom: 20px;
}

#board {
  width: 70vw;
  margin: 0 auto;
}

#searchBox {
  margin: 0 auto;
  display: flex;
  width: 250px;
}
</style>
