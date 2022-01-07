import {
  getPathToYaml,
  writeFromFileTo,
  readFeedsYaml,
  appendFeedsYaml,
  getAllSymbols,
  getEquityYamlDump,
  getAllFiles,
} from './feedsUtils';

export function addFeeds(discrepancy, precision, fetcher) {
  // step 1 - detect environment and create file paths
  const path = getPathToYaml();
  const feedsYamlFilePath = path + 'feeds.yaml';
  const feedsYaml55FilePath = path + 'feeds-5.5.yaml';
  const addDirPath = '../add/';
  const backupFeedsYamlFilePath = '../backup/feeds-backup.yaml';
  const backupFeedsYaml55FilePath = '../backup/feeds-5.5-backup.yaml';

  // step 2 - backup yaml files
  console.log('Backing up yaml files');
  writeFromFileTo(feedsYamlFilePath, backupFeedsYamlFilePath);
  writeFromFileTo(feedsYaml55FilePath, backupFeedsYaml55FilePath);

  // step 3 - import yaml file data
  const feedYamlData = readFeedsYaml(feedsYamlFilePath);
  const feedYaml55Data = readFeedsYaml(feedsYaml55FilePath);

  // step 4 - add symbols from each file, if required
  getAllFiles(addDirPath).forEach((filename) => {
    console.log('Adding symbols from file ' + filename + ' to feeds');
    const feedBuffer = ['\n' + '# ' + filename];
    const feedBuffer55 = ['\n' + '# ' + filename];
    getAllSymbols(addDirPath + filename).forEach((symbol) => {
      const feedSymbol = 'EQ:' + symbol;
      if (!{}.hasOwnProperty.call(feedYamlData, feedSymbol)) {
        feedBuffer.push(getEquityYamlDump(symbol, discrepancy, precision, fetcher));
      }
      if (!{}.hasOwnProperty.call(feedYaml55Data, feedSymbol)) {
        feedBuffer55.push(getEquityYamlDump(symbol, discrepancy, precision, fetcher));
      }
    });

    // count \n's, if greater than 2 -> dump
    if (feedBuffer.length > 1) {
      console.log('Adding ' + (feedBuffer.length - 1) + ' new feeds to feeds.yaml');
      appendFeedsYaml(feedsYamlFilePath, feedBuffer.join('\n'));
    }
    if (feedBuffer55.length > 1) {
      console.log('Adding ' + (feedBuffer55.length - 1) + ' new feeds to feeds-55.yaml');
      appendFeedsYaml(feedsYaml55FilePath, feedBuffer55.join('\n'));
    }
  });
}

export function restoreFeeds() {
  const path = getPathToYaml();
  const feedsYamlFilePath = path + 'feeds.yaml';
  const feedsYaml55FilePath = path + 'feeds-5.5.yaml';
  const backupFeedsYamlFilePath = '../backup/feeds-backup.yaml';
  const backupFeedsYaml55FilePath = '../backup/feeds-5.5-backup.yaml';

  console.log('Restoring yaml files from backups');
  writeFromFileTo(backupFeedsYamlFilePath, feedsYamlFilePath);
  writeFromFileTo(backupFeedsYaml55FilePath, feedsYaml55FilePath);
}
