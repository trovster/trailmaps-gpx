export default {
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
        const service = new this.google.maps.ElevationService
        service.getElevationAlongPath({
            "path": this.google.maps.geometry.encoding.decodePath(this.polyline),
            "samples": 256,
        }, this.elevationReponse)
    },

    methods: {
        elevationReponse(elevations, status) {}, // eslint-disable-line
    },

    watch: { 
        polyline: function (value) {
            new this.google.maps.ElevationService.getElevationAlongPath({
                "path": this.google.maps.geometry.encoding.decodePath(value),
                "samples": 256,
            }, this.elevationReponse) 
        },
    },
}
