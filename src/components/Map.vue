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
import { mapSettings, EXAMPLE_MAP } from "@/config/map"
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
                lat: EXAMPLE_MAP.lat,
                lng: EXAMPLE_MAP.lng,
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
            size: 1000,
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
            this.polyline = EXAMPLE_MAP.polygon
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

            const html = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                viewBox="${props.x} ${props.y} ${props.width} ${props.height}">
                <path d="${props.path}" fill="none" stroke-width="0.0001" stroke="#000000" />
                <image x="${props.x}" y="${props.y}" width="0.02" height="0.02" xlink:href="data:image/png;base64,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"/>
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
            let minX = this.size
            let minY = this.size
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
                x: (latLng.lng + 180) * (this.size / 360),
                y: (this.size / 2) - (this.size * Math.log(Math.tan((Math.PI / 4) + ((latLng.lat * Math.PI / 180) / 2))) / (2 * Math.PI)),
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