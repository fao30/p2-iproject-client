<template>
  <div>
    <navbarVue> </navbarVue>
    <ul class="cards">
      <li>
        <a href="" class="" style="width: 40%">
          <img
            style="border-radius: 20%"
            :src="detail.imgUrl"
            class=""
            alt=""
            width="400"
            height="400"
          />
          <div class="card__overlay">
            <div class="card__header">
              <svg class="card__arc" xmlns="http://www.w3.org/2000/svg">
                <path />
              </svg>

              <div class="card__header-text">
                <h3 class="card__title">
                  Destination: {{ detail.destinationName }}
                </h3>
                <span class="card__status">Price: {{ detail.price }} USD</span>
              </div>
            </div>
            <p class="card__description">
              Current local temperature: {{ detail.temperature }} celcius
            </p>
            <p class="card__description">
              Available seats left: {{ detail.availableSeat }}
            </p>

            <div class="containerDetail1">
              <button
                @click.prevent="deletePax"
                type="button"
                class="btn btn-outline-success"
              >
                Reduce
              </button>
              <p>{{ this.pickSeat }}</p>
              <button
                @click.prevent="addPax"
                type="button"
                class="btn btn-outline-danger"
              >
                Add
              </button>
            </div>
            <br />

            <button
              @click.prevent="bookSeat(detail.id)"
              style="margin-bottom: 25px"
              type="button"
              class="btn btn-warning"
            >
              Book Seat Now!
            </button>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import navbarVue from "../components/navbar.vue";
export default {
  name: "detail",
  components: {
    navbarVue,
  },
  data() {
    return {
      pickSeat: 1,
    };
  },
  computed: {
    detail() {
      return this.$store.state.detail;
    },
    loginStatus() {
      return this.$store.state.islogin;
    },
  },
  created() {
    let url = this.$route.params.id;
    this.$store.dispatch("DETAILBYID", url);
  },
  methods: {
    async bookSeat(payload) {
      if (!this.loginStatus) {
        this.$router.push("/login").catch(() => {});
      } else {
        let obj = {
          id: payload,
          seatBook: this.pickSeat,
        };
        console.log(obj, "INI OBJJJJ");
        //JANGAN LUPA ON
        await this.$store.dispatch("REDUCESEAT", obj);
        this.$router.push("/");
        await this.$store.dispatch("ADDBOOKING", obj);
      }
    },
    deletePax() {
      if (this.pickSeat > 1) this.pickSeat--;
    },
    addPax() {
      let seat = this.$store.state.detail.availableSeat;
      if (this.pickSeat < seat) this.pickSeat++;
    },
  },
};
</script>

<style>
.containerDetail1 {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
}
</style>
