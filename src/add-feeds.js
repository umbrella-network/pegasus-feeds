"use strict";
exports.__esModule = true;
exports.getEquityYamlDump = exports.getAllSymbols = exports.getAllFiles = exports.appendFeedsYaml = exports.writeFromFileTo = exports.readFeedsYaml = void 0;
var fs = require("fs");
var yaml = require("js-yaml");
function readFeedsYaml(filePath) {
    return yaml.load(fs.readFileSync(filePath, 'utf8'));
}
exports.readFeedsYaml = readFeedsYaml;
function writeFromFileTo(fromFilePath, toFilePath) {
    var data = fs.readFileSync(fromFilePath, 'utf8');
    fs.writeFileSync(toFilePath, data);
}
exports.writeFromFileTo = writeFromFileTo;
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
    fs.readFileSync(filePath, 'utf8')
        .toString().split('\n')
        .forEach(function (symbol) {
        if (symbol && symbol != "\n" && !symbols.includes(symbol)) {
            symbols.push(symbol);
        }
    });
    return symbols.slice();
}
exports.getAllSymbols = getAllSymbols;
function getEquityDataFields(symbol, discrepancy, precision, fetcher) {
    return {
        discrepancy: discrepancy,
        precision: precision,
        inputs: [
            { fetcher: { name: fetcher, params: { sym: symbol } } }
        ]
    };
}
function getEquityYamlDump(symbol, discrepancy, precision, fetcher) {
    var data = {};
    data['EQ:' + symbol] = getEquityDataFields(symbol, discrepancy, precision, fetcher);
    return yaml.dump(data);
}
exports.getEquityYamlDump = getEquityYamlDump;
