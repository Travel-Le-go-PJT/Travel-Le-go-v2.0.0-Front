<template>
    <div class="timeline-container">
        <h3>여행 코스</h3>
        <div class="timeline">
            <div class="timeline-item" v-for="(attraction, index) in selected" :key="index">
                <div class="timeline-content">
                    <b-card-img :src="attraction.image" :alt="attraction.title"></b-card-img>
                    <b-card-body>
                        <h5 class="card-title">{{ attraction.title }}</h5>
                        <p class="card-text">
                            <small class="text-muted">{{ attraction.addr1 }}</small>
                        </p>
                        <div class="p-2">
                            <b-button @click="openModal(attraction)" type="button"
                                class="btn-hover color-3">자세히보기</b-button>
                        </div>
                    </b-card-body>
                </div>
                <div class="timeline-marker"></div>
                <b-modal id="attrationModal" v-model="isModalOpen" title="여행지 정보" size="lg" ok-only
                    modal-class="customModal">
                    <div>
                        <h2 class="modalTitle">{{ selectedAttraction.title }} </h2>
                        <div class="modalAddr">
                            {{ selectedAttraction.addr1 }}
                        </div>

                        <div class="modal-description">
                            {{ selectedAttraction.description }}
                        </div>
                    </div>
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
        }
    },
    props: {
        selected: [],
    },
    methods: {
        openModal(attraction) {
            this.selectedAttraction = attraction;
            this.isModalOpen = true;
        }
    }
};
</script>
  
<style>
.timeline-container {
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
    background: #dfdf52;
    left: 50%;
    margin-left: -1px;
}

.timeline-item {
    position: relative;
    margin-bottom: 50px;
}

.timeline-content {
    background: #b7cf8d;
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

.modalTitle {
    font-family: 'Montserrat';
    font-weight: 900;
    margin-bottom: 0;
}

.modalAddr {
    font-family: 'Montserrat';
    font-size: 1.2rem;
    margin: 5px;

}

#attractionModal {
    max-width: 1200px;
}

.customModal {
    background-color: rgba(255, 255, 255, 0.1);
}
</style>
