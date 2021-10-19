<template>
  <b-row class="h-100">
    <b-colxx xxs="12" md=10  class="mx-auto my-auto">
      <b-card class="auth-card" no-body>
          <div class="position-relative image-side ">
            <p class=" text-white h2">{{ $t('dashboards.magic-is-in-the-details') }}</p>
              <p class="white mb-0">  Please use this form to register. <br />If you are a member, please
                <router-link tag="a" to="/user/login" class="white">login</router-link>.
              </p>
          </div>
          <div class="form-side">
            <h6 class="mb-4">{{ $t('user.register')}}</h6>
            <b-form @submit.prevent="formSubmit">
              <b-form-group :label="$t('user.fullname')" class="has-float-label mb-4">
                  <b-form-input type="text" v-model="$v.form.fullname.$model" :state="!$v.form.fullname.$error" required/>
                  <b-form-invalid-feedback v-if="!$v.form.fullname.required">Please enter your fullname</b-form-invalid-feedback>
              </b-form-group>

              <b-form-group :label="$t('user.email')" class="has-float-label mb-4">
                  <b-form-input type="text" v-model="$v.form.email.$model" :state="!$v.form.email.$error" required/>
                  <b-form-invalid-feedback v-if="!$v.form.email.required">Please enter your email address</b-form-invalid-feedback>
                  <b-form-invalid-feedback v-else-if="!$v.form.email.email">Please enter a valid email address</b-form-invalid-feedback>
                  <b-form-invalid-feedback v-else-if="!$v.form.email.minLength">Your email must be minimum 4 characters</b-form-invalid-feedback>
              </b-form-group>

              <b-form-group :label="$t('user.password')" class="has-float-label mb-4">
                  <b-form-input type="password" v-model="$v.form.password.$model" :state="!$v.form.password.$error" required/>
                  <b-form-invalid-feedback v-if="!$v.form.password.required">Please enter your password</b-form-invalid-feedback>
                  <b-form-invalid-feedback v-else-if="!$v.form.password.minLength || !$v.form.password.maxLength">Your password must be between 4 and 16 characters</b-form-invalid-feedback>
              </b-form-group>
              <div class="d-flex justify-content-between align-items-center">
                <router-link tag="a" to="/user/login">Login</router-link>.
                <b-button type="submit" variant="primary" size="lg" class="btn-shadow">{{ $t('user.register-button')}}</b-button>
              </div>
          </b-form>
        </div>
      </b-card>
    </b-colxx>
  </b-row>
</template>
<script>
import { adminRoot } from '../../constants/config'
import { validationMixin } from "vuelidate";
const {
  required,
  maxLength,
  minLength,
  email
} = require("vuelidate/lib/validators");

export default {
  data () {
    return {
      form: {
        fullname: '',
        email: '',
        password: ''
      },
      allUsers: [],
    }
  },
  mixins: [validationMixin],
  validations: {
      form: {
          password: {
              required,
              maxLength: maxLength(16),
              minLength: minLength(4)
          },
          email: {
              required,
              email,
              minLength: minLength(4)
          },
          fullname: {
            required
          }
      }
  },
  created() {
    this.allUsers = (localStorage.getItem('ba-all-users') !== null) ? JSON.parse(localStorage.getItem('ba-all-users')) : []
  },
  methods: {
    formSubmit () {
      const userExist = this.allUsers.find(u => u.email === this.form.email)
      if(userExist) {
        this.$notify("error", "Registration Error", "This email addres has already been taken", {
          duration: 3000,
          permanent: false
        });
      } else {
        this.allUsers = [...this.allUsers, this.form]
        localStorage.setItem('ba-all-users', JSON.stringify(this.allUsers))
        localStorage.setItem('bridgeAfrica-user', JSON.stringify(this.form))
        this.$router.push('/')
      }
    }
  }
}
</script>
