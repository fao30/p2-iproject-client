<template>
  <div>
    <navbarVue> </navbarVue>
    <section id="login-page">
      <div class="login-container row m-0 h-100">
        <div class="col-6 p-0 login-second-bg">
          <img
            class="w-100"
            src="../assets/img/login-second-bg.jpg"
            alt="second background"
          />
        </div>
        <div
          class="
            col-6
            p-5
            login-card
            h-100
            d-flex
            flex-column
            justify-content-center
          "
        >
          <form class="p-5 card rounded shadow">
            <div class="d-flex flex-column align-items-center">
              <h2 class="text-center">Fao Tour And Travel</h2>
              <img
                src="../assets/img/icon.png"
                alt="login thumbnail"
                class="w-50 my-4"
              />
            </div>
            <div class="w-100 form-group">
              <label for="email">Email</label>
              <input
                v-model="inputEmail"
                type="email"
                name="email"
                class="form-control"
              />
            </div>
            <div class="w-100 form-group">
              <label for="password">Password</label>
              <input
                v-model="inputPassword"
                type="password"
                name="password"
                class="form-control"
              />
            </div>
            <div class="w-100 mt-2">
              <button
                @click.prevent="login"
                type="submit"
                class="btn btn-login shadow rounded btn-block"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import navbarVue from "../components/navbar.vue";
export default {
  name: "Login",
  data() {
    return {
      inputEmail: [],
      inputPassword: [],
    };
  },
  components: {
    navbarVue,
  },
  computed: {
    userIsLogin() {
      return this.$store.state.isLogin;
    },
  },
  methods: {
    async login() {
      let obj = {
        email: this.inputEmail,
        password: this.inputPassword,
      };
      console.log(obj);
      await this.$store.dispatch("LOGIN", obj);
      if (this.userIsLogin) {
        console.log("KELOGINNNN");
      }

      this.$router.push("/");
    },
  },
};
</script>

<style></style>
