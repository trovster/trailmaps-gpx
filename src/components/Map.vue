<template>
  <div id="map">
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
import GoogleMapLoader from "./Google/Map/Loader";
import GoogleMapLine from "./Google/Map/Line";
import { mapSettings } from "@/config/map";

import axios from "axios";
import xml2js from "xml2js";
import Bars from "vuebars";

export default {
  name: "Map",
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
    axios.get("../assets/example.gpx").then(response => {
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

<style type="sass" scoped>
body {
    overflow: hidden;
}
#map {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
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
}
svg {
    position: absolute;
    bottom: -50px;
    right: -20px;
    z-index: 100;
    width: 500px;
}
</style>