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
    },
    plugins: [
        // Provide jQuery as a global
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    devtool: 'source-map'
};

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
