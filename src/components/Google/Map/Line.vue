<script>
import { LINE_PATH_CONFIG } from "@/config/map";

export default {
  name: "GoogleMapLine",
  props: {
    google: {
      type: Object,
      required: true
    },
    map: {
      type: Object,
      required: true
    },
    path: {
      type: Array,
      required: true
    }
  },

  mounted() {
    new this.google.maps.Polyline({
      clickable: false,
      path: this.path,
      map: this.map,
      ...LINE_PATH_CONFIG
    });
  }
};
</script>
