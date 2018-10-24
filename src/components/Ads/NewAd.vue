<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3 class="elevation-3 px-3 py-3">
        <h1 class="test--secondary mb-3">Create New Ad</h1>
        <v-form class="mb-3">
          <v-text-field
            name="title"
            label="Ad title"
            type="text"
            v-model="title"
            :error-messages="titleErrors"
            required
            @blur="$v.title.$touch()"
          ></v-text-field>
          <v-text-field
            multi-line
            name="description"
            label="Ad description"
            type="text"
            v-model="description"
            :error-messages="descriptionErrors"
            required
            @blur="$v.description.$touch()"
          ></v-text-field>
        </v-form>
        <v-layout row mb-3>
          <v-flex xs12>
            <v-btn
              class="white--text warning"
              @click="runUpload"
            >
              Upload
              <v-icon right dark>cloud_upload</v-icon>
            </v-btn>
            <input
              ref="fileInput"
              type="file"
              style="display: none"
              accept="image/*"
              @change="getFile"
            >
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-img :src="imageSrc" height="200" v-if="imageSrc"></v-img>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs12>
            <v-switch
              color="primary"
              label="Add to promo"
              v-model="promo"
            ></v-switch>
          </v-flex>
        </v-layout>
        <v-card-actions style="padding-left: 19px; padding-right: 16px;">
          <v-spacer></v-spacer>
          <v-btn
            :loading="loading"
            color="primary"
            :disabled="$v.$invalid || loading || !this.image"
            @click="createAd"
          >Create
          </v-btn>
        </v-card-actions>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {validationMixin} from 'vuelidate'
  import {required} from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    validations: {
      title: {required},
      description: {required}
    },
    data () {
      return {
        title: '',
        description: '',
        promo: false,
        loading: false,
        image: null,
        imageSrc: ''
      }
    },
    computed: {
      titleErrors () {
        const errors = []
        if (!this.$v.title.$dirty) return errors
        !this.$v.title.required && errors.push('Title is required.')
        return errors
      },
      descriptionErrors () {
        const errors = []
        if (!this.$v.description.$dirty) return errors
        !this.$v.description.required && errors.push('Description is required.')
        return errors
      },
      loading () {
        return this.$store.getters.loading
      }
    },
    methods: {
      createAd () {
        const ad = {
          title: this.title,
          description: this.description,
          promo: this.promo,
          image: this.image
        }
        this.$store.dispatch('createAd', ad)
          .then(() => {
            this.$router.push('/list')
          })
          .catch(() => {})
      },
      runUpload () {
        this.$refs.fileInput.click()
      },
      getFile (event) {
        const file = event.target.files[0]
        const fileReader = new FileReader()
        fileReader.onload = () => {
          this.imageSrc = fileReader.result
          // console.log('File src:', this.imageSrc)
        }
        fileReader.readAsDataURL(file)
        this.image = file
      }
    }
  }
</script>
