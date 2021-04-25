// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/analytics'
import store from './store'
import auth from 'firebase/auth'

Vue.config.productionTip = false

var firebaseConfig = {
    apiKey: "AIzaSyAf5TtBW2MbqFijECIczjrMvZJgt3muN7I",
    authDomain: "raccoon230421.firebaseapp.com",
    projectId: "raccoon230421",
    storageBucket: "raccoon230421.appspot.com",
    messagingSenderId: "946052524503",
    appId: "1:946052524503:web:26b9a8d5b0fafd92d04392",
    measurementId: "G-V1KB4ZDE9M"
  };
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

window.firebase = firebase;

const unsubscribe =  firebase.auth().onAuthStateChanged(user => {
  //dispatch user
  store.dispatch('setUser', user)

  new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
  });
  //the function calling intself

  unsubscribe()
})

