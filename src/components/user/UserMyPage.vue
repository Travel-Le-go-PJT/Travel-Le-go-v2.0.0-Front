<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col align="center">
        <h1 id="title">My Page</h1>
        <div class="line justify-content-center"></div>
      </b-col>
    </b-row>

    <b-row>
      <b-col></b-col>
      <b-col cols="10">
        <b-jumbotron>
          <template>내 정보 확인페이지입니다.</template>

          <hr class="my-4" />

          <b-container>
            <b-row>
              <b-col cols="2" align-self="end">ID</b-col>
              <b-col cols="4" align-self="start">{{ userInfo.userId }}</b-col>
            </b-row>
            <b-row>
              <b-col cols="2" align-self="end">Name</b-col>
              <b-col cols="4" align-self="start">{{ userInfo.userName }}</b-col>
            </b-row>
            <b-row>
              <b-col cols="2" align-self="end">Email</b-col>
              <b-col cols="4" align-self="start">{{ userInfo.emailId }}</b-col>
            </b-row>
            <b-row>
              <b-col cols="2" align-self="end">Register Date</b-col>
              <b-col cols="4" align-self="start">{{ userInfo.joinDate }}</b-col>
            </b-row>
          </b-container>
          <hr class="my-4" />

          <b-button
            variant="primary"
            href="#"
            class="button mt-4"
            @click="movepage"
            id="modify"
            >정보수정</b-button
          >
          <div></div>
          <b-button
            variant="danger"
            href="#"
            @click="userWithdraw"
            class="button"
            id="delete"
            >회원탈퇴</b-button
          >
        </b-jumbotron>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import http from "@/api/http";

const userStore = "userStore";
export default {
  name: "UserMyPage",
  components: {},
  computed: {
    ...mapState(userStore, ["userInfo"]),
  },
  methods: {
    ...mapActions(userStore, ["userLogout"]),
    userWithdraw() {
      if (confirm("회원을 탈퇴하시겠습니까?") == true) {
        sessionStorage.removeItem("access-token");
        sessionStorage.removeItem("refresh-token");
        http.put(`/user/${this.userInfo.userId}`);
        this.userLogout(this.userInfo.userId);
        this.$router.push({ name: "home" });
        if (this.$route.path != "/") this.$router.push({ name: "home" });
      }
    },
    movepage() {
      this.$router.push({ name: "usermodify" });
    },
  },
};
</script>

<style scoped>
#title {
  color: #2790f9;
  font-weight: 600;
}
.form-control {
  display: inline;
}
.line {
  border-top: 6px solid #2790f9;
  width: 180px;

  /* margin:  0px; */
}

.line-black {
  border-top: 3px solid #08192b;
  width: 180px;
  display: flex;
  justify-content: center;

  margin: 0px;
}
#cardbody {
  margin: auto;
  border: none;
}
.no-border {
  border-radius: 0;
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
  box-shadow: none !important;
}
.row {
  justify-content: center;
}
.jumbotron {
  background-color: white;
}
.button {
  width: 30%;
  /* background-color: #2790f9; */
  font-weight: 800;
  margin: 3px;
}
#modify {
  background-color: #2790f9;
}
#delete {
  background-color: #ff7474;
}
.col-4 {
  height: 40px;
}
.col-2 {
  height: 40px;
}
</style>
