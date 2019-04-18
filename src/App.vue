<template>
  <div id="app">
    <h1>
      <a href>
        <img src="assets/logo.png" alt="TrailMaps.co.uk GPX" title>
      </a>
    </h1>
  </div>
</template>

<script>
import strava from "strava";
import gpxParse from "gpx-parse";

export default {
  name: "TrailMaps",
  components: {},
  computed: {},
  mounted() {
    console.log(strava);
    console.log(gpxParse);
  },
  methods: {}
  
};
</script>

<style>
html,
body {
  padding: 0;
  margin: 0;
}
h1 {
  margin: 20px;
}
h1 img {
  display: block;
  max-width: 120px;
}
</style>
