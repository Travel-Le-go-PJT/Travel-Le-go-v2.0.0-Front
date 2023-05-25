<template>
  <tr striped hover>
    <td v-text="user.userName"></td>
    <td v-text="user.userId"></td>
    <td v-text="user.joinDate"></td>
    <td>{{ user.emailId }}@{{ user.emailDomain }}</td>
    <td v-text="count"></td>
    <td>
      <button
        type="submit"
        class="btn-hover color-3 wbtn"
        @click="getUserArticle(user.userId)"
      >작성글 보기</button>
    </td>
    <td>
      <button
        type="submit"
        class="btn-hover color-3 wbtn"
        @click="adminModifyUserInfo(user.userId)"
      >수정하기</button>
    </td>
    <td>
      <button type="danger" class="btn-hover color-3 wbtn" @click="userWithdraw(user.userId)">회원 삭제</button>
    </td>
  </tr>
</template>

<script>
import { mapState } from "vuex";
import http from "@/api/http.js";
import Vue from "vue";

Vue.prototype.$EventBus = new Vue();
const userStore = "userStore";
export default {
  name: "AdminUserInfoItem",
  props: {
    user: {},
  },
  data() {
    return {
      count: 0,
    };
  },
  created() {
    this.getCount();
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
  },
  methods: {
    getCount() {
      http
        .get(`/user/count/${this.user.userId}`)
        .then(({ data }) => {
          console.log("[사용자 글 개수]");
          console.log(data);
          this.count = data;
        })
        .catch((error) => {
          console.log("[사용자 글 개수 에러]");
          console.log(error);
        });
    },
    getUserArticle(userId) {
      console.log(userId + "가 작성한 글 보기");
      this.$router.push(`/admin/userarticlelist/${userId}`);
    },
    adminModifyUserInfo(userId) {
      console.log(userId + "정보 수정하기");
      this.$router.push(`/user/usermodify/${userId}`);
    },
    userWithdraw() {
      if (confirm("회원을 탈퇴시키겠습니까?") == true) {
        http.put(`/user/${this.user.userId}`);
        this.$router.push({ name: "userlist" });

        this.$emit("userWithdraw");
      }
    },
  },
};
</script>

<style scoped>
#book-list tr {
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  background-color: #fffeed;
}

/* #book-list tr:nth-child(odd):not(:first-child) {
  background-color: #fffeed;
} */

#book-list td:first-child {
  margin-top: 0.5em;
}
#book-list td:last-child {
  margin-bottom: 0.5em;
}

#book-list td:before {
  /* font-weight: bold; */
  width: 120px;
  display: inline-block;
  color: #000;
}
.subject {
  float: left;
}
#book-list td {
  text-align: center;
  font-size: 90%;
  color: #5e5e5e;
  font-weight: 100;
}

#book-list th,
#book-list td {
  padding: 0.5em 1em;
}
.wbtn {
  background-color: #fff;
  border-color: #2790f9;
  color: #2790f9;
}
.wbtn:hover {
  background-color: #2790f9;
  border-color: #2790f9;
  color: #fff;
}
</style>
