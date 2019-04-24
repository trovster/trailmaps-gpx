module.exports = {
    publicPath: process.env.ROOT_PATH,

    configureWebpack: {
        module: {
            rules: [{
                test: /\.gpx$/i,
                use: [{
                    loader: "file-loader",
                }],
            }],
        },
    },

    css: {
        loaderOptions: {
            sass: {
                data: "@import \"@/scss/app.scss\";",
                options: {
                    sourceMap: false,
                },
            },
        },
    },
}
