<template>
  <div>
    <br />
    <h1>PLEASE PAY YOUR BOOKING</h1>
    <h4>Virtual Number BNI</h4>
    <center>
      <form style="width: 50%">
        <fieldset disabled>
          <div class="form-group">
            <label for="disabledTextInput"> <h6>ID:</h6></label>
            <input
              type="text"
              id="disabledTextInput"
              class="form-control"
              v-model="vaId"
            />
          </div>
          <div class="form-group">
            <label for="disabledTextInput"> <h6>VIRTUAL NUMBER:</h6></label>
            <input
              type="text"
              id="disabledTextInput"
              class="form-control"
              v-model="vaNumber"
            />
          </div>
          <div class="form-group">
            <label for="disabledTextInput"> <h6>AMMOUNT:</h6></label>
            <input
              type="text"
              id="disabledTextInput"
              class="form-control"
              v-model="vaAmount"
            />
          </div>
          <div class="form-group">
            <label for="disabledTextInput"> <h6>VIRTUAL NAME:</h6></label>
            <input
              type="text"
              id="disabledTextInput"
              class="form-control"
              v-model="vaName"
            />
          </div>
          <div class="form-group">
            <label for="disabledTextInput"> <h6>VALID UNTIL:</h6></label>
            <input
              type="text"
              id="disabledTextInput"
              class="form-control"
              v-model="vaUntil"
            />
          </div>
          <div class="form-group">
            <label for="disabledTextInput"> <h6>STATUS:</h6></label>
            <input
              type="text"
              id="disabledTextInput"
              class="form-control"
              v-model="vaStatus"
            />
          </div>
        </fieldset>
        <br /><br />
        <p>Please make a purchase within {{ countDown }} seconds</p>
        <div v-if="this.notPaid">
          <h5 v-if="this.paidStatus == null">
            Please complete your payment first
          </h5>
        </div>
        <h6>Only click "PAID" if you already paid</h6>
        <button
          @click="paid(transferInfo.external_id, transferInfo.expected_amount)"
          style="height: 80px; width: 160px"
          type="button"
          class="btn btn-danger"
        >
          PAID
        </button>
      </form>
    </center>
  </div>
</template>
<script>
export default {
  name: "payment",
  data() {
    return {
      vaId: "",
      vaNumber: "",
      vaAmount: "",
      vaName: "",
      vaUntil: "",
      vaStatus: "",
      notPaid: false,
      countDown: 60,
    };
  },
  created() {
    let obj1 = {
      id: this.$route.params.id,
    };
    this.$store.dispatch("TRANSFERDETAIL", obj1);
    this.$store.dispatch("PAYMENTIDACTION");
    this.fetchLocal();
    this.countDownTimer();
  },
  computed: {
    transferInfo() {
      return this.$store.state.transfer;
    },
    paidStatus() {
      return this.$store.state.paid;
    },
    getPaymentID() {
      return this.$store.state.paymentId;
    },
    getPurchase() {
      return this.$store.state.purchase;
    },
  },
  methods: {
    async countDownTimer() {
      if (this.countDown > 0) {
        setTimeout(() => {
          this.countDown -= 1;
          this.countDownTimer();
        }, 1000);
      }
      if (this.countDown == 0) {
        let obj = {
          external_id: this.transferInfo.external_id,
          amount: this.transferInfo.expected_amount,
        };
        await this.$store.dispatch("PAIDACTION", obj);
        if (this.paidStatus !== null) {
          this.$router.push("/");
        } else {
          console.log("MASUK SIN CUKKK");
          console.log(this.getPurchase, "INI ISI PURCHASE");
          let obj = {
            id: this.getPurchase.TourPackageId,
            seatBook: this.getPurchase.pax,
          };
          await this.$store.dispatch(
            "DELETECART",
            this.getPurchase.TourPackageId
          );
          await this.$store.dispatch("ADDSEAT", obj);
          this.$router.push("/");
        }
      }
    },
    fetchLocal() {
      this.vaId = this.transferInfo.id;
      this.vaNumber = this.transferInfo.account_number;
      this.vaAmount = this.formatPrice(this.transferInfo.expected_amount);
      this.vaName = this.transferInfo.name;
      this.vaUntil = this.transferInfo.expiration_date;
      this.vaStatus = this.transferInfo.status;
    },
    async paid(payload, amount) {
      // console.log("CLICKED PAID");
      let obj = {
        external_id: payload,
        amount,
      };
      // console.log(this.paidStatus);
      await this.$store.dispatch("PAIDACTION", obj);
      if (this.paidStatus !== null) {
        console.log(this.paidStatus, "DI KLIKKKKKKK");
        this.$router.push("/");
      }
      this.notPaid = true;
    },
    formatPrice(value) {
      let val = (value / 1).toFixed(2).replace(".", ",");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
  },
};
</script>

<style></style>
