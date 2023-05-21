<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <b-alert variant="secondary" show>
          <h3>LOG IN</h3>
        </b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-card class="mt-3" style="max-width: 40rem" align="left">
          <b-form>
            <b-alert show variant="danger" v-if="isLoginError"
              >아이디 또는 비밀번호를 확인하세요.</b-alert
            >
            <b-form-group label="아이디:" label-for="userId">
              <b-form-input
                id="userId"
                v-model="user.userId"
                required
                type="text"
                placeholder="아이디 입력해주세요."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="비밀번호:" label-for="userPwd">
              <b-form-input
                type="password"
                id="userPwd"
                v-model="user.userPwd"
                required
                placeholder="비밀번호 입력해주세요."
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <b-button
              type="submit"
              variant="primary"
              class="m-1"
              @click="confirm"
              >로그인</b-button
            >
            <b-button
              type="submit"
              variant="success"
              class="m-1"
              @click="movePage"
              >회원가입</b-button
            >
          </b-form>
        </b-card>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
const userStore = "userStore";
export default {
  name: "UserLogin",
  components: {},
  data() {
    return {
      user: {
        userId: null,
        userPwd: null,
      },
    };
  },
  computed: {
    ...mapState(userStore, ["isLogin", "isLoginError", "userInfo"]),
  },
  methods: {
    //Vuex에 선언한 actions 속성을 뷰 컴포넌트에 더 쉽게 연결 해주는 헬퍼
    ...mapActions(userStore, ["userConfirm", "getUserInfo"]),
    async confirm() {
      //userConfirm 함수를 실행하면 서버에서 토큰을 받아온다
      //토큰을 받아온 후에 아래 코드를 실행해야하기 때문에 await
      await this.userConfirm(this.user);
      console.log("user : " + this.user.userId + " " + this.user.userPwd);
      let token = sessionStorage.getItem("access-token");
      console.log("1. confirm() token >> " + token);
      if (this.isLogin) {
        alert("로그인!!!");
        await this.getUserInfo(token);
        console.log("4. confirm() userInfo :: ", this.userInfo);
        this.$router.push({ name: "home" });
      }
    },
    movePage() {
      this.$router.push({ name: "join" });
    },
  },
};
</script>

<style scoped></style>
