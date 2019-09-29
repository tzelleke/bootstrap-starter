module.exports = function (options) {
    return [
        '<section data-aos="fadeIn">\n',
        options.fn(this),
        '</section>'
    ].join('')
}
