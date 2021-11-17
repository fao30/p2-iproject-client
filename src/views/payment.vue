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
    };
  },
  created() {
    let obj1 = {
      id: this.$route.params.id,
    };
    this.$store.dispatch("TRANSFERDETAIL", obj1);
    this.$store.dispatch("PAYMENTIDACTION");
    this.getPaymentId();
    this.fetchLocal();
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
  },
  methods: {
    fetchLocal() {
      this.vaId = this.transferInfo.id;
      this.vaNumber = this.transferInfo.account_number;
      this.vaAmount = this.formatPrice(this.transferInfo.expected_amount);
      this.vaName = this.transferInfo.name;
      this.vaUntil = this.transferInfo.expiration_date;
      this.vaStatus = this.transferInfo.status;
    },
    getPaymentId() {
      console.log(this.getPaymentID, "INI ISI DARI METOH GET PAYMENT BY ID");
    },
    async paid(payload, amount) {
      let obj = {
        external_id: payload,
        amount,
      };
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
