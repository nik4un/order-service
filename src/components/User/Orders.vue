<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 class="text-xs-center pt-5" v-if="loading">
        <v-progress-circular
          :size="100"
          :width="5"
          color="purple"
          indeterminate
        ></v-progress-circular>
      </v-flex>
      <v-flex xs12 sm8 md6 offset-sm2 offset-md3 v-else-if="!loading && orders.length !== 0">
        <h1 class="text--secondary mb-3">Orders</h1>
        <v-list
          class="elevation-3"
          subheader
          three-line
        >
          <v-list-tile
            avatar
            v-for="order of orders"
            :key="order.id"
          >
            <v-list-tile-action>
              <v-checkbox
                :input-value="order.done"
                @change="markDone(order)"
                color="success"
                value
              ></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content
              class="mr-5"

            >
              <v-list-tile-title>{{ order.name }}</v-list-tile-title>
              <v-list-tile-title>{{ order.id }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ order.phone }}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn
                :to="'/ad/' + order.adId"
                color="primary">Open</v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-flex>
      <v-flex xs12 class="text-xs-center" v-else>
        <h1 class="text--secondary">You have no orders</h1>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      orders () {
        return this.$store.getters.orders
      }
    },
    methods: {
      markDone (order) {
        this.$store.dispatch('markOrderDone', { id: order.id, done: order.done })
          .then(() => {
            order.done = !order.done
          })
          .catch(() => {})
      }
    },
    created () {
      this.$store.dispatch('fetchOrder').then(() => {})
    }
  }
</script>

