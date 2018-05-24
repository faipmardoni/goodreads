<template>
  <div class="admin">
    <Navbar/>            
    <b-container>      
        <h1>Add New Book</h1>
        <b-form-group>
          <b-form-input type="text" required placeholder="Masukkan Judul Buku" v-model="judul" ref="focusThis">
          </b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input type="text" required placeholder="Masukkan Nama Penerbit" v-model="penerbit">
          </b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input type="text" required placeholder="Masukkan nama penulis" v-model="penulis">
          </b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-file v-model="image" :state="Boolean(image)" placeholder="Choose a Image..."></b-form-file>
        </b-form-group>
        <b-button-group size="lg">
        <b-button type="submit" variant="danger" @click="submit">Publish</b-button>
        </b-button-group>
        <hr>
        <b-progress :value="progress" show-progress style="width: 100%; margin-top: 20px;"></b-progress>
        <hr>
    </b-container>
    <b-container>
      <h2>List Your Books</h2>
      <b-table striped hover :items="books" :fields="fields">
        <template slot="createdAt" slot-scope="row">
            {{formatDate(row.item.createdAt)}}
          </template>
          <template slot="judul" slot-scope="row">
           {{row.item.judul}}
          </template>
        <template slot="actions" slot-scope="row">
          <b-button-group size="sm">
            <b-button variant="danger" @click="deleteBook(row.item)">
              DELETE
            </b-button>
          </b-button-group>
        </template>
      </b-table>
      <hr>
    </b-container>
    <b-container>
      <h2>List Your Book Reviews</h2>
        <b-table striped hover :items="reviews" :fields="reviewFields">
          <template slot="createdAt" slot-scope="row">
            {{formatDate(row.item.createdAt)}}
          </template>
          <template slot="bookId" slot-scope="row">
            <router-link :to="{ name: 'book', params: { id: row.item.bookId }}">
              {{row.item.bookId}}
            </router-link>
          </template>
          <template slot="content" slot-scope="row">
            <div v-html="row.item.content"></div>
          </template>
          <template slot="actions" slot-scope="row">
            <b-button-group size="sm">
              <b-button variant="danger" @click="deleteReview(row.item)">
                DELETE
              </b-button>
            </b-button-group>
          </template>
        </b-table>
    </b-container>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import store from "@/store.js";
import Navbar from "@/components/Navbar.vue";
import Editor from "@tinymce/tinymce-vue";

export default {
  components: {
    Navbar,
    editor: Editor
  },
  data: function() {
    return {
      judul: "",
      penerbit: "",
      penulis: "",
      image: "",
      progress: 0,
      reviewFields: {
        reviews_created: {
          key: "createdAt",
          label: "Created",
          sortable: true
        },
        reviews_bookId: {
          key: "bookId",
          label: "ID BOOK",
          sortable: true
        },
        reviews_content: {
          key: "content",
          label: "Your Review",
          sortable: true
        },
        actions: {
          key: "actions"
        }
      },
      fields: {
        books_created: {
          key: "createdAt",
          label: "Date Pulished",
          sortable: true
        },
        books_title: {
          key: "judul",
          label: "Judul Buku",
          sortable: true
        },
        books_author: {
          key: "penulis",
          label: "Penulis",
          sortable: true
        },
        actions: {
          key: "actions"
        }
      },
    };
  },
  created() {
    const token = localStorage.getItem("Token");
    if (!token || !this.hasLogin) {
      this.$router.push({
        name: "home"
      });
    } else {
      store.dispatch("getbooksByUser");
    }
  },
  computed: {
    books: {
      get() {
        return this.$store.state.booksByUser;
      }
    },
    reviews: {
      get() {
        return this.$store.state.reviewsByUser;
      }
    },
    hasLogin: {
      get() {
        return this.$store.state.hasLogin;
      }
    }
  },
  methods: {
    formatDate(date) {
      let event = new Date(date);
      var options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
      };
      return event.toLocaleDateString("en-US", options);
    },
    submit() {
      const token = localStorage.getItem("Token");
      let userId = localStorage.getItem("userId");
      let formData = new FormData();
      formData.append("userId", userId);
      formData.append("image", this.image);
      formData.append("judul", this.judul);
      formData.append("penerbit", this.penerbit);
      formData.append("penulis", this.penulis);
      let self = this;
      axios
        .post(
          "http://localhost:3000/books/",
          formData,
          {
            headers: {
              token
            },
            onUploadProgress: function(progressEvent) {
              var percentCompleted = Math.round(
                progressEvent.loaded * 100 / progressEvent.total
              );
              self.progress = percentCompleted;
            }
          }
        )
        .then(function(result) {
          Swal("Success!", "Your Book has been publish!", "success");
          self.$store.commit("addBooks", result.data.result);
          Object.assign(self.$data, self.$options.data.call(self));
        })
        .catch(function(error) {
          Swal("Oops!", "Something went wrong!", "error");
          console.log("error :", error.response);
        });
    },
    deleteBook(book) {
      const token = localStorage.getItem("Token");
      let self = this;
      axios
        .delete(`http://localhost:3000/books/${book._id}`, {
          headers: {
            token
          }
        })
        .then(response => {
          const idx = self.books.indexOf(book);
          Swal("Deleted!", "Your book has been deleted!", "success");
          store.commit("deleteBook", idx);
        })
        .catch(error => {
          Swal("Oops!", "Something went wrong!", "error");
          console.log("error :", error);
        });
    },
    deleteReview(item) {
      const token = localStorage.getItem("Token");
      let self = this;
      axios
        .delete(`http://localhost:3000/reviews/${item._id}`, {
          headers: {
            token
          }
        })
        .then(response => {
          const idx = self.reviews.indexOf(item)
          self.reviews.splice(idx, 1)
          Swal("Deleted!", "Your review has been deleted!", "success");
        })
        .catch(error => {
          Swal("Oops!", "Something went wrong!", "error");
          console.log("error :", error);
        });
    },
    // reset() {
    //   Object.assign(this.$data, this.$options.data.call(this));
    // },
    // editPost(item) {
    //   this.post = item;
    //   this.title = item.title;
    //   this.content = item.content;
    //   this.$refs.focusThis.focus();
    //   this.isEdit = true;
    // },
    // updated() {
    //   const token = localStorage.getItem("Token");
    //   let userId = localStorage.getItem("userId");
    //   let self = this;
    //   axios
    //     .put(
    //       `http://localhost:3000/questions/${self.post._id}`,
    //       {
    //         title: self.title,
    //         content: self.content
    //       },
    //       {
    //         headers: {
    //           token
    //         }
    //       }
    //     )
    //     .then(response => {
    //       const idx = self.items.indexOf(self.post);
    //       self.items[idx].title = this.title;
    //       self.items[idx].description = this.description;
    //       self.items[idx].content = this.content;
    //       self.items[idx].image = response.data.result.image;
    //       Swal("Success!", "Your product has been updated!", "success");
    //       self.title = null;
    //       self.description = null;
    //       self.content = null;
    //       Object.assign(self.$data, self.$options.data.call(self));
    //     })
    //     .catch(error => {
    //       Swal("Oops!", "Something went wrong!", "error");
    //       console.log("error :", error.response);
    //     });
  },
  signout() {
    localStorage.clear();
    store.commit("changeLogin", false);
    this.$router.push({
      name: "home"
    });
  }
  // added() {
  //   this.isEdit = true;
  //   Object.assign(this.$data, this.$options.data.call(this));
  // }
  // }
};
</script>


