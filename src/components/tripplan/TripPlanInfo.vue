<template>
    <div class="text-left col-sm-12 col-md-12" style="height: auto;">
        <div class="row">
            <div class="col-6">
                <b-form-group label="등록자">
                    <b-form-input id="userId" v-model="localArticle.userId" type="text" readonly></b-form-input>
                </b-form-group>
            </div>
            <div class="col-6">
                <b-form-group label="등록일">
                    <b-form-input id="registerTime" v-model="localArticle.registerTime" type="text" readonly></b-form-input>
                </b-form-group>
            </div>
        </div>
        <b-form-group label="여행 제목">
            <b-form-input id="subject" v-model="localArticle.subject" type="text" readonly></b-form-input>
        </b-form-group>
        <b-form-group label="여행 상세">
            <b-form-textarea id="content" v-model="localArticle.content" readonly rows="3"></b-form-textarea>
        </b-form-group>
        <div class="row">
            <div class="col-12">
                <b-button class="btn-hover color-3" @click="moveList"> 글 목록</b-button>
                <b-button class="btn-hover color-3" v-if="userInfo.userId === article.userId"
                    @click="removeArticle(localArticle.articleNo)">글 삭제하기</b-button>
                <b-button class="btn-hover color-3" v-if="userInfo.userId === article.userId"
                    @click="moveModify(localArticle.articleNo)">글 수정하기</b-button>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <b-button variant="outline-danger" style="box-shadow: none;" @click="favorite(localArticle.articleNo)">
                    <b-icon :icon="favoriteIcon"></b-icon> 좋아요
                    <span>{{ this.favoriteCount }}</span>
                </b-button>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import http from "@/api/http.js"
export default {
    name: "TripPlanInfo",
    data() {
        return {
            localArticle: {},
            favoriteIcon: "heart",
            isFavorite: false,
            favoriteCount: 0
        }
    },
    computed: {
        ...mapState("userStore", ["userInfo"]),
    },
    props: {
        article: {},
    },
    methods: {
        moveList() {
            this.$router.push("/tripplan/");
        },
        removeArticle(no) {
            http.delete(`/tripPlanBoard/${no}`)
                .then(({ data }) => {
                    if (data.result == "SUCCESS") {
                        alert("글 삭제 성공");
                        this.$router.push("/tripplan/list");
                    } else {
                        alert("글 삭제 실패");
                    }
                });
        },
        moveModify(no) {
            this.$router.push(`/tripplan/modify/${no}`);
        },
        favorite(no) {
            let myData = {
                articleNo: no,
                userId: this.userInfo.userId
            }
            if (this.isFavorite) {

                console.log(myData);
                http.delete("/tripPlanBoard/favorite", {
                    params: myData
                })
                    .then(({ data }) => {
                        if (data.result == "SUCCESS") {
                            this.isFavorite = false;
                            this.favoriteIcon = "heart";
                            this.favoriteCount -= 1;
                        }
                    });
            } else {
                http.post("/tripPlanBoard/favorite", myData)
                    .then(({ data }) => {
                        if (data.result == "SUCCESS") {
                            this.isFavorite = true;
                            this.favoriteIcon = "heart-fill"
                            this.favoriteCount += 1;
                        }
                    });
            }

        }
    },
    watch: {
        article() {
            this.localArticle = this.article;
            let myData = {
                articleNo: this.localArticle.articleNo,
                userId: this.userInfo.userId
            };
            console.log(myData);
            http.get("/tripPlanBoard/favorite", {
                params: myData
            })
                .then(({ data }) => {
                    if (data) {
                        this.isFavorite = true;
                        this.favoriteIcon = "heart-fill"
                    } else {
                        this.isFavorite = false;
                        this.favoriteIcon = "heart"
                    }
                }).catch(() => {

                });
            http.get(`/tripPlanBoard/favorite/${this.localArticle.articleNo}`)
                .then(({ data }) => {
                    this.favoriteCount = data;
                }).catch(() => {

                });
        },
    }
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
    margin: 20px;
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

.btn-hover:focus {
    outline: none;
}

.btn-hover.color-3 {
    background-image: linear-gradient(to right,
            #f3f04f,
            #fca533,
            #7dd66b,
            #bad737);
    box-shadow: 0 4px 15px 0 rgba(145, 79, 68, 0.75);
}
</style>