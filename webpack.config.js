const TerserPlugin = require('terser-webpack-plugin');


module.exports = (env, cnf) => {
    console.log(env.externals)
    const config = {
        ...env,
        // optimization: { minimize: true, concatenateModules: false }
        // externals: [],
        optimization: {
            minimizer: [
                new TerserPlugin()
            ]
        }
    };
    return config;
}