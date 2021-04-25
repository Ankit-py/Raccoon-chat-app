<template>
  <div>
        <img src="https://i.ibb.co/3rhPN9X/raccoon.png">
        <h2 class="text-light">RACCOON</h2>
        <hr style="border: 1px solid #000;">
        <!-- showing the user's name and photo on sidebar -->
          <span>
            <img class="rounded-circle mr-1" height="30" :src="currentUser.photoURL"/>
            <span class="text-light">{{ currentUser.displayName }}</span>

          </span>
        <hr style="border: 1px solid #000;">
        <!-- showing the user's name and photo on sidebar -->
        <channels></channels>
        <button @click="logout" class="btn btn-outline-light mt-3 mb-2">Log Out</button>

        <hr style="border: 1px solid #000;">

        <users></users>

  </div>
</template>

<script>
import auth from 'firebase/auth'
import {mapGetters} from 'vuex'
import Channels from './Channels'
import database from 'firebase/database'
import Users from './Users'

export default {
  name: 'sidebar',

  components: {Channels, Users},

  data() {
    return {
      presenceRef: firebase.database().ref('presence')
    }
  },

  computed: {
    ...mapGetters(['currentUser'])
  },

  methods: {
    logout() {
       this.presenceRef.child(this.currentUser.uid).remove()
      firebase.auth().signOut()
      this.$store.dispatch('setUser', null)
      this.$router.push('/login')
    }
  }
}
</script>
