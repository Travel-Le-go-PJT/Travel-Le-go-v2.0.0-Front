<template>
    <div class="text-left col-sm-12 col-md-12" style="height: auto">
        <div class="row">
            <div class="col-6">
                <b-form-group >
                    <template #label> <b-icon icon="person-fill"></b-icon> 작성자 </template>
                    <b-form-input id="userId" v-model="localArticle.userId" type="text" readonly></b-form-input>
                </b-form-group>
            </div>
            <div class="col-6">
                <b-form-group >
                    <template #label> <b-icon icon="calendar2-date"></b-icon> 등록일 </template>
                    <b-form-input id="registerTime" v-model="localArticle.registerTime" type="text" readonly></b-form-input>
                </b-form-group>
            </div>
        </div>
        <b-form-group >
            <template #label> <b-icon icon="eye-fill"></b-icon> 조회수 </template>
            <b-form-input id="subject" v-model="localArticle.hit" type="text" readonly></b-form-input>
        </b-form-group>
        <b-form-group>
            <template #label> <font-awesome-icon :icon="['fas', 'plane']" /> 여행 제목 </template>
            <b-form-input id="subject" v-model="localArticle.subject" type="text" readonly></b-form-input>
        </b-form-group>
        <b-form-group>
            <template #label> <b-icon icon="vector-pen"></b-icon> 여행 상세 </template>
            <b-form-textarea id="content" v-model="localArticle.content" readonly rows="3"></b-form-textarea>
        </b-form-group>
        <div class="row">
            <div class="col-5 btn-container">
                <b-button class="btn-hover color-3" style="margin-right: 10px" @click="moveList">
                    글 목록</b-button>
                <b-button class="btn-hover color-3" style="margin-right: 10px" v-if="userInfo != null && (userInfo.userId != article.userId && userInfo.userRole === 1)"
                    @click="moveScrap(localArticle.articleNo)">계획가져오기</b-button>
                <b-button class="btn-hover color-3" style="margin-right: 10px" v-if="userInfo != null && (userInfo.userId === article.userId || userInfo.userRole === 2)"
                    @click="moveModify(localArticle.articleNo)">글 수정하기</b-button>
                <b-button class="btn-hover color-3" v-if="userInfo != null && (userInfo.userId === article.userId || userInfo.userRole === 2)"
                    @click="removeArticle(localArticle.articleNo)">글 삭제하기</b-button>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <b-button variant="outline-danger" class="btn-favorite" style="box-shadow: none"
                    @click="favorite(localArticle.articleNo)">
                    <b-icon :icon="favoriteIcon"></b-icon> 좋아요
                    <span>{{ this.favoriteCount }}</span>
                </b-button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import http from "@/api/http.js";
export default {
    name: "TripPlanInfo",
    data() {
        return {
            localArticle: {},
            favoriteIcon: "heart",
            isFavorite: false,
            favoriteCount: 0,
        };
    },
    computed: {
        ...mapState("userStore", ["userInfo"]),
    },
    props: {
        article: {},
    },
    methods: {
        moveList() {
            this.$router.push("/tripplan/planlist");
        },
        removeArticle(no) {
            if (no == null) return;
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
            if (no == null) return;
            this.$router.push(`/tripplan/planmodify/${no}`);
        },
        moveScrap(no){
            if (no == null) return;
            this.$router.push(`/tripplan/planscrap/${no}`);
        },
        favorite(no) {
            if (this.userInfo == null || no == null) {
                return;
            }
            let myData = {
                articleNo: no,
                userId: this.userInfo.userId,
            };
            if (this.isFavorite) {
                http
                    .delete("/tripPlanBoard/favorite", {
                        params: myData,
                    })
                    .then(({ data }) => {
                        if (data.result == "SUCCESS") {
                            this.isFavorite = false;
                            this.favoriteIcon = "heart";
                            this.favoriteCount -= 1;
                        }
                    });
            } else {
                http.post("/tripPlanBoard/favorite", myData).then(({ data }) => {
                    if (data.result == "SUCCESS") {
                        this.isFavorite = true;
                        this.favoriteIcon = "heart-fill";
                        this.favoriteCount += 1;
                    }
                });
            }
        },
    },
    watch: {
        article() {
            this.localArticle = this.article;
            let myData = {
                articleNo: this.localArticle.articleNo,
                userId: this.userInfo.userId,
            };
            console.log(myData);
            http
                .get("/tripPlanBoard/favorite", {
                    params: myData,
                })
                .then(({ data }) => {
                    if (data) {
                        this.isFavorite = true;
                        this.favoriteIcon = "heart-fill";
                    } else {
                        this.isFavorite = false;
                        this.favoriteIcon = "heart";
                    }
                })
                .catch(() => { });
            http
                .get(`/tripPlanBoard/favorite/${this.localArticle.articleNo}`)
                .then(({ data }) => {
                    this.favoriteCount = data;
                })
                .catch(() => { });
        },
    },
};
</script>

<style scoped>
.btn-hover {
    width: 75px;
    font-family: omyu_pretty;
    font-size: 16px;
    font-weight: 600;
    color: #ffffff;
    cursor: pointer;
    height: max-content + 10px;
    text-align: center;
    border: none;
    background-size: 300% 100%;
    padding: 10px 0px;
    border-radius: 10px;
    moz-transition: all 0.4s ease-in-out;
    -o-transition: all 0.4s ease-in-out;
    -webkit-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out;
}

.btn-hover:hover {
    background-position: 100% 0;
    moz-transition: all 0.4s ease-in-out;
    -o-transition: all 0.4s ease-in-out;
    -webkit-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out;
}

.btn-hover:focus.btn-favorite:focus {
    outline: none;
}

.btn-hover.color-3 {
    background-image: linear-gradient(to right,
            #2790f9,
            #55e495);
    box-shadow: 0 0 5px 0 rgba(76, 74, 77, 0.5);
}

.btn-container {
    display: flex;
    margin: 20px;
    padding: 0;
}
</style>
