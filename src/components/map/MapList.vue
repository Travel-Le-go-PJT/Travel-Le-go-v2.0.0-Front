<template>
    <div>
        <b-table id="tb" hover :items="lists" :fields="fields" per-page="5" :current-page="currentPage"
            @row-clicked="clickRow">
            <template #cell(image)="image">
                <img :src="image.item.image" width="100" height="100">
            </template>
            <template #cell(info)="{ item }">
                <div class="listIcons">
                    <b-icon icon="info-circle-fill" @click="openModal(item)" class="listIcon" title="상세정보"></b-icon>
                    <b-icon icon="plus-circle-fill" variant="primary" @click="selectAttraction(item)" class="listIcon"
                        title="계획에 추가"></b-icon>
                </div>
            </template>
        </b-table>
        <b-pagination pills size="sm" align="center" v-model="currentPage" :total-rows="rows" per-page="5"
            aria-controls="tb"></b-pagination>

        <b-modal id="attrationModal" v-model="isModalOpen" title="여행지 정보" size="lg" ok-only modal-class="customModal">
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
</template>
<script>
export default {
    name: "MapList",
    data() {
        return {
            currentPage: 0,
            fields: [
                { key: "image", label: "이미지", thClass: "w10" },
                { key: "title", label: "이름", thClass: "w20" },
                { key: "addr1", label: "주소", thClass: "w40" },
                { key: "info", label: " ", thClass: "w30" },

            ],
            rowHeight: "rowHeight",
            selectedAttraction: {},
            isModalOpen: false,
        };
    },
    props: {
        lists: [],
    },
    computed: {
        rows() {
            return this.lists.length;
        },
    },
    created() {


    },
    methods: {
        openModal(attraction) {
            this.selectedAttraction = attraction;
            this.isModalOpen = true;
        },
        selectAttraction(record) {
            this.$emit('select', record);
        },
        clickRow(record) {
            this.$emit('showCenter', record);
        }
    },
}
</script>
<style scoped>
.listIcons {
    display: flex;
}

.listIcon {
    font-size: 24px;
    margin-left: 5px;
    margin-right: 5px;
}

.listIcon:hover {
    cursor: pointer;
}
</style>