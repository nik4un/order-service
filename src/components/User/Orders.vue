<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm8 md6 offset-sm2 offset-md3>
        <h1 class="text--secondary mb-3">Orders</h1>
        <v-list
          class="elevation-3"
          subheader
          three-line
        >
          <v-list-tile
            avatar
            v-for="order of orders"
            key="order.id"
          >
            <v-list-tile-action>
              <v-checkbox
                :input-value="order.done"
                @change="markDone(order)"
                color="success"
              ></v-checkbox>
            </v-list-tile-action>

            <v-list-tile-content
              class="mr-5"

            >
              <v-list-tile-title>{{ order.name }}</v-list-tile-title>
              <v-list-tile-sub-title>{{ order.phone}}</v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn
                :to="'/ad/' + order.adId"
                color="primary">Open</v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        video: false,
        orders: [
          {
            id: 'e123',
            name: 'Nik',
            phone: '977-123-45-67',
            adId: '123',
            done: false
          }
        ]
      }
    },
    methods: {
      markDone (order) {
        order.done = !order.done
        console.log(order.done)
      }
    }
  }
</script>
