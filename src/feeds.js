"use strict";
exports.__esModule = true;
exports.backupFeeds = exports.restoreFeeds = exports.addFeeds = void 0;
var feedsUtils_1 = require("./utils/feedsUtils");
var path = (0, feedsUtils_1.getPathToYaml)();
var feedsYamlFilePath = path + 'feeds.yaml';
var feedsYaml55FilePath = path + 'feeds-5.5.yaml';
var backupFeedsYamlFilePath = '../backup/feeds-backup.yaml';
var backupFeedsYaml55FilePath = '../backup/feeds-5.5-backup.yaml';
function addFeeds(discrepancy, precision, fetcher) {
    // step 1 - detect environment and create file paths
    var addDirPath = '../add/';
    // step 2 - backup yaml files
    _backupFeeds();
    // step 3 - import yaml file data
    var feedYamlData = (0, feedsUtils_1.readFeedsYaml)(feedsYamlFilePath);
    var feedYaml55Data = (0, feedsUtils_1.readFeedsYaml)(feedsYaml55FilePath);
    // step 4 - add symbols from each file, if required
    (0, feedsUtils_1.getAllFiles)(addDirPath).forEach(function (filename) {
        console.log('Adding symbols from file ' + filename + ' to feeds');
        var feedBuffer = ['\n' + '# ' + filename];
        var feedBuffer55 = ['\n' + '# ' + filename];
        (0, feedsUtils_1.getAllSymbols)(addDirPath + filename).forEach(function (symbol) {
            var feedSymbol = 'EQ:' + symbol;
            if (!{}.hasOwnProperty.call(feedYamlData, feedSymbol)) {
                feedBuffer.push((0, feedsUtils_1.getEquityYamlDump)(symbol, discrepancy, precision, fetcher));
            }
            if (!{}.hasOwnProperty.call(feedYaml55Data, feedSymbol)) {
                feedBuffer55.push((0, feedsUtils_1.getEquityYamlDump)(symbol, discrepancy, precision, fetcher));
            }
        });
        if (feedBuffer.length > 1) {
            console.log('Adding ' + (feedBuffer.length - 1) + ' new feeds to feeds.yaml');
            (0, feedsUtils_1.appendFeedsYaml)(feedsYamlFilePath, feedBuffer.join('\n'));
        }
        if (feedBuffer55.length > 1) {
            console.log('Adding ' + (feedBuffer55.length - 1) + ' new feeds to feeds-55.yaml');
            (0, feedsUtils_1.appendFeedsYaml)(feedsYaml55FilePath, feedBuffer55.join('\n'));
        }
    });
}
exports.addFeeds = addFeeds;
function restoreFeeds() {
    console.log('Restoring yaml files from backups');
    (0, feedsUtils_1.writeFromFileTo)(backupFeedsYamlFilePath, feedsYamlFilePath);
    (0, feedsUtils_1.writeFromFileTo)(backupFeedsYaml55FilePath, feedsYaml55FilePath);
}
exports.restoreFeeds = restoreFeeds;
function _backupFeeds() {
    console.log('Backing up yaml files');
    (0, feedsUtils_1.writeFromFileTo)(feedsYamlFilePath, backupFeedsYamlFilePath);
    (0, feedsUtils_1.writeFromFileTo)(feedsYaml55FilePath, backupFeedsYaml55FilePath);
}
function backupFeeds() { _backupFeeds(); }
exports.backupFeeds = backupFeeds;
