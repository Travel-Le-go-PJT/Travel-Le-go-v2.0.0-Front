<template>
  <div id="container">
    <div>
      <h1 id="title">어디로 떠나시나요?</h1>
    </div>
    <div id="header">
      <h6>가고 싶은 여행지를 검색해보세요!</h6>
      <div id="searchBox">
        <b-form-input v-model="keyword" type="text" ref="keyword" placeholder="검색어를 입력해주세요" required>
        </b-form-input>
        <b-button variant="primary"><b-icon-search></b-icon-search></b-button>
      </div>
    </div>
    <div class="row" id="board">
      <div v-for="(location, index) in locations" :key="index" class="col-md-3 p-3" @click="openModal(location)">
        <div class="card">
          <img :src="makeImageName(location.image)" class="card-img-top" :alt="location.title">
          <div class="card-body">
            <h5 class="card-title">{{ location.sidoName }}</h5>
            <p class="card-text">{{ location.engName }}</p>
          </div>
        </div>
      </div>
    </div>
    <b-modal v-model="isModalOpen" hide-header hide-footer size="xl" body-class="p-0"
      dialog-class="modal-dialog-centered">
      <template #default="{ cancel }">
        <div class="d-flex" style="top: 50%;">
          <div class="modal-image-wrapper" style="flex: 4; padding: 0;">
            <img :src="selectedLocation.image" class="modal-image" :alt="selectedLocation.sidoName">
          </div>
          <div class="modal-content-wrapper p-4" style="flex: 6;">
            <h3>{{ selectedLocation.sidoName }}</h3>
            <h6>{{ selectedLocation.engName }}</h6>
            <div v-html="selectedLocation.description"></div>
            <b-button variant="primary" @click="makePlan">계획 만들기</b-button>
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
  components: {

  },
  data() {
    return {
      locations: [],
      selectedLocation: {},
      isModalOpen: false,
    }
  },
  computed: {
    ...mapState("userStore", ["userInfo"]),
  },
  created() {
    http.get("/attraction/sido")
      .then(({ data }) => {
        this.locations = data;
      })
  },
  mounted() {
  },
  methods: {
    openModal(location) {
      this.selectedLocation = location;
      this.isModalOpen = true;
    },
    makeImageName(image) {
      return image;
    },
    makePlan(){
      this.$router.push("/tripplan/planwrite");
    }
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

.card {
  cursor: pointer;
  box-shadow: 0 0 10px rgb(31, 38, 135, 0.2)
}

.card:hover {
  transform: scale(1.05);
  transition: transform 0.3s;
}

.card-img-top {
  object-fit: fill;
  height: 300px;
}

.modal-image {
  object-fit: fill;
  max-height: 420px;
}


.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: #000;
  font-size: 20px;
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

#board {
  width: 70vw;
  margin: 0 auto;
}

#searchBox {
  margin: 0 auto;
  display: flex;
  width: 300px
}

#title {
  font-family: KCC-Jeongbeom;
  color: #ff9900;
  width: 450px;
  text-align: center;
  margin: 0 auto;
}
</style>