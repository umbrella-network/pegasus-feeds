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
    fetcher,
    yamlFilePath,
    addDirPath
) {

    // step 1 - import yaml file
    const feedYamlData = readFeedsYaml(yamlFilePath);

    // step 2 - add symbols from each file, if required
    getAllFiles(addDirPath).forEach((filename) => {
        let feedBuffer = '\n'+'# '+filename+'\n';
        getAllSymbols(addDirPath+filename).forEach((symbol) => {
            const feedSymbol = 'EQ:'+symbol;
            if(!feedYamlData.hasOwnProperty(feedSymbol)) {
                feedBuffer += '\n'+getEquityYamlDump(symbol, discrepancy, precision, fetcher);
            }
        })

        // count \n's, if greater than 2 -> dump
        if((feedBuffer.split("\n").length - 1) > 2) {
            appendFeedsYaml(yamlFilePath, feedBuffer);
        }
    });
}