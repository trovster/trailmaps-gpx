import colorPalette from '@/config/color'

const {
    COLOR_POINT,
    COLOR_LANDSCAPE,
    COLOR_BORDERS,
    COLOR_WATER,
    COLOR_LINE,
    COLOR_POINT_FILL
} = colorPalette

const COLORS = {
    BORDERS: COLOR_BORDERS,
    LANDSCAPE: COLOR_LANDSCAPE,
    LINE: COLOR_LINE,
    POINT: COLOR_POINT,
    POINT_FILL: COLOR_POINT_FILL,
    WATER: COLOR_WATER
}

const LINE_PATH_CONFIG = {
    clickable: false,
    geodesic: false,
    strokeOpacity: 1,
    strokeColor: COLORS.LINE,
}

const mapSettings = {
    disableDefaultUI: true,
    clickableIcons: false,
    streetViewControl: false,
    panControlOptions: false,
    // gestureHandling: 'cooperative',
    backgroundColor: COLORS.LANDSCAPE,
    mapTypeControl: false,
    zoomControlOptions: {
        style: 'SMALL',
    },
    zoom: 15,
    styles: [
        {
          featureType: 'landscape',
          stylers: [
              { hue: COLORS.LANDSCAPE },
              { saturation: 100 },
              { lightness: 100 },
              { gamma: 0 }
          ]
        },
        {
            featureType: 'poi',
            stylers: [{
                visibility: 'off'
            }],
        },
        {
            featureType: 'road.highway',
            stylers: [{
                visibility: 'off'
            }],
        },
        {
            featureType: 'road.arterial',
            stylers: [{
                visibility: 'off'
            }],
        },
        {
            featureType: 'road.local',
            stylers: [{
                visibility: 'off'
            }],
        },
        {
            featureType: 'transit',
            stylers: [{
                visibility: 'off'
            }],
        },
        {
            featureType: 'administrative.province',
            stylers: [{
                visibility: 'off'
            }],
        },
        {
            featureType: 'administrative.locality',
            stylers: [{
                visibility: 'off'
            }],
        },
        {
            featureType: 'administrative.province',
            stylers: [{
                visibility: 'off'
            }],
        },
        {
            featureType: 'administrative.land_parcel',
            stylers: [{
                visibility: 'off'
            }],
        },
        {
            featureType: 'administrative.neighborhood',
            stylers: [{
                visibility: 'off'
            }],
        },
        {
            featureType: 'administrative.country',
            elementType: 'geometry.stroke',
            stylers: [{
                visibility: 'off'
            }],
        },
        {
            featureType: 'administrative',
            elementType: 'labels',
            stylers: [{
                visibility: 'off'
            }],
        },
        {
          featureType: 'water',
          stylers: [
              { hue: COLORS.WATER },
              { saturation: -63.2 },
              { lightness: 38 },
              { gamma: 1 }
          ]
        }
    ],
}

export {
    mapSettings,
    LINE_PATH_CONFIG,
}
