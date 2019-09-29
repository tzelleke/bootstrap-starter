const loremIpsum = require('lorem-ipsum').loremIpsum;

module.exports = function (options) {
    let s = loremIpsum(Object.assign({
        count: 1,
        units: 'sentences',
        sentenceLowerBound: 5,
        sentenceUpperBound: 10,
        paragraphLowerBound: 3,
        paragraphUpperBound: 7,
        format: 'plain',
        random: Math.random
    }, options.hash));
    return s;
};
