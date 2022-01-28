import {
    getPathToYaml,
    writeFromFileTo,
    readFeedsYaml,
    appendFeedsYaml,
    getAllSymbols,
    getEquityYamlDump,
    getAllFiles,
    getEquityDataFields,
    dumpYaml,
} from './utils/feedsUtils';
/*
 *  Counts # of symbols with EQ prefix currently in feeds.yaml
 */
(async function () {

    const DISCREPANCY = 1.0;
    const PRECISION = 2;
    const FETCHER = 'PolygonIOPrice';

    const args = process.argv.slice();
    const totalNumberOfEquitiesForFeeds = parseInt(args[2]);
    if(totalNumberOfEquitiesForFeeds) {
        console.log('Max of ' + totalNumberOfEquitiesForFeeds + ' total equity symbols will be in the resulting feeds.yaml');
    }

    const pathToDevYaml = getPathToYaml();
    const devFeedsYamlFilePath = pathToDevYaml + 'feeds.yaml';
    const devFeedsYamlData = readFeedsYaml(devFeedsYamlFilePath);

    const prodFeedsYamlFilePath = '../backup/prod/feeds.yaml';
    const prodFeedsYamlData = readFeedsYaml(prodFeedsYamlFilePath);

    const targetFeeds = devFeedsYamlData;

    Object.keys(prodFeedsYamlData).forEach((symbol) => {
        if(symbol.includes('EQ:')) {
            if(!{}.hasOwnProperty.call(targetFeeds, symbol)) {
                targetFeeds[symbol] = prodFeedsYamlData[symbol];
            }
        }
    });

    const targetFeedsSymbols = Object.keys(targetFeeds);
    const totalTargetFeedsSymbols = targetFeedsSymbols.length;
    let totalTargetEQSymbols = 0
    targetFeedsSymbols.forEach((symbol) => {
        if(symbol.includes('EQ:')) {
            totalTargetEQSymbols++;
        }
    });
    console.log("Total symbols before adding russel-2000: " + totalTargetFeedsSymbols);
    console.log("Total target EQ symbols before adding russel-2000: " + totalTargetEQSymbols);

    let equitySymbolCount = totalTargetEQSymbols;
    getAllSymbols('../add/russel-2000').forEach((symbol) => {
        if(!targetFeedsSymbols.includes('EQ:' + symbol)) {
            if(!totalNumberOfEquitiesForFeeds || totalNumberOfEquitiesForFeeds > equitySymbolCount) {
                targetFeeds['EQ:' + symbol] = getEquityDataFields(symbol, DISCREPANCY, PRECISION, FETCHER);
                //console.log(symbol);
                equitySymbolCount++;
            }
        }
    });

    const finalTargetFeedsSymbols = Object.keys(targetFeeds);
    let finalTargetEQSymbols = 0
    finalTargetFeedsSymbols.forEach((symbol) => {
        if(symbol.includes('EQ:')) {
            finalTargetEQSymbols++;
        }
    });
    console.log("Total symbols after adding russel-2000: " + finalTargetFeedsSymbols.length);
    console.log("Total target EQ symbols after adding russel-2000: " + finalTargetEQSymbols);

    dumpYaml(devFeedsYamlFilePath, targetFeeds);
})()
    .then(() => {
        process.exit(0);
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });