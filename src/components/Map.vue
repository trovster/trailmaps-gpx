<template>
  <div id="map">
    <h2>{{ this.name }}</h2>

    <GoogleMapLoader :mapConfig="mapConfig" apiKey="AIzaSyAYKX8_TSjY6LNQFQTPFXSPlldXlQhUA0Q">
      <template slot-scope="{ google, map }">
        <GoogleMapLine
          :polyline.sync="polyline"
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
import { mapSettings } from "@/config/map"
import stravaConfig from "@/config/strava"

import axios from "axios"
import xml2js from "xml2js"
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
            lines: [],
            polyline: "",
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
                await this.api.activities.get(this.$route.params.id, async (error, activity) => {
                    this.polyline = activity.map.polyline
                    console.log(activity)
                })
            } else {
                this.$router.push("/")
            }
        } else {
            axios.get("./assets/example.gpx").then(response => {
                new xml2js.Parser().parseString(response.data, (error, result) => {
                    const track = result.gpx.trk[0]
                    this.name = track.name[0]

                    for (let id in track.trkseg[0].trkpt) {
                        id = parseInt(id, 10)
                        const point = track.trkseg[0].trkpt[id]
                        const previousPoint = track.trkseg[0].trkpt[id - 1] || track.trkseg[0].trkpt[0]

                        this.data.push(parseFloat(point.ele[0]))
                        this.lines.push({
                            id: id + 1,
                            path: [
                                {
                                    lat: parseFloat(point.$.lat),
                                    lng: parseFloat(point.$.lon),
                                },
                                {
                                    lat: parseFloat(previousPoint.$.lat),
                                    lng: parseFloat(previousPoint.$.lon),
                                },
                            ],
                        })
                    }
                })
            })
        }
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