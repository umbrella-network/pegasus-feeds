import { addFeeds } from "./add-feeds";

/*
 *
 *  Will add symbols found in files within the /add/ directory as new keys in dev/bsc/feeds.yaml.
 *  Files must contain 1 symbol per line.
 *  Duplicates are ignored.
 *  Each file with valid symbols will create a new section in the yaml, using the filename as heading (in a comment).
 *
 */
(async function() {

    const DISCREPANCY = 1.0;
    const PRECISION = 2;
    const FETCHER = "PolygonIOPrice";
    const YAML_FILE_PATH = "../dev/bsc/feeds.yaml";
    const ADD_DIR_PATH = "../add/";

    await addFeeds(
        DISCREPANCY,
        PRECISION,
        FETCHER,
        YAML_FILE_PATH,
        ADD_DIR_PATH
    );

})()
    .then(() => { process.exit(0) })
    .catch((error) => {
        console.error(error);
        process.exit(1);
    })