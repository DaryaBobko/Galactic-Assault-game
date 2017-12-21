var path = require('path');

module.exports = {
    entry: './src/js/game.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    }
}