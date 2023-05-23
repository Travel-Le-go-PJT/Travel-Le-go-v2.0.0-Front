<template>
  <div class="boardList">
    <h1 id="title"></h1>
    <div>
      <table id="book-list">
        <colgroup>
          <col style="width: 10%" />
          <col style="width: 10%" />
          <col style="width: 15%" />
          <col style="width: 15%" />
          <col style="width: 5%" />
        </colgroup>
        <thead>
          <tr>
            <th>이름</th>
            <th>아이디</th>
            <th>가입일</th>
            <th>이메일</th>
            <th>작성글 개수</th>
            <th>작성글 보기</th>
            <th>수정하기</th>
          </tr>
        </thead>
        <tbody id="item">
          <template v-for="(user, index) in users">
            <admin-user-info-item
              :user="user"
              :index="index"
              :key="user.userId"
            ></admin-user-info-item>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import http from "@/api/http.js";
import AdminUserInfoItem from "@/components/user/admin/AdminUserInfoItem.vue";
export default {
  name: "AdminUserList",
  components: { AdminUserInfoItem },
  data() {
    return {
      users: [],
      user: {},
    };
  },
  created() {
    this.userlist();
  },
  methods: {
    userlist() {
      http
        .get("/user")
        .then(({ data }) => {
          console.log("[사용자 정보 리스트]");
          console.log(data);
          this.users = data;
        })
        .catch((error) => {
          console.log("[사용자 정보 리스트 에러]");
          console.log(error);
        });
    },
  },
};
</script>

<style scoped>
@font-face {
  font-family: "KCC-Jeongbeom";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2202@1.0/KCC-Jeongbeom.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "omyu_pretty";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-01@1.0/omyu_pretty.woff2")
    format("woff2");
  font-weight: normal;
  font-style: normal;
}

#title {
  font-family: KCC-Jeongbeom;
  color: #ff9900;
  width: 800px;
  text-align: center;
  margin: 0 auto;
}
/* #item :hover {
  background: #ff9900;
} */
#book-list tbody > tr {
  background: #fffeed;
}
.boardList {
  font-family: omyu_pretty;
  font-size: 20px;
}
#book-list {
  margin: auto;
  width: 70%;
  border-collapse: collapse;
}
#book-list thead > tr {
  border-top: none;
  background: #fca118;
  color: #fff;
  font-size: 25px;
}

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
  font-weight: bold;
  width: 120px;
  display: inline-block;
  color: #000;
}

#book-list th,
#book-list td {
  text-align: center;
}

#book-list {
  color: #333;
  border-radius: 0.4em;
  overflow: hidden;
}
#book-list tr {
  border-color: #bfbfbf;
}

#book-list th,
#book-list td {
  padding: 0.5em 1em;
}
#recommend {
  margin: 5%;
  font-size: 50px;
}

.btn-hover.color-3 {
  background-image: linear-gradient(
    to right,
    #f3f04f,
    #ffb34f,
    #b6d66b,
    #bad737
  );
  box-shadow: 0 4px 15px 0 rgba(116, 79, 168, 0.75);
}
</style>
