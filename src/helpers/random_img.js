const SafeString = require('handlebars').SafeString

const unsplash = require('js-yaml').load(
    require('fs').readFileSync(__dirname + '/../data/unsplash.yml', 'utf-8')
)

const ENDPOINT = unsplash.endpoint
const DIMENSIONS = unsplash.dimensions

module.exports = function (options) {
    let conf = Object.assign({
        dim: '16/9-small',
        freq: 'weekly',
        keywords: '',
    }, options.hash)

    let src = ENDPOINT + '/' + DIMENSIONS[conf.dim]
    if (conf.freq) {
        src += '/' + conf.freq
    }
    if (conf.keywords) {
        src += '/?' + conf.keywords
    }

    return new SafeString(src)
};
