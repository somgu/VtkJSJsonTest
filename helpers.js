const path = require('path');

const _root_ = path.resolve(__dirname, '..');

function dir() {
    const args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [_root_].concat(args));
}

const OUTPUT_DIR = dir('dist');

const assets = [
    {
        from: dir('3Dscene/index.json'),
        to: OUTPUT_DIR,
    },
    {
        from: dir('3Dscene/1/index.json'),
        to: OUTPUT_DIR,
    },
    {
        from: dir('3Dscene/2/index.json'),
        to: OUTPUT_DIR,
    },
    {
        from: dir('3Dscene/3/index.json'),
        to: OUTPUT_DIR,
    },
]

module.exports = {
    dir,
    OUTPUT_DIR,
    assets,
}