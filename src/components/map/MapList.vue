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
        <b-pagination pills size="sm" align="center" v-model="currentPage" :total-rows="rows"
            aria-controls="tb" :limit="10"></b-pagination>

            <b-modal v-model="isModalOpen" hide-header hide-footer size="xl" body-class="p-0"
      dialog-class="modal-dialog-centered">
      <template #default="{ cancel }">
        <div class="d-flex" style="top: 50%; height: 420px;">
          <div class="modal-image-wrapper" style="flex: 4; padding: 0;">
            <img :src="selectedAttraction.image" class="modal-image" :alt="selectedAttraction.title">
          </div>
          <div class="modal-content-wrapper p-4 d-flex flex-column justify-content-around" style="flex: 6; ">
            <div>
              <h3>{{ selectedAttraction.title }}</h3>
              <h6>{{ selectedAttraction.addr1 }}</h6>
            </div>
            <div v-html="selectedAttraction.description" style="overflow-y:auto"></div>
          </div>
          <b-icon icon="x-lg" class="close-icon" @click="cancel"></b-icon>
        </div>
      </template>
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
</style>