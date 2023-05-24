<template>
  <div class="home">
    <b-container fluid class="full-width-container">
      <b-row align-v="center">
        <b-col cols="4" md="4" class="text-center full-width-left">
          <div id="title">
            <div class="centered-div">
              <router-link to="/">
                <b-img
                  :src="require('@/assets/logo/Travel_Le_go_logo-removebg.png')"
                  id="logo"
                  class="d-inline-block align-top"
                  alt="logo"
                  style="width: 300px"
                ></b-img>
              </router-link>
              <!-- <h1>Travel Le go</h1>
              <h3>To Travel Is To Live</h3>-->
            </div>
          </div>
        </b-col>
        <b-col cols="12" md="8" class="full-width-right">
          <div class="video-wrapper">
            <video ref="videoPlayer" muted autoplay loop>
              <source :src="currentVideoSource" type="video/mp4" />
            </video>
          </div>
        </b-col>
      </b-row>

      <div>
        <b-progress class="progress-line" :value="progress"></b-progress>
        <div class="progress-markers">
          <b-progress
            :value="marker"
            v-for="marker in markers"
            :key="marker"
            class="progress-marker"
          ></b-progress>
        </div>
      </div>
    </b-container>
    <div class="row slider hot-place">
      <div class="col-12 text-center">
        <h1>HOT PLACE</h1>
        <swiper class="swiper" :options="hotOption">
          <template v-for="attraction in bestAttractions">
            <swiper-slide :key="attraction.contentId">
              <hot-place-item :attraction="attraction" />
            </swiper-slide>
          </template>

          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
    </div>
    <div class="row slider best-plan">
      <div class="col-12 text-center">
        <h1>BEST PLAN</h1>
        <swiper class="swiper" :options="planOption">
          <template v-for="article in bestPlans">
            <swiper-slide :key="article.articleNo">
              <best-plan-item :article="article"></best-plan-item>
            </swiper-slide>
          </template>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
    </div>
    <div class="row slider best-info">
      <div class="col-12 text-center">
        <h1>BEST INFO</h1>
        <swiper class="swiper" :options="infoOption">
          <swiper-slide>
            <div class="cardbox m-4">
              <div class="card">
                <div class="card-body">
                  <h2 class="card-title">회원들의 여행 꿀정보를 받아가세요!</h2>

                  <p class="card-text">가장 많은 조회수를 기록한 글들이에요.</p>
                </div>
              </div>
            </div>
          </swiper-slide>
          <template v-for="article in bestInfos">
            <swiper-slide :key="article.articleNo">
              <best-info-item :article="article"></best-info-item>
            </swiper-slide>
          </template>
          <div class="swiper-scrollbar"></div>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import http from "@/api/http";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import BestPlanItem from "@/components/home/BestPlanItem.vue";
import HotPlaceItem from "@/components/home/HotPlaceItem.vue";
import BestInfoItem from "@/components/home/BestInfoItem.vue";

