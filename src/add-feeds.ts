import {
    readFeedsYaml,
    appendFeedsYaml,
    getAllSymbols,
    getEquityYamlDump,
    getAllFiles
} from "./add-feeds-utils";

export async function addFeeds(
    discrepancy,
    precision,
    fetcher
) {

    // step 1 - detect environment and create file paths
    let path = '../prod/bsc/';
    const dirContents = getAllFiles('..');
    if(!dirContents.includes('prod') && dirContents.includes('dev')) {
        path = '../dev/bsc/';
    }
    const feedsYamlFilePath = path + 'feeds.yaml';
    const feedsYaml55FilePath = path + 'feeds-5.5.yaml';
    const addDirPath = '../add/';

    // step 2 - import yaml file data
    const feedYamlData = readFeedsYaml(feedsYamlFilePath);
    const feedYaml55Data = readFeedsYaml(feedsYaml55FilePath);

    // step 3 - add symbols from each file, if required
    getAllFiles(addDirPath).forEach((filename) => {
        let feedBuffer = '\n'+'# '+filename+'\n';
        let feedBuffer55 = '\n'+'# '+filename+'\n';
        getAllSymbols(addDirPath+filename).forEach((symbol) => {
            const feedSymbol = 'EQ:'+symbol;
            if(!feedYamlData.hasOwnProperty(feedSymbol)) {
                feedBuffer += '\n'+getEquityYamlDump(symbol, discrepancy, precision, fetcher);
            }
            if(!feedYaml55Data.hasOwnProperty(feedSymbol)) {
                feedBuffer55 += '\n'+getEquityYamlDump(symbol, discrepancy, precision, fetcher);
            }
        })

        // count \n's, if greater than 2 -> dump
        if((feedBuffer.split("\n").length - 1) > 2) {
            appendFeedsYaml(feedsYamlFilePath, feedBuffer);
        }
        if((feedBuffer55.split("\n").length - 1) > 2) {
            appendFeedsYaml(feedsYaml55FilePath, feedBuffer55);
        }
    });
}