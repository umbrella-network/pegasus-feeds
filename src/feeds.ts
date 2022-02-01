import {
  getPathToYaml,
  writeFromFileTo,
  readFeedsYaml,
  appendFeedsYaml,
  getAllSymbols,
  getEquityYamlDump,
  getAllFiles,
} from './utils/feedsUtils';

const path = getPathToYaml();
const feedsYamlFilePath = path + 'feeds.yaml';
const feedsYaml55FilePath = path + 'feeds-5.5.yaml';
const backupFeedsYamlFilePath = '../backup/feeds-backup.yaml';
const backupFeedsYaml55FilePath = '../backup/feeds-5.5-backup.yaml';

export function addFeeds(discrepancy, precision, fetcher, maxSymbolsToAdd) {
  // step 1 - detect environment and create file paths
  const addDirPath = '../add/';

  // step 2 - backup yaml files
  console.log('Backing up yaml files');
  writeFromFileTo(feedsYamlFilePath, backupFeedsYamlFilePath);

  // step 3 - import yaml file data
  const feedYamlData = readFeedsYaml(feedsYamlFilePath);

  // step 4 - add symbols from each file, if required
  let newSymbolCount = 0;
  getAllFiles(addDirPath).forEach((filename) => {
    console.log('Adding symbols from file ' + filename + ' to feeds');
    const feedBuffer = ['\n' + '# ' + filename + '\n'];
    getAllSymbols(addDirPath + filename).forEach((symbol) => {
      const feedSymbol = 'EQ:' + symbol;
      if (!{}.hasOwnProperty.call(feedYamlData, feedSymbol)) {
        if(!maxSymbolsToAdd || maxSymbolsToAdd > newSymbolCount) {
          feedBuffer.push(getEquityYamlDump(symbol, discrepancy, precision, fetcher));
          newSymbolCount++;
        }
      }
    });

    if (feedBuffer.length > 1) {
      console.log('Adding ' + (feedBuffer.length - 1) + ' new feeds to feeds.yaml');
      appendFeedsYaml(feedsYamlFilePath, feedBuffer.join('\n'));
    }
  });
}

export function restoreFeeds() {
  console.log('Restoring yaml files from backups');
  writeFromFileTo(backupFeedsYamlFilePath, feedsYamlFilePath);
  writeFromFileTo(backupFeedsYaml55FilePath, feedsYaml55FilePath);
}
