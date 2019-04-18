module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/trailmaps-gpx/' : '/',

    configureWebpack: {
        module: {
            rules: [{
                test: /\.gpx$/i,
                use: [{
                    loader: 'file-loader',
                }],
            }],
        },
    },

    css: {
        loaderOptions: {
            sass: {
                data: `@import "reset-css";`
            },
        },
    },
}
