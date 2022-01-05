import {
    readFeedsYaml,
    appendFeedsYaml,
    getAllSymbols,
    getEquityYamlDump,
    getAllFiles
} from "./add-feeds";

/*
 *  addFeeds
 *
 *  Will add symbols found in files within the /add/ directory as new keys in dev/bsc/feeds.yaml.
 *  Files must contain 1 symbol per line.
 *  Duplicates are ignored.
 *  Each file with valid symbols will create a new section in the yaml, using the filename as heading (in a comment).
 *
 */
async function addFeeds() {

    const DISCREPANCY = 1.0;
    const PRECISION = 2;
    const FETCHER = "PolygonIOPrice";
    const YAML_FILE_PATH = "../dev/bsc/feeds.yaml";
    const ADD_DIR_PATH = "../add/";

    // step 1 - import yaml file
    const feedYamlData = readFeedsYaml(YAML_FILE_PATH);

    // step 2 - add symbols from each file, if required
    getAllFiles(ADD_DIR_PATH).forEach((filename) => {
        let feedBuffer = '\n'+'# '+filename+'\n';
        getAllSymbols(ADD_DIR_PATH+filename).forEach((symbol) => {
            const feedSymbol = 'EQ:'+symbol;
            if(!feedYamlData.hasOwnProperty(feedSymbol)) {
                feedBuffer += '\n'+getEquityYamlDump(symbol, DISCREPANCY, PRECISION, FETCHER);
            }
        })

        // count \n's, if greater than 2 -> dump
        if((feedBuffer.split("\n").length - 1) > 2) {
            appendFeedsYaml(YAML_FILE_PATH, feedBuffer);
        }
    });
}

(async function() {
    await addFeeds();
})()
    .then(() => { process.exit(0) })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })