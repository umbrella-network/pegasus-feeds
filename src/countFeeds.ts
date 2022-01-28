import {
    getPathToYaml,
    readFeedsYaml,
} from './utils/feedsUtils';
/*
 *  Counts # of symbols with EQ prefix currently in feeds.yaml
 */
(async function () {
    const path = getPathToYaml();
    const feedsYamlFilePath = path + 'feeds.yaml';
    const feedYamlData = readFeedsYaml(feedsYamlFilePath);
    const symbols = Object.keys(feedYamlData);
    const totalSymbols = symbols.length;
    let totalEQSymbols = 0
    symbols.forEach((symbol) => {
        if(symbol.includes('EQ:')) {
            totalEQSymbols++;
        }
    });
    console.log("Total symbols: " + totalSymbols);
    console.log("Total EQ symbols: " + totalEQSymbols);
})()
    .then(() => {
        process.exit(0);
    })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });