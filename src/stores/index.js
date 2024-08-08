import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      user:{
        name: undefined,
        email: undefined,
        token: undefined,
        type: undefined,
      }
    };
  },
  actions: {
  },
  getters: {
  }
});
export default store;