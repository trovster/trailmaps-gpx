module.exports = {
    publicPath: process.env.ROOT_PATH,

    configureWebpack: {
        module: {
            rules: [
                {
                    enforce: "pre",
                    test: /\.(js|vue)$/,
                    loader: "eslint-loader",
                    exclude: /node_modules/,
                },
            ],
        },
    },

    css: {
        loaderOptions: {
            sass: {
                data: "@import '@/scss/app.scss';",
                options: {
                    sourceMap: false,
                },
            },
        },
    },
}
