<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col align="center">
        <h1>LOG IN</h1>
        <div class="line justify-content-center"></div>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="5">
        <b-card
          class="mt-3"
          style="max-width: 40rem"
          id="cardbody"
          align="left"
        >
          <b-form @submit="confirm">
            <b-alert show variant="danger" v-if="isLoginError"
              >아이디 또는 비밀번호를 확인하세요.</b-alert
            >
            <b-form-group label="ID" label-for="userId">
              <b-form-input
                id="userId"
                v-model="user.userId"
                required
                type="text"
                placeholder="아이디 입력해주세요."
                @keyup.enter="confirm"
                class="form-control no-border"
              ></b-form-input>
            </b-form-group>
            <!-- <div></div> -->
            <b-form-group label="Password" label-for="userPwd">
              <b-form-input
                type="password"
                id="userPwd"
                v-model="user.userPwd"
                required
                placeholder="비밀번호 입력해주세요."
                @keyup.enter="confirm"
                class="form-control no-border"
              ></b-form-input>
            </b-form-group>

            <a href="#">비밀번호를 잊으셨나요? </a>
            <div></div>
            <div align="center">
              <div>
                <b-button
                  id="loginbutton"
                  type="button"
                  variant="primary"
                  class="m-1"
                  @click="confirm"
                  >로그인</b-button
                >
              </div>
              <div>
                <a href="#" @click="movePage"
                  >회원이 아니세요 ? 회원가입 하기</a
                >
              </div>
            </div>
          </b-form>
        </b-card>
      </b-col>
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
      if (this.user.userId == null) {
        console.log("아이디 없음 " + this.user.userId);
        alert("아이디를 입력하세요.");
        return;
      }
      if (this.user.userPwd == null) {
        console.log("비밀번호 없음 " + this.user.userPwd);
        alert("비밀번호를 입력하세요.");
        return;
      }
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

<style scoped>
h1 {
  color: #2790f9;
  font-weight: 600;
}
#cardbody {
  margin: auto;
  border: none;
}
.line {
  border-top: 6px solid #2790f9;
  width: 160px;

  /* margin:  0px; */
}
a {
  font-size: 13px;
  color: #444444;
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
#loginbutton {
  width: 100%;
  background-color: #2790f9;
  font-weight: 800;
}
</style>
