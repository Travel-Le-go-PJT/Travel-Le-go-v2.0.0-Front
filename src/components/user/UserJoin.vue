<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col align="center">
        <h1>SIGN UP</h1>
        <div class="line justify-content-center"></div>
      </b-col>
    </b-row>

    <b-row>
      <b-col cols="5">
        <b-card
          class="mt-3"
          style="max-width: 40rem"
          align="left"
          id="cardbody"
        >
          <b-form @submit="join" v-if="show">
            <b-form-group label="Name" label-for="userName">
              <b-form-input
                id="userName"
                v-model="joinUser.userName"
                type="text"
                placeholder="이름을 입력해주세요."
                required
                class="form-control no-border"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              label="ID"
              label-for="userId"
              description="아이디는 변경할 수 없어요! 
              신중하게 정해주세요."
            >
              <b-form-input
                id="userId-input"
                v-model="joinUser.userId"
                type="text"
                placeholder="아이디를 입력해주세요."
                required
                class="form-control no-border"
              ></b-form-input>
              <b-button
                type="button"
                id="check-button"
                @click="IdDuplicateCheck(joinUser.userId)"
                >확인</b-button
              >
            </b-form-group>
            <b-form-group label="Password" label-for="userPwd">
              <b-form-input
                id="userPwd"
                v-model="joinUser.userPwd"
                type="password"
                placeholder="비밀번호를 입력해주세요."
                class="form-control no-border"
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
                v-model="joinUser.userName"
                type="email"
                placeholder="Enter email"
                required
              ></b-form-input>
            </b-form-group>-->
            <label for="emailId" class="form-label">Email</label>
            <div class="d-flex justify-content-between">
              <input
                v-model="joinUser.emailId"
                style="width: 40%"
                type="text"
                class="form-control form-control no-border"
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
            <!-- <b-button type="submit" variant="success" class="m-1" @click="join"
              >회원가입</b-button
            >-->

            <b-button
              type="submit"
              variant="primary"
              class="button mt-4"
              id="join"
              >회원가입</b-button
            >
            <div></div>
            <b-button type="reset" variant="danger" class="button" id="reset"
              >다시 작성하기</b-button
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
      show: true,
      idcheck: false,
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
    join(event) {
      event.preventDefault();
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
            this.$router.push({ name: "login" });
          } else if (data.result == "DUPLICATE") {
            alert("아이디 중복 검사를 확인하세요");
          } else {
            alert("가입 실패!");
          }
        })

        .catch(() => {
          alert("가입 실패!");
        });
    },
    IdDuplicateCheck(userId) {
      console.log(userId);
      http
        .get(`/user/idcheck/${userId}`)
        .then(({ data }) => {
          console.log(data.result);
          if (data.result == "SUCCESS") {
            this.idcheck = true;
            console.log("사용가능");
            alert("아이디 사용 가능");
          }
          if (data.result == "DUPLICATE") {
            this.idcheck = false;
            alert("아이디 중복");
          } else {
            console.log("dfdfs");
          }
        })
        .catch(() => {
          console.log("아이디 중복 체크 실패 ");
        });
    },
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
  width: 80%;
}
.button {
  width: 100%;
  /* background-color: #2790f9; */
  font-weight: 800;
  margin: 3px;
}
#join {
  background-color: #2790f9;
}
#reset {
  background-color: #ff7474;
}
</style>
