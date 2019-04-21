import colorPalette from "@/config/color"

const {
    COLOR_POINT,
    COLOR_LANDSCAPE,
    COLOR_BORDERS,
    COLOR_WATER,
    COLOR_LINE,
    COLOR_POINT_FILL,
} = colorPalette

const COLORS = {
    BORDERS: COLOR_BORDERS,
    LANDSCAPE: COLOR_LANDSCAPE,
    LINE: COLOR_LINE,
    POINT: COLOR_POINT,
    POINT_FILL: COLOR_POINT_FILL,
    WATER: COLOR_WATER,
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
        style: "SMALL",
    },
    zoom: 15,
    styles: [
        {
            featureType: "landscape",
            stylers: [
                { hue: COLORS.LANDSCAPE },
                { saturation: 100 },
                { lightness: 100 },
                { gamma: 0 },
            ],
        },
        {
            featureType: "poi",
            stylers: [{
                visibility: "off",
            }],
        },
        {
            featureType: "road.highway",
            stylers: [{
                visibility: "off",
            }],
        },
        {
            featureType: "road.arterial",
            stylers: [{
                visibility: "off",
            }],
        },
        {
            featureType: "road.local",
            stylers: [{
                visibility: "off",
            }],
        },
        {
            featureType: "transit",
            stylers: [{
                visibility: "off",
            }],
        },
        {
            featureType: "administrative.province",
            stylers: [{
                visibility: "off",
            }],
        },
        {
            featureType: "administrative.locality",
            stylers: [{
                visibility: "off",
            }],
        },
        {
            featureType: "administrative.province",
            stylers: [{
                visibility: "off",
            }],
        },
        {
            featureType: "administrative.land_parcel",
            stylers: [{
                visibility: "off",
            }],
        },
        {
            featureType: "administrative.neighborhood",
            stylers: [{
                visibility: "off",
            }],
        },
        {
            featureType: "administrative.country",
            elementType: "geometry.stroke",
            stylers: [{
                visibility: "off",
            }],
        },
        {
            featureType: "administrative",
            elementType: "labels",
            stylers: [{
                visibility: "off",
            }],
        },
        {
            featureType: "water",
            stylers: [
                { hue: COLORS.WATER },
                { saturation: -63.2 },
                { lightness: 38 },
                { gamma: 1 },
            ],
        },
    ],
}

