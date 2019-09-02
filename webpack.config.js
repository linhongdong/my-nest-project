/**
 * Created by dhc on 2019/8/4 17:43
 */
const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');

// const { spawn } = require('child_process');

module.exports = {
    entry: ['webpack/hot/poll?100', './src/main.ts'],
    watch: true,
    target: 'node',
    externals: [
        nodeExternals({
            whitelist: ['webpack/hot/poll?100'],
        }),
    ],
    module: {
        rules: [
            {
                test: /.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    mode: 'development',
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [new webpack.HotModuleReplacementPlugin()],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'server.js',
    },
};

// setTimeout(() => {
//     const ls = spawn('node', ['dist/server']);
//     ls.stdout.on('data', (data) => {
//         console.log(`【nest】${data}`);
//     });
// }, 3500);
