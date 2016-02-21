import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';

const TARGET = process.env.npm_lifecycle_event;
const ROOT_PATH = path.resolve(__dirname);

var exportModule;


const common = {
    entry: {
        app: path.resolve(ROOT_PATH) + "/src/js/app.jsx",
    },
    resolve: {
        modulesDirectories: ['node_modules', 'bower_components']
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            include: [path.resolve(__dirname, "src/js")],
            loader: 'babel', // 'babel-loader' is also a legal name to reference
            query: {
                presets: ['react', 'es2015']
            }
        }]

        // loaders: [{
        //     loaders: ["babel-loader"],

        //     // Skip any files outside of your project's `src` directory
        //     include: [
        //         path.resolve(__dirname, "src/js"),
        //     ],
        //     // Only run `.js` files through Babel
        //     test: /\.jsx?$/
    },
    plugins: [
        // new BowerWebpackPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    devtool: 'source-map'
};

// if (TARGET === 'build') {
//     // Sames as build final but without minification/uglification, so big bundle.js
//     exportModule = merge(common, {
//         output: {
//             path: path.resolve(ROOT_PATH, 'build/js/'),
//             filename: 'bundle.js'
//         }
//     });
// }

// if (TARGET === 'buildFinal') {
//     // Includes minification, so slow build times and smaller files.  Use for final build to prod only.
//     exportModule = merge(common, {
//         output: {
//             path: path.resolve(ROOT_PATH, 'build/js/'),
//             filename: 'bundle.js'
//         },
//         plugins: [
//             new webpack.optimize.UglifyJsPlugin({
//                 compress: {
//                     warnings: false
//                 }
//             })
//         ]
//     });
// }

// // Note when inline is set to true, we get an error:
// //  Module not found: Error: Cannot resolve 'file' or 'directory' ./dist/debug.js
// // see http://stackoverflow.com/questions/34549508/webpack-dev-server-error-with-hot-module-replacement
// const devServerCommon = {

//     entry: ['webpack/hot/dev-server', path.resolve(ROOT_PATH) + "/src/js/app.jsx"],

//     devServer: {
//         colors: true,
//         noInfo: false,
//         historyApiFallback: true,
//         // hot: true,
//         inline: true,
//         progress: true
//     }    ,
//     output: {
//         publicPath: "/",
//     }
//     ,
//     plugins: [
//         new webpack.HotModuleReplacementPlugin()
//     ]
// };

// const startCommon = merge(common, devServerCommon);

if (TARGET === 'start' || !TARGET) {
    console.log("Run start");
    exportModule = merge(common, {
        output: {
            filename: 'src/main.js'
        },
        devServer: {
            colors: true,
            noInfo: false,
            historyApiFallback: true,
            // hot: true,
            inline: true,
            progress: true
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin()
        ]
    });
}

export default exportModule;
