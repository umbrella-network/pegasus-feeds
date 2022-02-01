import {addFeeds} from './feeds';
/*
 *  Will add symbols found in files within the /add/ directory as new keys in dev/bsc/feeds.yaml.
 *  Files must contain 1 symbol per line.
 *  Duplicates are ignored.
 *  Each file with valid symbols will create a new section in the yaml, using the filename as heading (in a comment).
 */
(async function () {
  const DISCREPANCY = 1.0;
  const PRECISION = 2;
  const FETCHER = 'PolygonIOPrice';
  const args = process.argv.slice();
  const maxSymbolsToAdd = parseInt(args[2]);
  if(maxSymbolsToAdd) {
    console.log('Max of ' + maxSymbolsToAdd + ' total equity symbols will be added to the feeds.yaml');
  }
  addFeeds(DISCREPANCY, PRECISION, FETCHER, maxSymbolsToAdd);
})()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
