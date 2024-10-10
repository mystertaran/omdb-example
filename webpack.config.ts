import path from "path";
import webpack, { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ESLintPlugin from "eslint-webpack-plugin";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";
import dotenv from 'dotenv';


dotenv.config();

const webpackConfig = (env): Configuration => ({
    entry: "./src/index.tsx",
    ...(env.production || !env.development ? {} : { devtool: "eval-source-map" }),
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        plugins: [new TsconfigPathsPlugin()]
    },
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "build.js"
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    transpileOnly: true
                },
                exclude: /dist/
            },
            {
                test: /\.css$/, 
                use: [
                    "style-loader", 
                    "css-loader", 
                    "postcss-loader" 
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html"
        }),
        new webpack.DefinePlugin({
            "process.env.PRODUCTION": JSON.stringify(env.production || !env.development),
            "process.env.NAME": JSON.stringify(require("./package.json").name),
            "process.env.VERSION": JSON.stringify(require("./package.json").version),
            "process.env.REACT_APP_API_URL": JSON.stringify(process.env.REACT_APP_API_URL),
            "process.env.REACT_APP_OMDB_API_KEY": JSON.stringify(process.env.REACT_APP_OMDB_API_KEY)
        }),
        new ForkTsCheckerWebpackPlugin(),
        new ESLintPlugin({ files: "./src/**/*.{ts,tsx,js,jsx}" })
    ]
});

export default webpackConfig;
