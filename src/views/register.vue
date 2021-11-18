<template>
  <div>
    <navbarVue> </navbarVue>
    <section id="login-page">
      <div class="login-container row m-0 h-100">
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
              <h2 class="text-center">Kindly register before</h2>
            </div>
            <div class="w-100 form-group">
              <label for="email">Name</label>
              <input
                v-model="inputName"
                type="email"
                name="email"
                class="form-control"
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
            <div class="w-100 form-group">
              <label for="email">Alamat</label>
              <input
                v-model="inputAlamat"
                type="email"
                name="email"
                class="form-control"
              />
            </div>
            <div class="w-100 form-group">
              <label for="email">Telephone</label>
              <input
                v-model="inputTelephone"
                type="email"
                name="email"
                class="form-control"
              />
            </div>
            <div class="w-100 mt-2">
              <button
                @click.prevent="register"
                type="submit"
                class="btn btn-login shadow rounded btn-block"
              >
                Register
              </button>
            </div>
          </form>
        </div>
        <div class="col-6 p-0 login-second-bg">
          <img
            class="w-100"
            src="../assets/img/login-second-bg.jpg"
            alt="second background"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import navbarVue from "../components/navbar.vue";
export default {
  name: "Register",
  data() {
    return {
      inputName: [],
      inputEmail: [],
      inputAlamat: [],
      inputPassword: [],
      inputTelephone: [],
    };
  },
  components: {
    navbarVue,
  },
  computed: {
    userIsLogin() {
      return this.$store.state.isLogin;
    },
    userIsRegister() {
      return this.$store.state.isRegister;
    },
  },
  methods: {
    async register() {
      let obj = {
        name: this.inputName,
        email: this.inputEmail,
        password: this.inputPassword,
        alamat: this.inputAlamat,
        telephone: this.inputTelephone,
      };
      await this.$store.dispatch("REGISTER", obj);
      if (this.userIsRegister) {
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style></style>
