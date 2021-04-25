<template>
  <div>
    <div class="jumbotron text-white text-center" style="background: #3a56b5;">
      <img src="https://i.ibb.co/3rhPN9X/raccoon.png">
      <h2 class="lead display-3"><strong>RACCOON</strong></h2>
      <p>Realtime chat app</p>
    </div>

    <!-- show loading status -->
    <div class="alert alert-info" v-if="loading">Processing...</div>
    <!-- show loading status end-->

    <!-- show errors -->
    <div class="alert alert-danger" v-if="hasErrors">
      <div v-for="error in errors">{{ error }}</div>
    </div>
    <!-- show errors -->

    <!-- ----------------Login buttons-------------- -->
      <div class="container-fluid">
        <div class="row">
          <div class="col text-center">
            <button @click="loginWithGoogle" type="button" class="btn btn-outline-danger">Login with Google</button>
            <button @click="loginWithTwitter" type="button" class="btn btn-outline-primary ml-2">Login with Twitter</button>
          </div>
        </div>
      </div>
      <!-- ---------------login buttons end------------------ -->

      <!-- ---------------footer content------------------ -->
      <footer class="text-center text-lg-start" style="background: #3a56b5; position: fixed; bottom: 0; width: 100%;">
        <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
          <a class="text-white">Made By Ankit Mohapatra with ❤☮︎😁</a>
        </div>
      </footer>
      <!-- ---------------footer content end------------------ -->
  </div>
</template>

<script>
import auth from 'firebase/auth'
import database from 'firebase/database'
  export default {
    name: 'login',

    //data option to store error messages
    data() {
      return{
        errors: [],
        loading: false,
        usersRef: firebase.database().ref('users')
      }
    },

    computed: {
      hasErrors() {
        return this.errors.length > 0
      }
    },

    methods: {
      loginWithGoogle() {
      // loading set to true
      this.loading = true
      // clear old errors
      this.errors = []
      firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then((response) => {
          // console.log(response.user)
          // pass user to save in db
          this.saveUserToUsersRef(response.user)
          // dispatch setUser action
          this.$store.dispatch('setUser', response.user)
          // then redirect user to '/' page
          this.$router.push('/')
        })
        .catch(error => {
          this.errors.push(error.message)
          // set loading to false
          this.loading = false
        })
    },
    // save user to database
    saveUserToUsersRef(user) {
      return this.usersRef.child(user.uid).set({
        name: user.displayName,
        avatar: user.photoURL
      })
    },
    loginWithTwitter() {
      // loading set to true
      this.loading = true
      // clear old errors
      this.errors = []
      firebase.auth().signInWithPopup(new firebase.auth.TwitterAuthProvider())
        .then((response) => {
          // console.log(response.user)
          // dispatch setUser action
          this.$store.dispatch('setUser', response.user)
          // then redirect user to '/' page
          this.$router.push('/')
        })
        .catch(error => {
          this.errors.push(error.message)
          // set loading to false
          this.loading = false
        })
    }
    }
  }
</script>


<style>
  .jumbotron{
    border-radius: 0px;
  }
</style>
