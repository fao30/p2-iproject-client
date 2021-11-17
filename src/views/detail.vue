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
            <h6>
              Dressing advice:

              <p class="card__description">{{ this.advice }}</p>
            </h6>
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
      <li>
        <h1>
          COVID DATA
          <img
            width="50"
            height="50"
            src="../assets/img/coronavirus.webp"
            alt=""
          />
        </h1>

        <div class="containerDetail1">
          <div
            style="
              color: white;
              background-color: red;
              border-radius: 70%;
              width: 120px;
              height: 30px;
            "
          >
            Death Case
          </div>
          <p v-if="detail.covidData">
            {{ formatNumber(detail.covidData.deaths) }}
          </p>
          <p v-if="!detail.covidData">No data found</p>
        </div>
        <div class="containerDetail1">
          <div
            style="
              color: black;
              background-color: yellow;
              border-radius: 70%;
              width: 120px;
              height: 30px;
            "
          >
            Confirmed
          </div>
          <p v-if="detail.covidData">
            {{ formatNumber(detail.covidData.confirmed) }}
          </p>
          <p v-if="!detail.covidData">No data found</p>
        </div>
        <div class="containerDetail1">
          <div
            style="
              color: white;
              background-color: green;
              border-radius: 70%;
              width: 120px;
              height: 30px;
            "
          >
            Recovery
          </div>
          <p v-if="detail.covidData">
            {{ formatNumber(detail.covidData.recovered) }}
          </p>
          <p v-if="!detail.covidData">No data found</p>
        </div>
        <div v-if="detail.covidData">
          <div
            v-if="
              detail.covidData.confirmed > 0 &&
              detail.covidData.confirmed < 2000000
            "
            class="alert alert-success"
            role="alert"
          >
            Travel warning: {{ detail.destinationName }} is on the safe travel
            zone
          </div>
          <div
            v-if="
              detail.covidData.confirmed >= 2000000 &&
              detail.covidData.confirmed <= 7000000
            "
            class="alert alert-warning"
            role="alert"
          >
            Travel warning: {{ detail.destinationName }} is on the warning
            travel zone
          </div>
          <div
            v-if="detail.covidData.confirmed >= 7000000"
            class="alert alert-danger"
            role="alert"
          >
            Travel warning: {{ detail.destinationName }} is on the danger travel
            zone
          </div>
        </div>
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
      advice: "",
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
    this.getAdvice();
  },
  methods: {
    formatNumber(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        .split(",")[0];
    },
    getAdvice() {
      console.log(this.detail.destinationName.split(",")[0], "LOKASI");
      if (this.detail.temperature > -10 && this.detail.temperature < 10) {
        this.advice = `The weather in ${
          this.detail.destinationName.split(",")[0]
        } is  little bit cold, we suggest you to wear 1. pullover 2. winter hat 3. gloves 4. warm scarf 5.heavy coat`;
      } else if (
        this.detail.temperature >= 10 &&
        this.detail.temperature < 20
      ) {
        this.advice = `The weather in ${
          this.detail.destinationName.split(",")[0]
        } is warm, we suggest you to wear 1. long sleeves shirt 2. winter Jacket 3. Scarf 4. Pullover`;
      } else if (
        this.detail.temperature >= 20 &&
        this.detail.temperature < 30
      ) {
        this.advice = `The weather in ${
          this.detail.destinationName.split(",")[0]
        } is warm, we suggest you to wear 1. long sleeves shirt 2. light scarf 3. rain jacket`;
      }
    },
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
