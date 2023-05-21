<template>
    <div>
        <b-table
            
            id="tb"
            striped
            hover
            :items="lists"
            :fields="fields"
            per-page="5"
            :current-page="currentPage"
            @row-clicked="clickRow"
            >
            <template #cell(image)="image">
                <img :src="image.item.image" width="100" height="100" >
            </template>
            
            </b-table>
            <b-pagination
                pills
                size="sm"
                align="center"
                v-model="currentPage"
                :total-rows="rows"
                per-page="5"
                aria-controls="tb"
                ></b-pagination>
                <p class="mt-3">
                현재페이지: {{ currentPage }}/{{ totalPage() }}: 전체페이지
                </p>
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
        ],
        };
    },
    props: {
        lists:[],
    },
    computed: {
        rows() {
            return this.lists.length;
        },
    },
    created() {
        
        
    },
    methods: {
        totalPage() {
            return Math.ceil(this.rows / 5);
        },
        clickRow(record){
            this.$emit('showCenter', record)
            this.$emit('select',record);
        }
    },
}
</script>