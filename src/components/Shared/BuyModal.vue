<template>
  <v-dialog width="500" v-model="buyModal">
    <v-btn class="primary" flat slot="activator">Buy</v-btn>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h1 class="blue--text">Do you want to buy it?</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                prepend-icon="person"
                name="name"
                label="You name"
                type="text"
                v-model="name"
              ></v-text-field>
              <v-text-field
                prepend-icon="phone"
                name="phone"
                label="You phone"
                type="text"
                v-model="phone"
              ></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                flat
                @click="doCancel"
                :disabled="localLoading"
              >Cancel</v-btn>
              <v-btn
                flat
                class="success"
                @click="doBuy"
                :disabled="localLoading"
                :loading="localLoading"
              >Buy it</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
  export default {
    props: ['ad'],
    data () {
      return {
        buyModal: false,
        name: '',
        phone: '',
        localLoading: false
      }
    },
    methods: {
      doCancel () {
        this.name = ''
        this.phone = ''
        this.buyModal = false
      },
      doBuy () {
        if (this.name !== '' && this.phone !== '') {
          this.localLoading = true
          this.$store.dispatch('createOrder', {
            name: this.name,
            phone: this.phone,
            adId: this.ad.id,
            ownerId: this.ad.ownerId
          })
            .finally(() => {
              this.name = ''
              this.phone = ''
              this.localLoading = false
              this.buyModal = false
            })
        }
      }
    }
  }
</script>

<style scoped>

</style>
