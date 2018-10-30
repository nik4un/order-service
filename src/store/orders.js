import * as firebase from 'firebase'

class Order {
  constructor (name, phone, adId, done = false, id = null) {
    this.name = name
    this.phone = phone
    this.adId = adId
    this.done = done
    this.id = id
  }
}

export default {
  state: {
    orders: []
  },
  mutations: {
    loadOrders (state, payload) {
      state.orders = payload
    }
  },
  actions: {
    async createOrder ({ commit }, { name, phone, adId, ownerId }) {
      const order = new Order(name, phone, adId)
      commit('clearError')
      try {
        await firebase.database().ref(`/users/${ownerId}/orders`).push(order)
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    },
    async fetchOrder ({ commit, getters }) {
      commit('clearError')
      commit('setLoading', true)

      const userOrders = []

      try {
        const fbVal = await firebase.database().ref(`/users/${getters.user.id}/orders`).once('value')
        const orders = fbVal.val()
        // console.log('fb orders:', orders)
        Object.keys(orders).forEach(key => {
          const order = orders[key]
          // console.log('key: ', key)
          // console.log('(order: ', order)
          // console.log('userOrders until:', userOrders)
          userOrders.push(new Order(order.name, order.phone, order.adId, order.done, key))
          // console.log('userOrders after:', userOrders)
        })
        commit('loadOrders', userOrders)
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async markOrderDone ({ commit, getters }, payload) {
      commit('clearError')
      // console.log('payload: ', payload)
      // const orderDone = getters.orders.find(el => el.id === payload).done
      // console.log('orderDone: ', orderDone)
      try {
        await firebase.database().ref(`/users/${getters.user.id}/orders`)
          .child(payload.id).update({ done: !payload.done })
        // console.log('getters.orders:', getters.orders)
      } catch (error) {
        commit('setError', error.message)
        throw error
      }
    }
  },
  getters: {
    doneOrders (state) {
      return state.orders.filter(el => el.done)
    },
    undoneOrders (state) {
      return state.orders.filter(el => !el.done)
    },
    orders (state, getters) {
      return getters.undoneOrders.concat(getters.doneOrders)
    }
  }
}
