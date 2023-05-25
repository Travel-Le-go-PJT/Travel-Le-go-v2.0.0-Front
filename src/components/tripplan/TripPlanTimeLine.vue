<template>
  <div class="timeline-container" ref="container">
    <h3>여행 코스</h3>
    <div class="timeline">
      <div
        class="timeline-item"
        v-for="(attraction, index) in selected"
        :key="index"
      >
        <div class="timeline-content">
          <b-card-img
            :src="attraction.image"
            :alt="attraction.title"
          ></b-card-img>
          <b-card-body>
            <h5 class="card-title">{{ attraction.title }}</h5>
            <p class="card-text">
              <small class="text-muted">{{ attraction.addr1 }}</small>
            </p>
            <div class="p-2">
              <b-button
                @click="openModal(attraction)"
                variant="primary"
                class="mbtn"
                >자세히보기</b-button
              >
            </div>
          </b-card-body>
        </div>
        <div class="timeline-marker"></div>

        <b-modal
          v-model="isModalOpen"
          hide-header
          hide-footer
          size="xl"
          body-class="p-0"
          dialog-class="modal-dialog-centered"
        >
          <template #default="{ cancel }">
            <div class="d-flex dmodal" style="top: 50%; height: 420px">
              <div class="modal-image-wrapper" style="flex: 4; padding: 0">
                <img
                  :src="selectedAttraction.image"
                  class="modal-image"
                  :alt="selectedAttraction.title"
                />
              </div>
              <div
                class="modal-content-wrapper p-4 d-flex flex-column justify-content-around"
                style="flex: 6"
              >
                <div>
                  <h3>{{ selectedAttraction.title }}</h3>
                  <h6>{{ selectedAttraction.addr1 }}</h6>
                </div>
                <div
                  v-html="selectedAttraction.description"
                  style="overflow-y: auto"
                ></div>
              </div>
              <b-icon icon="x-lg" class="close-icon" @click="cancel"></b-icon>
            </div>
          </template>
        </b-modal>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TripPlanTimeLine",
  data() {
    return {
      selectedAttraction: {},
      isModalOpen: false,
    };
  },
  props: {
    selected: [],
  },
  methods: {
    openModal(attraction) {
      this.selectedAttraction = attraction;
      this.isModalOpen = true;
      this.$refs.container.focus();
    },
  },
};
</script>

<style>
.timeline-container {
  font-family: omyu_pretty;
  max-width: 800px;
  margin: 0 auto;
}

.timeline {
  position: relative;
  margin-top: 50px;
}

.timeline:before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #76e9af;
  left: 50%;
  margin-left: -1px;
}

.timeline-item {
  position: relative;
  margin-bottom: 50px;
}

.timeline-content {
  background: #b9d3cf;
  padding: 20px;
  position: relative;
  border-radius: 5px;
}

.timeline-marker {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  position: absolute;
  top: 20px;
  left: 50%;
  margin-left: -8px;
  z-index: 1;
}

.timeline-marker:before {
  content: "";
  position: absolute;
  width: 24px;
  height: 24px;
  background: #f4f4f4;
  border-radius: 50%;
  top: -4px;
  left: -4px;
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


#attractionModal {
  max-width: 1200px;
}

.customModal {
  background-color: rgba(255, 255, 255, 0.1);
}

.dmodal{
  font-family: omyu_pretty;
  font-size: 18px;
}

.mbtn{
  background-color: #2790f9;
  border-color: #2790f9;
  color: #fff;
}
.mbtn:hover{
  background-color: #3477b9;
  border-color: #2790f9;
  color: #fff;
  box-shadow: 0 0 5px 0 rgba(76, 74, 77, 0.8);
}
</style>
