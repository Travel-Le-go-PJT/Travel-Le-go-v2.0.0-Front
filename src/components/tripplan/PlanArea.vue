<template>
    <div>
        <h2>My Plan</h2>
        <div>
            <!-- 선택한 여행지 카드 -->

            <div v-for="( attraction, index ) in localSelected" :key="index" class="selectedCardList" draggable="true"
                @dragstart="dragStart(index)" @dragover="dragOver" @drop="drop" :data-index="index">

                <div>{{ index + 1 }}</div>
                <div class="cardImage">
                    <img :src="attraction.image" width="60" height="60">
                </div>
                <div class="cardInfo">
                    <h6>{{ attraction.title }}</h6>
                    <p><small>{{ attraction.addr1 }}</small></p>
                </div>
                <div class="cardIcons">
                    <b-icon icon="trash-fill" class="cardIcon" @click="deleteItem(index)" title="계획에서 삭제"></b-icon>
                    <b-icon icon="grip-vertical-fill" class="drag-handle" title="순서 변경"></b-icon>
                </div>
            </div>
        </div>
        <b-button class="mt-3" variant="primary" @click="write" v-if="localSelected.length != 0 && this.isWrite">코스
            등록하기</b-button>
    </div>
</template>
  
<script>
export default {
    name: "PlanArea",
    components: {
    },
    data() {
        return {
            localSelected: [],
        }
    },
    watch: {
        selected() {
            this.localSelected = this.selected;
        }
    },
    props: {
        selected: [],
        isWrite: Boolean
    },
    methods: {
        write() {
            this.$emit('write');
        },
        deleteItem(index) {
            this.localSelected.splice(index, 1);
            this.$emit('delete', this.localSelected);
        },
        dragStart(index) {
            // 드래그 시작 시 인덱스 저장
            event.dataTransfer.setData('index', index);
        },
        dragOver(event) {
            event.preventDefault();
        },
        drop(event) {
            event.preventDefault();
            const fromIndex = +event.dataTransfer.getData('index');
            const toIndex = +event.currentTarget.getAttribute('data-index');
            if (fromIndex !== toIndex) {
                this.reorderSelectedPlaces(fromIndex, toIndex);
            }
        },
        reorderSelectedPlaces(fromIndex, toIndex) {
            const copy = [...this.localSelected];

            // fromIndex에 해당하는 요소 제거
            const movedItem = copy.splice(fromIndex, 1)[0];

            // toIndex 위치에 요소 삽입
            copy.splice(toIndex, 0, movedItem);

            // 변경된 배열로 업데이트
            this.localSelected = copy;

            this.$emit('reorder', this.localSelected)
        },
    }
}
</script>

<style scoped>
.selectedCardList {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    border-radius: 10px;
    background-color: #f5f5f5;
    padding: 10px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}




.cardInfo {
    flex: 1;
}

.cardIcons {
    display: flex;
    align-items: center;
}

.cardIcon {
    font-size: 24px;
}

.cardIcon:hover {
    cursor: pointer;
}
</style>