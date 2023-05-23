<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="dark">
      <b-navbar-brand href="#">
        <router-link to="/">
          <b-img
            :src="require('@/assets/ssafy_logo.png')"
            id="logo"
            class="d-inline-block align-top"
            alt="logo"
          ></b-img>
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">
            <router-link :to="{ name: 'attraction' }" class="m-2 link">
              <b-icon icon="map" font-scale="2"></b-icon>지역별여행지
            </router-link>
            <router-link :to="{ name: 'tripplan' }" class="m-2 link">
              <b-icon icon="instagram" font-scale="2"></b-icon>나의여행계획
            </router-link>
            <router-link :to="{ name: 'tripinfo' }" class="m-2 link">
              <b-icon icon="house-fill" font-scale="2"></b-icon>여행정보공유
            </router-link>
          </b-nav-item>
        </b-navbar-nav>

        <!-- after login -->
        <b-navbar-nav class="ml-auto" v-if="userInfo">
          <b-nav-item class="align-self-center">
            <b-avatar
              variant="primary"
              v-text="userInfo.userId.charAt(0).toUpperCase()"
            ></b-avatar>
          </b-nav-item>
          <b-nav-item-dropdown right class="align-self-center">
            {{ userInfo.userName }}({{ userInfo.userId }})님
            <b-dropdown-item href="#" v-if="userInfo.userRole == 1">
              <router-link
                :to="{ name: 'mypage' }"
                class="link align-self-center"
                >마이페이지</router-link
              >
            </b-dropdown-item>
            <b-dropdown-item href="#" v-else>
              <router-link
                :to="{ name: 'userlist' }"
                class="link align-self-center"
                >회원관리</router-link
              >
            </b-dropdown-item>
            <b-dropdown-item href="#">
              <b-nav-item
                id="logout"
                class="align-self-center link"
                @click.prevent="onClickLogout"
                >로그아웃</b-nav-item
              >
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <!-- before login -->
        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item-dropdown right>
            <template #button-content>
              <b-icon icon="people" font-scale="2"></b-icon>
            </template>
            <b-dropdown-item href="#">
              <router-link :to="{ name: 'join' }" class="link">
                <b-icon icon="person-circle"></b-icon>회원가입
              </router-link>
            </b-dropdown-item>
            <b-dropdown-item href="#">
              <router-link :to="{ name: 'login' }" class="link">
                <b-icon icon="key"></b-icon>로그인
              </router-link>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

const userStore = "userStore";
export default {
  name: "HeaderNav",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState(userStore, ["isLogin", "userInfo"]),
    ...mapGetters(["checkUserInfo"]),
  },
  methods: {
    ...mapActions(userStore, ["userLogout"]),
    onClickLogout() {
      // action에서 userLogout 실행해서 서버 디비에 저장된 리프레시 토큰 지우기
      this.$store.state.userStore.isLogin = false;
      console.log(this.isLogin);
      console.log(this.userInfo.userId + " 로그아웃");
      this.userLogout(this.userInfo.userId);
      this.$store.state.userStore.isLogin = false;
      console.log(this.isLogin);
      sessionStorage.removeItem("access-token");
      sessionStorage.removeItem("refresh-token");
      if (this.$route.path != "/") this.$router.push({ name: "home" });
    },
  },
};
</script>

<style scoped>
@font-face {
  font-family: "omyu_pretty";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2304-01@1.0/omyu_pretty.woff2")
    format("woff2");
  font-weight: normal;
  font-style: normal;
}
#logo {
  width: 100px;
}

.link {
  text-decoration: none;
  color: #42b983;
}
</style>
