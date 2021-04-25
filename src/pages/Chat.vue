<template>
  <div class="container-fluid">
    <div class="row">
      <!-- sidebar -->
      <div class="col-md-4 sidebar text-center">
        <sidebar></sidebar>
      </div>
      <!-- sidebar -->
      <div class="col-md-8 content">
        <messages></messages>
      </div>

    </div>
  </div>
</template>

<script>
import Sidebar from '../sidebar/Sidebar'
import Messages from '../messages/Messages'

export default {
  name: 'chat',

  components: {Sidebar, Messages}

}
</script>

<style scoped>
  .sidebar{
    width: 24.5%;
    display: block;
    float: left;
    position: fixed;
    height: 100%;
    background-color: #3a56b5;
    padding-top: 1em;
    overflow: auto;
  }

  .content{
    width: 75%;
    display: block;
    float: left;
    margin-left: 25%;
  }
</style>