const EXAMPLE_POLYGON = "sy{`IhbkK@[IeA?aBDmCB[DMRU`BgAbA{@`@e@p@cAh@yAf@yDTo@Z{A\\aAHm@EWa@}A[cBgA_Di@sASu@JYRWR_@lAqABGAYDQJGXk@~EuGvB}Cl@s@pAiBpAaB`@o@L[Ei@Ky@YcA@GDGBBJn@PWTCKo@L{AGQG][C]QQs@E_@ABY[k@iACC[PIJM\\o@rBk@zA]pAOLUIKBS|A[jA_@z@i@~@i@rAYd@k@l@MFYV[NSNgBt@SEWa@gCwGmAoF[k@Ei@Ww@i@{ASeBEIOMoBkDK[Mw@Yk@Km@@UJm@V}@r@iD?cAeA{@a@YMA]e@Oa@@c@N[FUAa@MUo@y@e@Uo@k@u@a@_@[w@cAsBiAg@q@iBkAeAeA_@YKu@h@cDb@}B`@_AX{@XmADm@AIKMsCuCg@u@I]Bo@@IZm@tAkDJ[JaAAUIe@?QHuAOsASw@CSBi@EcAWiAECS?OMQAa@k@c@e@QWAOU_AAu@SwBC_BCMCo@?cCGS@ISo@Ee@IWUQMDADC?CEKFEFAHEBKAMGSHKWG?EFKRQx@I@?]EIGBG`@GNEBKICKECQh@IDGAIiB_@uBa@?m@NGEEYXm@Je@Aa@_@cA?YLg@BQCe@EOUa@D_@LYDgAKeAD]RY?wBK]AOBSC@NDAVFBGSDD^YF_@CBIe@X]@OCKA_@H]I?KBCAJUDWCa@GEAHIZC_@MsAOm@c@J?UDm@Aq@Q}AGOGe@AOSECoABu@CGIGa@AGH@]EgA?q@Qe@c@U?_AFS?c@K[e@OPFHA@YASGMY_@CIVcA?UKo@?QQVCA?FEFa@pA@RRVFRD\\@^S~AWlAGl@A\\Ij@@vDGx@CpBEz@L|B@fAb@pDB`@AVB^Nl@PhABh@PpA@\\Jd@?f@Jp@?j@BXE`@B~@EfADtC?XJNHb@B\\E|A?vBLlGEpBLn@Bv@NnADhDDZFdA@p@GvADvAPlBn@vDRlCBx@QPODe@G_@BUFg@Fy@RaABq@Tk@?wB^e@Do@NcAf@sAHkBPg@?QDDpAJfAJjCCpCFxA?hAGt@At@CPGLGFu@b@{@n@[PmA~@}A`AiAbAaBfAyAt@a@ViA|@wAbAUf@j@tCAl@_@\\GACCMH[z@Lt@HJJl@Xn@Lb@JHZf@Lh@@TE?M^QZGz@J|@H^Rj@NF?HGP]VKJGTFf@R~@HFL@JFy@Co@DECw@VQEu@HYAKHk@B_AK}@DSD]?OMCKIu@Sm@E_@KQ[[_@GgAGwE}@MAzBuElAsCRk@Cm@c@uDm@oC_@oAE{@CYOK}B[uD{@gAQMKEW@[G_@y@uAW]O_@MaAA_@AGCAGFM?GE]m@[w@SNW\\W?g@e@UIQKSDGAUM]YG@GDKb@]^i@CIFm@rBIPc@`@y@Og@YI?_@IyAa@i@GYK[CC?OEW?y@MWKM?C@Q\\IFKB[Na@n@_@pCGLQHe@HWPMRSt@UD]A]Rc@Fo@@GCk@@e@@i@NU^O@KCO@El@_@h@WLWVECE?_@Hk@|@QJM@EBARS|@IDOPSnA[r@UPSx@k@|AG^K`@o@t@INy@~CW`@c@d@u@nAg@xAQv@a@dAe@vBEHKBYViAd@u@n@_@d@_AtCWRsA}@u@k@CGGo@KWQQSESBYKMHG?OHKNMHKKEOGAQPCEA]De@MKM^Ah@U`AG|AJZEfA@TS~@?R@PXbBHZXzARn@KZ@NTh@R`AJTZ`@Vr@Rz@Hv@@^N|@VXXI`AgAh@u@XUtA{Al@g@VOLITC^SpBy@d@@|@Ev@Bz@?`AXRLbA^pAh@PNf@l@b@p@v@z@hA`AdBlBjAhAh@~@v@d@b@L^RfEjAnDb@pCT`AJbDHXAp@Sz@_@|@U^YS_B?]HmAIq@@_@AK@KJMFFJb@FFB@d@CRGpAQdA]l@Cn@Ih@Oj@YdCyBbCiBb@g@lAcA|Aw@zAc@v@OtAAj@Uf@_@LGDBR\\LLRBz@OTIROd@cAFGT?RVLVXNR?NCj@Kt@UxA{@rAiAzD}BfAaAhAyA\\[^e@ZYhAi@lAY\\OXG\\Jb@d@l@L~@JvAZzABl@Hh@V`BTd@P`@TdA^jCzA`@FlBJ^LbALn@FV?NBt@J\\LDCXB~@\\h@Zv@j@~@d@`Ar@rBdAz@\\l@pAl@nBZx@\\h@^hAXxARj@bA`EnAjEVzAZl@\\`AXp@R`@\\XXd@Tn@Tb@DVPr@R\\LJFJPLRZ~@`DTb@Pn@Ez@?lABnAFz@"

export {
    mapSettings,
    LINE_PATH_CONFIG,
    EXAMPLE_POLYGON,
}
