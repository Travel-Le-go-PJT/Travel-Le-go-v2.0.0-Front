import jwtDecode from "jwt-decode";
import router from "@/router";
import { login, findById, tokenRegeneration, logout } from "@/api/user";

const userStore = {
  namespaced: true,
  state: {
    //== data(vue 컴포넌트에서 vuex Store의 state 정보를 가져와 사용)
    isLogin: false,
    isLoginError: false,
    userInfo: null,
    isValidToken: false,
  },
  getters: {
    checkUserInfo: function (state) {
      return state.userInfo;
    },
    checkToken: function (state) {
      return state.isValidToken;
    },
  },
  mutations: {
    SET_IS_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin;
    },
    SET_IS_LOGIN_ERROR: (state, isLoginError) => {
      state.isLoginError = isLoginError;
    },
    SET_IS_VALID_TOKEN: (state, isValidToken) => {
      state.isValidToken = isValidToken;
    },
    SET_USER_INFO: (state, userInfo) => {
      state.isLogin = true;
      state.userInfo = userInfo;
    },
  },
  actions: {
    async userConfirm({ commit }, user) {
      await login(
        user, //api/memeber.js의 function login의 첫번째 파라미터(user)
        //api/memeber.js의 function login의 두번째 파라미터(success)
        ({ data }) => {
          if (data.message === "SUCCESS") {
            let accessToken = data["access-token"];
            let refreshToken = data["refresh-token"];
            console.log("login success token created!!!! >> ", accessToken, refreshToken);
            commit("SET_IS_LOGIN", true); //로그인했습니다.
            commit("SET_IS_LOGIN_ERROR", false); //로그인 에러는 없습니다.
            commit("SET_IS_VALID_TOKEN", true); //현재 토큰은 정상적인 토큰입니다.

            //만든 토큰을 세션스토리지에 저장
            sessionStorage.setItem("access-token", accessToken);
            sessionStorage.setItem("refresh-token", refreshToken);
          } else {
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_LOGIN_ERROR", true);
            commit("SET_IS_VALID_TOKEN", false);
          }
        },
        //api/memeber.js의 function login의 세번째 파라미터(fail)
        (error) => {
          console.log(error);
        }
      );
    },
    //토큰을 가지고 사용자 id를 알아내서 그 아이디와 토큰을 가지고 서버에 가서 서버에서 사용자의 토큰이 사용가능한지 확인
    async getUserInfo({ commit, dispatch }, token) {
      let decodeToken = jwtDecode(token);
      console.log("2. getUserInfo() decodeToken :: ", decodeToken);
      await findById(
        //토큰의 유효성검증
        //findById의 파라미터는 userid, success, fail 사용자 정보를 받아와 저장
        decodeToken.userId, //토큰을 디코드 하면 인코딩할때 담았던 사용자 정보를 받아올수 있다.
        ({ data }) => {
          if (data.message === "SUCCESS") {
            commit("SET_USER_INFO", data.userInfo);
            console.log("3. getUserInfo data >> ", data);
          } else {
            //회원가입을 안한 유저가 접근하는 경우
            console.log("유저 정보 없음!!!!");
          }
        },
        async (error) => {
          //서버에서 401에러 전달
          //시간이 지나 토큰이 만료된 경우
          console.log(
            "getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ",
            error.response.status
          );
          commit("SET_IS_VALID_TOKEN", false);
          await dispatch("tokenRegeneration"); //토큰이 만료되었으니 다시 재발급 요청
        }
      );
    },
    async tokenRegeneration({ commit, state }) {
      console.log("토큰 재발급 >> 기존 토큰 정보 : {}", sessionStorage.getItem("access-token"));
      await tokenRegeneration(
        JSON.stringify(state.userInfo),
        ({ data }) => {
          if (data.message === "SUCCESS") {
            let accessToken = data["access-token"];
            console.log("재발급 완료 >> 새로운 토큰 : {}", accessToken);
            sessionStorage.setItem("access-token", accessToken);
            commit("SET_IS_VALID_TOKEN", true);
          }
        },
        async (error) => {
          // HttpStatus.UNAUTHORIZE(401) : RefreshToken 기간 만료 >> 다시 로그인!!!!
          if (error.response.status === 401) {
            console.log("갱신 실패");
            // 다시 로그인 전 DB에 저장된 RefreshToken 제거.
            await logout(
              state.userInfo.userId,
              ({ data }) => {
                if (data.message === "SUCCESS") {
                  console.log("리프레시 토큰 제거 성공");
                } else {
                  console.log("리프레시 토큰 제거 실패");
                }
                alert("RefreshToken 기간 만료!!! 다시 로그인해 주세요.");
                commit("SET_IS_LOGIN", false);
                commit("SET_USER_INFO", null);
                commit("SET_IS_VALID_TOKEN", false);
                router.push({ name: "login" });
              },
              (error) => {
                console.log(error);
                commit("SET_IS_LOGIN", false);
                commit("SET_USER_INFO", null);
              }
            );
          }
        }
      );
    },
    async userLogout({ commit }, userId) {
      await logout(
        userId,
        ({ data }) => {
          if (data.message === "SUCCESS") {
            console.log(userStore.isLogin);
            commit("SET_IS_LOGIN", false);
            console.log(this.isLogin);
            commit("SET_USER_INFO", null);
            commit("SET_IS_VALID_TOKEN", false);
          } else {
            console.log("유저 정보 없음!!!!");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default userStore;
