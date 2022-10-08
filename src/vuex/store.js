import { createStore } from 'vuex'
import axios from "axios";

export const store = createStore({
  state () {
    return {
     items :[],
     itemsCopy: []
    }
  },
  mutations: {
    SET_ITEMS: (state, data) => {
      state.items = data
      state.itemsCopy = data
    },
     SET_FILTER: (state, data) => {
        state.items = state.itemsCopy
        let num = Number(data.text)
         if (data.method === 'equally') {
             if (data.column === 'name') {
                 state.items = state.items.filter(item => item.name === data.text.toLowerCase())
             }
             if (data.column === 'quantity') {
                 state.items = state.items.filter(item => item.quantity === num)
             }
             if (data.column === 'distance') {
                 state.items = state.items.filter(item => item.distance === num)
             }
         }
         if (data.method === 'contains') {
             if (data.column === 'name') {
                 state.items = state.items.filter(item => item.name.includes(data.text.toLowerCase()))
             }
         }
         if (data.method === '>') {
             if (data.column === 'quantity') {
                 state.items = state.items.filter(item => item.quantity > num)
             }
             if (data.column === 'distance') {
                 state.items = state.items.filter(item => item.distance > num)
             }
         }
         if (data.method === '<') {
             if (data.column === 'quantity') {
                 state.items = state.items.filter(item => item.quantity < num)
             }
             if (data.column === 'distance') {
                 state.items = state.items.filter(item => item.distance < num)
             }
         }

      },
  },
  actions: {
    getDataFromApi({commit}) {
      return axios(`${process.env.VUE_APP_BASE_URL}/data`, {
        method: 'GET'
      })
          .then((response)=>{
            commit('SET_ITEMS',response.data)
            console.log(response.data)
          })

    }
  },
    getters: {
        getItems (state) {
            return state.items
        }
    }


})
