<template>
    <div class="cardbox m-4">
        <div class="card">
            <img class="card-img-top" src="" alt="" />
            <div class="card-body">
                <h2 class="card-title">{{ article.subject }}</h2>
                <p class="card-text"><b-icon icon="person-fill"></b-icon><strong> {{ article.userId }}</strong></p>
                <p class="card-text"><b-icon icon="calendar2-date"></b-icon> {{ article.registerTime | showTime }}</p>
                <div class="d-flex justify-content-center">
                    <p class="card-text" style="margin-right: 8px;"><b-icon icon="eye-fill"></b-icon> {{
                        article.hit }}</p>
                    <p class="card-text"><b-icon icon="heart-fill" style="color:red"></b-icon> {{ favoriteCount }}</p>
                </div>
                <div class="pt-3">
                    <b-button class="card-button" @click="showArticle(article.articleNo)">
                        자세히보기
                    </b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import http from "@/api/http.js";
export default {
    name: "BestPlanItem",
    data() {
        return {
            favoriteCount: 0
        };
    },
    mounted() {
        http.get(`/tripPlanBoard/favorite/${this.article.articleNo}`)
            .then(({ data }) => {
                this.favoriteCount = data;
            }).catch(() => {

            });
    },
    props: {
        article: {},
    },
    filters: {
        showTime(value) {
            return (value + "").substring(0, 10);
        },
    },
    methods: {
        showArticle(no) {
            this.$router.push(`/tripplan/plandetail/${no}`);
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

.cardbox {
    display: flex;
    justify-content: space-around;
}

.card {
    float: left;
    width: 250px;
    box-shadow: 0 0 10px rgb(31, 38, 135, 0.2);
    border-radius: 10px;
    border-color: #b2cce6;
}

.card-button {
    box-shadow: none;
    font-size: 16px;
    background-color: #2790f9;
    border-color: #2790f9;
    color: #fff;
}

.card-button:hover {
    background-color: #1c5fa3;
    border-color: #1c5fa3;
    color: #fff;
    box-shadow: none;
}


.b-icon {
    margin-right: 4px;
}
</style>
