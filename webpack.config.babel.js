import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';

const TARGET = process.env.npm_lifecycle_event;
const ROOT_PATH = path.resolve(__dirname);
const srcDir = path.join(__dirname, 'src');

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
    devtool: 'source-map'
};

if (TARGET === "buildDemo") {
    exportModule = merge(common, {
    output: {
            path: path.resolve(ROOT_PATH, 'demo/js/'),
            filename: 'slider-bundle.min.js'
        },
        plugins: [
            new webpack.optimize.CommonsChunkPlugin("vendor", 'vendor.min.js', function(module, count) {
                return module.resource && module.resource.indexOf(srcDir) === -1;
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false
                }
            })
        ]
    });

}

if (TARGET === 'start' || !TARGET) {
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
