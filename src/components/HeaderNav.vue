<template>
  <div>
    <b-navbar class="fixed-top" :class="navbarClasses" toggleable="lg" justify-content-end>
      <b-navbar-brand href="#">
        <router-link to="/">
          <b-img
            :src="require('@/assets/logo/Travel_Le_go_logo-removebg.png')"
            id="logo"
            class="d-inline-block align-top"
            alt="logo"
          ></b-img>
        </router-link>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse class="ml-auto" id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="#" class="rountlist ml-auto">
            <router-link :to="{ name: 'attraction' }" class="navitem m-2 link">지역별여행지</router-link>
            <router-link :to="{ name: 'tripplan' }" class="navitem m-2 link">나의여행계획</router-link>
            <router-link :to="{ name: 'tripinfo' }" class="navitem m-2 link">여행정보공유</router-link>
          </b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto" v-if="userInfo">
          <b-nav-item class="align-self-center">
            <b-avatar variant="primary" v-text="userInfo.userId.charAt(0).toUpperCase()"></b-avatar>
          </b-nav-item>
          <b-nav-item-dropdown right class="align-self-center">
            {{ userInfo.userName }}({{ userInfo.userId }})님
            <b-dropdown-item href="#" v-if="userInfo.userRole == 1">
              <router-link :to="{ name: 'mypage' }" class="link align-self-center">마이페이지</router-link>
            </b-dropdown-item>
            <b-dropdown-item href="#" v-else>
              <router-link :to="{ name: 'userlist' }" class="link align-self-center">회원관리</router-link>
            </b-dropdown-item>
            <b-dropdown-item href="#">
              <b-nav-item
                id="logout"
                class="align-self-center link"
                @click.prevent="onClickLogout"
              >로그아웃</b-nav-item>
            </b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

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
    return {
      navbarClasses: "",
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
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
    handleScroll() {
      if (window.scrollY > 0) {
        this.navbarClasses = "navbar-scrolled";
      } else {
        this.navbarClasses = "";
      }
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
  width: auto;
  height: 40px;
}

.link {
  text-decoration: none;
}
.navbar-toggler {
  border: none;
  outline: none;
  box-shadow: none;
}

.navbar-scrolled {
  background-color: #ffffff; /* 하얀색 배경으로 변경 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease; /* 배경색에 대한 트랜지션 효과 추가 */
}
.navbar {
  padding: 0;
}
nav a {
  color: #2790f9;
}
.navitem {
  color: white;
}

.navbar-scrolled a {
  color: #2790f9;
}

.content {
  height: 2000px; /* 콘텐츠 높이 증가를 위한 임시 설정 */
}
</style>
