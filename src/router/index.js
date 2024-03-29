import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AttractionView from "@/views/AttractionView.vue";
import TripPlanView from "@/views/TripPlanView.vue";
import UserView from "@/views/UserView.vue";
import AdminView from "@/views/AdminView.vue";
import store from "@/store";

Vue.use(VueRouter);

//이동하기 전 로그인이 되어 있고 토큰이 유효한지 확인하는 함수
const onlyAuthUser = async (to, from, next) => {
  const checkUserInfo = store.getters["userStore/checkUserInfo"];
  const checkToken = store.getters["userStore/checkToken"];
  let token = sessionStorage.getItem("access-token");
  console.log("로그인 처리 전", checkUserInfo, token);

  if (checkUserInfo != null && token) {
    console.log("토큰 유효성 체크하러 가자!!!!");
    await store.dispatch("userStore/getUserInfo", token);
  }
  if (!checkToken || checkUserInfo === null) {
    alert("로그인이 필요한 페이지입니다..");
    // next({ name: "login" });
    router.push({ name: "login" });
  } else {
    console.log("로그인 했다!!!!!!!!!!!!!.");
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/user",
    name: "user",
    component: UserView,
    children: [
      {
        path: "login",
        name: "login",
        component: () =>
          import(
            /* webpackChunkName: "user" */ "@/components/user/UserLogin.vue"
          ),
      },
      {
        path: "join",
        name: "join",
        component: () =>
          import(
            /* webpackChunkName: "user" */ "@/components/user/UserJoin.vue"
          ),
      },
      {
        path: "mypage",
        name: "mypage",
        beforeEnter: onlyAuthUser,
        component: () =>
          import(
            /* webpackChunkName: "user" */ "@/components/user/UserMyPage.vue"
          ),
      },
      {
        path: "usermodify/:userId",
        name: "usermodify",
        beforeEnter: onlyAuthUser,
        component: () =>
          import(
            /* webpackChunkName: "user" */ "@/components/user/UserInfoModify.vue"
          ),
      },
    ],
  },
  {
    path: "/admin",
    name: "admin",
    beforeEnter: onlyAuthUser,
    component: AdminView,
    children: [
      {
        path: "userlist",
        name: "userlist",
        beforeEnter: onlyAuthUser,
        component: () =>
          import(
            /* webpackChunkName: "admin" */ "@/components/user/admin/AdminUserList.vue"
          ),
      },
      {
        path: "userarticlelist/:userId",
        name: "userarticlelist",
        beforeEnter: onlyAuthUser,
        component: () =>
          import(
            /* webpackChunkName: "admin" */ "@/components/user/admin/AdminUserArticles.vue"
          ),
      },
    ],
  },
  {
    path: "/attraction",
    name: "attraction",
    component: AttractionView,
  },
  {
    path: "/tripplan",
    name: "tripplan",
    component: TripPlanView,
    beforeEnter: onlyAuthUser,
    redirect: "/tripplan/planlist",
    children: [
      {
        path: "planlist",
        name: "planlist",
        beforeEnter: onlyAuthUser,
        component: () =>
          import(
            /* webpackChunkName: "board" */ "@/components/tripplan/TripPlanList"
          ),
      },
      {
        path: "planwrite",
        name: "planwrite",
        beforeEnter: onlyAuthUser,
        component: () =>
          import(
            /* webpackChunkName: "board" */ "@/components/tripplan/TripPlanWrite"
          ),
      },
      {
        path: "plandetail/:articleNo",
        name: "plandetail",
        component: () =>
          import(
            /* webpackChunkName: "board" */ "@/components/tripplan/TripPlanDetail"
          ),
      },
      {
        path: "planmodify/:articleNo",
        name: "planmodify",
        beforeEnter: onlyAuthUser,
        component: () =>
          import(
            /* webpackChunkName: "board" */ "@/components/tripplan/TripPlanModify"
          ),
      },
      {
        path: "planscrap/:articleNo",
        name: "planscrap",
        beforeEnter: onlyAuthUser,
        component: () =>
          import(
            /* webpackChunkName: "board" */ "@/components/tripplan/TripPlanScrap"
          ),
      },
    ],
  },
  {
    path: "/tripinfo",
    name: "tripinfo",
    beforeEnter: onlyAuthUser,
    component: () =>
      import(/* webpackChunkName: "tripinfo" */ "../views/TripInfoView.vue"),
    redirect: "/tripinfo/infolist",
    children: [
      {
        path: "infolist",
        name: "infolist",
        beforeEnter: onlyAuthUser,
        component: () =>
          import(
            /* webpackChunkName: "tripinfo" */ "@/components/tripinfo/TripInfoBoardList.vue"
          ),
      },
      {
        path: "infodetail/:articleNo",
        name: "infodetail",
        beforeEnter: onlyAuthUser,
        component: () =>
          import(
            /* webpackChunkName: "tripinfo" */ "@/components/tripinfo/TripInfoBoardDetail.vue"
          ),
      },
      {
        path: "infowrite",
        name: "infowrite",
        beforeEnter: onlyAuthUser,
        component: () =>
          import(
            /* webpackChunkName: "tripinfo" */ "@/components/tripinfo/TripInfoBoardWrite.vue"
          ),
      },
      {
        path: "infomodify/:articleNo",
        name: "infomodify",
        beforeEnter: onlyAuthUser,
        component: () =>
          import(
            /* webpackChunkName: "tripinfo" */ "@/components/tripinfo/TripInfoBoardModify.vue"
          ),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
