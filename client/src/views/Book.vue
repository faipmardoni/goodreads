<template>
  <div class="book">
    <Navbar/>        
    <b-container class="book-title text-center">
      <b-jumbotron bg-variant="danger" text-variant="white" border-variant="dark">
        <template slot="header">
         {{book.judul}}
        </template>
        <template slot="lead">
          Posted by : {{book.userId.name}}
        </template>
      </b-jumbotron>
    </b-container>
    <b-container class="content-question">
      <b-card footer-bg-variant="dark" style="padding: 25px;">
        <b-row>
          <b-col>
            <b-img :src="book.image" height="350"/>
          </b-col>
          <b-col>
            <h2>DATA BOOK</h2> 
            <ul>
              <li>Penulis: {{book.penulis}}</li>
              <li>Penerbit: {{book.penerbit}}</li>
            </ul>
          </b-col>
        </b-row>
        
        
            
      </b-card>
    </b-container>
    <b-container class="list-review" v-if="book.reviews.length!=0">
      <b-card title="Review">
        <b-list-group>
          <Review v-for="item in book.reviews" :key="item.id" :review="item" :user="book.userId"/>
        </b-list-group>
       </b-card>
    </b-container>
    <b-container  v-if="hasLogin">
      <b-card  bg-variant="dark" text-variant="white">
        <p class="card-text">
          Interesting? We Need your Review.
        </p>
        <b-button href="#" variant="success" v-b-toggle.collapse1>CLICK TO ADD REVIEW</b-button>
        <b-collapse id="collapse1" class="mt-2">
          <b-card>
            <b-form-group class="card-text">
              <editor api-key="5z7mx0qf6bojkim44zldki33cvo6t3n5s8xzw4mtx03g5x08" :init="{plugins: 'wordcount', height:'360'}" v-model="review"></editor>
            </b-form-group>
            <b-button type="submit" variant="success" @click="addReview">Publish</b-button>            
          </b-card>
        </b-collapse>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import Editor from "@tinymce/tinymce-vue";
import Navbar from "@/components/Navbar.vue";
import axios from "axios";
import Swal from "sweetalert2";
import Review from "@/components/Review.vue";

export default {
  data() {
    return {
      review: "",
      book: "",
      userId: localStorage.getItem("userId")
    };
  },
  components: {
    editor: Editor,
    Navbar,
    Review
  },
  created() {
    let self = this;
    this.$store.state.books.forEach(element => {
      if (element._id == self.$route.params.id) {
        self.book = element;
      }
    });
  },
  computed: {
    hasLogin: {
      get() {
        return this.$store.state.hasLogin;
      }
    },
  },
  methods: {
    addReview() {
      const token = localStorage.getItem("Token");
      const userId = localStorage.getItem("userId");
      const self = this;
      axios
        .post(
          "https://server-goodreads.faipmardoni.net/reviews",
          {
            content: self.review,
            userId,
            bookId: self.book._id
          },
          {
            headers: {
              token
            }
          }
        )
        .then(result => {
          Swal("Success!", "Your review has been added!", "success");
          Object.assign(self.$data, self.$options.data.call(self));
          self.$router.push({
              name: "user"
            });
        })
        .catch(err => {
          Swal("Oops!", `${err.response.data.message}`, "error");
          console.log("err :", err.response);
        });
    },
    // voteQ() {
    //   const token = localStorage.getItem("Token");
    //   const userId = localStorage.getItem("userId");
    //   const self = this;
    //   axios
    //     .put(
    //       `https://server-goodreads.faipmardoni.net/questions/${self.question._id}/up-vote`,
    //       { userId },
    //       {
    //         headers: {
    //           token
    //         }
    //       }
    //     )
    //     .then(result => {
    //       Swal("Success!", "Your have sucessfully vote!", "success");
    //       self.$router.push({
    //           name: "home"
    //         });
    //     })
    //     .catch(err => {
    //       Swal("Oops!", `${err.response.data.message}`, "error");
    //       self.$router.push({
    //           name: "home"
    //         });
    //     });
    // },
    // unVoteQ() {
    //   const token = localStorage.getItem("Token");
    //   const userId = localStorage.getItem("userId");
    //   const self = this;
    //   axios
    //     .put(
    //       `https://server-goodreads.faipmardoni.net/questions/${self.question._id}/down-vote`,
    //       { userId },
    //       {
    //         headers: {
    //           token
    //         }
    //       }
    //     )
    //     .then(result => {
    //       Swal("Success!", "Your have sucessfully downVote!", "success");
    //       self.$router.push({
    //           name: "home"
    //         });
    //     })
    //     .catch(err => {
    //       Swal("Oops!", `${err.response.data.message}`, "error");
    //       console.log("err.response :", err.response);
    //     });
    // }
  }
};
</script>

<style>
</style>