export default {
  name: "HomeView",
  components: {
    Swiper,
    SwiperSlide,
    BestPlanItem,
    HotPlaceItem,
    BestInfoItem,
  },
  data() {
    return {
      attractions: [],
      videoSources: [
        "https://www.myro.co.kr/myro_video/MainMovie1.mp4",
        "https://www.myro.co.kr/myro_video/MainMovie2.mp4",
        "https://www.myro.co.kr/myro_video/MainMovie3.mp4",
        "https://www.myro.co.kr/myro_video/MainMovie4.mp4",
        "https://www.myro.co.kr/myro_video/MainMovie5.mp4",
        "https://www.myro.co.kr/myro_video/MainMovie6.mp4",
        "https://www.myro.co.kr/myro_video/MainMovie7.mp4",
        "https://www.myro.co.kr/myro_video/MainMovie8.mp4",
        "https://www.myro.co.kr/myro_video/MainMovie9.mp4",
        "https://www.myro.co.kr/myro_video/MainMovie10.mp4",
        "https://www.myro.co.kr/myro_video/MainMovie11.mp4",
        "https://www.myro.co.kr/myro_video/MainMovie12.mp4",
        "https://www.myro.co.kr/myro_video/MainMovie13.mp4",
        "https://www.myro.co.kr/myro_video/MainMovie14.mp4",
        "https://www.myro.co.kr/myro_video/MainMovie15.mp4",
        "https://www.myro.co.kr/myro_video/MainMovie16.mp4",
        // 동영상 소스 추가
      ],
      currentVideoIndex: 0,

      bestAttractions: [],
      bestPlans: [],
      bestInfos: [],
      slideIndex: 0,
      planOption: {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: false,
        breakpoints: {
          "@0.75": {
            slidesPerView: 1,
          },
          "@1.00": {
            slidesPerView: 2,
          },
          "@1.50": {
            slidesPerView: 3,
          },
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      hotOption: {
        slidesPerView: 3,
        spaceBetween: 20,
        loop: false,
        breakpoints: {
          "@0.75": {
            slidesPerView: 1,
          },
          "@1.00": {
            slidesPerView: 2,
          },
          "@1.50": {
            slidesPerView: 3,
          },
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
      infoOption: {
        slidesPerView: 4,
        spaceBetween: 10,
        loop: false,
        breakpoints: {
          "@0.75": {
            slidesPerView: 1,
          },
          "@1.00": {
            slidesPerView: 2,
          },
          "@1.50": {
            slidesPerView: 4,
          },
        },
        scrollbar: {
          el: ".swiper-scrollbar",
          draggable: true,
          hide: false,
        },
      },
    };
  },
  computed: {
    visibleAttractions() {
      const start = this.slideIndex;
      const end = this.slideIndex + 5;
      return this.attractions.slice(start, end);
    },
    currentVideoSource() {
      return this.videoSources[this.currentVideoIndex];
    },
  },
  created() {
    http
      .get("/attraction/best")
      .then(({ data }) => {
        this.bestAttractions = data;
      })
      .catch(() => {});
    http
      .get("/tripPlanBoard/best")
      .then(({ data }) => {
        this.bestPlans = data;
      })
      .catch(() => {});
    http
      .get("/tripInfoBoard/best")
      .then(({ data }) => {
        this.bestInfos = data;
      })
      .catch(() => {});

    this.setRandomVideoIndex();
  },
  methods: {
    leftSlide() {
      this.slideIndex = Math.max(0, this.slideIndex - 5);
    },
    rightSlide() {
      const maxIndex = this.attractions.length - 1;
      this.slideIndex = Math.min(maxIndex - 5, this.slideIndex + 5);
    },
    setRandomVideoIndex() {
      this.currentVideoIndex = Math.floor(Math.random() * this.videoSources.length);
    },
  },
  mounted() {
    window.addEventListener("beforeunload", this.setRandomVideoIndex);
  },
  beforeDestroy() {
    window.removeEventListener("beforeunload", this.setRandomVideoIndex);
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

.full-width-container {
  width: 100% !important;
  height: 100vh !important;
  padding: 0 !important;
}

.full-width-left {
  height: 100vh !important;
  padding: 0 !important;
}

.full-width-right {
  height: 100vh !important;
  max-width: none !important;
  padding: 0 !important;
}

#title {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.centered-div {
  text-align: center;
}

.video-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

video {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 100%;
  min-height: 100%;
}

.progress-line {
  height: 10px;
}

.progress-markers {
  position: relative;
}

.progress-marker {
  position: absolute;
  top: 0;
  bottom: 0;
  height: 100%;
}

.slider {
  width: 80vw;
  margin: 0 auto;
  text-align: center;
  font-family: omyu_pretty;
  font-size: 20px;
}

.swiper-container {
  width: 70vw;
}

h1 {
  margin-top: 20px;
  text-decoration: underline;
}

.swiper-button-prev,
.swiper-button-next {
  background-color: #e5f3f2;
  opacity: 0.5;
  padding: 25px 25px;
  border-radius: 20px;
  color: #2790f9;
}

.swiper-button-prev:hover,
.swiper-button-next:hover {
  background-color: #8596aa;
}

.swiper-button-prev:after,
.swiper-button-next:after {
  font-size: 18px;
  font-weight: 600;
}

.hot-place {
  margin-top: 100px;
  margin-bottom: 140px;
}

.best-info {
  margin-top: 140px;
  margin-bottom: 40px;
}

.cardbox {
  display: flex;
  justify-content: space-around;
}

.card {
  float: left;
  width: 360px;
  height: 320px;
  border: none;
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-button {
  box-shadow: none;
  font-size: 16px;
  background-color: #2790f9;
  border-color: #2790f9;
  color: #fff;
}

.card-button:hover {
  background-color: #1c5fa3;
  border-color: #1c5fa3;
  color: #fff;
  box-shadow: none;
}

.swiper-scrollbar {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 6px;
  background-color: #f1f1f1;
  z-index: 1;
}

.swiper-scrollbar-drag {
  position: absolute;
  width: 0;
  height: 100%;
  background-color: #2790f9;
}
</style>
