import { createStore } from 'vuex';
import axios from 'axios';


export default createStore({
  state: {
    searchResults: [],
  },
  mutations: {
    setSearchResults(state, results) {
      state.searchResults = results;
    }
  },
  actions: {
    async searchProduct({ commit }, keyword) {
      const response = await axios.post('http://localhost:3000/api/search', { keyword });
      commit('setSearchResults', response.data);
      if (response.data.length === 0) {
        alert('查無產品');
      }
    }
  }
});