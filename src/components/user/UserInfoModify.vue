<template>
  <b-container class="mt-4" v-if="userInfo">
    <b-row>
      <b-col>
        <b-alert variant="secondary" show>
          <h3 v-if="isAdmin">
            {{ user.userId }}({{ user.userName }}) 사용자 정보 수정하기
          </h3>
          <h3 v-else>내 정보 수정하기</h3>
        </b-alert>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="8">
        <b-card class="mt-3" style="max-width: 40rem" align="left">
          <b-form v-if="show">
            <b-form-group label="이름" label-for="userName">
              <b-form-input
                id="userName"
                v-model="user.userName"
                type="text"
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label="아이디"
              label-for="userId"
              description="아이디는 변경할 수 없어요"
            >
              <b-form-input
                id="userId-input"
                v-model="user.userId"
                type="text"
                readonly
              ></b-form-input>
            </b-form-group>
            <b-form-group label="비밀번호" label-for="userPwd">
              <b-form-input
                id="userPwd"
                v-model="user.userPwd"
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
                v-model="user.userName"
                type="email"
                placeholder="Enter email"
                required
              ></b-form-input>
            </b-form-group>-->
            <label for="emailId" class="form-label">이메일</label>
            <div class="d-flex justify-content-between">
              <input
                v-model="user.emailId"
                style="width: 40%"
                type="text"
                class="form-control"
                id="emailId"
                name="emailId"
                placeholder="이메일"
              />
              <p class="text-center">@</p>
              <select
                v-model="user.emailDomain"
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

            <b-button type="button" variant="primary" @click="modify"
              >저장하기</b-button
            >
            <b-button
              type="button"
              variant="danger"
              @click="getUserInfo(user.userId)"
              >초기화</b-button
            >
          </b-form>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { mapState } from "vuex";
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
      user: {},
      isAdmin: Boolean,
    };
  },
  created() {
    let userId = this.$route.params.userId;
    this.isAdmin = false;
    if (userId == null) {
      this.getUserInfo(this.userInfo.userId);
    } else {
      this.getUserInfo(userId);
      this.isAdmin = true;
    }
  },
  methods: {
    getUserInfo(userId) {
      http
        .get(`/user/${userId}`)
        .then(({ data }) => {
          console.log("[user 정보 받아오기 getUserInfo]");
          console.log(data);
          this.user = data;
        })
        .catch((error) => {
          console.log("[user 정보 받아오기 getUserInfo에러]");
          console.log(error);
        });
    },
    modify() {
      http
        .put("/user", {
          userId: this.user.userId,
          userName: this.user.userName,
          userPwd: this.user.userPwd,
          emailId: this.user.emailId,
          emailDomain: this.user.emailDomain,
        })
        .then(({ data }) => {
          console.log(data);
          console.log(this.isAdmin);
          if (this.isAdmin) {
            this.$router.push({ name: "userlist" });
          } else {
            store.dispatch("userStore/modifyuser", data.userInfo);
            this.$router.push({ name: "mypage" });
          }
        })
        .catch((error) => {
          console.log("[사용자 정보 수정 에러]");
          console.log(error);
        });
    },
    reset() {},
  },
};
</script>

<style></style>
