<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col align="center">
        <h1 v-if="isAdmin">
          {{ user.userId }}({{ user.userName }}) 사용자 정보 수정하기
        </h1>
        <h1 v-else>Update My Info</h1>
        <div class="line justify-content-center"></div>
      </b-col>
    </b-row>
    <!-- <b-container class="mt-4" v-if="userInfo"> -->

    <b-row>
      <b-col cols="5">
        <b-card
          class="mt-3"
          style="max-width: 40rem"
          align="left"
          id="cardbody"
        >
          <b-form v-if="show">
            <b-form-group label="Name" label-for="userName">
              <b-form-input
                id="userName"
                v-model="user.userName"
                type="text"
                required
                class="form-control no-border"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label="ID"
              label-for="userId"
              description="아이디는 변경할 수 없어요!"
            >
              <b-form-input
                id="userId-input"
                v-model="user.userId"
                type="text"
                readonly
                class="form-control no-border"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Password" label-for="userPwd">
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
            <label for="emailId" class="form-label">Email</label>
            <div class="d-flex justify-content-between">
              <input
                v-model="user.emailId"
                style="width: 40%"
                type="text"
                class="form-control no-border"
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

            <b-button
              type="button"
              variant="primary"
              @click="modify"
              class="button mt-4"
              id="save"
              >저장하기</b-button
            >
            <b-button
              type="button"
              variant="danger"
              @click="getUserInfo(user.userId)"
              class="button"
              id="reset"
              >다시 수정하기</b-button
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

<style scoped>
h1 {
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
#check-button {
  width: 20%;
  height: 40px;
  text-align: top;

  font-weight: 800;
  background-color: #2790f9;
}
#userId-input {
  width: 100%;
}
.button {
  width: 100%;
  /* background-color: #2790f9; */
  font-weight: 800;
  margin: 3px;
}
#save {
  background-color: #2790f9;
}
#reset {
  background-color: #ff7474;
}
</style>
