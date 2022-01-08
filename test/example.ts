import {addFeeds, restoreFeeds} from '../src/feeds';
import {getPathToYaml, readFeedsYaml} from '../src/utils/feedsUtils';

(async function () {
  const DISCREPANCY = 1.0;
  const PRECISION = 2;
  const FETCHER = 'PolygonIOPrice';

  // load yaml files
  const path = getPathToYaml();
  const feedsYamlFilePath = path + 'feeds.yaml';
  const feedsYaml55FilePath = path + 'feeds-5.5.yaml';
  let feedYamlData = readFeedsYaml(feedsYamlFilePath);
  let feedYaml55Data = readFeedsYaml(feedsYaml55FilePath);

  // confirm initial number of keys in each yaml
  const feedsYamlDataLength_0 = Object.keys(feedYamlData).length;
  const feedsYaml55DataLength_0 = Object.keys(feedYaml55Data).length;
  console.log('Initial length of feeds.yaml: ' + feedsYamlDataLength_0 + ' keys');
  console.log('Initial length of feeds-55.yaml: ' + feedsYaml55DataLength_0 + ' keys');

  // add feeds to yaml
  await addFeeds(DISCREPANCY, PRECISION, FETCHER);

  // confirm total number of keys in each yaml after adding new symbols
  feedYamlData = readFeedsYaml(feedsYamlFilePath);
  feedYaml55Data = readFeedsYaml(feedsYaml55FilePath);
  const feedsYamlDataLength_1 = Object.keys(feedYamlData).length;
  const feedsYaml55DataLength_1 = Object.keys(feedYaml55Data).length;
  console.log('Length of feeds.yaml after adding symbols: ' + feedsYamlDataLength_1 + ' keys');
  console.log('Length of feeds-55.yaml after adding symbols: ' + feedsYaml55DataLength_1 + ' keys');

  // restore from backups
  restoreFeeds();

  // confirm final number of keys in each yaml after restoring from backup
  feedYamlData = readFeedsYaml(feedsYamlFilePath);
  feedYaml55Data = readFeedsYaml(feedsYaml55FilePath);
  const feedsYamlDataLength_2 = Object.keys(feedYamlData).length;
  const feedsYaml55DataLength_2 = Object.keys(feedYaml55Data).length;
  console.log('Length of feeds.yaml after restoring from backup: ' + feedsYamlDataLength_2 + ' keys');
  console.log('Length of feeds-55.yaml after restoring from backup: ' + feedsYaml55DataLength_2 + ' keys');
})()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
