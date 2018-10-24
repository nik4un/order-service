<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Registration form</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                prepend-icon="person"
                name="email"
                label="E-mail"
                type="email"
                v-model="email"
                :error-messages="emailErrors"
                required
                @blur="$v.email.$touch()"
              ></v-text-field>
              <v-text-field
              prepend-icon="lock"
              name="password"
              label="Password"
              type="password"
              v-model="password"
              :counter="this.password.length > 0"
              :error-messages="passwordErrors"
              required
              @blur="$v.password.$touch()"
            ></v-text-field>
              <v-text-field
                prepend-icon="lock"
                name="confirm-password"
                label="Confirm Password"
                type="password"
                v-model="confirmPassword"
                :counter="this.confirmPassword.length > 0"
                :error-messages="confirmPasswordErrors"
                required
                @blur="$v.confirmPassword.$touch()"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions style="padding-left: 19px; padding-right: 16px;">
            <v-spacer></v-spacer>
            <v-btn
              color="primary"
              :loading="loading"
              :disabled="$v.$invalid || loading"
              @click="onSubmit"
            >Create account
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import { required, minLength, email, sameAs } from 'vuelidate/lib/validators'

  export default {
    mixins: [validationMixin],

    validations: {
      password: { required, minLength: minLength(6) },
      confirmPassword: { required, sameAs: sameAs('password') },
      email: { required, email }
    },
    data () {
      return {
        email: '',
        password: '',
        confirmPassword: ''
      }
    },
    computed: {
      loading () {
        return this.$store.getters.loading
      },
      confirmPasswordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.confirmPassword.required && errors.push('Confirm password is required')
        !this.$v.confirmPassword.sameAs && errors.push('Password does not match')
        return errors
      },
      passwordErrors () {
        const errors = []
        if (!this.$v.password.$dirty) return errors
        !this.$v.password.minLength && errors.push('Password must be at least 6 characters long')
        !this.$v.password.required && errors.push('Password is required')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      }
    },
    methods: {
      onSubmit () {
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('registerUser', user)
          .then(() => this.$router.push('/'))
          .catch(err => console.log(err))
      }
    }
  }
</script>

<style scoped>

</style>

