const styles = require('js-yaml').load(
    require('fs').readFileSync(__dirname + '/../scss/styles.yml', 'utf-8')
)

module.exports = function (style) {
    return styles[style].join(' ')
}
