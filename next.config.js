const withTM = require('next-transpile-modules')(['@mui/x-charts']); // Using MUI X Charts with Next.js requires transpiling the package
const webpack = require('webpack');
require('dotenv').config();

module.exports = withTM({
    webpack: config => {
        const env = Object.keys(process.env).reduce((acc, curr) => {
            acc[`process.env.${curr}`] = JSON.stringify(process.env[curr]);
            return acc;
        }, {});

        config.plugins.push(new webpack.DefinePlugin(env));

        return config;
    }
});