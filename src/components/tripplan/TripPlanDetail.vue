<template>
    <div class="detail">
        <div class="row">
            <div class="col-lg-7" style="height: 500px">
                <map-component :level="10" :selected="selected"></map-component>
            </div>
            <div class="col-lg-5 d-flex align-items-center justify-content-center">
                <trip-plan-info :article="article"></trip-plan-info>
            </div>
        </div>
        <div class="row">
            <div class="col-12">
                <trip-plan-time-line :selected="selected"></trip-plan-time-line>
            </div>
        </div>
    </div>
</template>

<script>
import http from "@/api/http.js";
import MapComponent from "@/components/map/MapComponent.vue";
import TripPlanInfo from "@/components/tripplan/TripPlanInfo.vue";
import TripPlanTimeLine from "@/components/tripplan/TripPlanTimeLine.vue";

export default {
    components: {
        TripPlanInfo,
        TripPlanTimeLine,
        MapComponent,
    },
    data() {
        return {
            article: {},
            selected: [],
            planNums: [],
        };
    },
    created() {
        let no = this.$route.params.articleNo;
        http.get(`/tripPlanBoard/${no}`).then(({ data }) => {
            this.article = data;
            this.planNums = data.plan;
            this.getAttractionInfos();
        });
    },
    methods: {
        removeArticle(no) {
            http.delete(`/tripPlanBoard/${no}`).then(({ data }) => {
                if (data.result == "SUCCESS") {
                    alert("글 삭제 성공");
                    this.$router.push("/tripplan/planlist");
                } else {
                    alert("글 삭제 실패");
                }
            });
        },
        moveModify(no) {
            this.$router.push(`/tripplan/planmodify/${no}`);
        },
        getAttractionInfos() {
            const promises = this.planNums.map((p) => {
                return http
                    .get(`/attraction/${p}`)
                    .then(({ data }) => data)
                    .catch(() => null);
            });

            Promise.all(promises)
                .then((results) => {
                    results.forEach((data) => {
                        this.selected.push(data);
                    });
                })
                .catch(() => { });
        },
    },
};
</script>

<style scoped>
@font-face {
    font-family: "omyu_pretty";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-01@1.0/omyu_pretty.woff2") format("woff2");
    font-weight: normal;
    font-style: normal;
}

textarea {
    font-family: omyu_pretty;
    width: 100%;
    height: 200px;
    padding: 10px;
    box-sizing: border-box;
    border: solid 2px #f8f4fd;
    border-radius: 5px;
    font-size: 20px;
    resize: both;
}
</style>
