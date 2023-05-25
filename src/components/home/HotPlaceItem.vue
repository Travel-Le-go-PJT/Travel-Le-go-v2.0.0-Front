<template>
    <div>
        <b-card overlay :img-src="attraction.image" img-alt="Card Image" text-variant="white">
            <b-card-body>
                <b-card-title>{{ attraction.title }}</b-card-title>
                <b-card-text>
                    {{ attraction.addr1 }}
                </b-card-text>
                <b-button @click="openModal()" variant="primary" class="mbtn">자세히보기</b-button>
            </b-card-body>
        </b-card>
        <b-modal v-model="isModalOpen" hide-header hide-footer size="xl" body-class="p-0"
            dialog-class="modal-dialog-centered">
            <template #default="{ cancel }">
                <div class="d-flex" style="top: 50%; height: 420px;">
                    <div class="modal-image-wrapper" style="flex: 4; padding: 0;">
                        <img :src="attraction.image" class="modal-image" :alt="attraction.title">
                    </div>
                    <div class="modal-content-wrapper p-4 d-flex flex-column justify-content-around" style="flex: 6; ">
                        <div>
                            <h3>{{ attraction.title }}</h3>
                            <h6>{{ attraction.addr1 }}</h6>
                        </div>
                        <div v-html="attraction.description" style="overflow-y:auto"></div>
                    </div>
                    <b-icon icon="x-lg" class="close-icon" @click="cancel"></b-icon>
                </div>
            </template>
        </b-modal>
    </div>
</template>

<script>
export default {
    name: "HotPlaceItem",
    data() {
        return {
            isModalOpen: false
        };
    },
    mounted() {

    },
    props: {
        attraction: {},
    },
    methods: {
        openModal() {
            this.isModalOpen = true;
        },
    },

};
</script>
  
<style scoped>
.card {
    width: 400px;
    height: 300px;
    border-radius: 10px;
}


.card-body {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
    padding-bottom: 3px;
}

.card div,
.card-img {
    width: 100%;
    height: 100%;
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

.mbtn {
    background-color: #2790f9;
    border-color: #2790f9;
    color: #fff;
    opacity: 0.8;
}

.mbtn:hover {
    background-color: #3477b9;
    border-color: #2790f9;
    color: #fff;
    box-shadow: 0 0 5px 0 rgba(76, 74, 77, 0.8);
}
</style>
