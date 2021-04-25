<template>
  <div>
    <button @click="openModal" class="btn btn-outline-light">Add Channel</button>
    <div class="mt-2">
            <button v-for="channel in channels" class="list-group-item list-group-item-action"
            :class="{'active': setActiveChannel(channel)}" @click="changeChannel(channel)"
            type="button">{{ channel.name }}
            <span v-if="getNotification(channel) > 0 && channel.id !== currentChannel.id" class="float-right">{{ getNotification(channel) }}</span></button>
    </div>
    <!-- modal -->
    <div class="modal fade" id="channelModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">

          <div class="modal-header">
            <h5 class="modal-title text-dark">Add New Channel</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
          </div>

          <div class="modal-body">
            <form>
              <div class="form-group">
                <input v-model="new_channel" type="text" id="new_channel" name="new_channel" placeholder="Enter Channel Name" class="form-control">
              </div>
              <ul class="list-group" v-if="hasErrors">
                  <li class="list-group-item text-danger" v-for="error in errors">{{ error }}</li>
               </ul>
            </form>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
            <button @click="addChannel" type="button" class="btn btn-primary">Add</button>
          </div>

        </div>
      </div>
    </div>
    <!-- modal -->
  </div>
</template>

<script>
import database from 'firebase/database'
import {mapGetters} from 'vuex'
import mixin from '../mixins'

export default {
  name: 'channels',

  data() {
    return {
      new_channel: '',
      errors: [],
      channelsRef: firebase.database().ref('channels'),
      messagesRef: firebase.database().ref('messages'),
      notifCount: [],
      channels: [],
      channel: null
    }
  },

  mixins: [mixin],

  computed: {
      ...mapGetters(['currentChannel', 'isPrivate']),

      hasErrors() {
        return this.errors.length > 0
    }
  },

  watch: {
    isPrivate() {
      if(this.isPrivate) {
        this.resetNotifications()
      }
    }
  },

  methods: {
    openModal() {
       $('#channelModal').appendTo("body").modal('show');
    },

    addChannel() {
      //get key to newly creating channel
      let key = this.channelsRef.push().key
      console.log('new key : ',key)
      // minimum info needed to create a new channel
      // id and name
      let newChannel = {id: key, name: this.new_channel}
      // create new channel
      this.channelsRef.child(key).update(newChannel)
      .then(() => {
        // dispatch setCurrentChannel when a new channel is added
        this.$store.dispatch("setCurrentChannel", newChannel)

        this.new_channel = ''
        $("#channelModal").modal('hide')
      })
      // error handling
      .catch((error) => {
          this.errors.push(error.message)
      })
    },

    addListeners() {
        this.channelsRef.on('child_added', snapshot => {
            this.channels.push(snapshot.val())
            // set current channel
            if(this.channels.length > 0) {
                // set the first one as current channel
                this.channel = this.channels[0]
                // dispatch current channel to store
                this.$store.dispatch("setCurrentChannel", this.channel) // pick the first one
            }
        //     // add count listener to manage the notifications
            this.addCountListener(snapshot.key)
        })
    },

    addCountListener(channelId) {
      this.messagesRef.child(channelId).on('value', snapshot => {
          this.handleNotifications(channelId, this.currentChannel.id, this.notifCount, snapshot)
      })
    },

     getNotification(channel) {
      let notif = 0
      this.notifCount.forEach(el => {
          if(el.id === channel.id) {
              notif = el.notif
          }
      })
      return notif
    },

    setActiveChannel(channel) {
      return channel.id === this.currentChannel.id
    },

    changeChannel(channel) {
      // reset notifications
      this.resetNotifications()
      this.$store.dispatch('setPrivate', false)
      this.$store.dispatch("setCurrentChannel", channel)
      // set channel
      this.channel = channel
    },

    resetNotifications() {
      let index = this.notifCount.findIndex(el => el.id === this.channel.id)
      if(index !== -1) {
          this.notifCount[index].total = this.notifCount[index].lastKnownTotal
          this.notifCount[index].notif = 0
      }
    },

    detachListeners() {
      this.channelsRef.off()
      this.channels.forEach(el => {
        this.messagesRef.child(el.id).off()
      })
    }
  },

  mounted() {
    this.addListeners()
  },
  beforeDestroy() {
    this.detachListeners()
  }

};
</script>
