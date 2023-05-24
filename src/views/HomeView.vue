<template>
  <div class="home">
    <header class="masthead" :style="background"></header>
    <b-row>
      <b-col>
        <b-carousel
          id="carousel-1"
          v-model="slide"
          :interval="4000"
          controls
          indicators
          background="#ababab"
          style="text-shadow: 1px 1px 2px #333;"
        >
          <!-- Text slides with image -->
          <b-carousel-slide caption="asdasdasdasd">
            <template #img>
              <img
                class="d-block w-100"
                height="697"
                src="@/assets/logo/Travel_Le_go_logo.jpg"
                alt="image slot"
              />
            </template>
          </b-carousel-slide>

          <b-carousel-slide>
            <template #img>
              <img
                class="d-block w-100"
                height="697"
                src="@/assets/logo/Travel_Le_go_logo.jpg"
                alt="image slot"
              />
            </template>
          </b-carousel-slide>

          <b-carousel-slide>
            <template #img>
              <img class="d-block w-100" height="697" src="@/assets/mBgImg3.jpg" alt="image slot" />
            </template>
          </b-carousel-slide>
          <b-carousel-slide>
            <template #img>
              <img class="d-block w-100" height="697" src="@/assets/mBgImg4.jpg" alt="image slot" />
            </template>
          </b-carousel-slide>

          <b-carousel-slide>
            <template #img>
              <img class="d-block w-100" height="697" src="@/assets/mBgImg5.jpg" alt="image slot" />
            </template>
          </b-carousel-slide>
        </b-carousel>
      </b-col>
    </b-row>

    <b-row class="mt-5">
      <b-col cols="12">
        <div class="card-deck">
          <b-card
            v-for="(attraction, index) in visibleAttractions"
            :key="index"
            :img-src="attraction.image"
          >
            <b-card-footer>
              <h6>{{ attraction.title }}</h6>
              <h6>{{ attraction.addr1 }}</h6>
            </b-card-footer>
          </b-card>
        </div>
        <div class="controls d-flex justify-content-between mt-3 mb-5">
          <b-button @click="leftSlide" variant="primary">이전</b-button>
          <b-button @click="rightSlide" variant="primary">다음</b-button>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import http from "@/api/http";

export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      attractions: [],
      slideIndex: 0,
    };
  },
  computed: {
    visibleAttractions() {
      const start = this.slideIndex;
      const end = this.slideIndex + 5;
      return this.attractions.slice(start, end);
    },
  },
  created() {
    http
      .get("/attraction")
      .then(({ data }) => {
        this.attractions = data;
      })
      .catch(() => {});
  },
  methods: {
    leftSlide() {
      this.slideIndex = Math.max(0, this.slideIndex - 5);
    },
    rightSlide() {
      const maxIndex = this.attractions.length - 1;
      this.slideIndex = Math.min(maxIndex - 5, this.slideIndex + 5);
    },
  },
};
</script>
<style scoped>
.card-deck {
  display: flex;
  scroll-behavior: smooth;
  max-height: 400px;
}

.card-deck b-card {
  flex: 0 0 20%;
  margin-right: 10px;
  scroll-snap-align: start;
}
.navbar {
  padding: 0;
}
.controls {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}
</style>
