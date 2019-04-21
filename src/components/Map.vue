<template>
  <div id="map">
    <h2>{{ this.name }}</h2>

    <GoogleMapLoader :mapConfig="mapConfig" apiKey="AIzaSyAYKX8_TSjY6LNQFQTPFXSPlldXlQhUA0Q">
      <template slot-scope="{ google, map }">
        <GoogleMapLine
            :polyline="polyline"
            :google="google"
            :map="map"
        />
      </template>
    </GoogleMapLoader>

    <bars
      :data="this.data"
      :gradient="this.gradient"
      :bar-width="1"
      :grow-duration="1"
      :width="500"
      :height="150"
    ></bars>
  </div>
</template>

<script>
import GoogleMapLoader from "./Google/Map/Loader"
import GoogleMapLine from "./Google/Map/Line"

import { mapGetters } from "vuex"
import { serverBus } from "../main"
import { mapSettings, EXAMPLE_POLYGON } from "@/config/map"
import stravaConfig from "@/config/strava"

import Bars from "vuebars"

export default {
    name: "Map",
    components: {
        GoogleMapLoader,
        GoogleMapLine,
        Bars,
    },
    computed: {
        ...mapGetters({
            authenticated: "authenticated",
            accessToken: "stravaAccessToken",
        }),
        mapConfig() {
            return {
                ...mapSettings,
                center: this.mapCenter,
            }
        },
        mapCenter() {
            return {
                lat: 52.780431,
                lng: -1.993218,
            }
        },
    },
    data() {
        return {
            gradient: ["#6fa8dc", "#42b983", "#2c3e50"],
            name: "",
            data: [],
            polyline: "",
            map: null,
            api: new require("strava")({
                client_id: stravaConfig.client_id,
                client_secret: stravaConfig.client_secret,
            }),
        }
    },
    async beforeMount() {
        if (this.$route.params.id) {
            if (this.authenticated) {
                this.api.config.access_token = this.accessToken
                this.api.activities.get(this.$route.params.id, (error, activity) => {
                    this.polyline = activity.map.polyline
                    this.map.setCenter({
                        lat: activity.start_latitude,
                        lng: activity.start_longitude,
                    })
                })
            } else {
                this.$router.push("/")
            }
        } else {
            this.polyline = EXAMPLE_POLYGON
        }
    },
    created() {
        serverBus.$on("google-map", (map) => {
            this.map = map
        })
    },
}
</script>

<style lang="scss" scoped>
html, body {
  overflow: hidden;
}
#map {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
h1 {
  position: absolute;
  top: 15px;
  left: 55px;
}
h2 {
  position: absolute;
  top: 55px;
  right: 55px;
  z-index: 100;
  display: none;
}
svg {
  position: absolute;
  bottom: -8px;
  right: 0;
  z-index: 100;
}
</style>