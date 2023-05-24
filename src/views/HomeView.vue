<template>
  <div class="home">
    <b-container fluid class="full-width-container">
      <b-row align-v="center">
        <b-col col="4" md="4" class="text-center full-width-left">
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
        <b-col col="12" md="8" class="full-width-right">
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
      <div id="hotplace"></div>
    </b-container>
    <div class="home">
      <swiper class="swiper" :options="swiperOption">
        <template v-for="attraction in bestAttractions">
          <swiper-slide :key="attraction.contentId">
            <img :src="attraction.image" width="300" height="300" />
          </swiper-slide>
        </template>

        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
      <swiper class="swiper" :options="swiperOption">
        <template v-for="article in bestPlans">
          <swiper-slide :key="article.articleNo">
            <trip-plan-item
              :article="article"
              :key="article.articleNo"
            ></trip-plan-item>
          </swiper-slide>
        </template>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
      <swiper class="swiper" :options="swiperOption">
        <template v-for="article in bestInfos">
          <swiper-slide :key="article.articleNo">
            <trip-plan-item
              :article="article"
              :key="article.articleNo"
            ></trip-plan-item>
          </swiper-slide>
        </template>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>

    <swiper class="swiper" :options="swiperOption">
      <template v-for="attraction in bestAttractions">
        <swiper-slide :key="attraction.contentId">
          <img :src="attraction.image" width="300" height="300" />
        </swiper-slide>
      </template>

      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
    <swiper class="swiper" :options="swiperOption">
      <template v-for="article in bestPlans">
        <swiper-slide :key="article.articleNo">
          <trip-plan-item
            :article="article"
            :key="article.articleNo"
          ></trip-plan-item>
        </swiper-slide>
      </template>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
    <swiper class="swiper" :options="swiperOption">
      <template v-for="article in bestInfos">
        <swiper-slide :key="article.articleNo">
          <trip-plan-item
            :article="article"
            :key="article.articleNo"
          ></trip-plan-item>
        </swiper-slide>
      </template>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
import http from "@/api/http";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import TripPlanItem from "@/components/tripplan/TripPlanItem.vue";

export default {
  name: "HomeView",
  components: {
    Swiper,
    SwiperSlide,
    TripPlanItem,
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
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
        loop: false,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
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
      this.currentVideoIndex = Math.floor(
        Math.random() * this.videoSources.length
      );
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
</style>
