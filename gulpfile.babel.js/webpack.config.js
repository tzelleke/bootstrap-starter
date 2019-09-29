import PRODUCTION from './config';

export default {
    mode: (PRODUCTION ? 'production' : 'development'),
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        compact: false
                    }
                }
            }
        ]
    },
    devtool: !PRODUCTION && 'inline-source-map'
};
