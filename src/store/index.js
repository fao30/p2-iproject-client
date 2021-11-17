import Vue from "vue";
import Vuex from "vuex";
import axios from "../axios/server.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    destination: [],
    detail: [],
    booktrip: [],
    islogin: false,
    dollarrupiah: [],
    transfer: [],
    paid: false,
    purchase: 0,
    paymentId: [],
  },
  mutations: {
    FETCHDESTINATION(state, payload) {
      state.destination = payload;
    },
    BOOKTRIP(state, payload) {
      state.booktrip = payload;
    },
    DETAIL(state, payload) {
      state.detail = payload;
    },
    LOGINMUT(state, payload) {
      state.islogin = payload;
    },
    CURRENCY(state, payload) {
      state.dollarrupiah = payload;
    },
    PURCHASEMUT(state, payload) {
      state.purchase = payload;
    },
    TRANSFERMUT(state, payload) {
      state.transfer = payload;
    },
    PAIDMUT(state, payload) {
      state.paid = payload;
    },
    PAYMENTID(state, payload) {
      state.paymentId = payload;
    },
  },
  actions: {
    async PAYMENTIDACTION(context) {
      try {
        console.log("MASUK PERTAMA KE PID");
        let response = await axios({
          method: "post",
          url: `/callback`,
        });
        console.log(response.data, "INI DAPETIN CALLBACK, di SINIII");
        context.commit("PAYMENTID", response);
      } catch (err) {
        console.log(err);
      }
    },
    async PAIDACTION(context, payload) {
      try {
        let response = await axios({
          method: "post",
          url: `/checkpayment`,
          headers: {
            access_token: localStorage.access_token,
          },
          params: {
            external_id: payload.external_id,
            amount: payload.amount,
          },
        });
        console.log(response.data, "INI RESPONS TRANSFER INDEX TROUTER");
        context.commit("PAIDMUT", response.data);
      } catch (err) {
        console.log(err);
      }
    },
    async TRANSFERDETAIL(context, payload) {
      try {
        // console.log("PASTI MASUK", payload);
        let response = await axios({
          method: "get",
          url: `/getva/${payload.id}`,
          headers: {
            access_token: localStorage.access_token,
          },
        });
        // console.log(response.data, "INI RESPONS TRANSFER INDEX TROUTER");
        context.commit("TRANSFERMUT", response.data);
      } catch (err) {
        console.log(err);
      }
    },
    async PURCHASEACTION(context, payload) {
      try {
        let response = await axios({
          method: "post",
          url: "/createva",
          headers: {
            access_token: localStorage.access_token,
          },
          data: payload,
        });
        console.log(response.data[1][0], "INI RESPONS PURCHASE");
        context.commit("PURCHASEMUT", response.data[1][0]);
      } catch (err) {
        console.log(err);
      }
    },
    async GETCURRENCY(context) {
      try {
        let response = await axios({
          method: "get",
          url: "/currency",
        });
        context.commit("CURRENCY", response);
      } catch (err) {
        console.log(err);
      }
    },
    async DELETECART(context, payload) {
      try {
        console.log(payload, "INI PAYLOAD");
        await axios({
          method: "delete",
          url: "/deletecart",
          headers: {
            access_token: localStorage.access_token,
          },
          data: {
            MovieId: payload,
          },
        });

        console.log(context);
      } catch (err) {
        console.log(err);
      }
    },
    async DATABYID(context, payload) {
      try {
        let response = await axios({
          method: "get",
          url: "/databyuser",
          headers: {
            access_token: payload,
          },
        });
        // console.log("DATA BY ID", response.data);
        context.commit("BOOKTRIP", response.data);
        // console.log(context);
      } catch (err) {
        console.log(err);
      }
    },
    async FETCH_DESTINATION(context) {
      try {
        let response = await axios({
          method: "get",
          url: `/data`,
        });
        console.log("DI FETCH DATA", response.data);
        context.commit("FETCHDESTINATION", response.data);
      } catch (err) {
        console.log(err);
      }
    },

    async LOGIN(context, payload) {
      try {
        console.log("LOGIN");
        let response = await axios({
          method: "post",
          url: `/login`,
          data: payload,
        });
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("role", response.data.role);
        localStorage.setItem("id", response.data.id);

        context.commit("LOGINMUT", true);
      } catch (err) {
        console.log(err);
      }
    },

    async DETAILBYID(context, payload) {
      try {
        let response = await axios({
          method: "get",
          url: `/detail/${payload}`,
        });
        // console.log(response.data[0], "INI DETAIL");
        context.commit("DETAIL", response.data[0]);
      } catch (err) {
        console.log(err);
      }
    },

    async ADDBOOKING(context, payload) {
      try {
        await axios({
          method: "post",
          url: `/addbook`,
          headers: {
            access_token: localStorage.access_token,
          },
          data: {
            TourPackageId: payload.id,
            pax: payload.seatBook,
          },
        });
      } catch (err) {
        console.log(err);
      }
    },

    async ADDSEAT(context, payload) {
      try {
        console.log(payload, "DARI CART");
        let response = await axios({
          method: "patch",
          url: `/detail/addseat`,
          data: payload,
        });
        // console.log(response.data[0], "INI DETAIL");
        context.commit("ADD SEATT", response.data[0]);
      } catch (err) {
        console.log(err);
      }
    },

    async REDUCESEAT(context, payload) {
      try {
        console.log("MASUK RECUSEAT ke 143 COKKKKK");
        let response = await axios({
          method: "patch",
          url: `/detail/reduceseat`,
          data: payload,
        });
        console.log(response);
        // context.commit("DETAIL", response.data[0]);
      } catch (err) {
        console.log(err);
      }
    },
    async LOGOUT(context) {
      localStorage.clear();
      context.commit("LOGINMUT", false);
    },
  },
  modules: {},
});
