<template>
  <b-list-group-item class="flex-column">
    <p v-html="review.content"></p>
    <small>Posted by: {{user.name}}</small>
  </b-list-group-item>
</template>

<script>
import store from "@/store.js";
import axios from "axios";
import Swal from "sweetalert2";
export default {
  props: ['review', 'user'],
  data() {
    return {
      userId: localStorage.getItem('userId')
    }
  },
  methods: {
    //   voteA() {
    //   const token = localStorage.getItem("Token");      
    //   const userId = localStorage.getItem("userId");
    //   const self = this;
    //   axios
    //     .put(
    //       `http://localhost:3000/answers/${self.item._id}/up-vote`,
    //       { userId },
    //       {
    //         headers: {
    //           token
    //         }
    //       }
    //     )
    //     .then(result => {
    //       Swal("Success!", "Your have sucessfully vote!", "success")
    //       self.$router.push({
    //           name: "home"
    //         });  
    //     })
    //     .catch(err => {
    //       Swal("Oops!", `${err.response.data.message}`, "error")          
    //       console.log('err.response :', err.response);
    //     });
    
    // },
    // unVoteA() {
    //   const token = localStorage.getItem("Token");
    //   const userId = localStorage.getItem("userId");
    //   const self = this;
    //   axios
    //     .put(
    //       `http://localhost:3000/answers/${self.item._id}/down-vote`,
    //       { userId },
    //       {
    //         headers: {
    //           token
    //         }
    //       }
    //     )
    //     .then(result => {
    //       Swal("Success!", "Your have sucessfully downVote!", "success")
    //       self.$router.push({
    //           name: "home"
    //         });  
    //     })
    //     .catch(err => {
    //       Swal("Oops!", `${err.response.data.message}`, "error")                      
    //       console.log('err.response :', err.response);
    //     });
    
    // }
  }
};
</script>

<style>
</style>
