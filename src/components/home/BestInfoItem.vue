<template>
    <div class="cardbox m-4">
        <div class="card">
            <div class="card-body">
                <h2 class="card-title">{{ article.subject }}</h2>
                <p class="card-text"><b-icon icon="person-fill"></b-icon><strong> {{ article.userId }}</strong></p>
                <p class="card-text"><b-icon icon="calendar2-date"></b-icon> {{ article.registerTime | showTime }}</p>

                <p class="card-text"><b-icon icon="eye-fill"></b-icon> {{ article.hit }}</p>

                <div class="pt-3">
                    <b-button class="card-button" @click="showArticle(article.articleNo)">
                        글 보러가기
                    </b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "BestInfoItem",
    data() {
        return {

        };
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
            this.$router.push(`/tripinfo/infodetail/${no}`);
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
    width: 360px;
    height: 320px;
    border-color: #b2cce6;
    border-radius: 0;
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
</style>
