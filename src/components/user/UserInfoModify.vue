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
          <b-form v-if="show">
            <b-form-group label="이름" label-for="userName">
              <b-form-input id="userName" v-model="userInfo.userName" type="text" required></b-form-input>
            </b-form-group>
            <b-form-group label="아이디" label-for="userId" description="아이디는 변경할 수 없어요">
              <b-form-input id="userId-input" v-model="userInfo.userId" type="text" readonly></b-form-input>
            </b-form-group>
            <b-form-group label="비밀번호" label-for="userPwd">
              <b-form-input
                id="userPwd"
                v-model="userInfo.userPwd"
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

            <b-button type="button" variant="primary" @click="modify">저장하기</b-button>
            <b-button
              type="button"
              variant="danger"
              @click="this.$router.push(`/tripinfo/infodetail/${no}`);"
            >초기화</b-button>
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { mapState, mapActions } from "vuex";
import http from "@/api/http";
import store from "@/store";

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
      // joinUser: {
      //   userId:this.userInfo.useridnull,
      //   userName: null,
      //   userPwd: null,
      //   emailId: null,
      //   emialDomain: null,
      // },
    };
  },
  methods: {
    ...mapActions(userStore, ["userLogout"]),
    modify() {
      http
        .put("/user", {
          userId: this.userInfo.userId,
          userName: this.userInfo.userName,
          userPwd: this.userInfo.userPwd,
          emailId: this.userInfo.emailId,
          emailDomain: this.userInfo.emailDomain,
        })
        .then(({ data }) => {
          console.log(data);
          store.dispatch("userStore/modifyuser", data.userInfo);
          this.$router.push({ name: "mypage" });
        })
        .catch((error) => {
          console.log("[사용자 정보 수정 에러]");
          console.log(error);
        });
    },
  },
};
</script>

<style></style>
