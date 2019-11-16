const mix = require('laravel-mix');

mix.options({
    processCssUrls: false,
    publicPath: 'public'
});

mix.webpackConfig({
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },

    resolve: {
        extensions: ['*', '.js', '.jsx', '.json', '.vue', '.ts', '.tsx'],

        modules: [
            path.resolve(__dirname, 'resources'),
            path.resolve(__dirname, 'resources/ts'),
            path.resolve(__dirname, 'resources/ts/Classes'),
            path.resolve(__dirname, 'node_modules'),
        ]
    }
});

mix.ts('resources/ts/app.ts', 'public/js')
    .sass('resources/sass/app.scss', 'public/css');
