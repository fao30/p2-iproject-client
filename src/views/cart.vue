<template>
  <div>
    <navbarVue> </navbarVue>
    <div v-for="desCard in getBookingById" :key="desCard.id">
      <div>
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
                  <div
                    class="containerDetail1"
                    v-if="desCard.status !== 'COMPLETED'"
                  >
                    <button
                      @click.prevent="
                        purchaseBook(
                          desCard.id,
                          desCard.TourPackage.price *
                            desCard.pax *
                            getCurrency.data
                        )
                      "
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
                  <div
                    class="alert alert-warning"
                    role="alert"
                    v-if="desCard.status == 'COMPLETED'"
                  >
                    The booking has been paid,Bon voyage!
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
    getPayment() {
      return this.$store.state.purchase;
    },
    getPaymentID() {
      return this.$store.state.paymentId;
    },
  },
  created() {
    if (localStorage.access_token) {
      this.$store.dispatch("DATABYID", localStorage.access_token);
      this.$store.dispatch("GETCURRENCY");
    }
    this.getPaymentId();
  },
  methods: {
    getPaymentId() {
      console.log("DI METHODS PAYMENT ID");
      console.log(this.getPaymentID);
    },
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
    async purchaseBook(bookId, cost) {
      let obj = {
        bookid: bookId,
        amount: cost,
      };
      await this.$store.dispatch("PURCHASEACTION", obj);
      let obj1 = {
        id: this.getPayment.idXendit,
      };
      await this.$store.dispatch("TRANSFERDETAIL", obj1);
      if (this.getPayment.id != 0) {
        // console.log(this.getPayment, "INI PURCHASE");
        await this.$router.push(`/payment/${obj1.id}`);
      }
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
