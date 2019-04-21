<script>
import { LINE_PATH_CONFIG } from "@/config/map"

export default {
    name: "GoogleMapLine",
    props: {
        google: {
            type: Object,
            required: true,
        },
        map: {
            type: Object,
            required: true,
        },
        polyline: {
            type: String,
            required: false,
        },
    },

    mounted() {
        new this.google.maps.Polyline({
            clickable: false,
            path: this.google.maps.geometry.encoding.decodePath(this.polyline),
            map: this.map,
            ...LINE_PATH_CONFIG,
        })
    },

    watch: { 
        polyline: function (value) {
            new this.google.maps.Polyline({
                clickable: false,
                path: this.google.maps.geometry.encoding.decodePath(value),
                map: this.map,
                ...LINE_PATH_CONFIG,
            })
        },
    },
}
</script>
