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
        path: {
            type: Array,
            required: false,
            default: () => {
                return []
            },
        },
        polyline: {
            type: String,
            required: false,
        },
    },

    mounted() {
        new this.google.maps.Polyline({
            clickable: false,
            path: this.polyline ? this.google.maps.geometry.encoding.decodePath(this.polyline) : this.path,
            map: this.map,
            ...LINE_PATH_CONFIG,
        })
    },
}
</script>
