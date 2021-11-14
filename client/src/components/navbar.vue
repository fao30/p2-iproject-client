<template>
  <div>
    <nav class="navbar shadow">
      <div
        @click.prevent="home"
        class="navbar-brand p-0 d-flex align-items-center"
        style="
          cursor: pointer;
          margin-bottom: -40px;
          margin-top: -40px;

          height: 150px;
          width: 200px;
        "
      >
        <img
          src="../assets/img/icon.png"
          alt="login thumbnail"
          class="w-50 my-4 logo"
        />
      </div>

      <div class="d-flex flex-row">
        <button @click.prevent="cart" class="btn rounded">
          <i class="fas fa-luggage-cart"></i>Cart
        </button>
        <button
          v-if="loginStatus"
          @click.prevent="logout"
          class="btn btn-login rounded"
        >
          Logout
        </button>
        <button
          v-if="!loginStatus"
          @click.prevent="login"
          class="btn btn-login rounded"
        >
          Login
        </button>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "navbar",
  created() {
    console.log(this.loginStatus, "STATUS NAVBAR");
  },
  computed: {
    loginStatus() {
      return this.$store.state.islogin;
    },
  },
  methods: {
    home() {
      this.$router.push("/");
    },
    logout() {
      this.$store.dispatch("LOGOUT");
      this.$router.push("/").catch(() => {});
    },
    login() {
      this.$router.push("/login");
    },
    cart() {
      this.$router.push("/cart");
      this.$store.dispatch("DATABYID", localStorage.access_token);
    },
  },
};
</script>

<style></style>
