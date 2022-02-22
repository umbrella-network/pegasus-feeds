"use strict";
exports.__esModule = true;
exports.getEquityYamlDump = exports.getEquityDataFields = exports.getAllSymbols = exports.getAllFiles = exports.appendFeedsYaml = exports.dumpYaml = exports.writeFromFileTo = exports.readFeedsYaml = exports.getPathToYaml = void 0;
var fs = require("fs");
var yaml = require("js-yaml");
function getPathToYaml() {
    if (fs.readdirSync('..').includes('dev')) {
        return '../dev/bsc/';
    }
    return '../prod/bsc/';
}
exports.getPathToYaml = getPathToYaml;
function readFeedsYaml(filePath) {
    return yaml.load(fs.readFileSync(filePath, 'utf8'));
}
exports.readFeedsYaml = readFeedsYaml;
function writeFromFileTo(fromFilePath, toFilePath) {
    var data = fs.readFileSync(fromFilePath, 'utf8');
    fs.writeFileSync(toFilePath, data);
}
exports.writeFromFileTo = writeFromFileTo;
function dumpYaml(filePath, data) {
    fs.writeFileSync(filePath, yaml.dump(data));
}
exports.dumpYaml = dumpYaml;
function appendFeedsYaml(filePath, yamlData) {
    //fs.appendFileSync(filepath, yaml.dump(yamlData));
    fs.appendFileSync(filePath, yamlData);
}
exports.appendFeedsYaml = appendFeedsYaml;
function getAllFiles(dirPath) {
    return fs.readdirSync(dirPath);
}
exports.getAllFiles = getAllFiles;
function getAllSymbols(filePath) {
    var symbols = [];
    var duplicates = 0;
    fs.readFileSync(filePath, 'utf8')
        .toString()
        .split('\n')
        .forEach(function (symbol) {
        if (symbol && symbol != '\n') {
            if (!symbols.includes(symbol)) {
                symbols.push(symbol);
            }
            else {
                duplicates++;
            }
        }
    });
    console.log('Found ' + symbols.length + ' unique symbols in file');
    if (duplicates) {
        console.log('Found ' + duplicates + ' duplicate symbols in file');
    }
    return symbols.slice();
}
exports.getAllSymbols = getAllSymbols;
function _getEquityDataFields(symbol, discrepancy, precision, fetcher) {
    return {
        discrepancy: discrepancy,
        precision: precision,
        inputs: [{ fetcher: { name: fetcher, params: { sym: symbol } } }]
    };
}
function getEquityDataFields(symbol, discrepancy, precision, fetcher) {
    return _getEquityDataFields(symbol, discrepancy, precision, fetcher);
}
exports.getEquityDataFields = getEquityDataFields;
function getEquityYamlDump(symbol, discrepancy, precision, fetcher) {
    var data = {};
    data['EQ:' + symbol] = _getEquityDataFields(symbol, discrepancy, precision, fetcher);
    return yaml.dump(data);
}
exports.getEquityYamlDump = getEquityYamlDump;
