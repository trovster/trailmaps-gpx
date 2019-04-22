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
        v-if="this.elevation.length > 0"
        :data="this.elevation"
        :gradient="this.gradient"
        :bar-width="1"
        :grow-duration="1"
        :width="500"
        :height="150"
    ></bars>

    <button class="button" @click="download">Download SVG</button>
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
                lat: 52.7577682,
                lng: -2.0088744,
            }
        },
    },
    data() {
        return {
            gradient: ["#6fa8dc", "#42b983", "#2c3e50"],
            name: "example",
            elevation: [],
            polyline: "",
            map: null,
            google: null,
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
                    this.name = activity.name
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
        serverBus.$on("google-map", (map, google) => {
            this.map = map
            this.google = google
        })
    },
    methods: {
        download() {
            const props = this.convertMapToSvg()
            const link = document.createElement("a")

            const html = `<svg xmlns="http://www.w3.org/2000/svg"
                height="1000" width="1000"
                viewBox="${props.x} ${props.y} ${props.width} ${props.height}">
                <path d="${props.path}" fill="none" stroke-width="0.0001" stroke="#000000" />
            </svg>`

            document.body.appendChild(link)
            link.download = `${this.name}.svg`
            link.href = `data:image/svg+xml;base64,${btoa(html)}`
            link.click()
        },
        convertMapToSvg() {
            const path = this.google.maps.geometry.encoding.decodePath(this.polyline)

            return this.pathToSvg(path)
        },
        pathToSvg(path) {
            let minX = 256
            let minY = 256
            let maxX = 0
            let maxY = 0
            let svg = []

            for (let p = 0; p < path.length; ++p) {
                const point = this.latLng2point({
                    lat: path[p].lat(),
                    lng: path[p].lng(),
                })

                minX = Math.min(minX, point.x)
                minY = Math.min(minY, point.y)
                maxX = Math.max(maxX, point.x)
                maxY = Math.max(maxY, point.y)

                svg.push([
                    point.x,
                    point.y,
                ].join(","))
            }

            return {
                path: `M${svg.join(" ")}z`,
                x: minX,
                y: minY,
                width: maxX - minX,
                height: maxY - minY,
            }
        },
        latLng2point(latLng) {
            return {
                x: (latLng.lng + 180) * (256 / 360),
                y: (256 / 2) - (256 * Math.log(Math.tan((Math.PI / 4) + ((latLng.lat * Math.PI / 180) / 2))) / (2 * Math.PI)),
            }
        },
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
.button {
    position: absolute;
    top: 20px;
    right: 55px;
    z-index: 101;
    border: 0;
    text-transform: uppercase;
    border-radius: 6px;
    cursor: pointer;
}
svg {
    position: absolute;
    bottom: -8px;
    right: 0;
    z-index: 100;
    height: 500px;
    width: 500px;
}
</style>