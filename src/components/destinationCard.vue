<template>
  <div class="">
    <div v-for="desCard in getDestination" :key="desCard.id">
      <div>
        <div @click.prevent="detail(desCard.id)">
          <ul class="cards">
            <li>
              <a href="" class="card" style="width: 40%">
                <img :src="desCard.imgUrl" class="card__image" alt="" />
                <div class="card__overlay">
                  <div class="card__header">
                    <div class="card__header-text">
                      <h3 class="card__title">
                        Destination:
                        {{ desCard.destinationName }}
                        <p
                          v-if="desCard.availableSeat < 5"
                          style="
                            background-color: red;
                            color: yellow;
                            border-radius: 694px;
                            font-size: 10px;
                          "
                        >
                          HOT DESTINATION
                        </p>
                      </h3>
                      <span class="card__status"
                        >Price: {{ desCard.price }} USD</span
                      >
                    </div>
                  </div>
                  <p class="card__description">
                    Current local temperature: {{ desCard.temperature }}
                  </p>
                  <br />
                  <p class="card__description">
                    Available seats: {{ desCard.availableSeat }} left
                  </p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "destinationCard",
  // props: ["desCard"],
  methods: {
    async detail(payload) {
      await this.$store.dispatch("DETAILBYID", payload);
      await this.$router.push(`/detail/${payload}`);
    },
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
:root {
  --surface-color: #fff;
  --curve: 40;
}

* {
  box-sizing: border-box;
}

body {
  font-family: "Noto Sans JP", sans-serif;
  background-color: #fef8f8;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 4rem 5vw;
  padding: 0;
  list-style-type: none;
}

.card {
  position: relative;
  display: block;
  height: 100%;
  border-radius: calc(var(--curve) * 1px);
  overflow: hidden;
  text-decoration: none;
}

.card__image {
  width: 100%;
  height: auto;
}

.card__overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  border-radius: calc(var(--curve) * 1px);
  background-color: var(--surface-color);
  transform: translateY(100%);
  transition: 0.2s ease-in-out;
}

.card:hover .card__overlay {
  transform: translateY(0);
}

.card__header {
  position: relative;
  display: flex;
  align-items: center;
  gap: 2em;
  padding: 2em;
  border-radius: calc(var(--curve) * 1px) 0 0 0;
  background-color: var(--surface-color);
  transform: translateY(-100%);
  transition: 0.2s ease-in-out;
}

.card__arc {
  width: 80px;
  height: 80px;
  position: absolute;
  bottom: 100%;
  right: 0;
  z-index: 1;
}

.card__arc path {
  fill: var(--surface-color);
  d: path("M 40 80 c 22 0 40 -22 40 -40 v 40 Z");
}

.card:hover .card__header {
  transform: translateY(0);
}

.card__thumb {
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.card__title {
  font-size: 1em;
  margin: 0 0 0.3em;
  color: #6a515e;
}

.card__tagline {
  display: block;
  margin: 1em 0;
  font-family: "MockFlowFont";
  font-size: 0.8em;
  color: #d7bdca;
}

.card__status {
  font-size: 0.8em;
  color: #d7bdca;
}

.card__description {
  padding: 0 2em 2em;
  margin: 0;
  color: #d7bdca;
  font-family: "MockFlowFont";
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>
