<template>
  <div>
    <div id="google-map" ref="googleMap"></div>
    <template v-if="Boolean(this.google) && Boolean(this.map)">
      <slot :google="google" :map="map"/>
    </template>
  </div>
</template>

<script>
import GoogleMapsApiLoader from "google-maps-api-loader"
import { serverBus } from "../../../main"

export default {
    name: "GoogleMapLoader",
    props: {
        mapConfig: Object,
        apiKey: String,
    },

    data() {
        return {
            google: null,
            map: null,
        }
    },

    async mounted() {
        this.google = await GoogleMapsApiLoader({
            apiKey: this.apiKey,
            libraries: ["geometry"],
        })
        this.initialize()
    },

    methods: {
        initialize() {
            this.map = new this.google.maps.Map(this.$refs.googleMap, this.mapConfig)
            serverBus.$emit("google-map", this.map, this.google)
        },
    },
}
</script>

<style scoped>
#google-map {
  clear: both;
  height: 100vh;
  width: 100vw;
}
</style>
