import path from 'path';
import webpack from 'webpack';

export default {
    entry: [
        'react-hot-loader/patch',
        'webpack/hot/only-dev-server',
        'webpack-hot-middleware/client?reload=true',
        path.join(__dirname, '/client/index.js'),
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, '/dist'),
        publicPath: '/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                include: [path.join(__dirname, 'client'),
                path.join(__dirname, 'server/shared')
                ],
                loaders: ['babel-loader'],
                exclude: /node_modules/,
            },
            { test: /\.css$/, loader: "style-loader!css-loader" },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css'],
        modules: [
            'node_modules'
        ]
    },
    devServer: {
        historyApiFallback: true
    },
    mode: 'production',
}