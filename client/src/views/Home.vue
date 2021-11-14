<template>
  <div class="home">
    <navbarVue> </navbarVue>
    <div>
      <destinationCardVue
        v-for="desCard in getDestination"
        :key="desCard.id"
        :desCard="desCard"
      >
      </destinationCardVue>
    </div>
  </div>
</template>

<script>
import destinationCardVue from "../components/destinationCard.vue";
import navbarVue from "../components/navbar.vue";
// @ is an alias to /src

export default {
  name: "Home",
  components: {
    navbarVue,
    destinationCardVue,
  },
  computed: {
    getDestination() {
      return this.$store.state.destination;
    },
  },
  created() {
    this.$store.dispatch("FETCH_DESTINATION");
  },
};
</script>

<style>
.containerCard {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
