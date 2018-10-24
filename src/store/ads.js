import * as firebase from 'firebase'
class Ad {
  constructor (title,
               description,
               ownerId,
               imageSrc = '',
               promo = false,
               id = null) {
    this.title = title
    this.description = description
    this.ownerId = ownerId
    this.imageSrc = imageSrc
    this.promo = promo
    this.id = id
  }
}

export default {
  state: {
    ads: []
  },
  mutations: {
    createAd (state, payload) {
      state.ads.push(payload)
    }
  },
  actions: {
    async createAd ({ commit, getters }, payload) {
      commit('clearError')
      commit('setLoading', true)

      const image = payload.image
      try {
        const newAd = new Ad(payload.title,
            payload.description,
            getters.user.id,
            '', // payload.imageSrc
            payload.promo)

        // добавляем объект 'newAd' в базу данных, в рздел 'ads'
        const ad = await firebase.database().ref('ads').push(newAd)

        const imageExt = image.name.slice(image.name.lastIndexOf('.') + 1)
        console.log('imageExt:', imageExt)

        // добавляем в storage, в раздел 'adImages' изображение изменив имя на id записи
        const fileData = await firebase.storage().ref(`adImages/${ad.key}.${imageExt}`).put(image)
        // получаем src добавленного в storage изображения
        const imageSrc = await fileData.ref.getDownloadURL()
        // обновляем в базе данных значение imageSrc на url в storage
        await firebase.database().ref('ads').child(ad.key).update({ imageSrc })

        commit('createAd', {
          ...newAd,
          id: ad.key,
          imageSrc: imageSrc
        })
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async fetchAds ({ commit }, payload) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const fbVal = await firebase.database().ref('ads').once('value')
        const ads = fbVal.val()
        // console.log('From firebase:', ads)
        Object.keys(ads).forEach(key => {
          // commit('createAd', ads[key])
          commit('createAd', { ...ads[key], id: key })
          // console.log('Keys:', { ...ads[key], id: key })
        })
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    }
  },
  getters: {
    ads (state) {
      return state.ads
    },
    promoAds (state) {
      return state.ads.filter(ad => ad.promo)
    },
    myAds (state) {
      return state.ads
    },
    adById (state) {
      return (adId) => state.ads.find(ad => ad.id === adId)
    }
  }
}
