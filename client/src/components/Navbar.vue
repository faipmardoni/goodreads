<template>
  <b-navbar toggleable="md" type="dark" variant="danger" id="navbar">
    <b-container>
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
        <router-link :to="{ name: 'home' }"><b-navbar-brand>GoodReads</b-navbar-brand></router-link>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <b-nav-item v-b-modal.modalPrevent v-if="!hasLogin">Login/Register</b-nav-item>
          <b-nav-item-dropdown right v-if="hasLogin">
            <template slot="button-content">
              Account
            </template>
            <b-dropdown-item><b-link :to="{ name: 'user' }">Profile</b-link></b-dropdown-item>
            <b-dropdown-item @click="signout">Signout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
    <b-modal id="modalPrevent" ref="modal" hide-footer title="Login or Register" @shown="clearName">
      <form>
        <b-form-group v-if="!isLogin">
          <b-form-input type="text" required placeholder="Enter your name" v-model="name">
          </b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input type="email" required placeholder="Enter email" v-model="email">
          </b-form-input>
        </b-form-group>
        <b-form-group>
          <b-form-input type="password" required placeholder="Enter Password" v-model="password">
          </b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary" v-b-modal.modalPrevent v-if="isLogin==true" @click="handleOk">Login</b-button><b-button type="submit" variant="primary" v-b-modal.modalPrevent v-if="isLogin==false" @click="handleOk">Register</b-button>
      </form>
      <span style="font-size: 12px" v-if="isLogin">Not a member ? <b-link @click="goRegister">Register Now</b-link></span>
      <span style="font-size: 12px" v-if="!isLogin"><b-link @click="goLogin">Back to Login</b-link></span>
    </b-modal>
  </b-navbar>

</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
import store from "@/store.js";
export default {
  data() {
    return {
      isLogin: true,
      email: "",
      password: "",
      name: "",
    };
  },
  computed: {
    hasLogin: {
      get() {
        return store.state.hasLogin;
      }
    }
  },
  created() {
  },
  methods: {
    clearName() {
      this.name = "";
      this.email = "";
      this.password = "";
    },
    handleOk(evt) {
      evt.preventDefault();
      if (this.isLogin) {
        if (!this.email || !this.password) {
          Swal("Oops!", "Please fill all fields!", "warning");
        } else {
          this.handleSubmit();
        }
      } else {
        if (!this.email || !this.password || !this.name) {
          Swal("Oops!", "Please fill all fields!", "warning");
        } else {
          this.handleSubmit();
        }
      }
    },
    handleSubmit() {
      const { name, email, password } = this;
      if (this.isLogin) {
        axios
          .post(`https://server-goodreads.faipmardoni.net/users/login/`, {
            email,
            password
          })
          .then(result => {
            store.commit("changeLogin", true);
            localStorage.setItem("Token", result.data.token);
            localStorage.setItem("userId", result.data.user._id);
            Swal("Nice", "Your are already login", "success");
            this.$router.push({
              name: "user"
            });
          })
          .catch(err => {
            Swal("Oops!", "Something went wrong!", "error");
            console.log("error :", err);
          });
      } else {
        axios
          .post(`https://server-goodreads.faipmardoni.net/users/`, {
            email,
            name,
            password
          })
          .then(result => {
            localStorage.setItem("Token", result.data.token);
            localStorage.setItem("userId", result.data.user._id);
            Swal("Nice", "Your are already register & go to login", "success");
          })
          .catch(err => {
            Swal("Oops!", "Something went wrong!", "error");
            console.log("error :", err.response.data);
          });
      }
    },
    goRegister() {
      this.isLogin = false;
    },
    goLogin() {
      this.isLogin = true;
    },
    signout() {
      localStorage.clear();
      store.commit("changeLogin", false);
      this.$router.push({
        name: "home"
      });
    }
  }
};
</script>

<style>
#navbar {
  margin-bottom: 20px;
}
.fb-signin-button {
  /* This is where you control how the button looks. Be creative! */
  display: inline-block;
  padding: 4px 8px;
  border-radius: 3px;
  background-color: #4267b2;
  color: #fff;
}
</style>
