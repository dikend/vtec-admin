import {
  LOGIN,
  LOGOUT,
  CHECK_AUTH,
  CHECK_ERROR,
  GET_NAME,
  GET_EMAIL,
  GET_PERMISSIONS,
} from "../providers/auth/actions";

export default (provider, router) => {
  return {
    namespaced: true,
    state: { user: null },
    mutations: {
      setUser(state, user) {
        state.user = user;
      },
    },
    getters: {
      [GET_NAME](state) {
        if (state.user && provider[GET_NAME]) {
          return provider[GET_NAME](state.user);
        }
      },
      [GET_EMAIL](state) {
        if (state.user && provider[GET_EMAIL]) {
          return provider[GET_EMAIL](state.user);
        }
      },
      [GET_PERMISSIONS](state) {
        if (state.user && provider[GET_PERMISSIONS]) {
          return provider[GET_PERMISSIONS](state.user) || [];
        }
        return [];
      },
    },
    actions: {
      /**
       * Server login with given credentials
       * checkAuth action will set fresh user infos on store automatically
       */
      [LOGIN]: async ({ dispatch }, credentials) => {
        await provider[LOGIN](credentials);
        dispatch("checkAuth");
      },
      /**
       * Explicit logout action, remove user from storage
       */
      [LOGOUT]: async ({ dispatch }) => {
        await provider[LOGOUT]();
        dispatch("checkAuth");
      },
      /**
       * Check valid auth on target route server by retrieving user infos
       * Set fresh user infos on store
       * Called after each URL navigation
       */
      [CHECK_AUTH]: async ({ commit }, route = null) => {
        const isLoginPage = (route || router.currentRoute).name === "login";

        try {
          let response = await provider[CHECK_AUTH]();

          if (isLoginPage) {
            await router.push("/");
          }

          if (response) {
            commit("setUser", response.data);
          }
        } catch (e) {
          if (!isLoginPage) {
            await router.push({ name: "login" });
          }
          commit("setUser", null);
        }
      },
      /**
       * Check API error status
       * Called after each API error (4xx, 5xx)
       * Do automatic logout if reject promise returned
       */
      [CHECK_ERROR]: async ({ dispatch }, error) => {
        try {
          await provider[CHECK_ERROR](error);
        } catch (e) {
          dispatch("logout");
        }
      },
    },
  };
};
