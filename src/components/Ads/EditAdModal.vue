<template>
  <v-dialog width="500" v-model="adEditor">
    <v-btn class="warning mr-3" flat slot="activator">Edit</v-btn>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h1 class="blue--text">Edit ad</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>
              <v-text-field
                prepend-icon="edit"
                name="title"
                label="Title"
                type="text"
                v-model="editedTitle"
              ></v-text-field>
              <v-text-field
                prepend-icon="edit"
                name="description"
                label="Description"
                type="text"
                multi-line
                v-model="editedDescription"
              ></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat @click="doCancel">Cancel</v-btn>
              <v-btn flat class="success" @click="doSave">Save</v-btn>
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
        adEditor: false,
        editedTitle: this.ad.title,
        editedDescription: this.ad.description
      }
    },
    methods: {
      doCancel () {
        this.editedTitle = this.ad.title
        this.editedDescription = this.ad.description
        this.adEditor = false
      },
      doSave () {
        if (this.editedTitle !== '' && this.editedDescription !== '') {
          this.$store.dispatch('updateAd', {
            title: this.editedTitle,
            description: this.editedDescription,
            id: this.ad.id
          })
          this.adEditor = false
        }
      }
    }
  }
</script>

<style scoped>

</style>
