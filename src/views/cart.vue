<template>
  <div>
    <navbarVue> </navbarVue>
    <div v-for="desCard in getBookingById" :key="desCard.id">
      <div @click.prevent="detail(desCard.id)">
        <ul class="cards">
          <li>
            <a href="" class="card" style="width: 40%">
              <img
                :src="desCard.TourPackage.imgUrl"
                class="card__image"
                alt=""
              />
              <div class="card__overlay">
                <div class="card__header">
                  <div class="card__header-text">
                    <h3 class="card__title">
                      Destination:
                      {{ desCard.TourPackage.destinationName.split(",")[0] }}
                    </h3>
                    <span class="card__status"
                      >Price: {{ desCard.TourPackage.price }} USD</span
                    >
                    <br />
                    <span class="card__status"
                      >Pax: {{ desCard.pax }} passangers</span
                    >
                  </div>
                </div>
                <div style="containerCart">
                  <p class="card__description">
                    Current local temperature:
                    {{ desCard.TourPackage.temperature }} degress celciusokeeee
                  </p>
                  <p class="card__description">
                    Total cost: <br />
                    -USD
                    {{ formatPrice(desCard.TourPackage.price * desCard.pax) }}
                    <br />
                    -Rp
                    {{
                      formatPrice(
                        desCard.TourPackage.price *
                          desCard.pax *
                          getCurrency.data
                      )
                    }}
                  </p>
                  <div class="containerDetail1">
                    <button
                      @click.prevent="purchaseBook"
                      type="button"
                      class="btn btn-outline-success"
                    >
                      Purchase
                    </button>

                    <button
                      @click.prevent="
                        deleteBook(desCard.TourPackageId, desCard.pax)
                      "
                      type="button"
                      class="btn btn-outline-danger"
                    >
                      Delete
                    </button>
                  </div>
                  <br />
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import navbarVue from "../components/navbar.vue";
export default {
  name: "cart",
  components: {
    navbarVue,
  },
  computed: {
    getBookingById() {
      return this.$store.state.booktrip;
    },
    getCurrency() {
      return this.$store.state.dollarrupiah;
    },
  },
  created() {
    if (localStorage.access_token) {
      this.$store.dispatch("DATABYID", localStorage.access_token);
      this.$store.dispatch("GETCURRENCY");
    }
    console.log(this.getCurrency.data, "INI TUKAT");
    // console.log(this.getBookingById, "INI DATA");
  },
  methods: {
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    async deleteBook(payload, payloadPax) {
      let obj = {
        id: payload,
        seatBook: payloadPax,
      };
      await this.$store.dispatch("DELETECART", payload);
      await this.$store.dispatch("ADDSEAT", obj);
      this.$router.push("/");
    },
  },
};
</script>

<style>
.containerCart {
  display: flex;
  flex-direction: row;
}
</style>
