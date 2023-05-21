<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert variant="secondary" show>
          <h3>회원가입</h3>
        </b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-card class="text-center mt-3" style="max-width: 40rem" align="left">
          <b-form class="text-left">
            <b-alert show variant="danger" v-if="isJoinError"
              >아이디 또는 비밀번호를 확인하세요.</b-alert
            >
            <b-form-group
              label="이름"
              label-for="userName"
              invalid-feedback="이름을 입력해주세요."
              :state="nameState"
            >
              <b-form-input
                id="userName"
                v-model="joinUser.userName"
                :state="nameState"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label="아이디"
              label-for="userId"
              invalid-feedback="아이디를 입력해주세요."
              :state="idState"
            >
              <b-form-input
                id="userId"
                v-model="joinUser.userId"
                :state="idState"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label="비밀번호"
              label-for="userPwd"
              invalid-feedback="비밀번호를 입력해주세요."
              :state="pwdState"
            >
              <b-form-input
                id="userPwd"
                v-model="joinUser.userPwd"
                :state="pwdState"
                type="password"
                required
              ></b-form-input>
            </b-form-group>

            <label for="emailId" class="form-label">이메일</label>
            <div class="d-flex justify-content-between">
              <input
                v-model="joinUser.emailId"
                style="width: 40%"
                type="text"
                class="form-control"
                id="emailId"
                name="emailId"
                placeholder="이메일"
              />
              <p class="text-center">@</p>
              <select
                v-model="joinUser.emailDomain"
                style="width: 50%"
                id="emailDomain"
                name="emailDomain"
              >
                <option value="ssafy.com">ssafy.com</option>
                <option value="naver.com">naver.com</option>
                <option value="google.com">google.com</option>
              </select>
            </div>
            <b-button type="button" variant="success" class="m-1" @click="join"
              >회원가입</b-button
            >
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
// import { faArrowLeftRotate } from "@fortawesome/free-solid-svg-icons";
import http from "@/api/http";
export default {
  name: "UserJoin",
  components: {},
  data() {
    return {
      isJoinError: false,
      joinUser: {
        userId: null,
        userName: null,
        userPwd: null,
        emailId: null,
        emialDomain: null,
      },
    };
  },
  created() {},
  methods: {
    join() {
      http
        .post("/user/join", {
          userId: this.joinUser.userId,
          userName: this.joinUser.userName,
          userPwd: this.joinUser.userPwd,
          emailId: this.joinUser.emailId,
          emailDomain: this.joinUser.emailDomain,
        })
        .then(({ data }) => {
          if (data.result == "SUCCESS") {
            alert("가입 성공!");
            this.$router.push({ name: "home" });
          } else {
            alert("가입 실패!");
          }
        })
        .catch(() => {
          alert("가입 실패!");
        });
    },
  },
};
</script>

<style scoped></style>
