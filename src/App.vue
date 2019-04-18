<template>
  <div id="app">
    <h1>
      <a href>
        <img src="./assets/logo.png" alt="TrailMaps.co.uk GPX" title>
      </a>
    </h1>

    <h2>{{ this.name }}</h2>

    <GoogleMapLoader :mapConfig="mapConfig" apiKey="AIzaSyAYKX8_TSjY6LNQFQTPFXSPlldXlQhUA0Q">
      <template slot-scope="{ google, map }">
        <GoogleMapLine
          v-for="line in lines"
          :key="line.id"
          :path.sync="line.path"
          :google="google"
          :map="map"
        />
      </template>
    </GoogleMapLoader>

    <bars
      :data="this.data"
      :gradient="this.gradient"
      :bar-width="1"
      :grow-duration="1">
    </bars>
  </div>
</template>

<script>
import GoogleMapLoader from "./components/GoogleMapLoader";
import GoogleMapLine from "./components/GoogleMapLine";
import { mapSettings } from "@/constants/mapSettings";

import axios from "axios";
import xml2js from "xml2js";
import Bars from "vuebars";

export default {
  name: "TrailMaps",
  components: {
    GoogleMapLoader,
    GoogleMapLine,
    Bars
  },
  data() {
    return {
      gradient: ["#6fa8dc", "#42b983", "#2c3e50"],
      name: "",
      data: [],
      lines: []
    };
  },
  beforeMount() {
    axios.get("./assets/example.gpx").then(response => {
      new xml2js.Parser().parseString(response.data, (error, result) => {
        const track = result.gpx.trk[0];
        this.name = track.name[0];

        for (let id in track.trkseg[0].trkpt) {
          id = parseInt(id, 10)
          const point = track.trkseg[0].trkpt[id]
          const previousPoint = track.trkseg[0].trkpt[id - 1] || track.trkseg[0].trkpt[0]

          this.data.push(parseFloat(point.ele[0]));
          this.lines.push({
            id: id + 1,
            path: [{
              lat: parseFloat(point.$.lat),
              lng: parseFloat(point.$.lon),
            }, {
              lat: parseFloat(previousPoint.$.lat),
              lng: parseFloat(previousPoint.$.lon),
            }]
          });
        }
      });
    });
  },
  computed: {
    mapConfig() {
      return {
        ...mapSettings,
        center: this.mapCenter,
      };
    },

    mapCenter() {
      return { lat: 52.7804310, lng: -1.9932180 };
    }
  }
};
</script>

<style lang="scss">
@font-face{
    font-family: "DIN Next";
    font-weight: 700;
    font-style: normal;
    src: url("https://fonts.shopifycdn.com/din_next/dinnext_n7.57888b0b2051a4dba7d02aad7ca64db99eca3cf1.woff2?h1=dHJhaWxtYXBzLmNvLnVr&h2=Y3ljbGluZ3ByaW50cy5jby51aw&hmac=aee4c435df61e442d0e27ec103df917fd5e32faa7705431b2e261288e6b6a60c") format("woff2"),
         url("https://fonts.shopifycdn.com/din_next/dinnext_n7.8ca52ee0f403ce0c89c90387f16284e4637c1b10.woff?h1=dHJhaWxtYXBzLmNvLnVr&h2=Y3ljbGluZ3ByaW50cy5jby51aw&hmac=70510815ffc6a5df6c3bb26b2975aae027be121faac299a6b760340a5c7d23cb") format("woff")
}

body {
  overflow: hidden;
}
h1 {
  position: absolute; top: 15px; left: 55px;
  z-index: 100;

  img {
    display: block;
    max-width: 125px;
  }
}
h2 {
  position: absolute; top: 55px; right: 55px;
  z-index: 100;
  font-family: "DIN Next", sans-serif;
  font-size: 1.625rem;
  font-weight: 700;
  text-transform: uppercase;
}
svg {
  position: absolute; bottom: -50px; right: -20px;
  z-index: 100;
  width: 500px;
}
</style>
