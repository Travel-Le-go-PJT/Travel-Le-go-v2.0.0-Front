<template>
  <b-container class="mt-4" v-if="userInfo">
    <b-row>
      <b-col>
        <b-alert variant="secondary" show>
          <h3>내 정보 수정하기</h3>
        </b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="8">
        <b-card class="mt-3" style="max-width: 40rem" align="left">
          <b-form @submit="join" v-if="show">
            <b-form-group label="이름" label-for="userName">
              <b-form-input
                id="userName"
                v-model="userInfo.userName"
                type="text"
                placeholder="이름을 입력해주세요."
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group label="아이디" label-for="userId" :state="idState">
              <b-form-input
                id="userId-input"
                v-model="userInfo.userId"
                type="text"
                placeholder="아이디를 입력해주세요."
                required
              ></b-form-input>
              <b-button
                type="button"
                variant="primary"
                @click="IdDuplicateCheck(userInfo.userId)"
              >중복검사</b-button>
            </b-form-group>
            <b-form-group label="비밀번호" label-for="userPwd">
              <b-form-input
                id="userPwd"
                v-model="userInfo.userPwd"
                :state="pwdState"
                type="password"
                placeholder="비밀번호를 입력해주세요."
                required
              ></b-form-input>
            </b-form-group>
            <!-- <b-form-group
              id="input-group-1"
              label="Email address:"
              label-for="input-1"
              description="We'll never share your email with anyone else."
            >
              <b-form-input
                id="input-1"
                v-model="userInfo.userName"
                type="email"
                placeholder="Enter email"
                required
              ></b-form-input>
            </b-form-group>-->
            <label for="emailId" class="form-label">이메일</label>
            <div class="d-flex justify-content-between">
              <input
                v-model="userInfo.emailId"
                style="width: 40%"
                type="text"
                class="form-control"
                id="emailId"
                name="emailId"
                placeholder="이메일"
              />
              <p class="text-center">@</p>
              <select
                v-model="userInfo.emailDomain"
                style="width: 50%"
                id="emailDomain"
                name="emailDomain"
              >
                <option value="ssafy.com">ssafy.com</option>
                <option value="naver.com">naver.com</option>
                <option value="google.com">google.com</option>
              </select>
            </div>
            <!-- <b-button type="submit" variant="success" class="m-1" @click="join"
              >회원가입</b-button
            >-->

            <b-button type="submit" variant="primary">회원가입</b-button>
            <!-- <b-button type="button" variant="danger" @click = >초기화</b-button> -->
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

    <!-- <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-jumbotron>
          <template #header>modify</template>

          <template #lead>내 정보 확인페이지입니다.</template>

          <hr class="my-4" />

          <b-container class="mt-4">
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">아이디</b-col>
              <b-col cols="4" align-self="start">{{ userInfo.userId }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">이름</b-col>
              <b-col cols="4" align-self="start">{{ userInfo.userName }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">이메일</b-col>
              <b-col cols="4" align-self="start">{{ userInfo.emailId }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">가입일</b-col>
              <b-col cols="4" align-self="start">{{ userInfo.joinDate }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
          </b-container>
          <hr class="my-4" />

          <b-button variant="primary" href="#" class="mr-1">정보수정</b-button>
          <b-button variant="danger" href="#" @click="userWithdraw">회원탈퇴</b-button>
        </b-jumbotron>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template> -->

<script>
import { mapState, mapActions } from "vuex";
import http from "@/api/http";

const userStore = "userStore";
export default {
  name: "UserInfoModify",
  components: {},
  computed: {
    ...mapState(userStore, ["userInfo"]),
  },
  data() {
    return {
      show: true,
    };
  },
  // create() {
  //   if(user)
  // },
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
  },
};
</script>

<style></style>
